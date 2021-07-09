import moment from 'moment'


function renderOption({ accounts, scope, timeUnit }) {

    const theme = window.localStorage.getItem('theme');
    let baseColor = ''
    switch (theme) {
        case 'color1':
            baseColor = '#009999'
            break;
        case 'color2':
            baseColor = '#ef4134'
            break;
        case 'color3':
            baseColor = '#108ee8'
            break;
        case 'color4':
            baseColor = '#f4317e'
            break;
        case 'color5':
            baseColor = '#f46a00'
            break;
        case 'color6':
            baseColor = '#7265e5'
            break;
        case 'color7':
            baseColor = '#febe00'
            break;
        case 'color8':
            baseColor = '#00a854'
            break;
        case 'color9':
            baseColor = '#2e3238'
            break;
        default:
            baseColor = '#009999'
            break;
    }

    const { xDate, seriesData, totalSum } = getData({ accounts, scope, timeUnit, baseColor })

    return {
        title: {
            text: `总支出：${totalSum}`,
            subtext: `平均值：${(totalSum / xDate.length).toFixed(2)}`,
            textStyle: {
                color: '#6b6b6b',
                fontSize: 12,
                fontWeight: 400
            },
            subtextStyle: {
                color: '#6b6b6b',
                fontSize: 11
            }
        },
        xAxis: {
            type: 'category',
            data: xDate,
            axisLine: {
                lineStyle: {
                    color: baseColor
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            show: false,
            axisLabel: {
                formatter: '{value}￥'
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '最高气温',
            data: seriesData,
            type: 'line',
            lineStyle: {
                color: baseColor,
                width: '1'
            },
            itemStyle: {
                color: baseColor
            },
            markLine: {
                symbol: 'none',
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                    },
                    {
                        type: 'min',
                        name: '最小值',
                    }
                ],
                label: {
                    color: baseColor
                },
            }
        }],
        grid: {
            y2: 20,
            x: 20,
            x2: 40
        },
    };
}

function getData({ accounts, scope, timeUnit, baseColor }) {
    let xDate = []
    let seriesData = []
    let totalSum = 0

    if (timeUnit === 0) {
        // 周
        let day = moment(new Date().getTime()).format('M-DD')
        for (let i = scope.startTime; i <= scope.endTime; i += 24 * 60 * 60 * 1000) {

            if (moment(i).format('M-DD') === day) {
                xDate.push({ value: '今天', textStyle: { color: baseColor } })
                continue
            }

            xDate.push({ value: moment(i).format('M-DD'), textStyle: { color: baseColor } })
        }

        xDate.forEach(e => {
            let sum = 0;
            accounts.forEach(item => {
                if ((e.value === moment(item.date).format('M-DD')) || (e.value === '今天' && moment(item.date).format('M-DD') === moment(new Date().getTime()).format('M-DD'))) {
                    sum += item.sum
                }
            })
            seriesData.push(sum)
            totalSum += sum *100

        })
    } else if (timeUnit === 1) {
        // 月
        let date = new Date().getTime()
        for (let i = scope.startTime; i <= scope.endTime; i += 24 * 60 * 60 * 1000) {
            if (((date - i) < 24 * 60 * 60 * 1000) && (i < date)) {
                xDate.push({ value: '今天', textStyle: { color: baseColor } })
                continue
            }
            xDate.push({ value: new Date(i).getDate(), textStyle: { color: baseColor } })
        }

        xDate.forEach(e => {
            let sum = 0;
            accounts.forEach(item => {
                if ((e.value === new Date(item.date).getDate()) || (e.value === '今天' && new Date(item.date).getDate() === new Date(new Date().getTime()).getDate())) {
                    sum += item.sum
                }
            })
            seriesData.push(sum)
            totalSum += sum*100

        })

    } else if (timeUnit === 2) {
        // 年
        let month = new Date().getMonth()
        for (let i = 0; i < 12; i++) {
            if (i === month) {
                xDate.push({ value: '本月', textStyle: { color: baseColor } })
                continue
            }
            xDate.push({ value: i + 1, textStyle: { color: baseColor } })
        }
        xDate.forEach(e => {
            let sum = 0;
            accounts.forEach(item => {
                if ((e.value === (new Date(item.date).getMonth() + 1)) || (e.value === '本月' && new Date(item.date).getMonth() === new Date(new Date().getTime()).getMonth())) {
                    sum += item.sum
                }
            })
            seriesData.push(sum)
            totalSum += sum*100

        })
    }

    return {
        xDate,
        seriesData,
        totalSum: totalSum/100
    }
}


export default renderOption;