const singlePlay = function(audio) {
    let a = audio
    a.currentTime = 0
}

const orderPlay = function(audio) {
    let a = audio
    nextOrLastSong(a, 'next')
}

const randomPlay = function(audio) {
    let a = audio
    nextOrLastSong(a, 'random')
}

class PlayMode {
    singlePlay(audio) {
        let a = audio
        a.currentTime = 0
    }

    orderPlay(audio) {
        let a = audio
        nextOrLastSong(a, 'next')
    }

    randomPlay(audio) {
        let a = audio
        nextOrLastSong(a, 'random')
    }
}

