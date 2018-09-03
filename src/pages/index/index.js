import Taro, { Component } from '@tarojs/taro'
import './index.styl'
import { View, Image } from '@tarojs/components'
import { AtList, AtListItem, AtIcon,AtRadio } from "taro-ui"
import sys from '../../utils/getSystemInfo'
import Run from '../../components/Run'
import Ride from '../../components/Ride'
import Climb from '../../components/Climb'
import PlayBall from '../../components/PlayBall'
import Yoga from '../../components/Yoga'
import { startConnect } from '../../utils/connectBle'
import createWxCharts from '../../utils/createWxCharts'
import { hms } from '../../utils/transTime'
const canvasStyle = {
    width: '100%',
    height: (sys.windowWidth * 2/3) + 'px',
    backgroundColor: '#fff'
}
export default class Index extends Component {
	config = {
		navigationBarTitleText: '运动'
	}
	constructor() {
		super(...arguments)
		this.state = {  
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
		this.wxCharts = null
		this.wxChartsOpt = {
			windowWidth: sys.windowWidth,
			categories: [],
			bloodOxygen: [20, 70, 60, 110, 120, 105, 70, 10, 40, 20, 90],
			heartRate: [50, 30, 100, 50, 30, 90, 125, 80, 100, 40, 60]
		}
	}
	componentWillMount () { }
	componentDidMount () {
		// startConnect()
		this.handCreateWxCharts()
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
		// this.wxCharts = null
		this.setState({ 
			selected,
			tipsText: `正在${selected}...`
		})
		// if (this.state.selected == '打球' || this.state.selected == '瑜伽') {
		// 	this.wxCharts = createWxCharts(this.wxChartsOpt)
		// }
	}
	handleSport(isRunning) {
		this.setState({isRunning: !isRunning})
	}
	handCreateWxCharts() {
		const categories = []
		const bloodOxygen = []
		const heartRate = []
		for (let i = 0; i < 20; i++) {
			categories.unshift(hms(new Date(Date.now() - i * 5000)))
			bloodOxygen.unshift(parseInt(Math.random()*100))
			heartRate.unshift(parseInt(Math.random()*100))
		}
		this.wxChartsOpt.categories = categories
		this.wxChartsOpt.bloodOxygen = bloodOxygen
		this.wxChartsOpt.heartRate = heartRate
		this.wxCharts = createWxCharts(this.wxChartsOpt)
	}
	render () {
		this.wxCharts = null
		const sportType = null
		if (this.state.selected == '跑步') {
			sportType = (<Run/>)
		} else if (this.state.selected == '骑行') {
			sportType = (<Ride/>)
		} else if (this.state.selected == '爬山') {
			sportType = (<Climb/>)
		} else if (this.state.selected == '打球') {
			this.handCreateWxCharts()
			sportType = (<View><Canvas canvas-id="canvas" disable-scroll="true" style={canvasStyle}></Canvas><PlayBall/></View>)
		} else if (this.state.selected == '瑜伽') {
			this.handCreateWxCharts()
			sportType = (<View><Canvas canvas-id="canvas" disable-scroll="true" style={canvasStyle}></Canvas><Yoga/></View>)
		}
		return (
			<View className='container' style={{height: sys.windowHeight+'px'}}>
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
					? sportType
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

