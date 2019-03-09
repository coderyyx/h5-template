import React, { Component, Fragment } from 'react';
import { List } from 'antd-mobile';
import './index.less';
const Item = List.Item;

class Index extends Component {
    renderUserInfo() {
        return <div className="userInfo">
            <div className="userAvatar" style={{backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png')"}}></div>
            <div className="usernick_name">rua1</div>
        </div>
    }
    render() {
        return (
            <Fragment>
                {
                    this.renderUserInfo()
                }
                <List>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {}}
                    >收藏课程</Item>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {}}
                    arrow="horizontal"
                    >
                    收藏讲师
                    </Item>
                </List>
            </Fragment>
        );
    }
}

export default Index;