import { Component } from 'react'
import { Card, SearchBar, Icon, Toast } from 'antd-mobile'

import moment from 'moment'
import $axios from '../../utils/axios'

import './index.scss'

export default class Memo extends Component {
    state = {
        val: '',
        memoList: [],
        searchVal: ''
    }

    async handleDel(code) {
        const res = await $axios.post('/delMemo', {
            code
        })

        if (res.data.status !== 200) return;
        Toast.success(res.data.desc, 1)
        this.handelSearch()

    }

    async componentDidMount() {
        this.handelSearch()
    }

    handelSearch = async () => {
        const res = await $axios.post('/getMemo', {
            title: this.state.searchVal
        })
        if (res.data.status !== 200) return
        this.setState({
            memoList: res.data.data
        })
    }

    render() {
        return (<div className="memo-wrapper">

            <div className="memo-search-wrapper">
                <SearchBar value={this.state.searchVal} onChange={(e) => { this.setState({ searchVal: e }) }} placeholder="Search" className="memo-search" cancelText="搜索" onCancel={this.handelSearch} onSubmit={this.handelSearch} />
            </div>
            <div className="memo-content-wrapper">
                {this.state.memoList.length ? this.state.memoList.map(item => {

                    return (<Card className='memo-card-wrapper' key={item.code} onClick={() => { this.props.history.push(`/memo/detail?code=${item.code}`) }}>
                        <Card.Header
                            title={item.title}
                            extra={(<Icon type="cross" size="lg" onClick={(e) => { e.stopPropagation(); this.handleDel(item.code) }}></Icon>)}
                        />
                        <Card.Body>
                            <div>{item.content}</div>
                        </Card.Body>
                        <Card.Footer content={<div></div>} extra={<div>{moment(item.createTime).format('MM-DD H:mm')}</div>} />
                    </Card>)
                }) : <div>没什么要记的</div>}
            </div>

            <div className="memo-add-icon-wrapper" onClick={() => { this.props.history.push('/memo/add') }}>
                <i className="iconfont icon-jia1 memo-add-icon"></i>
            </div>

        </div>)
    }
}