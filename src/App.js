import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Component } from 'react'

// 引入页面组件
import Home from './pages/Home'
import Calendar from './pages/Calendar';
import Eat from './pages/Eat';
import Memo from './pages/Memo';
import Throw from './pages/Throw';
import Accounts from './pages/Accounts';
import Skin from './pages/Skin';
import Settings from './pages/Settings';

export default class App extends Component {
  componentDidMount() {
    const theme = window.localStorage.getItem('theme');
    if (!theme) {
      window.document.documentElement.setAttribute('data-theme', 'color1');
    } else {
      window.document.documentElement.setAttribute('data-theme', theme);
    }
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => (<Redirect to="/home" />)} />
          <Route path="/home" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/eat" component={Eat} />
          <Route path="/memo" component={Memo} />
          <Route path="/throw" component={Throw} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/skin" component={Skin} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    )
  }
}
