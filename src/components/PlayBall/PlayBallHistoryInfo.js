import Taro, { Component } from '@tarojs/taro'

import WxCharts from '../../utils/wecharts'
import sys from '../../utils/getSystemInfo'
import { hms } from '../../utils/transTime'

const canvasStyle = {
    width: '100%',
    height: (sys.windowWidth * 2/3) + 'px',
    backgroundColor: '#fff'
}
const content = {
    width: '100%',
    backgroundColor: '#fff'
}
const row = {
    display: 'flex',
    borderBottom: '1px solid #ddd'
}
const itemL = {
    flex: 1,
    padding: '10px 0',
    textAlign: 'center',
    borderRight: '1px solid #ddd'
}
const itemR = {
    flex: 1,
    padding: '10px 0',
    textAlign: 'center'
}
const txtH = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333'
}
const txtS = {
    fontSize: '14px',
    color: '#999'
}
const style = { canvasStyle, content, row, itemL, itemR, txtH, txtS }

export default class PlayBallHistoryInfo extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            
        }
        this.wxCharts = null
        this.options = {
            animation: true, //是否有动画
            canvasId: 'canvas',
            type: 'area',
            categories: ["15:36:50", "15:36:55", "15:37:00", "15:37:05", "15:37:10", "15:37:15", "15:37:20", "15:37:25", "15:37:30", "15:37:35", "15:37:40"],    //模拟的x轴横坐标参数
            series: [{   //具体坐标数据
                color: '#08dab5',
                name: '血氧',  //名字
                data: [20, 70, 60, 110, 120, 105, 70, 10, 40, 20, 90],  //数据点
                format: (val, name) => val + 'mmHg'  //点击显示的数据注释
            }, {
                color: '#a752ff',
                name: '心率',
                data: [50, 30, 100, 50, 30, 90, 125, 80, 100, 40, 60],
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
            width: sys.windowWidth,  //图表展示内容宽度
            height: 240,  //图表展示内容高度
            dataLabel: false,  //是否在图表上直接显示数据
            dataPointShape: false, //是否在图标上显示数据点标志
            extra: {
                lineStyle: 'straight'  //曲线或直线
            }
        }
    }
    componentDidMount () {
		this.handCreateWxCharts()
    }
    handCreateWxCharts() {
        this.wxCharts = new WxCharts(this.options)
	}
    render() {
        return (
            <View>
                <Canvas canvas-id="canvas" disable-scroll="true" style={style.canvasStyle}></Canvas><PlayBall/>
                <View style={style.content} onClick={this.handCreateWxCharts}>
                    <View style={style.row}>
                        <View style={style.itemL}>
                            <View style={style.txtH}>125</View>
                            <View style={style.txtS}>心率</View>
                        </View>
                        <View style={style.itemL}>
                            <View style={style.txtH}>00:27:35</View>
                            <View style={style.txtS}>总计时间</View>
                        </View>
                        <View style={style.itemR}>
                            <View style={style.txtH}>4605</View>
                            <View style={style.txtS}>总步数：步</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}