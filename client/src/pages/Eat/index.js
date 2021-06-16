import { Component } from "react";
import { InputItem } from 'antd-mobile'
import './index.scss'
import Title from '../../components/Title'
import $axios from '../../utils/axios'

export default class Eat extends Component {
    state = {
        foodList: [],
        timer: null,
        active: 0,
        playActiveList: [0, 1, 2, 5, 8, 7, 6, 3],
        timerInt: null
    }

    componentDidMount = () => {
        this.getFoods()
    }

    componentWillUnmount() {
        this.handleTouchEnd()
        clearInterval(this.state.timerInt)
        this.setState({
            timerInt: null
        })
    }

    getFoods = async () => {
        let foods;
        let res = await $axios.get('/getEatList')
        if (res.data.status === 200) {
            foods = res.data.data
        }

        foods = foods.map(item => {
            return { ...item, edit: false }
        })
        this.setState({
            foodList: foods
        })
    }

    setFoods = (code) => {
        this.state.foodList.forEach(item => {
            if (item.code === code) {
                $axios.post('/updateEat', {
                    name: item.name,
                    code: item.code
                }).then(res => {
                    console.log(res)
                })
            }
        })
        // window.localStorage.setItem('FOODLIST', JSON.stringify(this.state.foodList));
    }

    handleTouchStart(index) {
        let timer = setTimeout(() => {
            this.setState({
                foodList: this.state.foodList.map((e, eIndex) => {
                    if (index === eIndex) {
                        e.edit = true;
                    }
                    return e;
                })
            })
        }, 1000)

        this.setState({
            timer: timer
        })

    }

    handleTouchEnd = () => {
        clearTimeout(this.state.timer)
        this.setState({
            timer: null
        })
    }

    handleConfirm(code) {
        this.setState({
            foodList: this.state.foodList.map((e, eIndex) => {
                if (code === e.code) {
                    e.edit = false
                }
                return e;
            })
        }, () => {
            this.setFoods(code)
        })
    }

    handleChange(code, val) {
        this.setState({
            foodList: this.state.foodList.map((e, eIndex) => {
                if (code === e.code) {
                    e.name = val
                }
                return e;
            })
        })
    }

    handleBlur(code) {
        this.setState({
            foodList: this.state.foodList.map((e, eIndex) => {
                if (code === e.code) {
                    e.edit = false
                }
                return e;
            })
        }, () => {
            this.setFoods(code)
        })
    }

    play = () => {
        if (this.state.timerInt) return;
        let num = parseInt(6 + Math.random() * 8) * 1000
        let startTime = new Date().getTime();

        let speed = 200

        let timer = setTimeout(startscroll.bind(this), speed)

        this.setState({
            timerInt: timer
        })

        function startscroll() {
            var nowTime = new Date().getTime();

            if ((nowTime - startTime) >= num) {
                clearInterval(timer)
                timer = null;
                this.setState({
                    timerInt: timer
                })
                return;
            }

            if ((nowTime - startTime) <= (num / 4) && speed >= 30) {
                speed -= 20
            } else if ((nowTime - startTime) >= (num / 3)) {
                speed += 50
            }

            if (this.state.active < 7) {
                this.setState({
                    active: this.state.active + 1
                })
            } else {
                this.setState({
                    active: 0
                })
            }

            timer = setTimeout(startscroll.bind(this), speed)

            this.setState({
                timerInt: timer
            })

            // 20 200    200-20 = 180  90
            // 当前速度

        }

        this.setState({
            timerInt: timer
        })
    }

    render() {
        return (<div className="eat-wrapper">
            <Title>今天吃什么</Title>
            <span style={{ color: '#999', fontSize: '.34375rem' }}>从此不再纠结</span>
            <div className="lucky-draw">
                {this.state.foodList.map((item, index) => {
                    if (index === 4) {
                        return (<div className="eat-select-item" key={item.code}>
                            <i className="iconfont icon-kaishi play-btn" onClick={this.play}></i>
                        </div>)
                    }

                    if (item.edit) {
                        return (<div className="eat-select-item" key={item.code}>
                            <InputItem
                                placeholder="输入你想吃的"
                                value={item.name}
                                ref={el => this.autoFocusInst = el}
                                className="eat-input"
                                onVirtualKeyboardConfirm={this.handleConfirm.bind(this, item.code)}
                                onChange={this.handleChange.bind(this, item.code)}
                                onBlur={this.handleBlur.bind(this, item.code)}
                                clear
                            >{''}</InputItem>
                        </div>)
                    }

                    return (
                        <div className={`eat-select-item ${this.state.playActiveList[this.state.active] === index ? 'active-item' : ''}`} key={item.code} onTouchStart={this.handleTouchStart.bind(this, index)} onTouchEnd={this.handleTouchEnd}>
                            <span>{item.name}</span>
                        </div>
                    )
                })
                }
            </div>
        </div>)
    }
}