import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';

class BasicInputExample extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    history: PropTypes.object,
  }
  state = {
    isRegisterting: false,
  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  register = () => {
    this.setState({isRegisterting: true});
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      if (!error) {
        Toast.show('注册成功~')
        setTimeout(() => {
          this.props.history.push('/');
        }, 1000)
      }
      // this.setState({isRegisterting: false});
      
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List renderHeader={() => '用户注册'}>
          <InputItem
            {...getFieldProps('username', {
              rules: [{required: true}],
              })
            }
            placeholder="请输入用户名"
          >用户名：</InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [{required: true}],
              })}
            type="password"
            placeholder="请输入密码"
          >密码：</InputItem>
          
          <InputItem
            {...getFieldProps('password_again')}
            type="password"
            placeholder="请确认输入密码"
          >确认密码：</InputItem>
        </List>
        <Button type="primary" onClick={this.register} loading= {this.state.isRegisterting}>注册</Button>
      </div>
    );
  }
}

export default createForm()(BasicInputExample);
