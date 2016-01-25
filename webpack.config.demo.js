const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: ['./src/demo/main', 'webpack-hot-middleware/client?reload=true'],
  },
  output: {
    publicPath: '/demo/',
    path: path.join(__dirname, 'demo'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: ['src/demo', 'src/lib'].map(d => path.join(__dirname, d)),
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
        include: path.join(__dirname, 'src/lib/styles/'),
      },
    ],
  },
};
