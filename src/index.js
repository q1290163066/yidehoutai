import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './common/style/frame.styl'
import axios from './axios'
// import axios from 'axios'
import api from './api/index'

Component.prototype.$api=api;

Component.prototype.$axios=axios


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
