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
utils.toast = function (bool, msg, time=2000) {
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

window.utils = utils;