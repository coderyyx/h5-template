import React, { Component } from 'react';
import ktop from 'utils/dtop';

class Nav extends Component {
    state = {
        navList: [
        ]
    }
    navigator = () => {
        this.props.history.push('/productTypes', {list: this.state.navList});
    }
    async initData(){
        try {
            const resp = await ktop.promisefyRequest({
            api: 'eduHandler/navList',
            data: {},
            });
            if (resp.navigators && resp.navigators.length) {
                this.setState({navList: resp.navigators})
            }
        } catch (error) {
            console.error(error);
        }
    }
    async componentDidMount() {
        this.initData();
    }
    renderNavList() {
        return this.state.navList && this.state.navList.map(({uri, name}) => {
            return <a className="grid-item" key={uri} onClick={() => this.navigator()}>
                <div className="grid-db">
                    <img src={uri}/>
                </div>
                <div className="grid-hd">{name}</div>
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