const path = require('path');
const webpack = require('webpack');

let config = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue']
  },
  devtool: 'inline-source-map',
  devServer: {
    noInfo: true
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'ts-vue-loader'
      }, {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }]
    },{
      test: /\.html$/, use: 'vue-template-loader'
    },{
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },{
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: 'dist'
        }
      }],
    }]
  }
}

module.exports = config