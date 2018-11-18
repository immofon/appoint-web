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

function unix2week(stamp) {
    let d = new Date(stamp * 1000)
    const week = d.getDay()
    const convert = (week) => {
        switch (week) {
            case 0:
                return '日'
            case 1:
                return '一'
            case 2:
                return '二'
            case 3:
                return '三'
            case 4:
                return '四'
            case 5:
                return '五'
            case 6:
                return '六'
        }
    }
    return `周${convert(week)}`
}
export default {
    unix2time,
    unix2week
}