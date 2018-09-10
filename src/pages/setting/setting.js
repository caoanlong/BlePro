import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
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
			<View className='container'>
				<AtList>
					<AtListItem title='姓名' arrow='right' extraText='易烊千玺'/>
					<AtListItem title='手机' arrow='right' extraText='13049497395'/>
				</AtList>
				<View style={{padding: '0 20px', marginTop: '20px'}}>
					<Button>退出</Button>
				</View>
			</View>
        )
    }
}