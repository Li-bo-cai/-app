//引入css样式
require('../css/reset.css');
require('../css/common.css');
require('../css/register.css');
//引入图标css
require('../fonts/iconfont.css');

// 手机验证
// 获取p标签
let activeDome = document.querySelector('.active');
// 获取ul
let ulDome = document.querySelector('ul')
// 获取li集合
let lis = document.querySelectorAll('li');
// 获取归属地前缀
let ownership = document.querySelector('.ownership');
//获取三角形图标
let iconSanjiaoxing = document.querySelector('.icon-sanjiaoxing');


//手机归属地的点击事件
lis.forEach(function (item) {
    item.addEventListener('click', function (event) {
        activeDome.innerHTML = '+' + this.innerHTML;
        ulDome.style.display = 'none';
        event.stopPropagation();
    })
})
ownership.addEventListener('click', function (event) {
    if (ulDome.style.display == 'none') {
        ulDome.style.display = 'inline-block';
    } else {
        ulDome.style.display = 'none';
    }
    event.stopPropagation();
})
iconSanjiaoxing.addEventListener('click', function (event) {
    if (ulDome.style.display == 'none') {
        ulDome.style.display = 'inline-block';
    } else {
        ulDome.style.display = 'none';
    }
    event.stopPropagation();
})


// 正则表达
// 手机验证
// let telipt = document.querySelector('#tel');
