const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    hotOnly: true
    /* Proxy to a backend, add appropriate url and port
    proxy: {
      '**': 'http://127.0.0.1:8000/'
    }
    */
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: "babel-loader"
        }
      }, 
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'frontend/src/assets/css/app.scss'),
        use: [{
          loader: 'style-loader'
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/assets/css/app.css'),
        use: [{
          loader: 'style-loader'
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]_[hash]',
          }
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/assets/img/mine.png')
    }),
  ]
};