const whenPlay = function(a, p, img) {
    img.src = 'image/Favorites/pause-button.png'
    p.dataset.toggle = 'pause'
    // a.play()
}

const whenPause = function(a, p, img) {
    img.src = 'image/Favorites/play-button.png'
    p.dataset.toggle = 'play'
    // a.pause()
}

const togglePlay = function(audio, condition = false) {
    let a = audio
    let p = e('#id-button-toggle')
    let img = e('#id-img-toggle')
    if (condition) {
        whenPlay(a, p, img)
        // a.play()
        return
    }
    if (p.dataset.toggle === 'play') {
        whenPlay(a, p, img)
        a.play()
    } else {
        whenPause(a, p, img)
        a.pause()
    }
}

const bindEventToggle = function(audio) {
    let a = audio
    let p = e('#id-button-toggle')
    bindEvent(p, 'click', () => {
        // changeCover()
        togglePlay(a)
    })
}

const nextOrLastSong = function(audio, condition) {
    let a = audio
    let list = e('.list')
    let len = list.children.length - 1
    let number = Number(list.dataset.playnow)

    let now
    if (condition === 'next') {
        now = (number % len) + 1
    } else if (condition === 'last') {
        now = ((number + len - 2) % len) + 1
    } else if (condition === 'random') {
        now = len * Math.random()
        now = Math.floor(now) + 1
    }
    // 改 list 里的 data.playNow 为接下来播放的 歌曲序号
    // 改 audio 的地址为接下来播放的歌曲地址
    list.dataset.playnow = now
    let nowSong = list.children[now]
    // log('nowSong', nowSong, now, number, len)
    a.src = nowSong.dataset.path
    // 用 togglePlay 函数修改图标为 pause-button
    togglePlay(a, true)
    changeCover()
}

const bindEventNextSong = function(audio) {
    let a = audio
    let next = e('#id-button-next')
    bindEvent(next, 'click', () => {
        nextOrLastSong(a, 'next')
    })
}

const bindEventLastSong = function(audio) {
    let a = audio
    let last = e('#id-button-previous')
    bindEvent(last, 'click', () => {
        nextOrLastSong(a, 'last')
    })
}

const setProgressBar = function(len) {
    let bar = e('.audio-progress')
    bar.dataset.len = len
}

const setDurationText = function(len) {
    len = format(len)
    let d = e('#id-span-duration')
    d.innerHTML = len
}

const bindEventCanplay = function(audio) {
    let a = audio
    a.addEventListener('canplay', function() {
        // 如果要计算 duration 只能在 canplay 这个事件中完成
        // log('duration in canplay', a.duration)
        // log('canplay')
        let len = a.duration
        // 先存一份到进度条上
        setProgressBar(len)
        // 设置时间长度
        setDurationText(len)
        // 改封面
        // changeCover()
        // 播放前先看看现在播放开关里存放的状态
        let toggle = e('#id-button-toggle')
        let toggleStatus = toggle.dataset.toggle
        if (toggleStatus === 'pause') {
            a.play()
        }
        // a.play()
    })
}

const bindEventLists = function(audio) {
    let a = audio
    let songList = e('.list')

    bindEvent(songList, 'click', function(event) {
        let target = event.target
        // log('click', target)
        if (target.classList.contains('songName')) {
            let p = target.parentElement
            let path = p.dataset.path
            let number = Number(p.dataset.number)
            let list = e('.list')

            list.dataset.playnow = number
            // log('number', number, typeof number)
            if (a.src !== path) {
                a.src = path
            }

            togglePlay(a, true)
            changeCover()
        }
    })
}

const bindEventModeButton = function() {
    let list = {
        single: ['random', 'image/Favorites/random.png'],
        random: ['order', 'image/Favorites/order.png'],
        order: ['single', 'image/Favorites/single.png'],
    }
    let element = e('.playMode')
    bindEvent(element, 'click', (event) => {
        log('playMode button')
        let target = event.target
        let p = target.parentElement
        let status = p.dataset.status
        p.dataset.status = list[status][0]
        target.src = list[status][1]
    })
}

const bindEventEnded = function(audio) {
    let a = audio

    // let list = {
    //     //     single: singlePlay,
    //     //     order: orderPlay,
    //     //     random: randomPlay,
    //     // }

    let test = new PlayMode()
    let list = {
        single: test.singlePlay,
        order: test.orderPlay,
        random: test.randomPlay,
    }

    a.addEventListener('ended', function() {
        let status = e('#id-div-status')
        let s = status.dataset.status
        log('ended', s)
        list[s](a)
        changeCover()
    })
}

const bindEventProgress = function(audio) {
    let a = audio
    let bar = e('.audio-bar')
    bindEvent(bar, 'click', (e) => {
        // log('eee', e, e.offsetX)
        let percent = e.offsetX / 300
        a.currentTime = a.duration * percent

        // 立刻去修改进度条
        progressBar(a)
        progressText(a)
    })
}

const bindShortCut = function(audio) {
    document.addEventListener('keydown', (e) => {
        // log('e', e)
        if (e.key === ' ') {
            togglePlay(audio)
        }
    })
}

const bindEvents = function(audio) {
    let a = audio
    bindEventToggle(a)
    bindEventNextSong(a)
    bindEventLastSong(a)

    bindEventCanplay(a)

    bindEventLists(a)

    bindEventModeButton()
    bindEventEnded(a)

    bindEventProgress(a)

    bindShortCut(a)
}