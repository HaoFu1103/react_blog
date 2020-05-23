import React,{ useState,useEffect } from 'react';
import '../static/css/ArticleList.css'
import { List, Row, Col ,Modal ,message, Button,Switch } from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;

function ArticleList(props){

    const [list,setList]=useState([])

    const getArticleList = ()=>{
        axios({
                method:'get',
                url: servicePath.getArticleList,
                withCredentials: true
            }).then(
                res=>{
                    setList(res.data.list)  
                }
            )
    }
    
    useEffect(()=>{
        getArticleList()
    },[])


    const delArticle = (id)=>{
        confirm({
            title: 'You want to delete this article?',
            content: 'If you click ok, your article will be deleted.',
            onOk() {
                axios(servicePath.delArticle+id,{ withCredentials: true}).then(
                    res=>{ 
                        message.success('article deleted success')
                        getArticleList()
                        }
                    )
            },
            onCancel() {
                message.success('article is not deleted')
            },
         });
    
    }

    const updateArticle = (id,checked)=>{

        props.history.push('/index/add/'+id)
    
    }

    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>Title</b>
                        </Col>
                        <Col span={4}>
                            <b>Type</b>
                        </Col>
                        <Col span={4}>
                            <b>Publish time</b>
                        </Col>
                        <Col span={4}>
                            <b>View Count</b>
                        </Col>

                        <Col span={4}>
                            <b>Operation</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.add_time}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={()=>{updateArticle(item.id)}}>edit</Button>&nbsp;
                              <Button onClick={()=>{delArticle(item.id)}}>delete</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )

}

export default ArticleList