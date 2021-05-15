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
        home: './src/js/home.js',
        login: './src/js/login.js',
        register: './src/js/register.js',
        propaganda: './src/js/propaganda.js'
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
                    limit: 900 * 1024,
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
            template: './src/page/home.html',//以home.html作为打包模板
            filename: 'home.html',
            chunks: ['home']    //链接到home.js
        }),
        new HtmlWebpackPlugin({
            template: './src/page/login.html',
            filename: 'login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/register.html',
            filename: 'register.html',
            chunks: ['register']
        }),
         new HtmlWebpackPlugin({
            template: './src/page/propaganda.html',
            filename: 'propaganda.html',
            chunks: ['propaganda']
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
