import '../public/style/components/header.css'
import {Row,Col, Menu} from 'antd'
import { HomeOutlined, BookOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons'
import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const Header = () => {
    const [navArray , setNavArray] = useState([])
    useEffect(()=>{

        const fetchData = async ()=>{
           const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                    return res.data.data
                }
              )
           setNavArray(result)
        }
        fetchData()

    },[])

    //跳转到列表页
  const handleClick = (e)=>{
    if (e.key == 0) {
        Router.push('/index')
    } else if (e.key == 1) {
        Router.push('/list?id=' + e.key)
    }else if (e.key == 2) {
        Router.push('/list?id=' + e.key)
    } else if (e.key == 3) {
        Router.push('/list?id=' + e.key)
    }
}
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Haodventure</span>
                    <span className="header-txt">dream just starts</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu  mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined/>
                                Home
                        </Menu.Item>
                        <Menu.Item key="1">
                            <YoutubeOutlined />
                                Video
                        </Menu.Item>
                        <Menu.Item key="2">
                            <BookOutlined/>
                                Article
                        </Menu.Item>
                        <Menu.Item key="3">
                            <SmileOutlined/>
                                Life
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
  

export default Header