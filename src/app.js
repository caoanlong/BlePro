import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

if (process.env.TARO_ENV === "weapp") {
	require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
	require("taro-ui/dist/h5/css/index.css")
}

import './app.styl'

class App extends Component {
	config = {
		pages: [
			'pages/index/index',
			'pages/history/history',
			'pages/report/report',
			'pages/setting/setting'
		],
		window: {
			backgroundTextStyle: 'dark',
			navigationBarBackgroundColor: '#333',
			navigationBarTitleText: '运动',
			navigationBarTextStyle: 'white'
		},
		// tabBar: {
		// 	color: "#dddddd",
		// 	selectedColor: "#2A8CE5",
		// 	backgroundColor: "#fff",
		// 	borderStyle: "black",
		// 	list: [{
		// 		pagePath: "pages/index/index",
		// 		text: "运动",
		// 		iconPath: "./assets/imgs/sport.png",
		// 		selectedIconPath: "./assets/imgs/sport-active.png"
		// 	},{
		// 		pagePath: "pages/history/history",
		// 		text: "历史",
		// 		iconPath: "./assets/imgs/history.png",
		// 		selectedIconPath: "./assets/imgs/history-active.png"
		// 	},{
		// 		pagePath: "pages/report/report",
		// 		text: "报告",
		// 		iconPath: "./assets/imgs/report.png",
		// 		selectedIconPath: "./assets/imgs/report-active.png"
		// 	},{
		// 		pagePath: "pages/mine/mine",
		// 		text: "我的",
		// 		iconPath: "./assets/imgs/mine.png",
		// 		selectedIconPath: "./assets/imgs/mine-active.png"
		// 	}]
		// }
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
