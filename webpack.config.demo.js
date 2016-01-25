const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/demo/main',
  },
  output: {
    path: path.join(__dirname, 'demo'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: ['src/demo', 'src/lib'].map(d => path.join(__dirname, d)),
      },
    ],
  },
};
