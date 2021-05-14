//根目录新增的postcss.config.js
module.exports = {
    plugins: [
        // postcss插件
        require('postcss-preset-env')()
    ]
}