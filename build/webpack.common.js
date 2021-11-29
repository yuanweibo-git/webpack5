const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 打包进度条
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  // 配置入口
  entry: path.resolve(__dirname, '../src/index.js'),

  // 配置出口
  output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].bundle.js',
      clean: true
  },

  // 插件
  plugins: [
    // html插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),

    // 打包进度条插件
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    })
  ]
}