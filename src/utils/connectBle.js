// 开始
export const startConnect = function() {
    wx.showLoading({
        title: '开启蓝牙适配'
    })
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
    wx.showLoading({
        title: '蓝牙搜索'
    })
    wx.startBluetoothDevicesDiscovery({
        services: ['0000FEE7-0000-1000-8000-00805F9B34FB'],
        allowDuplicatesKey: false,
        success: res => {
            if (!res.isDiscovering) {
                getBluetoothAdapterState()
            } else {
                onBluetoothDeviceFound()
            }
        },
        fail: err => {
            console.log(err)
        }
    })
}
// 监听寻找到新设备的事件
function onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound(res => {
        console.log('设备已搜索到', res.devices)
        if (res.devices[0].deviceId) {
            startConnectDevices(res.devices[0].deviceId)
        }
        // devices = Array.from(new Set(devices.concat(res['devices'])))
        // if (devices.length > 0) {
        // 	wx.hideLoading()
        // }
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
                    getService(deviceId)
                }, 3000)
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
        },
        complete: function () {
            console.log('complete connect devices')
        }
    })
}
// 连接成功后根据deiviceId获取设备的所有服务
function getService(deviceId) {
    console.log('deviceId:', deviceId)
    // 监听蓝牙连接(重连)
    // wx.onBLEConnectionStateChange(res => {
    // 	isConnectingDevice = ''
    // 	console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
    // 	wx.showToast({
    // 		title: '已断开',
    // 		duration: 2000
    // 	})
    // 	setTimeout(() => {
    // 		wx.hideToast()
    // 	}, 2000)
    // });
    // 获取蓝牙设备service值
    wx.getBLEDeviceServices({
        deviceId,
        success: res => {
            wx.showToast({
                title: '找到指定设备!',
                duration: 2000
            })
            setTimeout(() => {
                wx.hideToast()
            }, 2000)
            console.log('获取蓝牙设备service值', res)
            getCharacter(deviceId, res.services)
        },
        fail: res => {
            wx.showToast({
                title: '找不到指定设备!',
                duration: 1000
            })
            setTimeout(() => {
                wx.hideToast()
            }, 1000)
        },
        // complete: res => {
        // 	if (res.errMsg != 0) {
        // 		getService(deviceId)
        // 	}
        // 	console.log(res)
        // }
    })
}
// 读取服务的特征值
function getCharacter(deviceId, services) {
    console.log(deviceId, JSON.stringify(services))
    // serviceId = services[0].uuid
    wx.getBLEDeviceCharacteristics({
        deviceId,
        // serviceId: serviceId,
        serviceId: '0000FEE7-0000-1000-8000-00805F9B34FB',
        success: res => {
            console.log('获取蓝牙设备特征值', res)
            // let characteristicIdRead = ''
            // if (res['characteristics'][0].properties.read) {
            // 	characteristicIdRead = res['characteristics'][0].uuid
            // }
            notifyBLECharacteristicValueChange(deviceId, '0000FEE7-0000-1000-8000-00805F9B34FB', '0000FEC9-0000-1000-8000-00805F9B34FB')
            // readBLECharacteristicValue(deviceId, serviceId, characteristicIdRead)
            // writeBLECharacteristicValue(deviceId, serviceId, characterId_write)
            // openNotifyService(deviceId, serviceId, characterId_read)
        },
        fail: err => {
            console.log(err)
        },
        complete: () => {
            console.log('complete')
        }
    })
}
// 
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