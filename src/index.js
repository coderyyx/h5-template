import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import 'utils/jssdk';
import './theme/theme.less';
ReactDOM.render(
  <Routes/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}