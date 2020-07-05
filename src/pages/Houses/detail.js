import React, { Component } from 'react'
import{Card,Form,Input,Upload, message,Space,Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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

// 详情
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

export default class Detail extends Component{
  constructor(){
    super()
    this.state={
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
  componentWillMount(){
    this.$axios({
      url:this.$api.banner.get_one+"1275378457898909696"
     }).then(res=>{
       console.log(res.data.data)
       this.setState({
         form:res.data.data
       })
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
  render(){
    const title=(
      <span>
        商品详情
      </span>
    )
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    const imageUrl  = this.state.form.resourcePath;

    return(
      <Card title={title}>
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
            <Button type="primary" style={{'marginLeft':'20px'}}>
            返回
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}