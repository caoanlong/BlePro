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
            console.log('run')
        } else if (this.state.type == 'ride') {
            console.log('ride')
        } else if (this.state.type == 'climb') {
            console.log('climb')
        } else if (this.state.type == 'playball') {
            console.log('playball')
        } else if (this.state.type == 'yoga') {
            console.log('yoga')
        }
        return (
            <View className='container'>
                
            </View>
        )
    }
}