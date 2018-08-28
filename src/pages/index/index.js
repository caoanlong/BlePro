import Taro, { Component } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import './index.styl'
import createWxCharts from '../../utils/createWxCharts'
import { startConnect } from '../../utils/connectBle'

export default class Index extends Component {
	config = {
		navigationBarTitleText: '运动'
	}
	constructor() {
		super(...arguments)
		this.state = {
			dataInfo: '0000',
			current: 0
		}
	}
	componentWillMount () { }
	componentDidMount () {
		// startConnect()
		if (!wx) return
		createWxCharts()
	}
	componentWillUnmount () { }
	componentDidShow () { }
	componentDidHide () { }
	handleClick(current) {
		this.setState({ current })
	}
	render () {
		return (
			<View className='container'>
				<Canvas canvas-id="canvas" disable-scroll="true" className='canvas'></Canvas>
				<Text>{this.state.dataInfo}</Text>
			</View>
		)
	}
}

