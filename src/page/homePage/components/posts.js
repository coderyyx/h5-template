import React, { Component } from 'react'
import {Carousel} from 'antd-mobile'

class Posts extends Component {
    state = {
        posts: [
            '最近绘画班成功展示',
            '绘画班有上新哦~'
        ]
    }
    renderCarousel() {
        return <Carousel className="my-carousel"
        vertical
        dots={false}
        dragging={false}
        swiping={false}
        autoplay
        infinite
        >
        {
            this.state.posts.map(titles => <div className="v-item" key={titles}>{titles}</div>)
        }
    </Carousel>
    }
    render () {
        return (
            <div className="post-container">
                <i className="iconfont icon-info-copy"></i>
                {this.renderCarousel()}
            </div>
        )
    }
}

export default Posts