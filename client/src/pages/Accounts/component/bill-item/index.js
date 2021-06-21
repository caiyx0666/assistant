import { Component } from "react";

import PropTypes from 'prop-types'
import moment from "moment";
import $axios from '../../../../utils/axios';
import { Icon } from 'antd-mobile';

import './index.scss';

export default class BillItem extends Component {

    state = {
        timer: null
    }

    handleTouchStart = () => {
        let timer = null;
        timer = setTimeout(() => {
            this.props.handleEdit(true)
        }, 1000)

        this.setState({
            timer
        })
    }

    handleTouchEnd = () => {
        clearTimeout(this.state.timer)
        this.setState({
            timer: null
        })
    }

    handleRemove = async (e, code) => {
        e.stopPropagation();
        const res = await $axios.post('/delAccounts', {
            code
        })

        if (res.data.status === 200) {
            console.log(res.data)
            this.props.upData()
        }
    }

    componentWillUnmount() {
        this.handleTouchEnd()
    }

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

        if (this.props.bill.length) {
            return (<div className="bill-wrapper" onClick={(e) => { this.props.handleEdit(false); e.stopPropagation(); }}>
                <div className="bill-top">
                    <div>
                        <span>{moment(this.props.createTime).format('MM月DD日')}</span>
                        <span style={{ marginLeft: '.375rem' }}>{week()}</span>
                    </div>
                    {billTotal()}
                </div>
                {this.props.bill.map((item, index) => {
                    return (
                        <div
                            className={['bill-item-wrapper', this.props.edit ? 'animation-class' : ''].join(' ')}
                            key={index}
                            onTouchStart={this.handleTouchStart}
                            onTouchEnd={this.handleTouchEnd}
                        >
                            <div className="icon-wrapper">
                                <i className={'iconfont ' + item.icon}></i>
                            </div>
                            <div className="bill-item-right">
                                <span className="category-text">{item.content}</span>
                                <span className="sum-text">{item.sum}</span>
                            </div>

                            {this.props.edit ? <Icon className="remove-icon-wrapper" type="cross-circle" size="md" onClick={(e) => { this.handleRemove(e, item.code) }}></Icon> : ''}

                        </div>
                    )
                })}
            </div>)

        } else {
            return ('')
        }

    }
}

BillItem.propTypes = {
    bill: PropTypes.array,
    createTime: PropTypes.number,
    handleEdit: PropTypes.func,
    edit: PropTypes.bool
}