import { List, Checkbox, Icon, Button, InputItem } from 'antd-mobile'
import { Component } from 'react';
import $axios from "../../../../utils/axios";

const CheckboxItem = Checkbox.CheckboxItem;


export default class TodoList extends Component {
    state = {
        data: []
    }

    onChange = (code) => {
        this.state.data.forEach(async (e, eIndex) => {
            if (code === e.code) {
                const res = await $axios.post('/updataTodoList', {
                    code,
                    finish: e.finish ? 0 : 1,
                    content: e.content
                })

                if (res.status === 200) {
                    this.upDate()
                }
            }
        })
    }

    handleRemove(code) {
        this.state.data.forEach(async item => {
            if (code === item.code) {
                const res = await $axios.post('/delTodoList', {
                    codes: [item.code]
                })
                if (res.status === 200) {
                    this.upDate()
                }
            }
        })
    }

    handleEdit(code) {
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (code === e.code) {
                    e.edit = true;
                }
                return e
            })
        })
    }

    handleConfirm(code) {
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (code === e.code) {
                    e.edit = false;
                }
                return e
            })
        })

        this.state.data.forEach(async item => {
            if (code === item.code) {
                const res = await $axios.post('/updataTodoList', {
                    code,
                    finish: item.finish,
                    content: item.content
                })

                if (res.status === 200) {
                    this.upDate()
                }
            }
        })

        this.upDate()
    }

    handleChange(val, code) {
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (code === e.code) {
                    e.content = val
                }
                return e
            })
        })
    }

    upDate = async () => {
        let list = [];
        const res = await $axios.get('/getTodoList')
        if (res.data.status === 200) {
            list = res.data.data
        }

        list = list.map(item => {
            return {
                ...item,
                edit: false
            }
        })

        this.setState({
            data: list
        })
    }

    async handleClear() {
        let codes = [];
        this.state.data.forEach(item => {
            codes.push(item.code)
        })
        const res = await $axios.post('/delTodoList', {
            codes
        })
        if (res.status === 200) {
            this.upDate()
        }
    }

    handleClearTodo = async () => {
        let codes = [];
        this.state.data.forEach(item => {
            if (!item.finish) {
                codes.push(item.code)
            }
        })
        const res = await $axios.post('/delTodoList', {
            codes
        })
        if (res.status === 200) {
            this.upDate()
        }
    }
    handleClearNone = async () => {
        let codes = [];
        this.state.data.forEach(item => {
            if (item.finish) {
                codes.push(item.code)
            }
        })
        const res = await $axios.post('/delTodoList', {
            codes
        })
        if (res.status === 200) {
            this.upDate()
        }
    }

    componentDidMount() {
        this.upDate();
    }

    render() {
        // 代办事项
        let todoList = this.state.data.filter(item => {
            return !item.finish;
        })

        // 已完成事项
        let noneList = this.state.data.filter(item => {
            return item.finish;
        })

        return (
            <div>
                <List renderHeader={() => (<span style={{ fontSize: '.3rem' }}>TODOLIST</span>)}>
                    {
                        todoList.length ?
                            this.state.data.map((i, index) => {
                                if (i.finish) return '';
                                return (
                                    <List.Item
                                        key={i.code}
                                        thumb={(i.edit ? <InputItem
                                            placeholder="auto focus"
                                            value={i.content}
                                            onChange={(val) => { this.handleChange(val, i.code) }}
                                        ></InputItem> : <CheckboxItem key={i.code} checked={i.finish} onChange={() => this.onChange(i.code)}>
                                            {i.content}
                                        </CheckboxItem>)}
                                        onClick={() => { }}
                                        extra={(i.edit ? <Button type="primary" size="lg" onClick={this.handleConfirm.bind(this, i.code)}>确定</Button> : <i className="iconfont icon-qianbi" style={{ fontSize: '.5625rem' }} onClick={this.handleEdit.bind(this, i.code)}></i>)}
                                    >{''}</List.Item>
                                )
                            }) : <List.Item
                                key={0}
                            ><span style={{ paddingLeft: '.25rem', fontSize: '.375rem', color: '#888' }}>暂无事项</span></List.Item>
                    }

                </List>
                <List renderHeader={() => (<span style={{ fontSize: '.3rem' }}>NONELIST</span>)}>
                    {noneList.length ?
                        this.state.data.map((i, index) => {
                            if (!i.finish) return ''
                            return (
                                <List.Item

                                    key={i.code}
                                    thumb={(<CheckboxItem style={{ fontSize: '20px' }} key={i.code} checked={i.finish} onChange={() => this.onChange(i.code)}>
                                        {i.content}
                                    </CheckboxItem>)}
                                    onClick={() => { }}
                                    extra={(<Icon type="cross-circle" color="red" size="lg" onClick={this.handleRemove.bind(this, i.code)}></Icon>)}
                                >{''}</List.Item>
                            )
                        }) : <List.Item
                            key={0}
                        ><span style={{ paddingLeft: '.25rem', fontSize: '.375rem', color: '#888' }}>暂无完成事项</span></List.Item>}
                </List>
            </div>
        )
    }
}
