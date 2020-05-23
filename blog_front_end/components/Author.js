import { Avatar, Divider, Tooltip } from 'antd'
import { GithubFilled, LinkedinFilled, WechatFilled, TagOutlined  } from '@ant-design/icons'
import '../public/style/components/author.css'

const Author =() => {

    const github = <span>https://github.com/HaoFu1103</span>;
    const linkedin = <span>https://www.linkedin.com/in/haofu1017/</span>;
    const wechat = <span>wechat:FFF1017</span>;
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="https://media-exp1.licdn.com/dms/image/C5603AQGODnuq3xvQYQ/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=Yes3AyDwuXPsLVBqOw249-AvEpUIU8kk-JAmAv7l4c4"/></div>
            <div className="author-introduction">
                <div className="author-name">
                    Hao Fu
                </div>
                <div className="author-tag-1">
                    <TagOutlined /> optimist
                </div>
                <div className="author-tag-2">
                    <TagOutlined /> self-disciplined
                </div>
                focus on front end and full stack developing. 
            <Divider>Social Media</Divider>
            <Avatar size={26} className="account">
                <Tooltip placement="top" title={github}>
                    <GithubFilled />
                </Tooltip>
            </Avatar>
            <Avatar size={26} className="account">
                <Tooltip placement="top" title={linkedin}>
                    <LinkedinFilled />
                </Tooltip>
            </Avatar>
            <Avatar size={26} className="account">
            <Tooltip placement="top" title={wechat}>
                <WechatFilled />
            </Tooltip>
            </Avatar>
            </div>
        </div>
    )
}

export default Author