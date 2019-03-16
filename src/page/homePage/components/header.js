import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import ktop from 'utils/dtop';

class Header extends Component {
  state = {
    bannerList: null,
    imgHeight: 176,
  }
  async initData(){
    try {
      const resp = await ktop.promisefyRequest({
        api: 'eduHandler/bannerList',
        data: {},
      });
      if (resp.banners && resp.banners.length) {
        this.setState({bannerList: resp.banners})
      }
    } catch (error) {
      console.error(error);
    }
  }
  async componentDidMount() {
    this.initData();
  }
  render() {
    return (
    //   <WingBlank>
        <Carousel
          autoplay={true}
          infinite
        >
          {this.state.bannerList && this.state.bannerList.map((banner, index) => (
            <a
              key={index}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`${banner.uri}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    //   </WingBlank>
    );
  }
}

export default Header