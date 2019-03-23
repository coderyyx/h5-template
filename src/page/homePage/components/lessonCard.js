import React from 'react';
const noop = () => {}
/**
 * 
 * @param {*} param0
 * 课程卡片组件 
 */
export default function LessonCard({lesson, navigator}) {
    console.log(lesson)
    const {bargainNum, thumbnail, title, name, id, price} = lesson;
    return <li className="lesson_list" key={id} onClick = {navigator || noop}>
    <a className="package">
        <div className="package__cover-wrap">
            <div className="package__cover" style={{backgroundImage:`url(${thumbnail})`}}>
                <span className="package__cover-tips package__cover-tips--status">{`${bargainNum}人已学习`}</span>
            </div>
        </div>
        <div className="package__content">
            <h3 className="package__name">{title}</h3>
            <div className="package__info">
                <span className="pink-color subhead">{name}</span>
            </div>
            <div className="package__info">
                <span className="grey-color">{`￥${price}`}</span>
            </div>
        </div>
    </a>
</li>
}