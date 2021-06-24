import { Component } from "react";
import PropTypes from 'prop-types'

import styles from './index.module.scss'

export default class progressChart extends Component {
    render() {
        const { icon, category, rate, value } = this.props
        return (<div className={styles.progress_wrapper}>
            <div className={styles.icon_wrapper}>
                <i className={['iconfont', icon, styles.icon].join(' ')}></i>
            </div>
            <div className={styles.progress_content}>
                <div className={styles.progress_content_top}>
                    <div>
                        <span style={{ marginRight: '.2rem' }}>{category}</span>
                        <span>{rate + '%'}</span>
                    </div>
                    <span>{value}</span>
                </div>
                <div className={styles.progress_box}>
                    <div className={styles.progress} style={{ width: `${rate}%` }}></div>
                </div>
            </div>
        </div>)
    }
}

progressChart.propTypes = {
    icon: PropTypes.string,
    category: PropTypes.string,
    rate: PropTypes.number,
    value: PropTypes.number
}