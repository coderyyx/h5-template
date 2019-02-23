import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class PageWarp extends Component {
    render () {
        return <div style={{ backgroundColor: '#f5f2f2', height: '100%' }}>{this.props.children || null}</div>
    }
}

export default withRouter(PageWarp)