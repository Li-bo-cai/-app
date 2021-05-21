require('../css/mybadge.css');
require('../fonts/iconfont.css');

document.ready(function () {
    let gbackDom = document.querySelector('.gback');
    gbackDom.addEventListener('click', function (event) {
        history.back();
    })
})