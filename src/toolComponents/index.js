import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import dwechat from 'utils/dwechat';
import {toast} from 'utils/tools';

class PageWarp extends Component {
    componentDidMount () {
        dwechat.isUserLogin().then(weixin_json => {
            console.log(`${weixin_json.nickname} 登录成功~`)
            console.log(toast)
            toast(`${weixin_json.nickname} 登录成功~`)
            this.props.history.push('/');
        }).catch(({step}) => {
            console.log(step);
            // 需要注册
            if (step === 0) {
                this.props.history.push('/register');
            }
        })
    }
    render () {
        console.log('pageWarp render====>')
        return <div style={{ backgroundColor: '#f5f2f2', height: '100%' }}>{this.props.children || null}</div>
    }
}

export default withRouter(PageWarp)