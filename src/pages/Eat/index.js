import { Component } from "react";
import { Button, InputItem } from 'antd-mobile'
import './index.scss'

export default class Eat extends Component {
    state = {

    }

    render() {
        return (<div className="eat-wrapper">
            <h2>今天吃什么</h2>
            <span style={{ color: '#999', fontSize: '.34375rem' }}>从此不再纠结</span>
            <div className="add-box">
                <InputItem
                    clear
                    placeholder="还想吃这个？"
                    ref={el => this.autoFocusInst = el}
                    className="add-input"
                >{''}</InputItem>
                <Button type="primary" inline size="small" className="add-btn">添加</Button>
            </div>
        </div>)
    }
}