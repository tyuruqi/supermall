module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应设计稿宽度      750是高清屏
      viewportHeight: 667, // 视窗的高度，对应设计稿高度   一般不配置
      unitPrecision: 5, // 指定px转为视窗单位值的最小位数
      viewportUnit: "vw", // 指定需要转成的单位
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, // 小于或等于1px不需要转换
      mediaQuery: false, //允许在媒体查询中转换 px
      exclude: [/TabBar/]
    }
  }
}
