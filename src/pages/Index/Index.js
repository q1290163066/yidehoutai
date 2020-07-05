import React, { Component } from 'react'

import { Route, Switch,Link,Redirect } from 'react-router-dom'
import Houses from '../Houses/Houses'
import Banner from '../Banner/Banner'
import AddUpdate from '../Houses/add-update'
import Detail from '../Houses/detail'

import './Index.styl'
import { Layout, Menu } from 'antd';
import {MenuUnfoldOutlined,MenuFoldOutlined,MailOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Sider, Content ,Footer } = Layout;

class Index extends Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout className="main">
                {/* 侧边栏 */}
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="楼盘管理">
                            <Menu.Item key="1">
                                <Link to="/index/houses">楼盘管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<MailOutlined />} title="banner图管理">
                            <Menu.Item key="2">
                                <Link to="/index/banner">banner图管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<MailOutlined />} title="注册/登录">
                            <Menu.Item key="3-1">注册</Menu.Item>
                            <Menu.Item key="3-2">登录</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<MailOutlined />} title="用户管理">
                            <Menu.Item key="4-1">基本信息</Menu.Item>
                            <Menu.Item key="4-2">我的好友</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" icon={<MailOutlined />} title="推荐管理">
                            <Menu.Item key="5-1">楼盘推荐</Menu.Item>
                            <Menu.Item key="5-2">我的客户</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" icon={<MailOutlined />} title="楼盘收藏/分享">
                            <Menu.Item key="6-1">楼盘收藏</Menu.Item>
                            <Menu.Item key="6-">楼盘分享</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/* 头部 */}
                    <Header className="site-layout-background header" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggleCollapsed,
                        })}
                    </Header>
                    {/* 容器 */}
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        }}
                    >
                        
                        <Switch>
                            <Route path="/index/houses" exact component={Houses} />
                            <Route path='/index/houses/detail' exact component={Detail} />
                            <Route path='/index/houses/addUpdate' exact component={AddUpdate} />
                            <Route path="/index/banner" exact component={Banner} />
                            <Redirect to={"/index/houses"} />
                        </Switch>
                    </Content>
                    {/* 底部 */}
                    <Footer>底部</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Index
