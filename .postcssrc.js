// 所有的postcss-pxtorem 都是函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    pxToRem({
      // 根字节
      // 根字节 函数形式 file是从moudle对象中解构出来的 是每一css文件的路径
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] // 所有属性都转成rem
    })
  ]
}
