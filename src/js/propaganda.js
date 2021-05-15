// 导入css模块
require('../css/reset.css');
require('../css/common.css');
require('../css/propaganda.css')

//跳过跳转到登录页
let btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
    location.href = './login.html';
    clearTimeout(myTime);
})

// 计时器倒计时
let timeDome = document.querySelector('.time');
let time = 5;
let myTime = setTimeout(fn, 1000);
function fn() {
    timeDome.innerHTML = time + 's';
    console.log(time);
    if (time == 0) {
        clearTimeout(myTime);
        location.href = './login.html';
    } else {
        myTime = setTimeout(fn,1000)
        time--;
    }
}