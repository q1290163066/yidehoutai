import React, { Component } from 'react'
import './Houses.styl'
import util from '../../common/js/util'

import { Table, Button, Space,Form, Input,Upload, message,Tag } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Column} = Table;

// 表单
// 文本框占的宽度
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
// 提交表单且数据验证成功后回调事件
const onFinish = values => {
  console.log('Success:', values);
};
// 提交表单且数据验证失败后回调事件
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

// 上传
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法。
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Houses extends Component {
    constructor(){
      super()
      this.state={
        banner_all:[],
        isShow:false,
        title:'添加',
        loading: false,
        imageUrl:'',
        form:{
          title:'1',
          type:'1',
          status:'1',
          platform:'1',
          positionCode:'1',
          targetUrl:'1',
          resourcePath:''
        }
      }
    }
    componentDidMount(){
        this.$axios.get(this.$api.banner.get_all)
        .then(res=>{
          console.log(res.data.data)
          this.setState({
            banner_all:res.data.data
          })
        })
    }
    add(){
      this.setState({
        isShow:true,
        title:'添加',
        form:{
          title:'',
          type:'',
          status:'',
          platform:'',
          positionCode:'',
          targetUrl:'',
          resourcePath:''
        }
      })
    }
    compile(){
      // this.$axios({
      //   url:this.$api.banner.get_one+"1275378457898909696"
      // }).then(res=>{
      //   // console.log(res.data.data)
      //   // this.setState({
      //   //   isShow:true,
      //   //   title:'编辑',
      //   //   form:res.data.data
      //   // })
      // }
     this.$axios({
      url:this.$api.banner.get_one+"1275378457898909696"
     }).then(res=>{
       console.log(res.data.data)
       this.setState({
         isShow:true,
         title:"编辑",
         form:res.data.data
       })
     })
    }
    noShow(){
      this.setState({
        isShow:false
      })
    }
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, resourcePath =>
          this.setState({
            form:{
              resourcePath
            },
            loading: false,
          }),
        );
      }
    }
    render() {
        const uploadButton = (
          <div>
            {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">选择图片</div>
          </div>
        );
        const imageUrl  = this.state.form.resourcePath;
        return (
            <>
              <Button type="primary" onClick={this.add.bind(this)}>添加</Button>
              <Table dataSource={this.state.banner_all} className="table" rowKey="id">
                  <Column
                   title="创建时间" 
                   key="createTime"
                   render={(value, record) => (
                    //  var time=new Date(value.createTime)
                     <div>{util.formatTime(new Date(value.createTime).getTime())}</div>
                   )}
                  />
                  <Column title="标题" dataIndex="title" key="title" />
                  <Column 
                    title="图片"  
                    key="resourcePath" 
                    render={(value, record) => (
                      <img src={value.resourcePath} alt="加载失败" className="img"/>
                    )}
                  />
                  <Column 
                    title="平台"  
                    key="platform" 
                    render={(value, record) => (
                      <div>{value.platform}</div>
                    )}
                  />
                  <Column 
                    title="广告位置"  
                    key="positionCode" 
                    render={(value, record) => (
                      <div>{value.positionCode}</div>
                    )}
                  />
                  <Column title="目标地址" dataIndex="targetUrl" key="targetUrl" />
                  <Column 
                    title="类型" 
                    key="type" 
                    render={(value, record) => (
                      (function(){
                          if(value.type===1){
                            return(<Tag color="green">正常</Tag>)
                          }else{
                            return(<Tag color="red">定时</Tag>)
                          }
                      })()
                    )}
                  />
                  <Column 
                    title="状态" 
                    key="status" 
                    render={(value, record) => (
                      (function(){
                          if(value.status==1){
                            return(<Tag color="green">开启</Tag>)
                          }else{
                            return(<Tag color="red">禁用</Tag>)
                          }
                      })()
                    )}
                  />



                  <Column
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                          <Button type="primary" onClick={this.compile.bind(this)}>编辑</Button>
                          <Button type="danger">删除</Button>
                        </Space>
                    )}
                  />
              </Table>
              {
                this.state.isShow?(
                  <div id="form">
                    <h2>{this.state.title}</h2>
                    <Form
                      {...layout}
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="标题"
                        name="title"
                      >
                        <Input defaultValue={this.state.form.title}/>
                      </Form.Item>

                      <Form.Item
                        label="图片"
                        name="resourcePath"
                      >
                        <Upload
                          name="小米"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        label="平台"
                        name="platform"
                      >
                        <Input defaultValue={this.state.form.platform}/>
                      </Form.Item>
                      <Form.Item
                        label="广告位置"
                        name="positionCode"
                      >
                        <Input defaultValue={this.state.form.positionCode}/>
                      </Form.Item>
                      <Form.Item
                        label="目标地址"
                        name="targetUrl"
                      >
                      <Input defaultValue={this.state.form.targetUrl}/>
                      </Form.Item>
                      <Form.Item
                        label="类型"
                        name="type"
                      >
                        <Input defaultValue={this.state.form.type}/>
                      </Form.Item>
                      <Form.Item
                        label="状态"
                        name="status"
                      >
                        <Input defaultValue={this.state.form.status}/>
                      </Form.Item>

                      <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        提交
                        </Button>
                        <Button type="primary" style={{'marginLeft':'20px'}} onClick={this.noShow.bind(this)}>
                        关闭
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                ):null
              }
            </>
         )
    }
}

export default Houses