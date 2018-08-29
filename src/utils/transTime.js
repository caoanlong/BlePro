export const hms = (time) => {
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()
    if (h < 10) h = '0' + h
    if (m < 10) m = '0' + m
    if (s < 10) s = '0' + s
    return h + ':' + m + ':' + s
}

export const hms2 = (time) => {
    let h = '00',m = '00', s = '00'
    h = time < 3600 ? '00' : (parseInt(time/3600) < 10 ? ('0' + parseInt(time/3600)) : parseInt(time/3600))
    m = time%3600 < 60 ? '00' : (parseInt(time%3600/60) < 10 ? ('0' + parseInt(time%3600/60)) : parseInt(time%3600/60))
    s = time%60 < 10 ? ('0' + time%60) : time%60
    return h + ':' + m + ':' + s
}