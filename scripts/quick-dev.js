const { resolve } = require('path');
const serve = require('webpack-serve');

process.env.NODE_ENV = 'development';
serve({}, {
  config: {
    ...require(resolve('./webpack.config.js')),
    serve: {
      devMiddleware: {
        publicPath: '/dist/'
      }
    }
  },
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0',
  content: resolve(__dirname, '../target'),
});
