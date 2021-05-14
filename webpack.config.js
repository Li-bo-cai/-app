//导入nodejs内置模块
const path = require('path');
// 导入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    // 入口
    entry: './src/js/home.js',
    //出口
    output: {
        // 获取项目的根目录的绝对路径 在拼接上dist文件
        path: path.resolve(__dirname, 'dist'),
        // 打包完后输出对象
        filename: 'js/bundle.js',
        publicPath: './',
    },
    // 解释器
    module: {
        //css和less
        rules: [{ test: /\.css/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        { test: /\.less/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
        //图片
        {
            test: /\.(jpg|png|gif|jpeg)$/,
            loader: 'url-loader',
            options: {
                name: '[hash:16].[ext]',
                limit: 900 * 1024,
                esModule: false,
                outputPath:'img',
            }
        },
        //字体图标
        {
            test:/\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
            loader:'file-loader',
            options:{
                outputPath:'fonts'
            }
        },
        //html
        { test: /\.html$/, loader: 'html-loader' }, {
            test: /\.js$/,
            loader: 'babel-loader',    // loader 编译es6为es5
            exclude: /node_modules/  // 排除
        }]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page/home.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    // 环境
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}
