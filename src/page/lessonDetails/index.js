import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, WhiteSpace, Badge, Toast, Card } from 'antd-mobile';
import ToolBar from './toolBar';
import ktop from 'utils/dtop';
import VideoPlay from './video';
// import videojs from 'video.js';
import './index.less';

class Index extends Component {
    static propTypes = {
        location: PropTypes.object,
    }
    state = {
        tabs: [
            { title: <Badge>详情</Badge> },
            { title: <Badge dot>评价(0)</Badge> },
        ],
        lessonDetails: null,

    }
    async initData(id){
        try {
            const resp = await ktop.promisefyRequest({
            api: 'eduHandler/itemDetail',
            data: {"itemId": id},
            });
            resp && this.setState({lessonDetails: resp});
            console.log('resp===========>', resp)
        } catch (error) {
            console.log('error', error)
            Toast.info(error);
        }
    }
    async componentDidMount() {
        const {id} = this.props.location.state;
        console.log('---->', this.props.location.state)
        this.initData(id);
    }
    videoControl() {
        var options = {};
 
        // var player = videojs('my-player', options, function onPlayerReady() {
        //     videojs.log('Your player is ready!');
            
        //     // In this context, `this` is the player that was created by Video.js.
        //     this.play();
            
        //     // How about an event listener?
        //     this.on('ended', function() {
        //         videojs.log('Awww...over so soon?!');
        //     });
        // });
    }
    renderDetails({title, name}) {
        return <Fragment>
            <Card>
        <Card.Header
          title="课程信息"
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        />
        <Card.Body>
          <div>课程名称：{`${title} - ${name}`}</div>
          <VideoPlay/>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header
          title="课程介绍"
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        />
        <Card.Body>
          <div>课程介绍：---------------</div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header
          title="讲师介绍"
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        />
        <Card.Body>
          <div>讲师介绍：---------------</div>
        </Card.Body>
      </Card>
      </Fragment>
    }
    renderComments() {
        return <div>评价(0)</div>
    }
    render () {
        const {lessonDetails} = this.state;
        return (
            <div className="lessonDetails__warp">
                <section className="lesson_img">
                    <img src="https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg"/>
                </section>
                <Tabs tabs={this.state.tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    {
                        this.renderDetails(lessonDetails || {})
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