import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import dwechat from 'utils/dwechat';
import {Toast} from 'utils/tools';

class PageWarp extends Component {
    static propTypes = {
        children: PropTypes.any,
        location: PropTypes.object,
        history: PropTypes.object,
    }
    componentDidMount () {
        // dwechat.isUserLogin().then(weixin_json => {
        //     this.props.history.push('/');
        //     Toast.info(`${weixin_json.nickname} 登录成功~`)
        // }).catch(({step}) => {
        //     console.log(step);
        //     // 需要注册
        //     if (step === 0) {
        //         this.props.history.push('/register');
        //     }
        // })
    }
    render () {
        console.log('pageWarp render====>')
        return <div style={{ backgroundColor: '#f5f2f2', height: '100%' }}>{this.props.children || null}</div>
    }
}

export default withRouter(PageWarp)