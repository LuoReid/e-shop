var path = require('path')
var webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  // entry: './src/main.js',
  // entry:'./src/entry-client.js',
  output: {
    // path: path.resolve(__dirname, './dist'),
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    // filename: 'build.js'
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          preserveWhitespace: false,
          loaders: {
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }),
  ])
} else if (process.env.NODE_ENV === 'test') {

} else {
  module.exports.plugins = (module.exports.plugins || []).concat([new FriendlyErrors()])
}
