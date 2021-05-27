import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HashRouter as Router } from 'react-router-dom'

import './index.css'
import 'antd-mobile/dist/antd-mobile.css'

// 引入字体图标
import './assets/fonts/iconfont.css'

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('root')
);
