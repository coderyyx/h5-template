import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import 'utils/jssdk';
import './theme/theme.less';

// Loading hasn't finished yet
function loadedHandler() {
  console.log('loadedHandler======>')
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadedHandler);
} else {
  loadedHandler();
}


ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}