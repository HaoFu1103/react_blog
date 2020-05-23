import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { Row, Col, List, Breadcrumb } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advertise from '../components/Advertise'
import Footer from '../components/Footer'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';


const MyList = (list) => {
  const [ mylist , setMylist ] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)
   })
  
   const renderer = new marked.Renderer();
   marked.setOptions({
     renderer: renderer,
     gfm: true,
     pedantic: false,
     sanitize: false,
     tables: true,
     breaks: false,
     smartLists: true,
     smartypants: false,
     sanitize:false,
     xhtml: false,
     highlight: function (code) {
             return hljs.highlightAuto(code).value;
     }
 
   }); 

  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
          <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                  <Breadcrumb.Item>Article List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            <List
              header={<div>Latest blog</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a className="list-title">{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.add_time}</span>
                    <span><FolderOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  ></div>  
                </List.Item>
              )}
            />    
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author/>
            <Advertise/>
        </Col>
      </Row>
      <Footer/>
    </>
  )
}

MyList.getInitialProps = async (context)=>{

  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=> {
        console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })
  return await promise
}
export default MyList
