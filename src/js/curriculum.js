require('../css/curriculum.css');
require('../fonts/iconfont.css');
document.ready(function () {
    // 加载页脚
    utils.addFooter('sport');

    let newestDom = document.querySelector('.newest');
    let listDom = document.querySelector('.list');


    let user = JSON.parse(localStorage.getItem('user'));
    //加载最新课程
    $http.get('/sports/courseList?id=' + user.userId, function (res) {
        console.log(res);

        let newArr = res.data.find(function (item) {
            return item.latest === 1;
        })

        //加载最新的列表
        let newHtml = `
        <a href = "./introduce.html?id=${newArr.courseId}">  
            <div class="newest-img">
                <img src="${utils.baseUrl + newArr.imgurl}" alt="">
            </div>
            <div class="details">
                <p class="plr15">${newArr.name}</p>
                <p class="f12 c9A plr15">${newArr.desc}</p>
            </div>
        </a>
        `
        newestDom.innerHTML = newHtml;

        //加载列表页面
        let html = '';
        res.data.forEach(function (item) {
            html += `
            <a href="./introduce.html?id=${item.courseId}">
                <div class="other-culum rel">
                    <div>
                        <img src="${utils.baseUrl + item.imgurl}" class="culum-img" alt="">
                    </div>
                    <div class="abs title">
                        <p class="f20 cf article-title">${item.name}</p>
                        <p class="f14 cf article-text">${item.desc}</p>
                    </div>
                </div>
            </a>
            `
        })
        listDom.innerHTML = html;










    })



})