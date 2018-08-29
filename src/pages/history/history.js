import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './history.styl'
import sys from '../../utils/getSystemInfo'
import createWxCharts from '../../utils/createWxCharts'
const canvasStyle = {
    width: '100%',
    height: (sys.windowWidth * 2/3) + 'px',
    padding: '20px 0',
    backgroundColor: '#fff'
}
export default class Index extends Component {
	config = {
		navigationBarTitleText: '历史'
	}
	constructor() {
		super(...arguments)
	}
	componentWillMount () { }
	componentDidMount () {
		createWxCharts()
	}
	componentWillUnmount () { }
	componentDidShow () { }
	componentDidHide () { }
	render () {
		return (
			<View className='container'>
				<Canvas canvas-id="canvas" disable-scroll="true" style={canvasStyle}></Canvas>
			</View>
        )
    }
}