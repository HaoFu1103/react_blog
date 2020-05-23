import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e=>{
    console.log(e.item.props)
    if(e.key=='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }

  }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Workbench
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Add article
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Article Manage" onClick={handleClickArticle}>
              <Menu.Item key="addArticle">add article</Menu.Item>
              <Menu.Item key="articleList">article list</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
                Comment Manage
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Backend Management</Breadcrumb.Item>
              <Breadcrumb.Item>Workbench</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                  <Route path="/index/" exact component={AddArticle} />
                  <Route path="/index/add/" exact component={AddArticle} />
                  <Route path="/index/add/:id" exact component={AddArticle} />
                  <Route path="/index/list" component={ArticleList} />
                  <Route path="/index/add/:id" exact component={AddArticle} />

              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>wsfuzeren.com</Footer>
        </Layout>
      </Layout>
    );
}

export default AdminIndex