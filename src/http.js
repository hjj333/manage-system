import Vue from 'vue'
import axios from 'axios'
import router from './router'

import {
    Message,
    Loading
} from 'element-ui';

axios.defaults.baseURL = `http://localhost:${process.env.VUE_APP_jsonserverport}`
//绑定到原型上
Vue.prototype.$axios = axios;

let loading; //定义loading变量
function startLoading() {   //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {  //使用Element loading-close 方法
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config => {
    // 加载
    startLoading()
    if (localStorage.eleToken) {
        //设置统一的请求头
        config.headers.Authorization = JSON.parse(localStorage.eleToken)
    }
    return config
}, error => {
    return Promise.reject(error)
})
//响应拦截
axios.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading()
    Message.error(error.response.data)
    const { status } = error.response
    if (status == 401) {
        Message.error('token值无效，请重新登录')
        // 清除token
        localStorage.removeItem('eleToken')
        // 页面跳转
        router.push('/login')
    }
    return Promise.reject(error)
})
export default axios;
