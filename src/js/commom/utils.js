/**
 * 工具函数
 */
const utils = {};
utils.teltext = function (val) {
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/g;
    let isReg = reg.test(val);
    return isReg;
}

/**
 * @toast  提示文本框
 * @bool   输入true false  判断用户是否输入正确
 * @msg    用户提示文本信息   String
 * @time   毫秒值 默认2000毫秒
 * */
//创建弹出框
utils.toast = function (bool, msg, time = 2000) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    let iconName = bool ? 'icon-secces' : 'icon-shibai';
    let html = `
    <i class="iconfont ${iconName}"></i>
    <p class ="msg">${msg}</p>
    `
    toast.innerHTML = html;
    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, time);
}


/**
 * @addfooter   添加页脚部分
 */
utils.addFooter = function (page) {
    let footer = document.createElement('footer');
    footer.className = 'dpflex';
    let html = `
            <div class="${page === 'home' ? 'icon-item active' : 'icon-item'}">
                <i class="iconfont icon-home"></i>
                <p>首页</p>
            </div>
            <div class="${page === 'sport' ? 'icon-item active' : 'icon-item'}">
                <i class="iconfont icon-sport"></i>
                <p>运动</p>
            </div>
            <div class="${page === 'mine' ? 'icon-item active' : 'icon-item'}">
                <i class="iconfont icon-wode"></i>
                <p>我的</p>
            </div> `
    footer.innerHTML = html;
    document.querySelector('body').appendChild(footer);
    let iconItem = document.querySelectorAll('footer .icon-item');
    let arr = ['../../home.html', '../../sport.html', '../../mine.html']
    iconItem.forEach(function (item, index) {
        item.addEventListener('click', function () {
            location.href = arr[index];
        })
    })
}

/**
 * 
 */
utils.addHeader = function () {
    let header = document.createElement('header');
    header.className = 'hback';
    let html = `
    <i class="iconfont icon-left-back abs plr15"></i>
    <p class="ta">个人资料</p>
    `
    header.innerHTML = html;
    let main = document.querySelector('main');
    document.querySelector('body').insertBefore(header, main);
    // 回退功能
    let gback = document.querySelector('.icon-left-back');
    gback.addEventListener('click', function (event) {
        history.back();
    })
}

window.utils = utils;