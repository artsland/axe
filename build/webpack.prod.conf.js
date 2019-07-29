var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf')

var webpackConfig = {
      entry: {
            'axe': './src/index.js'
      },
      devtool: '#source-map',
      output: {
            library: 'axe',
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].js'
      },
      resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                  'vue$': 'vue/dist/vue.esm.js',
                  '@': path.resolve(__dirname, '../src')
            }
      },
      module: {
            rules: [
                  {
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                  },
                  {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: path.resolve(__dirname, '../src')
                  },
                  {
                        test: /\.css$/,
                        loader: 'css-loader'
                  },
                  {
                        test: /\.less$/,
                        use: ['style-loader', 'css-loader', 'less-loader']
                  }
            ]
      },
      plugins: [
            new webpack.DefinePlugin({
                  'process.env': 'production'
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            // extract css into its own file
            new ExtractTextPlugin('[name].css'),
      ]
}

module.exports = webpackConfig
