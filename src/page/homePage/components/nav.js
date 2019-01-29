import React, { Component } from 'react'

class Nav extends Component {
    state = {
        navList: [
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548492429179&di=60889b1847abd57ebea69bedd2b372d9&imgtype=0&src=http%3A%2F%2Fimg.tom61.com%2Fphoto%2F20166642%2F20162089%2F20161329%2F20161326.jpg',
                title: '素描'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549087441&di=007733c94b211fa95ba69b460d9f8a12&imgtype=jpg&er=1&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140625%2F0006019031660793_b.jpg',
                title: '版画'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549087468&di=37e502ab9393fa2a931d8c509897efa5&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F02%2F70%2Fbb57089e5f5b50ea2bc20692d1144203.jpg',
                title: '水彩'
            },
            {
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548492769578&di=991a259ac7f5f6d05f7c43cb8831101e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fcf1b9d16fdfaaf517ef14c92875494eef01f7a89.jpg',
                title: '水墨'
            }
        ]
    }
    renderNavList() {
        return this.state.navList && this.state.navList.map(({url, title}) => {
            return <a className="grid-item" key={title}>
                <div className="grid-db">
                    <img src={url}/>
                </div>
                <div className="grid-hd">{title}</div>
            </a>
        })
    }
    render () {
        return (
            <div className="grid_wrap bor_no">
                {
                    this.renderNavList()
                }
            </div>
        )
    }
}

export default Nav