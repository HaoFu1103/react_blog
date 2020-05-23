import React, { useState }from 'react'
import 'antd/dist/antd.css';
import { Card, Input,Button ,Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../static/css/login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'


function Login(props) {
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)

        if(!userName){
            message.error('blank username')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('blank password')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials: true
        }).then(
           res=>{
                setIsLoading(false)
                if(res.data.data=='log in successful'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }else{
                    message.error('wrong username or password')
                }
           }
        )

    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Haodventure Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login