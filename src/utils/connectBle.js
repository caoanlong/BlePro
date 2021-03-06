const serviceId = '0000FEE7-0000-1000-8000-00805F9B34FB'
const characteristicId = '0000FEC9-0000-1000-8000-00805F9B34FB'
const characteristicIdWrite = '0000FEC7-0000-1000-8000-00805F9B34FB'

// 开始
export const startConnect = function() {
    wx.showLoading({ title: '开启蓝牙适配' })
    // 开启蓝牙适配器
    wx.openBluetoothAdapter({
        success: res => {
            console.log('初始化蓝牙适配器')
            console.log(res)
            getBluetoothAdapterState()
        },
        fail: err => {
            wx.showToast({
                title: '蓝牙初始化失败',
                duration: 2000
            })
            setTimeout(() => {
                wx.hideToast()
            }, 2000)
        }
    })
    wx.onBluetoothAdapterStateChange(res => {
        if (res.available) {
            getBluetoothAdapterState()
        }
    })
}
// 获取本机蓝牙适配器状态
function getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
        success: res => {
            if (!res.available) {
                wx.showToast({
                    title: '设备无法开启蓝牙连接',
                    duration: 2000
                })
                setTimeout(() => {
                    wx.hideToast()
                }, 2000)
            } else {
                if (!res.discovering) {
                    startBluetoothdeviceDiscovery()
                }
            }
        }
    })
}
// 开始搜索蓝牙设备
function startBluetoothdeviceDiscovery() {
    wx.showLoading({ title: '蓝牙搜索' })
    wx.startBluetoothDevicesDiscovery({
        services: [serviceId],
        allowDuplicatesKey: false,
        success: res => {
            if (!res.isDiscovering) {
                getBluetoothAdapterState()
            } else {
                onBluetoothDeviceFound()
            }
        },
        fail: err => { console.log(err) }
    })
}
// 监听寻找到新设备的事件
function onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound(res => {
        console.log('设备已搜索到', res.devices)
        if (res.devices[0].deviceId) {
            startConnectDevices(res.devices[0].deviceId)
        }
    })
}
// 开始连接要配对的设备
function startConnectDevices(deviceId) {
    stopBluetoothDevicesDiscovery()
    wx.createBLEConnection({
        deviceId,
        success: res => {
            console.log('开始连接要配对的设备', res)
            if (res.errCode == 0) {
                setTimeout(() => {
                    writeBLECharacteristicValue(deviceId, serviceId, characteristicId)
                    // notifyBLECharacteristicValueChange(deviceId, serviceId, characteristicId)
                }, 2000)
            }
        },
        fail: err => {
            console.log('配对失败：', err)
            wx.showToast({
                title: '配对失败',
                duration: 2000
            })
            setTimeout(function () {
                wx.hideToast()
            }, 2000)
        }
    })
}

// 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
function readBLECharacteristicValue(deviceId, serviceId, characteristicId) {
    wx.readBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId,
        success: res => {
            console.log('readBLECharacteristicValue:', res)
        },
        fail: err => {
            console.log(err)
        }
    })
}

/** 
 * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
 * tips: 并行调用多次读写接口存在读写失败的可能性
 */
function writeBLECharacteristicValue(deviceId, serviceId) {
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(5)
    let dataView = new DataView(buffer)
    let time = String(Date.parse(new Date()))
    let time16 = Number(time.substr(0,10)).toString(16)
    dataView.setInt8(0, 2) // (max signed 8-bit integer)
    // dataView.setInt8(1, '0x' + time16[6]+time16[7])
    // dataView.setInt8(2, '0x' + time16[4]+time16[5])
    // dataView.setInt8(3, '0x' + time16[2]+time16[3])
    // dataView.setInt8(4, '0x' + time16[0]+time16[1])
    // console.log(dataView.getInt8(0))
    // console.log(dataView.getInt8(1))
    // console.log(dataView.getInt8(2))
    // console.log(dataView.getInt8(3))
    // console.log(dataView.getInt8(4))
    wx.writeBLECharacteristicValue({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId,
        // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
        serviceId,
        // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
        characteristicId: characteristicIdWrite,
        // 这里的value是ArrayBuffer类型
        value: buffer,
        success: function (res) {
            console.log('writeBLECharacteristicValue success', res)
            notifyBLECharacteristicValueChange(deviceId, serviceId, characteristicId)
        }
    })
}

// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持notify或者indicate才可以成功调用
function notifyBLECharacteristicValueChange(deviceId, serviceId, characteristicId) {
    wx.notifyBLECharacteristicValueChange({
        state: true, // 启用 notify 功能
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
        deviceId,
        // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
        serviceId,
        // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
        characteristicId,
        success: res => {
            console.log('notifyBLECharacteristicValueChange success', res.errMsg)
            onBLECharacteristicValueChange()
        }
    })
}
function onBLECharacteristicValueChange() {
    wx.onBLECharacteristicValueChange(res => {
        console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
        console.log(ab2hex(res.value))
        wx.showToast({
            title: ab2hex(res.value),
            duration: 2000
        })
        stopBluetoothDevicesDiscovery()
        // setTimeout(() => {
        //     wx.hideToast()
        // }, 1000)

    })
}
// 停止蓝牙搜索
function stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
        success: (res) => {
            console.log(res)
            wx.hideLoading()
        }
    })
}
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
    let hexArr = Array.prototype.map.call(new Uint8Array(buffer), bit => ('00' + bit.toString(16)).slice(-2))
    return hexArr.join('')
}