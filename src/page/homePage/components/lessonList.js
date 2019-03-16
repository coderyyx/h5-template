import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LessonList extends Component {
    static propTypes = {
        history: PropTypes.object,
    }
    state = {
        LessonList: [
            {
                _url: 'https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg',
                title: '启蒙素描-动物篇',
                subtitle: '副标题',
                price: 170,
                numbers: 239,
                id: 11122
            },
            {
                _url: 'https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg',
                title: '启蒙水彩-人物篇1',
                subtitle: '副标题',
                price: 190,
                numbers: 213,
            },
            {
                _url: 'https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg',
                title: '启蒙水彩-人物篇2',
                subtitle: '副标题',
                price: 190,
                numbers: 213,
            },
            {
                _url: 'https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg',
                title: '启蒙版画-人物篇',
                subtitle: '副标题',
                price: 214,
                numbers: 342,
            },
            {
                _url: 'https://img.yaristyle.com/images/92/2019/01/LZ99Ra7Rp00rzpc0piZyByQiz9VPwE.jpg',
                title: '启蒙水彩-动物篇4',
                subtitle: '副标题',
                price: 212,
                numbers: 432,
            }
        ]
    }
    lessonClick = (id) => {
        this.props.history.push('/lessonDetails', {id});
    }
    renderLesson() {
        return this.state.LessonList && this.state.LessonList.map(({_url, title, subtitle, price, numbers, id}) => {
            return <li className="lesson_list" key={title} onClick = {() => this.lessonClick(id)}>
                <a className="package">
                    <div className="package__cover-wrap">
                        <div className="package__cover" style={{backgroundImage:`url(${_url})`}}>
                            <span className="package__cover-tips package__cover-tips--status">{`${numbers}人已学习`}</span>
                        </div>
                    </div>
                    <div className="package__content">
                        <h3 className="package__name">{title}</h3>
                        <div className="package__info">
                            <span className="pink-color subhead">{subtitle}</span>
                        </div>
                        <div className="package__info">
                            <span className="grey-color">{`￥${price}`}</span>
                        </div>
                    </div>
                </a>
            </li>
        })
    }
    render () {
        return (
            <div className="course-warp">
                <h2 className="course-hd"><span></span>最近更新</h2>
                <ul className="newlesson-list">
                    {this.renderLesson()}
                </ul>
            </div>
        )
    }
}

export default LessonList