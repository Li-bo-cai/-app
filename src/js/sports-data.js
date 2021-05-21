require('../css/sports-data.css');
require('../fonts/iconfont.css');
const { util } = require('echarts');
const echarts = require('echarts');

document.ready(function () {

    // 引入头部
    utils.addHeader();

    // 柱状图
    var myChartHistogram = echarts.init(document.getElementById('view-histogram'));
    // 指定图表的配置项和数据
    var optionHistogram = {
        title: {
            text: '近7天运动时长'
        },
        tooltip: {},
        legend: {
            data: ['时长']
        },
        xAxis: {
            data: ["05-5", "05-6", "05-7", "05-8", "05-9", "05-10", "05-11"]
        },
        yAxis: {},
        series: [{
            name: '分钟',
            type: 'bar',
            data: [30, 60, 30, 120, 90, 90, 60]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartHistogram.setOption(optionHistogram);

    // 饼状图
    var myChartPie = echarts.init(document.getElementById('view-pie'));
    var optionPie = {
        title: {
            text: '运动分类',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 25, name: '跑步' },
                    { value: 35, name: '骑行' },
                    { value: 40, name: '训练' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChartPie.setOption(optionPie);

    //堆叠图
    var myChartTran = echarts.init(document.getElementById('view-tran'));
    var optionTran = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            data: ['跑步', '骑行', '训练']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['05-5', '05-6', '05-7', '05-8', '05-9', '05-10', '05-11']
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };
    myChartTran.setOption(optionTran);


    // 折线图
    var myChartBroken = echarts.init(document.getElementById('view-broken'));
    var optionBroken = {
        xAxis: {
            type: 'category',
            data: ['05-5', '05-6', '05-7', '05-8', '05-9', '05-10', '05-11']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [1,3,8,10,5,2,7],
            type: 'line'
        }]
    };
    myChartBroken.setOption(optionBroken);
})