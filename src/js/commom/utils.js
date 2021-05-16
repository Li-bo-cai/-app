/**
 * 工具函数
 */
const utils = {};
utils.teltext = function (val) {
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/g;
    let isReg = reg.test(val);
    return isReg;
}

//
utils.toast = function (bool, msg) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    let iconName = bool ? num1 : num2;
    let html = `
    <i class="iconfont ${iconname}"></i>
    <p>${msg}</p>
    `
    document.body.appendChild(toast);
}

window.utils = utils;