import Taro, { Component } from '@tarojs/taro'
import './index.styl'
import { 
	View, 
	Canvas,
	Map,
	Image 
} from '@tarojs/components'
import { 
	AtList, 
	AtListItem, 
	AtIcon,
	AtRadio
} from "taro-ui"
import createWxCharts from '../../utils/createWxCharts'
import { startConnect } from '../../utils/connectBle'

export default class Index extends Component {
	config = {
		navigationBarTitleText: '运动'
	}
	constructor() {
		super(...arguments)
		this.state = {
			wxCharts: null,
			windowWidth: 0,
			windowHeight: 0,
			isRunning: false,
			selected: '跑步',
			tipsText: '正在跑步...',
			options: [
				{ value: '跑步', label: '跑步' },
				{ value: '骑行', label: '骑行' },
				{ value: '爬山', label: '爬山' },
				{ value: '打球', label: '打球' },
				{ value: '瑜伽', label: '瑜伽' }
			]
		}
		this.mapCtx = null
	}
	componentWillMount () { }
	componentDidMount () {
		try {
			const res = wx.getSystemInfoSync()    //试图获取屏幕宽高数据
			this.setState({
				windowWidth: res.windowWidth,
				windowHeight: res.windowHeight
			})
		} catch (e) {
			console.error('getSystemInfoSync failed!')   //如果获取失败
		}
		// startConnect()
	}
	componentWillUnmount () { }
	componentDidShow () { }
	componentDidHide () { }
	handleClick(page) {
		Taro.navigateTo({
			url: `/pages/${page}/${page}`
		})
	}
	handleChange(selected) {
		this.setState({ 
			selected,
			tipsText: `正在${selected}...`
		})
	}
	handleSport(isRunning) {
		if (isRunning) {
			this.setState({isRunning: false})
			this.mapCtx = null
		} else {
			this.setState({isRunning: true})
			this.mapCtx = wx.createMapContext('myMap')
			this.mapCtx.moveToLocation()
		}
	}
	render () {
		return (
			<View className='container' style={{height: this.state.windowHeight+'px'}}>
				<View className='head-top'>
					<View className="head-avatar">
						<Image className="avatar" src="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"></Image>
					</View>
					<View className="head-text">
						<View className="head-name">易烊千玺</View>
						<View className="head-mobile">13049497395</View>
					</View>
					<View className="head-setting" onClick={this.handleClick.bind(this, 'setting')}>
						<AtIcon value='settings' size='20' color='#ccc'></AtIcon>
					</View>
				</View>
				{
					this.state.isRunning 
					? <View>
						{/* <View className='tips-text'>{tipsText}</View> */}
						<Map id="myMap" className='map' show-location />
						{/* <Canvas canvas-id="canvas" disable-scroll="true" className='canvas'></Canvas> */}
					</View>
					: <View>
						<AtList>
							<AtListItem title='历史数据' arrow='right' onClick={this.handleClick.bind(this, 'history')} />
							<AtListItem title='我的报告' arrow='right' onClick={this.handleClick.bind(this, 'report')}/>
						</AtList>
						<View>
							<View className='tips-text'>请选择一种运动类型</View>
							<AtRadio options={this.state.options} value={this.state.selected} onClick={this.handleChange} />
						</View>
					</View>
				}
				<View className="start-bottom">
					<View 
						className={this.state.isRunning ? 'end-btn' : 'start-btn'} 
						onClick={this.handleSport.bind(this, this.state.isRunning)}>
						{this.state.isRunning ? '结束' : '开始'}{this.state.selected}
					</View>
				</View>
			</View>
		)
	}
}

