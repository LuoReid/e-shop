const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./common')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(common, {
  entry: './src/entry-client',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'mainfest', minChunks: Infinity }),
    new VueSSRClientPlugin(),
  ],
})
