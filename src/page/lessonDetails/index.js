import React, { Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import ToolBar from './toolBar';
import './index.less';

class Index extends Component {
    tabs = [
        { title: <Badge>详情</Badge> },
        { title: <Badge dot>评价</Badge> },
    ];
    renderDetails() {
        return <div>详情</div>
    }
    renderComments() {
        return <div>评价</div>
    }
    render () {
        console.log(this.props)
        return (
            <div className="lessonDetails__warp">
                <section className="lesson_img">
                    <img src="https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg"/>
                </section>
                <Tabs tabs={this.tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div> */}
                    {
                        this.renderDetails()
                    }
                    {
                        this.renderComments()
                    }
                </Tabs>
                <WhiteSpace/>
                <ToolBar/>
            </div>
        )
    }
}

export default Index