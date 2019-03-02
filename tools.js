const log = console.log.bind(console)

const ajax = function(method, path, data, callback) {
    let r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r.response)
        }
    }
    r.send(data)
}

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return []
    } else {
        return elements
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const formatZero = function(number) {
    // 给个位数加上零
    let n = number
    let result = ''
    if (n < 10) {
        result = '0' + n
    } else {
        result = result + n
    }
    return result
}

const format = function(number) {
    // 对播放时间进行格式化
    let n = Math.floor(number)
    let right = formatZero(n % 60)
    let left = Math.floor(n / 60)
    left = formatZero(left)
    let result = `${left}:${right}`
    return result
}

// 放在定时器里的东西
// 时间进度
const progressText = function(audio) {
    let a = audio
    let time = a.currentTime
    // log('time', time)
    time = format(time)
    let timeNow = e('#id-span-currentTime')
    timeNow.innerHTML = time
}
// 进度条
const progressBar = function(audio) {
    let a = audio
    let bar = e('.audio-progress')
    let len = bar.dataset.len
    let percent = (a.currentTime / len) * 100
    // log('percent', percent, len, a.currentTime, (a.currentTime / len))
    bar.style = `width: ${percent}%;`
}

// 换图片几种情况
// 1. 初始化, 用第一首歌的图片
// 2. 点击歌曲列表的时候
// 3. 自动下一首
// 4. 点击上一首, 下一首
const changeCover = function() {
    let list = e('.list')
    let number = Number(list.dataset.playnow)
    let item = list.children[number]
    let pic = item.dataset.pic
    let cover = e('#id-img-cover')
    cover.src = pic
    log('change cover')
}
