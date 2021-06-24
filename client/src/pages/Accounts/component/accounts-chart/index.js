import React, { Component } from 'react'
import { Popover } from 'antd-mobile'

import Chart from '../chart';

import './index.scss'

const Item = Popover.Item;

export default class AccountsChart extends Component {



    onSelect = (e) => {
        this.setState({
            active: e.key,
            visible: false
        }, () => { this.chart.current.handleReset() })
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            active: '0',
            scope: 2
        }
        this.chart = React.createRef()
    }

    render() {
        return (<div className="accounts-chart-wrapper">
            <div className="accounts-chart-top">
                <Popover
                    mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    onSelect={this.onSelect}
                    placement="bottom"
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                    overlay={[
                        (<Item
                            style={{ fontSize: '.375rem' }}
                            icon={<i className="iconfont icon-zhichu" style={{ fontSize: '.6rem' }} ></i>}
                            key="0"
                            value="scan"

                        >支出</Item>),
                        (<Item
                            style={{ fontSize: '.375rem' }}
                            icon={<i className="iconfont icon-shouru" style={{ fontSize: '.6rem' }} ></i>}
                            key="1"
                            value="special"
                        >收入</Item>),
                    ]}

                >
                    <div
                        style={{
                            height: '1rem',
                            padding: '0 15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '.375rem'
                        }}
                    >
                        <div>
                            {this.state.active === '1' ? '收入' : '支出'}
                            <i className="iconfont icon-up-fill1" style={{ paddingLeft: '.1rem' }}></i>
                        </div>
                    </div>
                </Popover>

                <div className="accounts-chart-scope">
                    {['周', '月', '年'].map((item, index) => {
                        return <div
                            key={index}
                            className={['chart-scope-item', this.state.scope === index ? 'scope-item-active' : ''].join(' ')}
                            onClick={() => { this.setState({ scope: index }, () => { this.chart.current.handleReset() }); }}
                        >{item}</div>
                    })}
                </div>


            </div>
            <Chart timeUnit={this.state.scope} incomeOrExpenses={this.state.active} ref={this.chart}></Chart>
        </div>)
    }
}