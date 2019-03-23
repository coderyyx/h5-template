import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';

export default class ProductTypes extends Component {
    state = {
        tabs: [
            { title: '1 Tab' },
            { title: '2 Tab' },
            { title: '3 Tab' },
            { title: '4 Tab' },
            { title: '5 Tab' },
            { title: '6 Tab' },
          ]
    }
    componentDidMount() {
        
    }
    render() {
        console.log(this.props)
        return (
            <div style={{ height: '100%' }}>
              <Tabs tabs={this.state.tabs}
                initalPage={'t2'}
                tabBarPosition="left"
                tabDirection="vertical"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  Content of first tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  Content of second tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  Content of third tab
                </div>
              </Tabs>
            </div>
          );
    }
}