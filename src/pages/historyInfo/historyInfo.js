import Taro, { Component } from '@tarojs/taro'
import './historyInfo.styl'
import sys from '../../utils/getSystemInfo'
import RunHistoryInfo from '../../components/Run/RunHistoryInfo'
import RideHistoryInfo from '../../components/Ride/RideHistoryInfo'
import ClimbHistoryInfo from '../../components/Climb/ClimbHistoryInfo'
import PlayBallHistoryInfo from '../../components/PlayBall/PlayBallHistoryInfo'
export default class HistoryInfo extends Component {
    config = {
		navigationBarTitleText: '历史详情'
    }
    constructor() {
        super(...arguments)
        this.state = {
            type: null
        }
    }
    componentDidMount() {
        this.setState({ type: this.$scope.options.type })
    }
    render() {
        let renderType = null
        if (this.state.type == 'run') {
            renderType = (<RunHistoryInfo/>)
        } else if (this.state.type == 'ride') {
            renderType = (<RideHistoryInfo/>)
        } else if (this.state.type == 'climb') {
            renderType = (<ClimbHistoryInfo/>)
        } else if (this.state.type == 'playBall') {
            renderType = (<PlayBallHistoryInfo/>)
        } else if (this.state.type == 'yoga') {
            console.log('yoga')
        }
        return (
            <View className='container' style={{height: sys.windowHeight+'px'}}>
                {renderType}
            </View>
        )
    }
}