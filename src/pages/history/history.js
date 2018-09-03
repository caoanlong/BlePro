import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './history.styl'
// import sys from '../../utils/getSystemInfo'
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
				
			</View>
        )
    }
}