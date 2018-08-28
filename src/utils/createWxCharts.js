import WxCharts from './wecharts'

export default function createWxCharts() {
    const options = {
        animation: true, //是否有动画
        canvasId: 'canvas',
        type: 'line',
        categories: [
            '2018-6-13', 
            '2018-6-14', 
            '2018-6-15', 
            '2018-6-16', 
            '2018-6-17', 
            '2018-6-18', 
            '2018-6-19'
        ],    //模拟的x轴横坐标参数
        animation: true,  //是否开启动画
        series: [{   //具体坐标数据
            name: '收缩压',  //名字
            data: [60, 90, 60, 110, 120, 105, 70],  //数据点
            format: (val, name) => val + 'mmHg'  //点击显示的数据注释
        }, {
            name: '舒张压',
            data: [50, 100, 80, 115, 120, 90, 125],
            format: (val, name) => val + 'mmHg'
        }, {
            name: '心率',
            data: [60, 70, 90, 105, 120, 130, 95],
            format: (val, name) => val + '次/分钟'
        }
        ],
        xAxis: {   //是否隐藏x轴分割线
            disableGrid: true,
        },
        yAxis: {      //y轴数据
            title: '数值',  //标题
            format: val => val.toFixed(2), //返回数值
            min: 30,   //最小值
            max: 180,   //最大值
            gridColor: '#D8D8D8',
        },
        width: 375,  //图表展示内容宽度
        height: 240,  //图表展示内容高度
        dataLabel: false,  //是否在图表上直接显示数据
        dataPointShape: true, //是否在图标上显示数据点标志
        extra: {
            lineStyle: 'curve'  //曲线
        }
    }
    return new WxCharts(options)
}