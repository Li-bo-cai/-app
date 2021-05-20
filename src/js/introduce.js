require('../css/introduce.css');
require('../fonts/iconfont.css');

document.ready(function () {

    let videLoadDom = document.querySelector('.video-load');
    let gbackDom = document.querySelector('.gback');
    let sportActiveDom = document.querySelector('.sport-active')
    let sportStartDom = document.querySelector('.sport-start');

    //回退
    gbackDom.addEventListener('click', function (event) {
        history.back();
    })

    // 获取应该加载对应的视频
    let str = location.search;
    let obj = utils.StrTransFormatObject(str);
    console.log(obj);

    // 获取数据接口
    $http.get('/sports/courseDetail?id=' + obj.id, function (res) {
        console.log(res);


        videLoadDom.style.background = 'url(' + utils.baseUrl + res.data.imgurl + ')';

        // 点击事件触发时存储视频到本地
        sportStartDom.addEventListener('click', function (event) {
            // 储存数据
            localStorage.setItem('video', JSON.stringify(res.data));
            location.href = './play.html'
        })
        //点击事件触发时存储视频到本地
        videLoadDom.addEventListener('click', function (event) {
            // 储存数据
            localStorage.setItem('video', JSON.stringify(res.data));
            location.href = './play.html'
        })

        //内容渲染到详情页面
        let html = `
        <p class="f24">${res.data.name}</p>
        <div class="dpflex sport-details">
            <span>${res.data.calorie+'千卡'}</span>
            <span>${res.data.time+'分钟'}</span>
            <p>${res.data.peoplenum}人练过 <i class="iconfont icon-jiantou"></i></p>
        </div>
        <div class="dpflex information">
            <div class="portrait"></div>
            <div>
                <p>用户名</p>
                <p>三线达人课程设计师</p>
            </div>
            <div class="follow">+关注</div>
        </div>
        <p class="content">${res.data.desc}</p>
        <div class="dpflex">
            <div class="flex1">
                <p>练习频次</p>
                <p>每周3~5次</p>
            </div>
            <div class="flex1">
                <p>器械</p>
                <p>无</p>
            </div>
        </div>
        `
        sportActiveDom.innerHTML = html;





        
    })


})