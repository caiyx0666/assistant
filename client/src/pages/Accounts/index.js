import { Component } from 'react';
import AccountsDetail from './component/accounts-detail'
import AccountsRecord from './component/accounts-record';
import './index.scss'

export default class Accounts extends Component {
    state = {
        active: 0
    }

    handleActiveChange = (index) => {
        this.setState({
            active: index
        })
    }

    render() {
        const contentHtml = () => {
            switch (this.state.active) {
                case 0:
                    return (<AccountsDetail></AccountsDetail>)
                case 1:
                    return (<AccountsRecord {...this.props} handleActiveChange={(index) => { this.handleActiveChange(index) }}></AccountsRecord>)
                case 2:
                    return (<div></div>)
                default:
                    return (<div></div>)
            }
        }
        return (<div className="accounts-wrapper">
            {contentHtml()}
            {this.state.active !== 1 ? (<div className="accounts-nav-bar">
                <div className={['nav-bar-item', this.state.active === 0 ? 'nav-bar-item-active' : ''].join(' ')} onClick={() => { this.setState({ active: 0 }) }}>
                    <i className="iconfont icon-detailed nav-bar-icon"></i>
                    <span>明细</span>
                </div>
                <div className={['nav-bar-item', this.state.active === 1 ? 'nav-bar-item-active' : ''].join(' ')} onClick={() => { this.setState({ active: 1 }) }}>
                    <i className="iconfont icon-jia1 nav-bar-add" style={{ color: '#000' }}></i>
                    <span>记账</span>
                </div>
                <div className={['nav-bar-item', this.state.active === 2 ? 'nav-bar-item-active' : ''].join(' ')} onClick={() => { this.setState({ active: 2 }) }}>
                    <i className="iconfont icon-tubiao nav-bar-icon"></i>
                    <span>图表</span>
                </div>
            </div>) : ''}
        </div>)
    }
}