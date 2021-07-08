import { Component } from "react";

import './index.scss'

import { DatePicker } from 'antd-mobile'
import BillItem from "../bill-item/index";
import $axios from "../../../../utils/axios";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const nowMouth = new Date().getMonth() + 1;
const nowYear = new Date().getFullYear();

export default class AccountsDetail extends Component {
    state = {
        income: 0,
        disburse: 0,
        month: nowMouth,
        year: nowYear,
        date: now,
        time: now,
        visible: false,
        billList: [],
        edit: false
    }

    componentDidMount() {
        this.updata()
    }

    async updata() {
        let year = this.state.date.getFullYear()
        let month = this.state.date.getMonth() + 1;
        const res = await $axios.post('/getScopeAccounts', {
            startTime: new Date(year, month - 1, 1).getTime(),
            endTime: new Date(year, month, 1).getTime(),
        })

        let billList = []
        let day = new Date(year, month, 0).getDate()

        for (let i = 0; i < day; i++) {
            billList.push({
                createTime: new Date(year, month - 1, i + 1).getTime(),
                bill: []
            })
        }

        if (res.data.status === 200) {
            billList = billList.map(item => {
                res.data.data.forEach(e => {
                    if (new Date(item.createTime).getDate() === new Date(e.date).getDate()) {
                        item.bill.push(e)
                    }
                })
                return { ...item }

            })

        }

        this.setState({
            billList,
        }, () => {
            let income = 0;
            let disburse = 0;
            this.state.billList.forEach(item => {
                item.bill.forEach(e => {
                    if (e.sum > 0) {
                        income += e.sum
                    } else {
                        disburse += e.sum
                    }
                })
            })



            this.setState({
                income,
                disburse
            })
        })
    }

    handleConfirmDate = (date) => {

        this.setState({
            visible: false,
            month: date.getMonth() + 1,
            year: date.getFullYear()
        })
    }

    handleCancelDate = () => {
        this.setState({
            visible: false
        })
    }

    render() {

        const getMonth = () => {
            let month = this.state.month;
            if (String(this.state.month).length === 1) {
                month = '0' + this.state.month
            }
            return month;

        }

        const getIncomeInt = () => {
            return parseInt(this.state.income)
        }

        const getIncomeDec = () => {
            if (String(this.state.income).indexOf('.') === -1) return '00'
            let num;
            num = String(this.state.income).split('.')[1];
            return num;
        }

        const getDisburseInt = () => {
            return parseInt(this.state.disburse)
        }

        const getDisburseDec = () => {
            let num;
            if (String(this.state.disburse).indexOf('.') === -1) return '00'
            num = String(this.state.disburse).split('.')[1];
            return num;
        }

        // const

        return (<div className="accounts-detail-wrapper">
            <div className="total-wrapper">
                <div className="total-item" style={{ paddingLeft: '0px' }}>
                    <div className="total-key">
                        {this.state.year + '年'}
                    </div>
                    <div className="total-val" style={{ borderRight: '1px solid #fff' }} onClick={() => { this.setState({ visible: true }) }}>
                        <span className="total-val-big">{getMonth()}</span>
                        <span className="total-val-small">月<i className="iconfont icon-up-fill1" style={{ paddingLeft: '.2rem' }}></i></span>
                    </div>
                </div>
                <div className="total-item" style={{ flex: 1 }}>
                    <div className="total-key">
                        收入
                    </div>
                    <div className="total-val">
                        <span className="total-val-big">{getIncomeInt()}</span>
                        <span className="total-val-small">{'.' + getIncomeDec()}</span>
                    </div>
                </div>
                <div className="total-item" style={{ flex: 1 }}>
                    <div className="total-key">
                        支出
                    </div>
                    <div className="total-val">
                        <span className="total-val-big">{getDisburseInt()}</span>
                        <span className="total-val-small">{'.' + getDisburseDec()}</span>
                    </div>
                </div>
            </div>

            <div className="accounts-main" onClick={() => { this.setState({ edit: false })}}>
                {this.state.billList.map((item, index) => {
                    return (<BillItem
                        bill={item.bill}
                        createTime={item.createTime}
                        key={index}
                        edit={this.state.edit}
                        handleEdit={(e) => { this.setState({ edit: e }) }}
                        upData={this.updata.bind(this)}
                    ></BillItem>)
                })}

            </div>
            <DatePicker
                mode="month"
                value={this.state.date}
                onChange={date => { this.setState({ date }, () => { this.updata() }); }}
                visible={this.state.visible}
                onOk={this.handleConfirmDate}
                onDismiss={this.handleCancelDate}
            >
            </DatePicker>
        </div>)
    }
}