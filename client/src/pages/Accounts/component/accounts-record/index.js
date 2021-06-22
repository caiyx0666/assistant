import { Component } from "react";
import Keyboard from '../keyboard/index'
import './index.scss'
import $axios from '../../../../utils/axios'
import { Toast, Carousel } from "antd-mobile";

const expendIcons = [
    { icon: 'icon-canyin', text: '餐饮' },
    { icon: 'icon-gouwu', text: '购物' },
    { icon: 'icon-riyong', text: '日用' },
    { icon: 'icon-jiaotong', text: '交通' },
    { icon: 'icon-shuiguo', text: '水果' },
    { icon: 'icon-lingshi', text: '零食' },
    { icon: 'icon-tongxin', text: '通信' },
    { icon: 'icon-lvyou', text: '旅游' },
    { icon: 'icon-shejiao', text: '社交' },
    { icon: 'icon-zufang', text: '租房' },
    { icon: 'icon-changbei', text: '长辈' }
]

const earningIcons = [
    { icon: 'icon-gongzi', text: '工资' },
    { icon: 'icon-jianzhi', text: '兼职' },
    { icon: 'icon-licai', text: '理财' },
    { icon: 'icon-lijin', text: '礼金' },
    { icon: 'icon-haopingfanxian', text: '好评返现' },
    { icon: 'icon-qita', text: '其他' },
]

export default class AccountsRecord extends Component {
    state = {
        active: 0,
        iconActive: -1
    }

    handleConfirm = async ({ beizhu, sum, date }) => {
        this.setState({
            iconActive: -1
        })

        const res = await $axios.post('/addAccounts', {
            content: beizhu,
            date: date.getTime(),
            sum: this.state.active ? sum : -sum,
            icon: expendIcons[this.state.iconActive].icon,
            category: expendIcons[this.state.iconActive].text,
        })

        if (res.data.status === 200) {
            Toast.success('记账成功', 1)
        } else {
            Toast.fail(res.data.desc, 1)
        }

    }

    render() {

        const iconsHtml = () => {
            let icons = this.state.active ? earningIcons : expendIcons
            return icons.map((item, index) => {
                return (
                    <div className="accounts-icon-wrapper" key={index} onClick={(e) => { e.stopPropagation(); this.setState({ iconActive: index }) }}>
                        <div className={['accounts-icon-box', this.state.iconActive === index ? 'accounts-icon-active' : ''].join(' ')}>
                            <i className={['iconfont', item.icon, 'accounts-icon'].join(' ')}></i>
                        </div>
                        <span>{item.text}</span>
                    </div>
                )
            })
        }

        return (<div className="accounts-record-wrapper" onClick={(e) => { e.stopPropagation(); this.setState({ iconActive: -1 }) }}>
            <div className="accounts-record-top">
                <span style={{ marginRight: '.375rem' }} className={['accounts-state', this.state.active === 0 ? 'accounts-state-active' : ''].join(' ')} onClick={() => { this.setState({ active: 0 }) }}>支出</span>
                <span className={['accounts-state', this.state.active === 1 ? 'accounts-state-active' : ''].join(' ')} onClick={() => { this.setState({ active: 1 }) }}>收入</span>
                <span className="accounts-cancel" onClick={() => { this.props.handleActiveChange(0) }}>取消</span>
            </div>



            <Carousel
                selectedIndex={this.state.active}
                dots={false}
                beforeChange={(from, to) => { this.setState({ active: to }) }}
            >

                <div className="accounts-main" style={this.state.iconActive !== -1 ? { marginBottom: '4.5rem' } : { marginBottom: '0' }} key="1">
                    {iconsHtml()}

                </div>
                <div className="accounts-main" style={this.state.iconActive !== -1 ? { marginBottom: '4.5rem' } : { marginBottom: '0' }} key="2">
                    {iconsHtml()}

                </div>

            </Carousel>

            <Keyboard style={this.state.iconActive !== -1 ? { bottom: '0' } : { bottom: '-6.75rem' }} handleConfirmKeyboard={this.handleConfirm}></Keyboard>
        </div>)
    }
}