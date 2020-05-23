import Head from 'next/head'
import React from 'react'
import { Row, Col, Breadcrumb, Affix, BackTop } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advertise from '../components/Advertise'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'

const Detailed = (props) => {

  const tocify = new Tocify()
  
  const renderer = new marked.Renderer();

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
      renderer: renderer, 
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
              return hljs.highlightAuto(code).value;
      }
    }); 

    let html = marked(props.article_content) 

  return (
    <>
      <BackTop visibilityHeight={200}/>
      <Head>
        <title>detailed</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                  {props.title}
                </div>

                <div className="list-icon center">
                    <span><CalendarOutlined />{props.add_time}</span>
                    <span><FolderOutlined />{props.typeName}</span>
                    <span><FireOutlined />{props.view_count}</span>
                </div>

                <div className="detailed-content"
                  dangerouslySetInnerHTML = {{__html:html}}
                >
                  {/* <ReactMarkdown 
                    source={markdown} 
                    escapeHtml={false}  
                   /> */}
              {/* dangerouslySetInnerHTML = {{__html:html}} */}
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advertise/>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">Article list</div>
              {/* <MarkNav
                className="article-menu"
                source={html}
                ordered={false}
              /> */}
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </>
  )
}

Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById+id).then(
      (res)=>{
        // console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
  

export default Detailed
