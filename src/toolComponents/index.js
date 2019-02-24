import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import dwechat from 'utils/dwechat';

class PageWarp extends Component {
    componentDidMount () {
        dwechat.isUserLogin();
    }
    render () {
        return <div style={{ backgroundColor: '#f5f2f2', height: '100%' }}>{this.props.children || null}</div>
    }
}

export default withRouter(PageWarp)