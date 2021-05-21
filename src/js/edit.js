require('../css/edit.css');
require('../fonts/iconfont.css');

document.ready(function () {
    // 加载头部
    utils.addHeader();

    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    let sexDom = document.querySelector('#sex');
    let sexValDom = document.querySelector('#sex-val');
    let birthdayDom = document.querySelector('#birthday');
    let birthdayValDom = document.querySelector('#birthday-val');

    let nicknameDom = document.querySelector('.nickname');
    let signValDom = document.querySelector('#sign-val');

    let proDom = document.querySelector('#pro');
    let proValDom = document.querySelector('#pro-val');
    let cityDom = document.querySelector('#city');
    let cityValDom = document.querySelector('#city-val');
    let saveDom = document.querySelector('#save');
    let data = new Object;



    // 页面初始加载
    nicknameDom.placeholder = user.nickname;
    signValDom.textContent = user.sign;
    if (user.gender && user.birthday && user.address) {
        sexValDom.textContent = user.gender;
        birthdayValDom.textContent = user.birthday.substring(0, 10);
        // 地址匹配位置
        let arr = user.address.split(',');
        console.log(arr);
        proValDom.textContent = arr[0];
        cityValDom.textContent = arr[1];
    }


    // 性别的选择
    sexDom.addEventListener('click', function (event) {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (res) {
                data.gender = res[0].label;
                sexValDom.textContent = res[0].label;
                // console.log(data.gender);
            },
            title: '选择性别'
        });
    });
    //生日选择
    birthdayDom.addEventListener('click', function (event) {
        weui.datePicker({
            start: 1970,
            end: new Date().getFullYear(),
            onConfirm: function (res) {
                data.birthday = res[0].value + '-' + res[1].value + '-' + res[2].value;
                birthdayValDom.textContent = res[0].value + '-' + res[1].value  + '-' + res[2].value;
                console.log(res);
            },
            title: '日期选择'
        });
    })
    //城市选择-省份
    let city = new Object;
    let pro = new Object;
    proDom.addEventListener('click', function (event) {
        cityValDom.textContent = '请选择城市';
        data.city = {};
        // 获取接口--省份
        $http.get('/address/province', function (res) {

            let porArr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(porArr, {
                onConfirm: function (res1) {
                    // 省份名
                    pro.name = res1[0].label;
                    // 省份ID
                    pro.addressId = res1[0].value;
                    proValDom.textContent = res1[0].label;
                    data.pro = pro;
                    console.log(pro);
                },
                title: '选择省份'
            });
        })
    })
    //城市选择-城市
    cityDom.addEventListener('click', function () {
        if (!data.pro.addressId) {
            utils.toast(false, '请先输入省份', 1000);
            return;
        }
        let url = '/address/city/' + data.pro.addressId;
        $http.get(url, function (res) {
            let cityArr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(cityArr, {
                onConfirm: function (res1) {
                    // 省份名
                    city.name = res1[0].label;
                    // 省份ID
                    city.addressId = res1[0].value;
                    cityValDom.textContent = res1[0].label;
                    data.city = city;
                    console.log(city);
                },
                title: '选择城市'
            });
        })
    })

    // 信息保存
    saveDom.addEventListener('click', function (event) {
        data.userId = user.userId;
        data.nickname = nicknameDom.value || nicknameDom.placeholder;
        data.birthday = new Date(birthdayValDom.textContent).getTime() || new Date(data.birthday).getTime();
        data.address = [proValDom.textContent, cityValDom.textContent] || [data.pro.name, data.city.name];
        data.sign = signValDom.value;
        console.log(data);
        $http.post('/users/userEdit', data, function (res) {
            console.log(res);
            utils.toast(true, '信息更改成功', 1000);
            setTimeout(function () {
                location.href = './mine.html';
            }, 1000)
        })
    })

})

