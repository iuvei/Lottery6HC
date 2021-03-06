import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
// axios
import axios from 'axios'

Vue.prototype.$axios = axios;     // Vue2.0+官方推荐

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.prototype.$NProgress = NProgress;

import routes from './routes'


//jQuery
// import $ from 'jquery';


// 工具函数
import { setLocalStorage, getLocalStorage } from './common/js/util.js';

// api 地址
import api_port from './api/api_address';

Vue.use(api_port)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
	// mode: 'history',       //  http://localhost:8065/lottery/6HC/1301  history 需要后台配置支持, 不需要 history 路由直接注释即可。http://localhost:8065/#/lottery/6HC/1301
	routes
})


router.beforeEach((to, from, next) => {
	Vue.prototype.$NProgress.start();
	next();
})


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

