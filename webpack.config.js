//导入nodejs内置模块
const path = require('path');
// 导入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 导入插件自动清除dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { postcss } = require('postcss-preset-env');
module.exports = {
    // 入口
    entry: {
        // 引入共有的css
        commonCss: './src/js/commonCss.js',
        // 引入公有的js
        dom: './src/js/commom/dom.js',
        http: './src/js/commom/http.js',
        utils: './src/js/commom/utils.js',
        // 引入三方插件
        captcha: './src/lib/captcha/captcha-mini.js',
        swiper: './src/lib/swiper/swiper-bundle.js',
        weui:'./src/lib/weui/weui.js',
        // 自己的js
        home: './src/js/home.js',
        login: './src/js/login.js',
        register: './src/js/register.js',
        propaganda: './src/js/propaganda.js',
        mine: './src/js/mine.js',
        edit: './src/js/edit.js',
        curriculum: './src/js/curriculum.js',
        introduce:'./src/js/introduce.js',
        play:'./src/js/play.js'
    },
    //出口
    output: {
        // 获取项目的根目录的绝对路径 在拼接上dist文件
        path: path.resolve(__dirname, 'dist'),
        // 打包完后输出对象
        filename: 'js/[name].js',
        publicPath: './',
    },
    // 解释器
    module: {
        //css和less
        rules: [
            {
                test: /\.css$/, use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/, use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }, 'css-loader', 'postcss-loader', 'less-loader']
            },
            //图片
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    name: '[hash:16].[ext]',
                    limit: 20 * 1024,
                    esModule: false,
                    outputPath: 'img',
                }
            },
            //字体图标
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            //html
            { test: /\.html$/, loader: 'html-loader' }, {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            }
        ]
    },
    // 插件
    plugins: [
        //html打包插件
        new HtmlWebpackPlugin({
            template: './src/page/home.html',//以home.html作为打包模板  首页
            filename: 'home.html',
            chunks: ['home', 'commonCss', 'dom', 'http', 'utils', 'swiper']    //链接到home.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/login.html',//登录页
            filename: 'login.html',
            chunks: ['login', 'commonCss', 'dom', 'http', 'utils']   //链接到login.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/register.html',//注册页
            filename: 'register.html',
            chunks: ['register', 'commonCss', 'dom', 'http', 'captcha', 'utils']   //链接到register.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/propaganda.html',//广告页
            filename: 'propaganda.html',
            chunks: ['propaganda', 'commonCss', 'dom']      //链接到propaganda.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/mine.html',//我的页面
            filename: 'mine.html',
            chunks: ['mine', 'commonCss', 'dom', 'http', 'utils']      //链接到propaganda.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/edit.html',//编辑页
            filename: 'edit.html',
            chunks: ['edit', 'commonCss', 'dom', 'http','weui','utils']      //链接到propaganda.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/curriculum.html',//课程训练
            filename: 'curriculum.html',
            chunks: ['curriculum', 'commonCss', 'dom', 'http', 'utils']      //链接到propaganda.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/introduce.html',//课程介绍
            filename: 'introduce.html',
            chunks: ['introduce', 'commonCss', 'dom', 'http', 'utils']      //链接到propaganda.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/play.html',//视频播放
            filename: 'play.html',
            chunks: ['play', 'commonCss', 'dom', 'http', 'utils']      //链接到propaganda.js
        }),
        // 输出到css文件夹里
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        //自动清除dist
        new CleanWebpackPlugin()
    ],
    // 环境
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'home.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}
