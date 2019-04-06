const merge = require('webpack-merge')
const common = require('./common')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(common, {
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new VueSSRServerPlugin(),
  ],
})
