import Taro, { Component } from '@tarojs/taro'

import { View } from '@tarojs/components'
import MyMap from '../MyMap'
import sys from '../../utils/getSystemInfo'
import { hms2 } from '../../utils/transTime'

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

export default class Climb extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            time: 0,
            latitude: '',
            longitude: '',
            speed: 0,
            altitude: 0
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
                            <View style={{fontSize:'28px',fontWeight:'bold',color: '#333'}}>{this.state.altitude}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>高度</View>
                        </View>
                        <View style={itemStyle}>
                            <View style={{fontSize:'26px',fontWeight:'bold',color: '#333'}}>{this.state.speed}</View>
                            <View style={{fontSize:'12px',color: '#999'}}>步数</View>
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