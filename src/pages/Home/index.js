import { Component } from 'react'
import { Drawer, List, NavBar } from 'antd-mobile';
import Pic from '../../assets/image/tx2.png'
import './index.scss'

export default class Home extends Component {
    state = {
        docked: false,
    }
    onDock = () => {
        this.setState({
            docked: !this.state.docked,
        });
    }

    handleSkip = (path) => {
        this.setState({
            docked: !this.state.docked,
        });
        this.props.history.push(path)
    }

    render() {
        const menuList = [{
            icon: 'icon-rili',
            text: '日历',
            path: '/calendar'
        }, {
            icon: 'icon-chifan',
            text: '今天吃什么',
            path: '/eat'
        }, {
            icon: 'icon-qianbi',
            text: '备忘录',
            path: '/memo'
        }, {
            icon: 'icon-paoyingbi',
            text: '抛硬币',
            path: '/throw'
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

        const sidebar = (<List>
            <List.Item
                key={0}
                style={{ backgroundColor: '#161d20', height: '60px' }}
            >
                <span style={{ color: '#81898c', fontSize: '14px', fontWeight: '600' }}>
                    我的个人助手系统
                </span>
            </List.Item>
            <List.Item key={1}
                thumb={(<i className='iconfont icon-shouye' style={{ fontSize: '16px' }}></i>)}
                style={{ backgroundColor: '#161d20', color: '#fff' }}
                activeStyle={{ backgroundColor: "#232e32" }}
                onClick={this.handleSkip.bind(this, '/home')}
            >首页</List.Item>
            {(menuList.map((item, index) => {
                return (

                    <List.Item key={index + 2}
                        thumb={(<i className={'iconfont ' + item.icon} style={{ fontSize: '16px' }}></i>)}
                        style={{ backgroundColor: '#161d20', color: '#fff' }}
                        activeStyle={{ backgroundColor: "#232e32" }}
                        onClick={this.handleSkip.bind(this, item.path)}
                    >{item.text}</List.Item>
                )
            }))
            }
        </List>);

        return (<div style={{ height: '100%' }}>
            <div className="nav-bar">
                <i className="iconfont icon-streamlist-copy-copy" onClick={this.onDock}></i>
                Home
            </div>
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight, }}
                contentStyle={{ color: '#009999', textAlign: 'center', paddingTop: 42 }}
                sidebar={sidebar}
                open={this.state.docked}
                onOpenChange={this.onDock}
            >
                <div className="tx-box">
                    <img src={Pic} className="tx-img" alt='加载失败' />
                </div>
                <div className="home-menu-wrapper" style={{ paddingBottom: '30px' }}>
                    {menuList.map((item, index) => {
                        return (
                            <div className={'menu-item ' + (!((index + 1) % 3) ? '' : 'menu-item-border')} key={item.path} onClick={this.handleSkip.bind(this, item.path)}>
                                <i className={'iconfont ' + item.icon}></i>
                                <span>{item.text}</span>
                            </div>
                        )
                    })}

                </div>
            </Drawer>
        </div>);
    }
}