const { merge } = require('webpack-merge')
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: "production",

  plugins: [
    // new BundleAnalyzerPlugin() // 打包后分析代码区块大小
  ],

  module: {
    // 将HTML导出为字符串，处理HTML中引入的静态资源
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: false // 是否在开发环境中使用
        }
      }
    ]
  },

  // 打包优化
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor",
      cacheGroups: {
        "echarts.vendor": {
          name: "echarts.vendor",
          priority: 40,
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          chunks: "all",
        },
        lodash: {
          name: "lodash",
          chunks: "async",
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: 40,
        },
        "async-common": {
          chunks: "async",
          minChunks: 2,
          name: "async-commons",
          priority: 30,
        },
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
          priority: 20,
        },
      },
    },
  },
})