import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from "taro-ui"

export default class HeadTop extends Component {
    render() {
        return (
            <View className='head-top'>
                <View className="head-avatar">
                    <Image className="avatar" src="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"></Image>
                </View>
                <View className="head-text">
                    <View className="head-name">易烊千玺</View>
                    <View className="head-mobile">13049497395</View>
                </View>
                <View className="head-setting">
                    <AtIcon value='settings' size='20' color='#bbb'></AtIcon>
                </View>
            </View>
        )
    }
}