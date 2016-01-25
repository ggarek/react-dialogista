const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.demo');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/demo/index.html'));
});

const PORT = 9999;
/* eslint-disable no-console */
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://0.0.0.0:${PORT}`);
});
/* eslint-enable no-console */
