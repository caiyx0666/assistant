import { Component } from 'react'
import { Button, List, Modal } from 'antd-mobile'
import './index.scss'

export default class btnBottm extends Component {
    state = {
        listModal: false
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

    render() {

        const sidebar = (<List>
            <List.Item style={{ borderBottom: '1px solid #efeff3', height: '.875rem' }} className="list-modal-item" onClick={() => { this.props.handleClear(); this.onClose('listModal')() }}><div style={{ textAlign: 'center' }}>清空所有列表</div></List.Item>
            <List.Item style={{ borderBottom: '1px solid #efeff3', height: '.875rem' }} className="list-modal-item" onClick={() => { this.props.handleClearTodo(); this.onClose('listModal')() }}><div style={{ textAlign: 'center' }}>清空todo列表</div></List.Item>
            <List.Item style={{ borderBottom: '1px solid #efeff3', height: '.875rem' }} className="list-modal-item" onClick={() => { this.props.handleClearNone(); this.onClose('listModal')() }}><div style={{ textAlign: 'center' }}>清空done列表</div></List.Item>
        </List>)

        return (
            <div className="list-modal">
                <Button type="primary" className="btn-bottom" onClick={() => this.setState({ listModal: true })}>列表操作</Button>
                <Modal
                    popup
                    visible={this.state.listModal}
                    onClose={this.onClose('listModal')}
                    animationType="slide-up"
                    showModal={this.showModal}
                    footer={[{ text: '取消', onPress: () => { this.onClose('listModal')(); } }]}
                >
                    {sidebar}

                </Modal>
            </div>
        )
    }
}