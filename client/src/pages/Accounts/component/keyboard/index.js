import { Component } from 'react';
import { DatePicker, InputItem } from 'antd-mobile'
import './index.scss'

import PropTypes from 'prop-types'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const nowMouth = new Date().getMonth() + 1
const nowYear = new Date().getFullYear()

const keyboardNums = [1, 2, 3, { icon: 'icon-rili1' }, 4, 5, 6, '+', 7, 8, 9, '-', '.', 0, { icon: 'icon-shanjianyiwei2' }, '完成']

export default class keyboard extends Component {
    state = {
        sum: 0,
        active: -1,
        visible: false,
        date: now,
        month: nowMouth,
        year: nowYear,
        str: '',
        beizhu: ''
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

    computeSum = () => {
        let str = this.state.str;
        let sum = 0;

        let addIndex = str.indexOf('+')
        let subtractIndex = str.indexOf('-')
        if (addIndex === -1 && subtractIndex === -1) {
            this.setState({
                sum: Number(this.state.str)
            })
            return;
        }

        let addList = [];
        let subtractList = [];

        addList = str.split('+')
        subtractList = str.split('-')

        sum = sum * 100
        // if (startAdd) {
        addList.forEach((item, index) => {
            if (item.indexOf('-') === -1) {
                let num = Number(item) * 100
                if (!num) return;
                sum = sum + num
            } else {
                subtractList = item.split('-');
                subtractList.forEach((e, eIndex) => {
                    let num = Number(e) * 100;
                    if (!num) return
                    if (eIndex === 0) {
                        sum = sum + num
                        return
                    }
                    sum = sum - num
                })
            }
        })


        this.setState({
            sum: sum / 100
        })

    }

    handleSubtract = () => {
        let str = this.state.str;
        let list = str.split('')

        list.splice(-1, 1)
        str = list.join('')
        this.setState({
            str: str
        }, () => { this.computeSum() })


    }

    handleKeyChange = (key) => {
        this.setState({
            str: this.state.str + key
        }, () => { this.computeSum() })
    }

    handleChangeInput = (e) => {
        this.setState({
            beizhu: e
        })
    }

    handleConfirm = () => {
        this.setState({
            beizhu: '',
            sum: 0,
            date: now,
            str: ''
        })
        this.props.handleConfirmKeyboard({ beizhu: this.state.beizhu, sum: this.state.sum, date: this.state.date })
    }

    render() {

        const keyboardMain = () => {
            return keyboardNums.map((item, index) => {
                switch (index) {
                    case 3:
                        return (<div onClick={() => { this.setState({ visible: true }) }} onTouchStart={() => { this.setState({ active: index }) }} onTouchEnd={() => { this.setState({ active: -1 }) }} className={['keyboard-main-item', 'keyboard-main-item-notmargin', this.state.active === index ? 'keyboard-main-item-active' : ''].join(' ')} key={index}>
                            <i className={['iconfont', item.icon, 'rili-icon'].join(' ')}></i>
                            <span className="keyboard-main-item-rili">{new Date(this.state.date).getDate() + '号'}</span>
                        </div>)
                    case 14:
                        return (<div
                            onTouchStart={() => { this.setState({ active: index }) }}
                            onTouchEnd={() => { this.setState({ active: -1 }) }}
                            className={['keyboard-main-item', this.state.active === index ? 'keyboard-main-item-active' : ''].join(' ')}
                            key={index}
                            onClick={() => { this.handleSubtract() }}
                        >
                            <i className={['iconfont', item.icon, 'jian-icon'].join(' ')}></i>
                        </div>)
                    case 15:
                        return (<div className="keyboard-main-item keyboard-main-item-confirm keyboard-main-item-notmargin" key={index} onClick={() => { this.handleConfirm() }}>
                            {item}
                        </div>)
                    default:
                        return (<div
                            onTouchStart={() => { this.setState({ active: index }) }}
                            onTouchEnd={() => { this.setState({ active: -1 }) }}
                            className={['keyboard-main-item', (index + 1) % 4 === 0 ? 'keyboard-main-item-notmargin' : '', this.state.active === index ? 'keyboard-main-item-active' : ''].join(' ')}
                            key={index}
                            onClick={() => { this.handleKeyChange(item) }}
                        >
                            {item}
                        </div>)
                }
            })
        }

        const sumFormat = () => {
            let list = String(this.state.sum).split('.')
            if (list.length === 2 && list[1].length >= 2) {
                return this.state.sum
            } else {
                return this.state.sum.toFixed(2)
            }
        }


        return (<div className="keyboard-wrapper" style={this.props.style} onClick={(e) => { e.stopPropagation(); }}>
            <div className="keyboard-top">
                <div className="icon-wrapper">
                    <i className="iconfont icon-beizhu keyboard-beizhu-icon"></i>
                    <span>备注:</span>
                </div>
                <InputItem
                    placeholder="写点备注..."
                    value={this.state.beizhu}
                    className="keyboard-input"
                    onChange={(e) => { this.handleChangeInput(e) }}
                    clear
                >{''}</InputItem>
                <span className="keyboard-sum">{sumFormat()}</span>
                {this.state.str ? (<div className="keyboard-top-str">
                    {this.state.str}
                </div>) : ''}
            </div>
            <div className="keyboard-main">
                {keyboardMain()}
            </div>

            <DatePicker
                mode="date"
                value={this.state.date}
                onChange={date => { this.setState({ date }); }}
                visible={this.state.visible}
                onOk={this.handleConfirmDate}
                onDismiss={this.handleCancelDate}
                minDate={new Date(nowYear, 0, 1)}
                maxDate={new Date()}
                format='HH: mm'
            >
            </DatePicker>
        </div>)
    }
}

keyboard.propTypes = {
    handleConfirmKeyboard: PropTypes.func
}