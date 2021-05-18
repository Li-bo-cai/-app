require('../css/mine.css');
require('../fonts/iconfont.css');
document.ready(function () {
    //引入页脚
    utils.addFooter('mine');

    //用户退出
    let logOut = document.querySelector('.logOut');
    logOut.addEventListener('click', function () {
        localStorage.removeItem('user');
        utils.toast(true, '注销成功', 1000);
        setTimeout(function () {
            location.href = './login.html';
        }, 1000)
    })

    // 加载用户信息
    let user = JSON.parse(localStorage.getItem('user'));
    $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
        console.log(res);
    })

})