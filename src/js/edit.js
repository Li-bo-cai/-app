require('../css/edit.css');
require('../fonts/iconfont.css');

document.ready(function () {
    // 加载头部
    utils.addHeader();


    let sexDom = document.querySelector('#sex');
    let sexValDom = document.querySelector('#sex-val');
    let birthdayDom = document.querySelector('#birthday');
    let birthdayValDom = document.querySelector('#birthday-val');
    let proDom = document.querySelector('#pro');
    let proValDom = document.querySelector('#pro-val');
    let cityDom = document.querySelector('#city');
    let cityValDom = document.querySelector('#city-val');

    let data = new Object;

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
                data.birthday = res[0].label;
                birthdayValDom.textContent = res[0].value + '-' + res[1].value + '-' + res[2].value;
                console.log(res);
            },
            title: '日期选择'
        });
    })
    //城市选择-省份
    proDom.addEventListener('click', function (event) {
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
                    data.name = res1[0].label;
                    // 省份ID
                    data.addressId = res1[0].value;
                    proValDom.textContent = res1[0].label;
                    console.log(data.addressId);
                    return data.addressId;
                },
                title: '选择省份'
            });
        })
    })
    //城市选择-城市
    cityDom.addEventListener('click', function () {
        if (!data.addressId) {
            utils.toast(false, '请先输入省份', 1000);
            return;
        }
        let url = '/address/city/' + data.addressId;
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
                    data.name = res1[0].label;
                    // 省份ID
                    data.addressId = res1[0].value;
                    cityValDom.textContent = res1[0].label;
                    console.log(data.addressId);
                    return data.addressId;
                },
                title: '选择城市'
            });
        })
    })

    // 信息保存
    

})

