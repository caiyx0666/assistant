import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

import { Drawer, List } from 'antd-mobile';

// 引入页面组件
import Home from './pages/Home'
import Calendar from './pages/Calendar';
import Eat from './pages/Eat';
import Memo from './pages/Memo';
import Throw from './pages/Throw';
import Accounts from './pages/Accounts';
import Skin from './pages/Skin';
import Settings from './pages/Settings';

class App extends Component {
  state = {
    docked: false,
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
    this.setState({
      docked: false,
    });
    this.props.history.push(path)
  }

  componentDidMount() {
    const theme = window.localStorage.getItem('theme');
    if (!theme) {
      window.document.documentElement.setAttribute('data-theme', 'color1');
    } else {
      window.document.documentElement.setAttribute('data-theme', theme);
    }
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
      ><span style={{ color: '#fff', fontSize: '13px' }}>首页</span></List.Item>
      {(menuList.map((item, index) => {
        return (
          item.path === '/skin' ? '' : <List.Item key={index + 2}
            thumb={(<i className={'iconfont ' + item.icon} style={{ fontSize: '16px' }}></i>)}
            style={{ backgroundColor: '#161d20', color: '#fff' }}
            activeStyle={{ backgroundColor: "#232e32" }}
            onClick={this.handleSkip.bind(this, item.path)}
          ><span style={{ color: '#fff', fontSize: '13px' }}>{item.text}</span></List.Item>
        )
      }))
      }
    </List>);

    return (
      <Switch>
        <Fragment>
          <div className="nav-bar">
            <i className="iconfont icon-streamlist-copy-copy" onClick={this.onDock}></i>
                Home
            </div>
          <Drawer
            className="my-drawer"
            style={{ minHeight: document.documentElement.clientHeight, }}
            contentStyle={{ textAlign: 'center', paddingTop: 42, backgroundColor: '#f5f5f9' }}
            sidebar={sidebar}
            open={this.state.docked}
            onOpenChange={this.onDock}
          >
            <Route path="/" exact render={() => (<Redirect to="/home" />)} />
            <Route path="/home" component={Home} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/eat" component={Eat} />
            <Route path="/memo" component={Memo} />
            <Route path="/throw" component={Throw} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/skin" component={Skin} />
            <Route path="/settings" component={Settings} />
          </Drawer>
        </Fragment>

      </Switch>
    )
  }
}

export default withRouter(App);
