import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './report.styl'
import sys from '../../utils/getSystemInfo'
import Record from '../../components/Record'

export default class Index extends Component {
	config = {
		navigationBarTitleText: '报告'
	}
	constructor() {
		super(...arguments)
		this.state = {
			records: []
		}
	}
	componentWillMount () { }
	componentDidMount () {
		const records = [
			{
				title: '打球心率报告',
				date: '2018年05月09日'
			},{
				title: '跑步血氧报告',
				date: '2018年05月09日'
			}
		]
		this.setState({ records })
	}
	componentWillUnmount () { }
	componentDidShow () { }
	componentDidHide () { }
	render () {
		return (
			<View className='container' style={{height: sys.windowHeight+'px'}}>
				{this.state.records.map((item, i) => <Record record={item} key={i}/>)}
			</View>
        )
    }
}