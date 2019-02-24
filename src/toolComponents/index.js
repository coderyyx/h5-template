import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import dwechat from 'utils/dwechat';

class PageWarp extends Component {
    componentDidMount () {
        dwechat.isUserLogin().then(result => {
            console.log(result);
        }).catch(error => {
            console.log(result);
        })
    }
    render () {
        console.log('pageWarp render====>')
        return <div style={{ backgroundColor: '#f5f2f2', height: '100%' }}>{this.props.children || null}</div>
    }
}

export default withRouter(PageWarp)