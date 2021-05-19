require('../css/mine.css');
require('../fonts/iconfont.css');
document.ready(function () {
    //引入页脚
    utils.addFooter('mine');

    let userHeaderDom = document.querySelector('.userHeader');
    let nicknameDom = document.querySelector('.nickname');
    let headPortraitDom = document.querySelector('.head-portrait');
    let describeDom = document.querySelector('.describe');
    let fileBtn = document.querySelector('#file-btn');

    let user = JSON.parse(localStorage.getItem('user'));
    // 更新信息
    function getUserInfo() {
        // 获取本地存储
        $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
            console.log(res);
            // 更新用户数据
            localStorage.setItem('user', JSON.stringify(res.data));
            user = JSON.parse(localStorage.getItem('user'));
            // 用户昵称
            if (res.data.nickname) {
                nicknameDom.textContent = res.data.nickname;
            }
            // 用户头像
            if (res.data.imgurl) {
                headPortraitDom.style.backgroundImage = 'url(' + res.data.imgurl + ')';
            }
            // 用户签名
            if (res.data.sign) {
                describeDom.textContent = res.data.sign
            }
        })
    }
    getUserInfo();

    // 点击跳转到编辑页
    userHeaderDom.addEventListener('click', function (event) {
        location.href = './edit.html';

    })
    // 图片上传
    let base_url = 'http://139.9.177.51:8099';
    headPortraitDom.addEventListener('click', function (event) {
        fileBtn.click()
        event.stopPropagation();
    })
    fileBtn.addEventListener('change', function (event) {
        $updateFile('/users/upload', 'imgurl', this.files[0], function (res) {
            let imgUrl = base_url + res.data;
            //修改信息
            let data = {
                userId: user.userId,
                imgurl: imgUrl,
            }
            $http.post('/users/userEdit', data, function (res1) {
                console.log(res1);
                // 加载图片
            })
            getUserInfo();
        })
    })

    // 加载运动信息
    let sportMinDOM = document.querySelector('.sportMin');
    let consumeDom = document.querySelector('.consume');
    $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
        console.log(res);
        sportMinDOM.textContent = res.data.sports.times;
        consumeDom.textContent = res.data.sports.calorie;

    })

    //用户退出
    let logOut = document.querySelector('.logOut');
    logOut.addEventListener('click', function () {
        localStorage.removeItem('user');
        utils.toast(true, '注销成功', 1000);
        setTimeout(function () {
            location.href = './login.html';
        }, 1000)
    })
})