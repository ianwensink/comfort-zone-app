/* eslint-disable */
var webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');


module.exports = {
  devtool: 'source-map',
  entry: {
    app: __dirname + '/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
        traceDeprecation: true,
        SERVER_ADDR: `"${process.env.SERVER_ADDR}"`,
      },
    }),
    new HTMLWebpackPlugin({
      template: './index.ejs',
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    hot: false,
    inline: true,
    port: 8000,
    stats: {
      cached: false,
    },
  },
};
