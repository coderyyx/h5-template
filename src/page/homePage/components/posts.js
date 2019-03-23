import React, { Component } from 'react'
import {Carousel} from 'antd-mobile';
import ktop from 'utils/dtop';

class Posts extends Component {
    state = {
        noticeList: [{title: 1},{title: 2}]
    }
    async initData(){
      try {
        const resp = await ktop.promisefyRequest({
          api: 'eduHandler/noticeList',
          data: {},
        });
        if (resp.notices && resp.notices.length) {
          this.setState({noticeList: resp.notices})
        }
      } catch (error) {
        console.error(error);
      }
    }
    async componentDidMount() {
      this.initData();
    }
    renderCarousel() {
        return this.state.noticeList && this.state.noticeList.map(notice => <div className="v-item" key={notice.title}>{notice.title}</div>)
    }
    render () {
        return (
            <div className="post-container">
                <i className="iconfont icon-info-copy"></i>
                <Carousel className="my-carousel"
                    vertical
                    dots={false}
                    dragging={false}
                    swiping={false}
                    autoplay
                    infinite
                    >
                    {this.renderCarousel()}
                    </Carousel>
            </div>
        )
    }
}

export default Posts