import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const {Option} = Select
const {TextArea} = Input

function AddArticle(props) {

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('waiting to edit') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('select type') //选择的文章类别

    useEffect(()=>{
        getTypeInfo()
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        } 
    },[])

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }
 
    const changeIntroduce = (e)=>{
         setIntroducemd(e.target.value)
         let html=marked(e.target.value)
         setIntroducehtml(html)
     }

     const getTypeInfo = ()=>{
         axios({
             method: 'get',
             url: servicePath.getTypeInfo,
             withCredentials: true //跨域检验cookie
         }).then(
             res=>{
                if(res.data.data == 'no login') {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                } else {
                    setTypeInfo(res.data.data)
                }
             }
         )
     }

    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }

    const saveArticle = ()=>{
        if(!selectedType){
            message.error('blank article type')
            return false
        }else if(!articleTitle){
            message.error('blank article title')
            return false
        }else if(!articleContent){
            message.error('blank article content')
            return false
        }else if(!introducemd){
            message.error('blank article intro')
            return false
        }else if(!showDate){
            message.error('blank article publish date')
            return false
        }
        
        let dataProps={}   //传递到接口的参数
        dataProps.type_id = selectedType 
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce =introducemd
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        dataProps.add_Time =(new Date(datetext).getTime())/1000

        if(articleId==0){
            console.log('articleId=:'+articleId)
            //dataProps.view_count =Math.ceil(Math.random()*100)+1000 // random value
            dataProps.view_count = 0;
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('article saved')
                    }else{
                        message.error('article saved failed');
                    }
    
                }
            )
        }else{

            dataProps.id = articleId 
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
        
                    if(res.data.isScuccess){
                        message.success('article updated')
                    }else{
                        message.error('article updated failed');
                    }
                }
            )
        }

    }

    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{ 
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                //let articleInfo= res.data.data[0]
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html=marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].add_time)
                setSelectType(res.data.data[0].typeId)
    
            }
        )
    }

    
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                onChange={e=>{
                                    setArticleTitle(e.target.value)
                                }}
                                placeholder="blog title"
                                size="large"
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler} value={selectedType}>
                                {
                                    typeInfo.map((item, index)=>{
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={30}
                                value={articleContent}
                                placeholder="article content"
                                onChange={changeContent} 
                                onPressEnter={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}} >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">draft article</Button>
                            &nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>publish article</Button>
                            <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="article intro"
                                value={introducemd}
                                onChange={changeIntroduce} 
                                onPressEnter={changeIntroduce}
                            />
                            <br/><br/>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML = {{__html:introducehtml}} >
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=>setShowDate(dateString)}
                                    placeholder="publish date"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle