require('../css/home.css');
// 引入图标
require('../fonts/iconfont.css');
document.ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })
    //添加页脚
    utils.addFooter('home');

    //更新渲染到页面
    let user = JSON.parse(localStorage.getItem('user'));
    let rank = document.querySelector('.rank');
    let clockInDay = document.querySelector('.clockIn-day');
    let insignia = document.querySelector('.insigniaNum');
    let clockInBtn = document.querySelector('.clockIn-btn');

    // console.log(user);
    function getHomedata() {
        $http.get('/headPageInfo?userId=' + user.userId, function (res) {
            rank.textContent = res.data.rank;
            clockInDay.textContent = res.data.punchIn;
            insignia.textContent = res.data.insigniaNum;
            // 加载时判断是否打卡
            if ('true' === res.data.isPunch) {
                clockInBtn.style.display = 'none';
            }
        })
    }
    getHomedata();
    clockInBtn.addEventListener('click', function (event) {
        // 点击时判断是否打卡
        $http.get('/clockIn?userId=' + user.userId, function (res1) {
            if (0 === res1.status) {
                getHomedata();
            }
        })
    })


})