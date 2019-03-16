import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import ToolBar from './toolBar';
import './index.less';

class Index extends Component {
    static propTypes = {
        location: PropTypes.object,
    }
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
    componentDidMount() {
        const history__args = this.props.location.state;
        console.log(history__args)

    }
    render () {
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