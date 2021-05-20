require('../css/play.css');
require('../fonts/iconfont.css');

document.ready(function () {

    let videoPlayDom = document.querySelector('#video-player');
    let backBtn = document.querySelector('#back');
    let stopBtn = document.querySelector('#stop');
    let nextBtn = document.querySelector('#next');
    // 进度条
    let progressDom = document.querySelector('.progress');

    //获取视频接口
    let video = JSON.parse(localStorage.getItem('video')).fragments;
    console.log(video);

    //更改视频播放地址
    let playIndex = 0;
    function play() {
        videoPlayDom.src = utils.baseUrl + video[playIndex].videoUrl;
    }
    videoPlayDom.addEventListener('ended', function (event) {
        playIndex++;
        if (playIndex < video.length) {
            play();
        }
    })

    // 上一曲按钮
    backBtn.addEventListener('click', function (event) {
        if (playIndex > 0) {
            playIndex--;
            play();
        }
    })
    //下一曲按钮
    nextBtn.addEventListener('click', function (event) {
        if (playIndex < video.length - 1) {
            playIndex++;
            play();
        }
    })


    // 进度条
    setInterval(function () {
        let num = (videoPlayDom.currentTime / videoPlayDom.duration) * 100;
        // console.log(num);
        progressDom.style.width = num + '%';
    }, 20)


})