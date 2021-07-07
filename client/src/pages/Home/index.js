import { Component } from 'react'
import React from 'react'
import $axios from '../../utils/axios'
import url from '../../utils/url'
import './index.scss'

import Skinchange from './component/skinChange/index'

export default class Home extends Component {
    state = {
        docked: false,
        skinDrawer: false,
        acatar: ''
    }
    onDock = () => {
        this.setState({
            docked: !this.state.docked,
        });
    }

    handleSkinChange() {
        this.skinchange.current.showModal('skinModal')()
    }

    handleSkip = (path) => {

        if (path === '/skin') {
            this.handleSkinChange();
        } else {
            this.props.history.push(path)
        }
    }

    FileChange = async (e) => {
        let file = e.target.files[0];

        let data = new FormData()
        data.append('file', file)

        const res = await $axios.post('/uploadAcatar', data)
        this.setState({
            acatar: res.data.acatar
        })
    }

    constructor(props) {
        super(props);
        this.skinchange = React.createRef();
    }

    async componentDidMount() {
        const res = await $axios.post('/getUserInfo')
        if (res.data.status !== 200) return
        

        window.localStorage.setItem('theme', res.data.data.theme);
        const theme = res.data.data.theme;
        if (!theme) {
            window.document.documentElement.setAttribute('data-theme', 'color1');
        } else {
            window.document.documentElement.setAttribute('data-theme', theme);
        }


        this.setState({
            acatar: res.data.data.acatar
        })
    }

    render() {
        const menuList = [{
            icon: 'icon-RectangleCopy',
            text: '今日事，今日毕',
            path: '/calendar'
        }, {
            icon: 'icon-chifan',
            text: '今天吃什么',
            path: '/eat'
        }, {
            icon: 'icon-qianbi',
            text: '备忘录',
            path: '/memo'
        },
        {
            icon: 'icon-bill',
            text: '记账本',
            path: '/accounts'
        }, {
            icon: 'icon-pifu',
            text: '皮肤',
            path: '/skin'
        },
        {
            icon: 'icon-shezhi1',
            text: '设置',
            path: '/settings'
        }]

        return (<div className="home-wrapper" style={{ height: '100%' }}>
            <div className="tx-box">
                <img src={url +'/'+ this.state.acatar} className="tx-img" alt='加载失败' />
                <input type="file" className="input-file" accept="image/jpeg,image/x-png,image/gif" onChange={(e) => { this.FileChange(e) }} />
            </div>
            <div className="home-menu-wrapper" style={{ paddingBottom: '.875rem' }}>
                {menuList.map((item, index) => {
                    return (
                        <div className={'menu-item ' + (!((index + 1) % 3) ? '' : 'menu-item-border')} key={item.path} onClick={this.handleSkip.bind(this, item.path)}>
                            <i className={'iconfont ' + item.icon}>
                                {item.path === '/calendar' ? <span>{new Date().getDate()}</span> : ''}
                            </i>
                            <span>{item.text}</span>
                        </div>
                    )
                })}

            </div>
            <Skinchange ref={this.skinchange}></Skinchange>
        </div>);
    }
}