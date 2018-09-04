import Taro, { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane} from 'taro-ui'
import './history.styl'
import sys from '../../utils/getSystemInfo'
import RunHistory from '../../components/Run/RunHistory'
import RideHistory from '../../components/Ride/RideHistory'
import PlayBallHistory from '../../components/PlayBall/PlayBallHistory'
import ClimbHistory from '../../components/Climb/ClimbHistory'
import YogaHistory from '../../components/Yoga/YogaHistory'
import { run, ride, climb, playBall, yoga } from '../../assets/data/history'

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