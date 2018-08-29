import Taro, { Component } from '@tarojs/taro'

import { View } from '@tarojs/components'
import sys from '../utils/getSystemInfo'
import { hms2 } from '../utils/transTime'

const height = sys.windowWidth * 0.44
const numInfoStyle = {
    width: '100%',
    height: height + 'px',
    backgroundColor: '#fff'
}
const speedInfoStyle = {
    width: '100%',
    height: height + 'px',
    display: 'flex'
}
const itemStyle = {
    flex: 1,
    textAlign: 'center'
}

export default class Yoga extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            time: 0,
            latitude: '',
            longitude: '',
            speed: 0
        }
        this.timer = null
    }
    componentWillMount () { }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({time: this.state.time + 1})
        }, 1000)
    }
    componentWillUnmount () {
        clearInterval(this.timer)
        this.timer = null
    }
    render () {
        return (
            <View>
                <View style={numInfoStyle}>
                    <View style={speedInfoStyle}>
                        <View style={itemStyle}>
                            <View style={{fontSize:'28px',fontWeight:'bold',color: '#333'}}>{this.state.speed}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>心率</View>
                        </View>
                        <View style={itemStyle}>
                            <View style={{fontSize:'28px',fontWeight:'bold',color: '#333'}}>{hms2(this.state.time)}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>时间</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}