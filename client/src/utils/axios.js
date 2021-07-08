import axios from 'axios'
import { Toast } from 'antd-mobile'
import BASE_URL from './url'
import { createHashHistory } from 'history'

const history = createHashHistory()

const $axios = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // 表示请求的毫秒数，超过该时间，将停止发送请求
})

$axios.interceptors.response.use((config) => {
    if (config.data.status === 401) {
        Toast.offline('请先进行登录',2)
        history.push('/login')
    }
    return config
})

$axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
    return config
})

export default $axios