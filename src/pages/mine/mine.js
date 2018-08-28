import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './mine.styl'

export default class Index extends Component {
	config = {
		navigationBarTitleText: '我的'
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