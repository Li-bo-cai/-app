require('../css/play.css');
require('../fonts/iconfont.css');

document.ready(function () {

    let videoPlayDom = document.querySelector('#video-player');
    let backBtn = document.querySelector('#back');
    let stopBtn = document.querySelector('#stop');
    let nextBtn = document.querySelector('#next');
    let nowNumDom = document.querySelector('.now-num');
    let allNumDom = document.querySelector('.all-num');
    let videoTitleDom = document.querySelector('.video-title');
    let playBtn = document.querySelector('.play-btn');
    let modalDom = document.querySelector('.modal');
    let videoImgDom = document.querySelector('.video-img');
    let videoTextDom = document.querySelector('.video-text');
    let endBtn = document.querySelector('.end-btn');
    // 进度条
    let progressDom = document.querySelector('.progress');

    //获取视频接口
    let video = JSON.parse(localStorage.getItem('video')).fragments;
    console.log(video);

    //更改视频播放地址
    let playIndex = 0;
    nowNumDom.textContent = playIndex + 1;
    allNumDom.textContent = video.length;
    videoTitleDom.textContent = video[playIndex].title;

    function player() {
        videoPlayDom.src = utils.baseUrl + video[playIndex].videoUrl;
        nowNumDom.textContent = playIndex + 1;
        allNumDom.textContent = video.length;
        videoTitleDom.textContent = video[playIndex].title
    }
    videoPlayDom.addEventListener('ended', function (event) {
        playIndex++;
        if (playIndex < video.length) {
            player();
        }
    })

    // 上一曲按钮
    backBtn.addEventListener('click', function (event) {
        if (playIndex > 0) {
            playIndex--;
            player();
        }
    })
    //下一曲按钮
    nextBtn.addEventListener('click', function (event) {
        if (playIndex < video.length - 1) {
            playIndex++;
            player();
        }
    })
    //暂停
    stopBtn.addEventListener('click', function (event) {
        stopBtn.className = "iconfont icon-bofang  icon-btn";
        videoPlayDom.pause();
        modalDom.style.display = 'block';
        videoImgDom.src = utils.baseUrl + video[playIndex].imgUrl;
        videoTextDom.textContent = video[playIndex].title;
    })
    // 播放
    playBtn.addEventListener('click', function (event) {
        stopBtn.className = "iconfont icon-zantingtingzhi icon-btn";
        videoPlayDom.play();
        modalDom.style.display = 'none';
    })
    //退出
    endBtn.addEventListener('click', function (event) {
        location.href = './curriculum.html'
    })

    // 进度条
    setInterval(function () {
        let num = (videoPlayDom.currentTime / videoPlayDom.duration) * 100;
        // console.log(num);
        progressDom.style.width = num + '%';
    }, 20)


})