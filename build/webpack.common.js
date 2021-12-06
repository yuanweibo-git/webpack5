const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require("chalk");
// 打包进度条
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // 入口
  entry: path.resolve(__dirname, '../src/index.js'),

  // 出口
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:8].js',
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
    }),

  
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css"
    }),

    // vue-loader
    new VueLoaderPlugin()
  ],

  module: {
    // loader
    rules: [
      // vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.resolve(__dirname, '../src')]
      },

      // 处理样式文件
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"]
              },
            }
          }
        ]
      },

      // 处理媒体资源
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/, //加载图片资源
        loader: "url-loader",
        type: 'javascript/auto',//解决asset重复
        options: {
          esModule: false, //解决html区域,vue模板引入图片路径问题
          limit: 1000,
          name: "static/img/[name].[hash:7].[ext]",
        },
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//加载视频资源
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:7].[ext]",
        },
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, //加载字体资源
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]",
        },
      },

      // 使用webpack5内置的asset module代替file-loader加载图像资源
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: "asset",
      //   generator: {
      //     filename: "static/img/[name].[hash:7].[ext]",
      //   },
      // },

      // 设置babel解析es6语法
      {
        test: /(\.jsx|\.js)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".vue"], //省略文件后缀
    alias: { //配置别名
      "@": path.resolve(__dirname, "../src"),
    },
  },

  // 引入的CDN资源 抽离不需要变动的依赖
  externals: {
    'vue': 'Vue',
    'vue-router':'VueRouter'
  },
}