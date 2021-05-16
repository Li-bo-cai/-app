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
                if (res.msg === 'ok') {
                    let user = res.data.user;
                    localStorage.setItem('user', JSON.stringify(user));
                }else{
                    console.log('有错');
                }
            })
        } else {
            console.log('请登录');
        }
    })

})