import Taro, { Component } from '@tarojs/taro'

import MyMap from '../MyMap'

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
const style = { content, row, itemL, itemR, txtH, txtS }

export default class RunHistoryInfo extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            latitude: '',
            longitude: '',
            speed: 0
        }
    }
    refresh() {
        return {
            func: res => {
                console.log(res)
                this.setState(res)
            }
        }
    }
    render() {
        return (
            <View>
                <MyMap refresh={this.refresh()}></MyMap>
                <View style={style.content}>
                    <View style={style.row}>
                        <View style={style.itemL}>
                            <View style={style.txtH}>4.30 KM</View>
                            <View style={style.txtS}>总里程</View>
                        </View>
                        <View style={style.itemR}>
                            <View style={style.txtH}>00:27:35</View>
                            <View style={style.txtS}>总计时间</View>
                        </View>
                    </View>
                    <View style={style.row}>
                        <View style={style.itemL}>
                            <View style={style.txtH}>6'24"</View>
                            <View style={style.txtS}>配速：分钟/公里</View>
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