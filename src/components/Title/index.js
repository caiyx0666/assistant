import { Component } from 'react';
import './index.scss'

export default class Title extends Component {

    render() {
        return (<div className="title" style={{ color: this.props.color }}>{this.props.children}</div>)
    }
}