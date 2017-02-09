const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: ['./src/demo/scripts/main'],// 'webpack-hot-middleware/client?reload=true'],
  },
  output: {
    publicPath: '/demo/',
    path: path.join(__dirname, 'demo'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['react', 'react-dom']),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: ['src/demo/scripts', 'src/lib/scripts'].map(d => path.join(__dirname, d)),
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
        include: ['src/lib/styles/', 'src/demo/styles/'].map(d => path.join(__dirname, d)),
      },
    ],
  },
};
