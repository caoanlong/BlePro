import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.styl'

class App extends Component {
	config = {
		pages: [
			'pages/index/index',
			'pages/history/history',
			'pages/report/report',
			'pages/mine/mine'
		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: '运动',
			navigationBarTextStyle: 'black'
		},
		tabBar: {
			color: "#dddddd",
			selectedColor: "#2A8CE5",
			backgroundColor: "#fff",
			borderStyle: "black",
			list: [{
				pagePath: "pages/index/index",
				text: "运动",
				iconPath: "./assets/imgs/sport.png",
				selectedIconPath: "./assets/imgs/sport-active.png"
			},{
				pagePath: "pages/history/history",
				text: "历史",
				iconPath: "./assets/imgs/history.png",
				selectedIconPath: "./assets/imgs/history-active.png"
			},{
				pagePath: "pages/report/report",
				text: "报告",
				iconPath: "./assets/imgs/report.png",
				selectedIconPath: "./assets/imgs/report-active.png"
			},{
				pagePath: "pages/mine/mine",
				text: "我的",
				iconPath: "./assets/imgs/mine.png",
				selectedIconPath: "./assets/imgs/mine-active.png"
			}]
		}
	}

	componentDidMount() { }

	componentDidShow() { }

	componentDidHide() { }

	componentCatchError() { }

	render() {
		return (
			<Index />
		)
	}
}

Taro.render(<App />, document.getElementById('app'))
