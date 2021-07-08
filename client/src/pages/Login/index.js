import { Component } from "react";
import { InputItem, Button,Toast } from 'antd-mobile'
import $axios from "../../utils/axios";
import logo from '../../assets/image/logo.png'
import './index.scss'


export default class Login extends Component {
    state = {
        userName: '',
        password: ''
    }

    handleLogin = async () => {
        const res = await $axios.post('/login', {
            userName: this.state.userName,
            password: this.state.password
        })
        if (res.data.status === 200) {
            Toast.success(res.data.desc, 2)
            window.localStorage.setItem('token', res.data.token)
            this.props.history.push('/')
        } else {
            Toast.fail(res.data.desc,2) 
            return;
        }
    }

    render() {
        return (<div className="login-wrapper">
            <img src={logo} className="logo-img" alt="加载失败" />

            <div className="login-form-wrapper">
                <InputItem
                    clear
                    placeholder="请输入用户名"
                    value={this.state.userName}
                    onChange={(val) => { this.setState({ userName: val }) }}
                    style={{ fontSize: '.3125rem'}}
                >用户名</InputItem>

                <InputItem
                    clear
                    placeholder="请输入密码"
                    type="password"
                    value={this.state.password}
                    onChange={(val) => { this.setState({ password: val }) }}
                    style={{ fontSize: '.3125rem' }}
                >密码</InputItem>

                <Button type="primary" className="login-btn" onClick={this.handleLogin}>登录</Button>
            </div>
        </div>)
    }
}