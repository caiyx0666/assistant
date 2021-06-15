import { Component } from 'react'
import { Modal } from 'antd-mobile';

import './index.scss'

export default class Skinchange extends Component {
    state = {
        skinModal: false
    }

    showModal = key => (e) => {
        // e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    handleSkinChange(index) {
        window.localStorage.setItem('theme', `color${index + 1}`);
        const theme = window.localStorage.getItem('theme');
        if (!theme) {
            window.document.documentElement.setAttribute('data-theme', 'color1');
        } else {
            window.document.documentElement.setAttribute('data-theme', theme);
        }

    }

    render() {
        const colors = ['#009999', '#ef4134', '#108ee8', '#f4317e', '#f46a00', '#7265e5', '#febe00', '#00a854', '#2e3238']
        const sidebar = (<div className="color-wrapper">
            {colors.map((item, index) => {
                return (<div className="color-box" key={index}>
                    <div className="color-item" style={{ backgroundColor: item }} onClick={this.handleSkinChange.bind(this, index)}></div>
                </div>)
            })}
        </div>)
        return (
            <Modal
                popup
                visible={this.state.skinModal}
                onClose={this.onClose('skinModal')}
                animationType="slide-up"
                showModal={this.showModal}
            >
                {sidebar}

            </Modal>
        )
    }
}