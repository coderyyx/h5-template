import React, { Component } from 'react'

export default class PageWarp extends Component {
    render () {
        return <div style={{ backgroundColor: '#f5f2f2', height: '100%' }}>{this.props.children || null}</div>
    }
}