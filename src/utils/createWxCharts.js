import WxCharts from './wecharts'

export default function createWxCharts({ windowWidth, categories, bloodOxygen, heartRate }) {
    const options = {
        animation: true, //是否有动画
        canvasId: 'canvas',
        type: 'area',
        categories,    //模拟的x轴横坐标参数
        series: [{   //具体坐标数据
            color: '#08dab5',
            name: '血氧',  //名字
            data: bloodOxygen,  //数据点
            format: (val, name) => val + 'mmHg'  //点击显示的数据注释
        }, {
            color: '#a752ff',
            name: '心率',
            data: heartRate,
            format: (val, name) => val + '次/分钟'
        }],
        xAxis: {   //是否隐藏x轴分割线
            disableGrid: true,
        },
        yAxis: {      //y轴数据
            min: 0,
            format: val => val.toFixed(2), //返回数值
            gridColor: '#D8D8D8',
        },
        width: windowWidth,  //图表展示内容宽度
        height: 240,  //图表展示内容高度
        dataLabel: false,  //是否在图表上直接显示数据
        dataPointShape: false, //是否在图标上显示数据点标志
        extra: {
            lineStyle: 'straight'  //曲线或直线
        }
    }
    return new WxCharts(options)
}