import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './history.styl'

export default class Index extends Component {
	config = {
		navigationBarTitleText: '历史'
	}
	constructor() {
		super(...arguments)
	}
	componentWillMount () { }
	componentDidMount () {
	}
	componentWillUnmount () { }
	componentDidShow () { }
	componentDidHide () { }
	render () {
		return (
			<View className='container'></View>
        )
    }
}