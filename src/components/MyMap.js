import Taro, { Component } from '@tarojs/taro'

import { View, Map } from '@tarojs/components'

import sys from '../utils/getSystemInfo'

const mapStyle = {
    width: '100%',
    height: (sys.windowWidth * 2/3) + 'px',
    backgroundColor: '#fff'
}

export default class MyMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: '',
            longitude: '',
            speed: 0,
            accuracy: ''
        }
        this.mapCtx = null
        this.timer = null
    }
    componentDidMount () {
        this.getLocation()
        this.timer = setInterval(() => {
            this.getLocation()
        }, 3000)
    }
    componentWillUnmount () {
        clearInterval(this.timer)
        this.timer = null
    }
    getLocation() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.props.refresh.func(res)
                this.setState(res, () => {
                    this.mapCtx = wx.createMapContext('myMap', this)
			        this.mapCtx.moveToLocation()
                })
            }
        })
    }
    render () {
        return (
            <View>
                <Map id="myMap" longitude={this.state.longitude} latitude={this.state.latitude} style={mapStyle} show-location />
            </View>
        )
    }
}