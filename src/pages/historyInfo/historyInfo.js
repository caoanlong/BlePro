import Taro, { Component } from '@tarojs/taro'
import './historyInfo.styl'
import MyMap from '../../components/MyMap'
import createWxCharts from '../../utils/createWxCharts'
export default class HistoryInfo extends Component {
    config = {
		navigationBarTitleText: '历史详情'
    }
    constructor() {
        super(...arguments)
    }
    render() {
        return (
            <View className='container'>
                
            </View>
        )
    }
}