function fmt(num) {
    if (0 <= num && num <= 9) {
        return `0${num}`
    } else {
        return `${num}`
    }
}

function unix2time(stamp) {
    let d = new Date(stamp * 1000)
    const month = d.getMonth()
    const date = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    return `${month}月${date}日 ${fmt(hour)}:${fmt(minute)}`
}
export default {
    unix2time,
}