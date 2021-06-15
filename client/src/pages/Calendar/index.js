import React, { Component } from "react";
import { InputItem } from 'antd-mobile'

import './index.scss'

import TodoList from './component/TodoList'
import BtnBottom from './component/button-bottom'
import Title from '../../components/Title'

export default class Calendar extends Component {

    state = {
        val: ''
    }

    constructor(props) {
        super(props)
        this.autoFocusInst = React.createRef()
        this.todoList = React.createRef()
    }

    handleAdd = () => {
        let list = [];
        if (window.localStorage.getItem('TODOLIST')) {
            list = JSON.parse(window.localStorage.getItem('TODOLIST'))
        }
        list.push({ label: this.state.val, checked: false, value: list.length, edit: false });
        window.localStorage.setItem('TODOLIST', JSON.stringify(list))

        // 更新数据
        this.todoList.current.upDate()

        this.setState({ val: '' })
    }

    render() {
        return (<div className="calendar">
            <Title>今日事，今日毕</Title>
            <div className="input-box">
                <InputItem
                    placeholder="今天做点什么好呢"
                    ref={this.autoFocusInst}
                    className="input"
                    value={this.state.val}
                    onChange={(val) => { this.setState({ val }) }}
                ></InputItem>
                <i className="iconfont icon-jia input-btn" onClick={this.handleAdd}></i>
            </div>
            <div className="todo-list">
                <TodoList ref={this.todoList}></TodoList>
            </div>
            <BtnBottom handleClear={() => { this.todoList.current.handleClear() }} handleClearTodo={() => { this.todoList.current.handleClearTodo() }} handleClearNone={() => { this.todoList.current.handleClearNone() }}></BtnBottom>
        </div>)
    }
}