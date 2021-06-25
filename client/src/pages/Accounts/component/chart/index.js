import React from 'react'
import { Component } from 'react'
import $axios from '../../../../utils/axios'
import PropTypes from 'prop-types'

import ProgressChart from '../progress-chart'

// 引入ECharts
import ReactEchartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'

import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, MarkPointComponent, MarkLineComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

import lineOption from './lineOption'

import './index.scss'
echarts.use([LineChart, GridComponent, CanvasRenderer, TooltipComponent, TitleComponent, MarkPointComponent, MarkLineComponent])

export default class Chart extends Component {


    constructor(props) {
        super(props)

        this.state = {
            accounts: [],
            scopeIndex: 0,
        }

        this.chartSelect = React.createRef()
    }

    componentDidMount() {
        this.handleReset();
    }

    getAccounts = async () => {

        const { startTime, endTime } = this.getTimeScope()[this.state.scopeIndex]

        const res = await $axios.post('/getScopeAccounts', {
            startTime,
            endTime
        })

        if (res.data.status === 200) {
            let accounts = res.data.data.filter(item => {
                if (this.props.incomeOrExpenses === '0') {
                    return item.sum < 0
                } else {
                    return item.sum > 0
                }
            })

            accounts.map(item => {
                if (this.props.incomeOrExpenses === '0') {
                    item.sum = -item.sum
                }
                return item;
            })


            this.setState({
                accounts
            })
        }
    }

    handleReset = () => {

        let now = new Date()

        this.getTimeScope().forEach((item, index) => {
            if (item.startTime <= now && now <= item.endTime) {
                this.setState({
                    scopeIndex: index
                }, () => { this.chartSelect.current.scrollLeft = this.chartSelect.current.scrollWidth; this.getAccounts() })
            }
        })
    }

    getTimeScope = () => {
        // 获取当前的时间戳
        let nowTime = new Date().getTime()

        switch (this.props.timeUnit) {
            // 周
            case 0:
                // 今年开始的时间戳
                let yearStartTime = new Date(new Date().getFullYear(), 0, 1).getTime()
                let weekArr = []
                // 一周需要的时间戳
                let weekTime = 7 * 24 * 60 * 60 * 1000
                let time = yearStartTime;
                while (time < nowTime) {
                    let day = new Date(time).getDay()
                    if (day !== 1) {
                        time -= (day - 1) * 24 * 60 * 60 * 1000
                    }
                    weekArr.push({ startTime: time, endTime: time + weekTime - 1 })
                    time += weekTime;
                }
                return weekArr;
            // 月
            case 1:
                let monthArr = []
                let startMonth = 0
                let nowMonth = new Date().getMonth()
                while (startMonth <= nowMonth) {
                    monthArr.push({ startTime: new Date(new Date().getFullYear(), startMonth, 1).getTime(), endTime: new Date(new Date().getFullYear(), startMonth + 1, 1).getTime() - 1 })
                    startMonth += 1
                }
                return monthArr;
            // 年
            case 2:
                let yearArr = []
                let nowYear = new Date().getFullYear()
                let startYear = nowYear - 9

                while (startYear <= nowYear) {
                    yearArr.push({ startTime: new Date(startYear, 0, 1).getTime(), endTime: new Date(startYear + 1, 0, 1).getTime() - 1 })
                    startYear += 1
                }
                return yearArr;
            default:
                break;
        }
    }



    render() {

        const scopeHtml = () => {

            switch (this.props.timeUnit) {
                case 0:
                    return this.getTimeScope().map((item, index) => {
                        return (<span onClick={() => { this.setState({ scopeIndex: index }, () => { this.getAccounts() }) }} key={index} className={['time-scope-item', this.state.scopeIndex === index ? 'scope-item-active' : ''].join(' ')}>
                            {((item.startTime <= new Date().getTime()) && (item.endTime >= new Date().getTime())) ? '本周' : `第${index}周`}
                        </span>)
                    })
                case 1:
                    return this.getTimeScope().map((item, index) => {
                        return (<span onClick={() => { this.setState({ scopeIndex: index }, () => { this.getAccounts() }) }} key={index} className={['time-scope-item', this.state.scopeIndex === index ? 'scope-item-active' : ''].join(' ')}>
                            {((item.startTime <= new Date().getTime()) && (item.endTime >= new Date().getTime())) ? '本月' : new Date(item.startTime).getMonth() + 1 + '月'}
                        </span>)
                    })
                case 2:
                    return this.getTimeScope().map((item, index) => {
                        return (<span onClick={() => { this.setState({ scopeIndex: index }, () => { this.getAccounts() }) }} key={index} className={['time-scope-item', this.state.scopeIndex === index ? 'scope-item-active' : ''].join(' ')}>
                            {((item.startTime <= new Date().getTime()) && (item.endTime >= new Date().getTime())) ? '今年' : new Date(item.startTime).getFullYear() + '年'}
                        </span>)
                    })
                default:
                    return ''
            }


        }

        const progressList = () => {
            let list = [];
            let total = 0;
            this.state.accounts.forEach(item => {
                total += item.sum
                if (!list.length) {
                    list.push(item)
                    return;
                }
                let index = 0;
                list.forEach(e => {
                    if (e.category === item.category) {
                        e.sum += item.sum
                    } else {
                        index++;
                    }
                })

                if (index === list.length) {
                    list.push(item)
                }
            })

            list = list.map(item => {
                return {
                    ...item,
                    rate: +(item.sum * 100 / total).toFixed(1)
                }
            })

            list.sort((a, b) => {
                return b.sum - a.sum
            })

            return list;
        }

        return (<div className="chart-wrapper">

            <div className="chart-scope-select" ref={this.chartSelect}>
                {scopeHtml()}
            </div>

            <ReactEchartsCore
                echarts={echarts}
                notMerge={true}
                lazyUpdate={true}
                option={lineOption({ accounts: this.state.accounts, scope: this.getTimeScope()[this.state.scopeIndex] || [], timeUnit: this.props.timeUnit })}
                echarts={echarts}
                theme={"theme_name"}
                style={{ width: '100%', height: '5rem', marginTop: '.2rem' }}
                className="myChart"
            ></ReactEchartsCore>

            <div className="ranking-list">
                <h5 className="ranking-list-title">{this.props.incomeOrExpenses === '0' ? '支出排行榜' : '收入排行榜'}</h5>
                {progressList().length ? progressList().map(item => {
                    return <ProgressChart key={item.code} icon={item.icon} category={item.category} rate={item.rate} value={item.sum}></ProgressChart>
                }) : <div>{this.props.incomeOrExpenses === '0' ? '暂无支出' : '暂无收入'}</div>}
            </div>

        </div>)
    }
}

Chart.propTypes = {
    timeUnit: PropTypes.number,
    incomeOrExpenses: PropTypes.string
}