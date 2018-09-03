import Taro, { Component } from '@tarojs/taro'

const wrap = {
    position: 'relative',
    color: '#999',
    padding: '10px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5'
}
const date = {
    fontSize: '12px'
}
const info = {
    fontWeight: 'bold'
}
const distance = {
    display: 'inline-block',
    fontSize: '28px',
    color: '#333'
}
const unit = {
    display: 'inline-block',
    fontSize: '20px',
    paddingLeft: '10px',
    paddingRight: '20px'
}
const time = {
    display: 'inline-block',
    fontSize: '20px'
}
const arrow = {
    position: 'absolute',
    right: '15px',
    top: '30px',
    width: '10px',
    height: '10px',
    borderTop: '2px solid #ccc',
    borderRight: '2px solid #ccc',
    transform: 'rotate(45deg)'
}
const style = { wrap, date, info, distance, unit, time, arrow }

export default class RunHistory extends Component {
    handleClick(page) {
		Taro.navigateTo({
			url: `/pages/${page}/${page}`
		})
	}
    render () {
        return (
            <View style={style.wrap} onClick={this.handleClick.bind(this, 'historyInfo')}>
                <View style={style.date}>{this.props.history.date}</View>
                <View style={style.info}>
                    <View style={style.distance}>{this.props.history.distance}</View>
                    <View style={style.unit}>KM</View>
                    <View style={style.time}>{this.props.history.time}</View>
                </View>
                <View style={style.arrow}></View>
            </View>
        )
    }
}