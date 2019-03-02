const timer = function(audio) {
    let a = audio
    setInterval(function () {
        progressText(a)
        progressBar(a)
    }, 1000)
}

// 生成整个歌曲列表
const appendList = function() {
    let list = localStorage.songsList
    list = JSON.parse(list)
    let keys = Object.keys(list)
    let len = keys.length
    // log('list', list)
    // 列表歌曲数目太多, 用二十条试试
    for (let i = 0; i < 20; i++) {
        appenditem(list[i], (i + 1))
    }
}

// 生成单条歌曲项目
const appenditem = function(item, number) {
    let id = item.id
    let lrc = item.lrc
    let name = item.name
    let pic = item.pic
    let singer = item.singer
    let time = item.time
    time = format(time)
    let url = item.url
    if (number < 10) {
        number = '0' + number
    }

    let html = `
        <div class="song" data-path="${url}" data-id="${id}" data-name="${name}" data-lrc="${lrc}" data-pic="${pic}" data-singer="${singer}" data-time="${time}" data-number="${number}">
            <!--序号-->
            <span class="class-span-number line"> ${number}</span>
            <!--打星-->
            <span class="class-span-like line">
                <img src="image/Favorites/like.png" alt="" class="like">
            </span>
            <!--歌曲名-->
            <span class="songName line">${name}</span>
            <!--歌手-->
            <span class="class-span-singer line">${singer}</span>
            <!--时长-->
            <span class="class-span-time line">${time}</span>
        </div>
    `

    let element = e('.list')
    appendHtml(element, html)
}

// 处理 ajax 获取到的 list
// 存到 localStorage 里
const creatList = function(list) {
    list = list.data.songs
    list = JSON.stringify(list)
    localStorage.songsList = list
}

// 从网上获取歌曲列表
const requestList = function(audio) {
    let a = audio
    let method = 'get'
    let path = 'https://api.bzqll.com/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0'
    let data = ''
    ajax(method, path, data, (event) => {
        // 从 ajax 获取到的数据中提取歌曲列表
        // 放到 localStorage 里面
        let list = JSON.parse(event)
        creatList(list)
        // 给 HTML 添加 list
        appendList()
        // 修改 audio 地址
        let first = e('.list').children[1]
        let path = first.dataset.path
        a.src = path
        changeCover()
    })
}

const __main = function() {
    let a = e('#id-audio-player')

    bindEvents(a)
    requestList(a)
    timer(a)
    log('main')
}

__main()