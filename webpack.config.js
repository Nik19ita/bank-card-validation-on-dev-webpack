// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-undef
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line no-undef
module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/i,
        use: [
          env.prod ? miniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bank card',
      filename: 'index.html',
    }),
    new miniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
