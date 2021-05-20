require('../css/login.css');
//引入图标
require('../fonts/iconfont.css')

document.ready(function () {
    let telInp = document.querySelector('#tel');
    let pwdInp = document.querySelector('#pwd');
    let uploadBtn = document.querySelector('.upload')
    uploadBtn.addEventListener('click', function () {
        if (telInp.value && pwdInp.value) {
            let data = {
                account: telInp.value,
                password: pwdInp.value
            }
            $http.post('/users/login', data, function (res) {
                // 请求成功时
                console.log(res);
                if (res.msg === 'OK') {
                    let user = res.data.user;
                    localStorage.setItem('user', JSON.stringify(user));
                    utils.toast(true, '登录成功  即将跳转',2000);
                    setTimeout(function(){
                        location.href='../home.html';
                    },2000)
                } else {
                    utils.toast(false, '用户名或密码有误',1000);
                }
            })
        } else {
            utils.toast(false, '用户名或密码有误',1000);
        }
    })

})