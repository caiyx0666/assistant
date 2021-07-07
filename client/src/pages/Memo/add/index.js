import React, { Component } from "react";
import { NavBar, Icon, InputItem, Toast } from 'antd-mobile'
import $axios from '../../../utils/axios'

import './index.scss'

export default class MemoAdd extends Component {

    state = {
        title: '标题',
        content: ''
    }

    constructor(props) {
        super(props)
        this.contentInput = React.createRef()
    }

    componentDidMount() {
        this.contentInput.current.focus()
    }

    handleConfirm = async () => {
        const res = await $axios.post('/addMemo', {
            content: this.state.content,
            title: this.state.title
        })

        if (res.data.status !== 200) return
        Toast.success(res.data.desc, 1)
        this.props.history.go(-1)
    }

    render() {
        return (
            <div className="memo-add-wrapper">
                <div className="memo-add-top">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" size="lg" onClick={() => { this.props.history.go(-1) }} />}
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[
                            <Icon key="0" type="check" size="lg" style={{ marginRight: '16px' }} onClick={() => { this.handleConfirm() }} />,
                        ]}
                    ></NavBar>
                </div>

                <div className="memo-main">
                    <div className="title-input-wrapper">
                        <InputItem placeholder="请输入标题" style={{ fontSize: '.5rem' }} value={this.state.title} onChange={(e) => { this.setState({ title: e }) }} className="title-input" />
                    </div>

                    <div className="content-input-wrapper">
                        <InputItem placeholder="请输入内容" value={this.state.content} onChange={(e) => { this.setState({ content: e }) }} ref={this.contentInput} />

                    </div>
                </div>

            </div>
        )
    }
}