import Taro, { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane} from 'taro-ui'
import './history.styl'
import sys from '../../utils/getSystemInfo'
import RunHistory from '../../components/RunHistory'
import RideHistory from '../../components/RideHistory'
import PlayBallHistory from '../../components/PlayBallHistory'
import ClimbHistory from '../../components/ClimbHistory'
import YogaHistory from '../../components/YogaHistory'
const run = [
	{
		date: '2018/07/22 22:12',
		distance:'20.19',
		time: '03:11:45'
	},{
		date: '2018/07/08 17:58',
		distance:'5.26',
		time: '00:32:28'
	}
]
const ride = [
	{
		date: '2018/07/22 22:12',
		distance:'20.19',
		time: '03:11:45'
	}
]
const climb = [
	{
		date: '2018/07/22 22:12',
		distance:'20.19',
		time: '03:11:45'
	}
]
const playBall = [
	{
		date: '2018/07/22 22:12',
		heartRate:'115',
		time: '03:11:45'
	},{
		date: '2018/07/08 17:58',
		heartRate:'135',
		time: '00:32:28'
	}
]
const yoga = [
	{
		date: '2018/07/22 22:12',
		heartRate:'96',
		time: '03:11:45'
	},{
		date: '2018/07/08 17:58',
		heartRate:'85',
		time: '00:32:28'
	}
]
export default class History extends Component {
	config = {
		navigationBarTitleText: '历史'
	}
	constructor() {
		super(...arguments)
		this.state = {
			current: 0,
			tabList: [ { title: '跑步' }, { title: '骑行' }, { title: '爬山' }, { title: '打球' }, { title: '瑜伽' } ],
			historyList: []
		}
	}
	componentWillMount () { }
	componentDidMount () {
		this.setState({ historyList: run })
	}
	componentWillUnmount () { }
	componentDidShow () { }
	componentDidHide () { }
	handleClick(current) {
		let historyList = []
		if (current === 0) {
			historyList = run
		} else if (current === 1) {
			historyList = ride
		} else if (current === 2) {
			historyList = climb
		} else if (current === 3) {
			historyList = playBall
		} else if (current === 4) {
			historyList = yoga
		}
		this.setState({ current, historyList })
	}
	render () {
		return (
			<View className='container' style={{height: sys.windowHeight+'px'}}>
				<AtTabs
					current={this.state.current}
					tabList={this.state.tabList}
					onClick={this.handleClick}>
					<AtTabsPane>
						<View className='tab-content'>
						{this.historyList.map((item,i) => <RunHistory key={i} history={item}/>)}
						</View>
					</AtTabsPane>
					<AtTabsPane>
						<View className='tab-content'>
						{this.historyList.map((item,i) => <RideHistory key={i} history={item}/>)}
						</View>
					</AtTabsPane>
					<AtTabsPane>
						<View className='tab-content'>
						{this.historyList.map((item,i) => <ClimbHistory key={i} history={item}/>)}
						</View>
					</AtTabsPane>
					<AtTabsPane>
						<View className='tab-content'>
						{this.historyList.map((item,i) => <PlayBallHistory key={i} history={item}/>)}
						</View>
					</AtTabsPane>
					<AtTabsPane>
						<View className='tab-content'>
						{this.historyList.map((item,i) => <YogaHistory key={i} history={item}/>)}
						</View>
					</AtTabsPane>
				</AtTabs>
			</View>
        )
    }
}