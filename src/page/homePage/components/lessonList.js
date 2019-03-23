import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ktop from 'utils/dtop';
import {Toast} from 'antd-mobile';
import LessonCard from './lessonCard';

class LessonList extends Component {
    static propTypes = {
        history: PropTypes.object,
    }
    state = {
        LessonList: [
        ]
    }
    lessonClick = (id) => {
        this.props.history.push('/lessonDetails', {id});
    }
    async initData(){
        try {
            const resp = await ktop.promisefyRequest({
            api: 'eduHandler/lastedUpdatePalpList',
            data: {},
            });
            if (resp.palps && resp.palps.length) {
                this.setState({LessonList: resp.palps})
            }
        } catch (error) {
            Toast.info(error);
        }
    }
    async componentDidMount() {
        this.initData();
    }
    renderLesson() {
        return this.state.LessonList && this.state.LessonList.map((lesson) => {
            return <LessonCard lesson={lesson} navigator={this.lessonClick.bind(this, lesson.detailId)}/>
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