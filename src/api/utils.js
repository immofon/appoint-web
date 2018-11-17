function unix2time(stamp) {
    let d = new Date(stamp * 1000)
    const month = d.getMonth()
    const day = d.getDay()
    const hour = d.getHours()
    const minute = d.getMinutes()
    return `${month}月${day} ${hour}:${minute}`
}
export default {
    unix2time,
}