const service = [
    {
        "uuid":"6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "isPrimary":true
    },
    {
        "uuid":"8E400001-F315-4F60-9FB8-838830DAEA50",
        "isPrimary":true
    },
    {
        "uuid":"0000FEE7-0000-1000-8000-00805F9B34FB",
        "isPrimary":true
    },
    {
        "uuid":"00001800-0000-1000-8000-00805F9B34FB",
        "isPrimary":true
    },
    {
        "uuid":"00001801-0000-1000-8000-00805F9B34FB",
        "isPrimary":true
    }
]

const characteristics = [
    {
        properties:{
            read: false, write: false, notify: false, indicate: true
        }, 
        uuid:"0000FEC8-0000-1000-8000-00805F9B34FB"
    },
    {
        properties:{
            read: false, write: true, notify: false, indicate: false
        }, 
        uuid:"0000FEC7-0000-1000-8000-00805F9B34FB"
    },
    {
        properties:{
            read: false, write: false, notify: true, indicate: false
        }, 
        uuid:"0000FEC9-0000-1000-8000-00805F9B34FB"
    },
    {
        properties:{
            read: true, write: false, notify: false, indicate: true
        }, 
        uuid:"0000FEA1-0000-1000-8000-00805F9B34FB"
    },
    {
        properties:{
            read: true, write: true, notify: false, indicate: true
        }, 
        uuid:"0000FEA2-0000-1000-8000-00805F9B34FB"
    }
]