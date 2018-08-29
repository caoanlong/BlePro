import Taro, { Component } from '@tarojs/taro'

import { View } from '@tarojs/components'
import MyMap from './MyMap'
import sys from '../utils/getSystemInfo'

const height = sys.windowWidth * 0.44
const numInfoStyle = {
    width: '100%',
    height: height + 'px',
    backgroundColor: '#fff'
}
const distanceStyle = {
    width: '100%',
    height: (height * 0.6 - 20) + 'px',
    paddingTop: '20px',
    textAlign: 'center'
}
const speedInfoStyle = {
    width: '100%',
    height: (height * 0.4) + 'px',
    display: 'flex'
}
const itemStyle = {
    flex: 1,
    textAlign: 'center'
}

export default class Ride extends Component {
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
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({time: this.state.time + 1})
        }, 1000)
    }
    componentWillUnmount () {
        clearInterval(this.timer)
        this.timer = null
    }
    refresh() {
        return {
            func: res => {
                console.log(res)
                this.setState(res)
            }
        }
    }
    transTime(time) {
        let h = '00',m = '00', s = '00'
        h = time < 3600 ? '00' : (parseInt(time/3600) < 10 ? ('0' + parseInt(time/3600)) : parseInt(time/3600))
        m = time%3600 < 60 ? '00' : (parseInt(time%3600/60) < 10 ? ('0' + parseInt(time%3600/60)) : parseInt(time%3600/60))
        s = time%60 < 10 ? ('0' + time%60) : time%60
        return h + ':' + m + ':' + s
    }
    render () {
        return (
            <View>
                <MyMap refresh={this.refresh()} />
                <View style={numInfoStyle}>
                    <View style={distanceStyle}>
                        <View style={{display:'inline-block',fontSize:'46px',fontWeight:'bold',color: '#333'}}>5.13</View>
                        <View style={{display:'inline-block',fontSize:'12px',color: '#999',marginLeft: '5px'}}>KM</View>
                    </View>
                    <View style={speedInfoStyle}>
                        <View style={itemStyle}>
                            <View style={{fontSize:'26px',fontWeight:'bold',color: '#333'}}>{this.state.speed}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>配速</View>
                        </View>
                        <View style={itemStyle}>
                            <View style={{fontSize:'26px',fontWeight:'bold',color: '#333'}}>{this.state.speed}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>步数</View>
                        </View>
                        <View style={itemStyle}>
                            <View style={{fontSize:'26px',fontWeight:'bold',color: '#333'}}>{this.transTime(this.state.time)}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>时间</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}