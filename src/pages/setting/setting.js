import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './setting.styl'

export default class Index extends Component {
	config = {
		navigationBarTitleText: '设置'
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