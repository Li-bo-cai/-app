require('../css/propaganda.css')

document.ready(function () {
    // 判断用户是否登录过
    // console.log(JSON.parse(localStorage.getItem('user')));
    // 计时器倒计时
    let timeDome = document.querySelector('.time');
    let time = 5;
    let myTime = setTimeout(fn, 1000);
    function fn() {
        timeDome.innerHTML = time + 's';
        if (time == 0) {
            clearTimeout(myTime);
            // 判断是否有本地的用户
            let bool = localStorage.getItem('user') != null;
            location.href = bool ? '../home.html' : '../login.html'
        } else {
            myTime = setTimeout(fn, 1000)
            time--;
        }
    }

    //跳过跳转到登录页
    let btn = document.querySelector('.btn');
    btn.addEventListener('click', function (event) {
        // 判断是否有本地的用户
        let bool = localStorage.getItem('user') != null;
        location.href = bool ? '../home.html' : '../login.html'
        clearTimeout(myTime);
    })
})

