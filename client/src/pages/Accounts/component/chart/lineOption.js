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

        for (let i = scope.startTime; i <= scope.endTime; i += 24 * 60 * 60 * 1000) {

            xDate.push({ value: moment(i).format('M-DD'), textStyle: { color: baseColor }, show: false })
        }

        xDate.forEach(e => {
            let sum = 0;
            accounts.forEach(item => {
                if (e.value === moment(item.date).format('M-DD')) {
                    sum += item.sum
                }
            })
            seriesData.push(sum)
            totalSum += sum

        })
    } else if (timeUnit === 1) {
        // 月
        for (let i = scope.startTime; i <= scope.endTime; i += 24 * 60 * 60 * 1000) {

            xDate.push({ value: new Date(i).getDate(), textStyle: { color: baseColor } })
        }

        xDate.forEach(e => {
            let sum = 0;
            accounts.forEach(item => {
                if (e.value === new Date(item.date).getDate()) {
                    sum += item.sum
                }
            })
            seriesData.push(sum)
            totalSum += sum

        })

    } else if (timeUnit === 2) {
        // 年
        console.log(accounts, scope)
        let year = new Date(scope.startTime).getFullYear()
        for (let i = 0; i < 12; i++) {
            xDate.push({ value: i + 1, textStyle: { color: baseColor } })
        }
        console.log(xDate)
        xDate.forEach(e => {
            let sum = 0;
            accounts.forEach(item => {
                if (e.value === (new Date(item.date).getMonth() + 1)) {
                    sum += item.sum
                }
            })
            seriesData.push(sum)
            totalSum += sum

        })
    }

    return {
        xDate,
        seriesData,
        totalSum
    }
}


export default renderOption;