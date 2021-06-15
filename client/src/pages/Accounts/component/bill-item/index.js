import { Component } from "react";

import PropTypes from 'prop-types'
import moment from "moment";

import './index.scss'

export default class BillItem extends Component {

    render() {

        const totalExpend = () => {
            let price = 0;
            this.props.bill.forEach(item => {
                price += Number(item.sum)
            })
            return price;
        }

        const billTotal = () => {
            if (totalExpend() > 0) {
                return (
                    <div className="bill-total">
                        <span>收入：</span>
                        <span>{'+' + totalExpend()}</span>
                    </div>
                )
            } else {
                return (
                    <div className="bill-total">
                        <span>支出：</span>
                        <span>{totalExpend()}</span>
                    </div>
                )
            }
        }

        const week = () => {
            switch (moment(this.props.createTime).format('d')) {
                case '1':
                    return '星期一'
                case '2':
                    return '星期二'
                case '3':
                    return '星期三'
                case '4':
                    return '星期四'
                case '5':
                    return '星期五'
                case '6':
                    return '星期六'
                case '7':
                    return '星期日'
                default:
                    return ''
            }
        }

        return (<div className="bill-wrapper">
            <div className="bill-top">
                <div>
                    <span>{moment(this.props.createTime).format('MM月DD日')}</span>
                    <span style={{ marginLeft: '.375rem' }}>{week()}</span>
                </div>
                {billTotal()}
            </div>
            {this.props.bill.map((item, index) => {
                return (
                    <div className="bill-item-wrapper" key={index}>
                        <div className="icon-wrapper">
                            <i className={'iconfont ' + item.icon}></i>
                        </div>
                        <div className="bill-item-right">
                            <span className="category-text">{item.category}</span>
                            <span className="sum-text">{item.sum}</span>
                        </div>
                    </div>
                )
            })}
        </div>)
    }
}

BillItem.propTypes = {
    bill: PropTypes.array,
    createTime: PropTypes.number
}