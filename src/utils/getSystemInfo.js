let windowWidth = 0, windowHeight = 0

try {
    //试图获取屏幕宽高数据
    const res = wx.getSystemInfoSync()
    windowWidth = res.windowWidth
    windowHeight = res.windowHeight
} catch (e) {
    console.error('getSystemInfoSync failed!')
}

export default {
    windowWidth,
    windowHeight
}