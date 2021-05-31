import { List, Checkbox, Icon, Button, InputItem } from 'antd-mobile'
import { Component } from 'react';
import './index.scss'

const CheckboxItem = Checkbox.CheckboxItem;


export default class TodoList extends Component {
    state = {
        data: []
    }

    onChange = (index) => {
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (index === eIndex) {
                    e.checked = !e.checked
                }
                return e;
            })
        }, () => { this.setDate() })
    }

    handleRemove(index) {
        this.setState({
            data: this.state.data.filter((e, eIndex) => {
                return !(index === eIndex)
            })
        }, () => { this.setDate() })
    }

    handleEdit(index) {
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (index === eIndex) {
                    e.edit = true;
                }
                return e
            })
        })
    }

    handleConfirm(index) {
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (index === eIndex) {
                    e.edit = false;
                }
                return e
            })
        })
        this.setDate()
    }

    handleChange(val, index) {
        console.log(val, index);
        this.setState({
            data: this.state.data.map((e, eIndex) => {
                if (index === eIndex) {
                    e.label = val
                }
                return e
            })
        })
    }

    upDate = () => {
        let list = [];
        if (window.localStorage.getItem('TODOLIST')) {
            list = JSON.parse(window.localStorage.getItem('TODOLIST'))
        }
        this.setState({
            data: list
        })
    }

    setDate = () => {
        window.localStorage.setItem('TODOLIST', JSON.stringify(this.state.data))
    }

    handleClear() {
        this.setState({
            data: []
        }, () => {
            this.setDate()
        })
    }

    handleClearTodo = () => {
        this.setState({
            data: this.state.data.filter(item => {
                return item.checked
            })
        }, () => {
            this.setDate()
        })
    }

    handleClearNone = () => {
        this.setState({
            data: this.state.data.filter(item => {
                return !item.checked
            })
        }, () => {
            this.setDate()
        })
    }

    componentDidMount() {
        this.upDate();
    }

    render() {
        // 代办事项
        let todoList = this.state.data.filter(item => {
            return !item.checked;
        })

        // 已完成事项
        let noneList = this.state.data.filter(item => {
            return item.checked;
        })

        return (
            <div>
                <List renderHeader={() => 'TODOLIST'}>
                    {
                        todoList.length ?
                            this.state.data.map((i, index) => {
                                if (i.checked) return '';
                                return (
                                    <List.Item
                                        key={index}
                                        thumb={(i.edit ? <InputItem
                                            placeholder="auto focus"
                                            value={i.label}
                                            onChange={(val) => { this.handleChange(val, index) }}
                                        ></InputItem> : <CheckboxItem key={index} checked={i.checked} onChange={() => this.onChange(index)}>
                                            {i.label}
                                        </CheckboxItem>)}
                                        onClick={() => { }}
                                        extra={(i.edit ? <Button type="primary" size="small" style={{ width: '60px' }} onClick={this.handleConfirm.bind(this, index)}>确定</Button> : <i className="iconfont icon-qianbi" style={{ fontSize: '20px' }} onClick={this.handleEdit.bind(this, index)}></i>)}
                                    >{''}</List.Item>
                                )
                            }) : <List.Item
                                key={0}
                            ><span style={{ paddingLeft: '10px', fontSize: '14px', color: '#888' }}>暂无事项</span></List.Item>
                    }

                </List>
                <List renderHeader={() => 'NONELIST'}>
                    {noneList.length ?
                        this.state.data.map((i, index) => {
                            if (!i.checked) return ''
                            return (
                                <List.Item
                                    key={index}
                                    thumb={(<CheckboxItem key={index} checked={i.checked} onChange={() => this.onChange(index)}>
                                        {i.label}
                                    </CheckboxItem>)}
                                    onClick={() => { }}
                                    extra={(<Icon type="cross-circle" color="red" size="sm" onClick={this.handleRemove.bind(this, index)}></Icon>)}
                                >{''}</List.Item>
                            )
                        }) : <List.Item
                            key={0}
                        ><span style={{ paddingLeft: '10px', fontSize: '14px', color: '#888' }}>暂无完成事项</span></List.Item>}
                </List>
            </div>
        )
    }
}
