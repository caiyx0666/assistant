import { Component } from 'react'
import React from 'react'
import $axios from '../../utils/axios'
import Pic from '../../assets/image/tx2.png'
import './index.scss'

import Skinchange from './component/skinChange/index'

export default class Home extends Component {
    state = {
        docked: false,
        skinDrawer: false
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
        console.log(file)

        let data = new FormData()
        data.append('file', file)

        const res = await $axios.post('/uploadAcatar', data)
        console.log(res)
    }

    constructor(props) {
        super(props);
        this.skinchange = React.createRef();
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
                <img src={Pic} className="tx-img" alt='加载失败' />
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