import Taro, { Component } from '@tarojs/taro'
import pdfPNG from '../assets/imgs/pdf.png'

const record = {
    display: 'flex',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5'
}
const left = {
    flex: '0 0 50px',
    padding: '10px'
}
const recordImg = {
    width: '50px'
}
const right = {
    flex: 1,
    padding: '10px'
}
const recordTitle = {
    fontSize: '14px',
    lineHeight: '32px',
    position: 'relative'
}
const recordDate = {
    fontSize: '12px',
    color: '#999',
    lineHeight: '16px'
}
const style = { record, left, recordImg, right, recordTitle, recordDate }

export default class Record extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <View style={style.record}>
                <View style={style.left}>
                    <Image style={style.recordImg} mode="widthFix" src={pdfPNG}/>
                </View>
                <View style={style.right}>
                    <View style={style.recordTitle}>{this.props.record.title}</View>
                    <View style={style.recordDate}>日期：2018年05月09日</View>
                </View>
            </View>
        )
    }
}