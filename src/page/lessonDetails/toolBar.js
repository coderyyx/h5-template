import React, { Component } from 'react';
import { Drawer } from 'antd-mobile';
class ToolBar extends Component {
    state = {
        showTicket: false,
        price: 70,
        typesList: [
            {
                label: '有效期7天',
                value: '7d',
                price: 70
            },
            {
                label: '有效期15天',
                value: '15d',
                price: 700
            }
        ],
        types: ''
    }
    showTicketPanel = () => {
        console.log('click===============>')
        this.setState({showTicket: !this.state.showTicket})
    }
    chooseTypes = ({value, price}) => {
        this.setState({types: value, price})
    }
    renderTicket() {
        const {price, typesList, types} = this.state;
        return <section className={`ticket__details ${this.state.showTicket ? 'ticket__show': ''}`}>
            <img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"/>
            <div className="close" onClick={this.showTicketPanel}>×</div>
            <div className="price">
                <span>价格</span>
                <span>{`${price}￥`}</span>
            </div>
            <div className="types">
                <span>规格</span>
                <span>
                {
                    typesList && typesList.map((element, index) => {
                        return <button size="small" key={index} className={types === element.value ? 'activeTypes__button' : ''} onClick={() => this.chooseTypes(element)}>{element.label}</button>
                    })
                }
                </span>
            </div>
            <div className="buy">立即购买</div>
        </section>
    }
    render() {
        let {showTicket} = this.state;
        return (
            <React.Fragment>
                <div className="toolBar">
                    <div className="save">收藏</div>
                    <div className="bug" onClick={this.showTicketPanel}>立即购买</div>
                </div>
                <Drawer
                    className="my-drawer"
                    position="bottom"
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={this.renderTicket()}
                    open={showTicket}
                >
                </Drawer>
            </React.Fragment>
        );
    }
}

export default ToolBar;