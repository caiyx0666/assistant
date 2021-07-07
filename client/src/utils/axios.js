import axios from 'axios'
import { Toast } from 'antd-mobile'

const $axios = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000, // 表示请求的毫秒数，超过该时间，将停止发送请求
    headers: {
        Authorization: 'Bearer '+window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
    }
})

$axios.interceptors.response.use((config) => {
    if (config.data.status === 401) {
        Toast.offline('您没有权限登录',2)
        window.location.href = '/#/login'
    }
    return config
})

export default $axios