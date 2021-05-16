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

document.ready(function () {
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


    let yzmStr = '';
    //验证码生成
    let captcha1 = new CaptchaMini({
        lineWidth: 1,   //线条宽度
        lineNum: 4,       //线条数量
        dotR: 2,          //点的半径
        dotNum: 25,       //点的数量
        preGroundColor: [10, 80],    //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 30,           //字体大小
    });
    captcha1.draw(document.querySelector('#captcha'), function (res) {
        yzmStr = res.toLowerCase();
    });


    //登录验证
    let telInp = document.querySelector('#tel');
    let pwdInp = document.querySelector('#pwd');
    let pwd1Inp = document.querySelector('#pwd1');
    let verCodeInp = document.querySelector('#verCode');
    let regloadInp = document.querySelector('#regload');

    // 按钮失焦验证
    // 手机验证
    telInp.addEventListener('blur', function (event) {
        if (!utils.teltext(telInp.value) && telInp.value) {
            telInp.style.color = 'red';
            utils.toast(false, '手机号有误');
        } else {
            telInp.style.color = '#fff';
        }
    })
    // 验证码验证
    verCodeInp.addEventListener('change', function (event) {
        if (verCodeInp.value != yzmStr && verCodeInp) {
            verCodeInp.style.color = 'red';
            utils.toast(false, '验证码错误');
        } else {
            verCodeInp.style.color = '#fff';
        }
    })
    // 确认密码验证
    pwd1Inp.addEventListener('blur', function (event) {
        if (pwdInp.value != pwd1Inp.value) {
            pwd1Inp.style.color = 'red';
            utils.toast(false, '两次密码不一致');
        } else {
            pwd1Inp.style.color = '#fff';
        }
    })

    // 提交时验证
    regloadInp.addEventListener('click', function (event) {
        if (telInp.value && verCodeInp.value && pwd1Inp.value) {
            // 提交
            let data = {
                account: telInp.value,
                password: pwd1Inp.value
            }
            $http.post('/users/add', data, function (res) {
                // console.log(res);
                if (res.status == 1){
                    utils.toast(false, res.msg);
                }else{
                    utils.toast(true, '用户创建成功');
                }
            })
        } else {
            utils.toast(false, '请完善信息');
        }
    })



})
