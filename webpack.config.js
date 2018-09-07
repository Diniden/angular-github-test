const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const IS_RELEASE = process.env.NODE_ENV === 'release';
const IS_PRODUCTION = process.env.NODE_ENV === 'production' || IS_RELEASE;
const MODE = process.env.MODE || (IS_RELEASE | IS_PRODUCTION) ? 'production' : 'development';

const plugins = [];

plugins.push(new StringReplacePlugin());

plugins.push(
  new ExtractTextPlugin({
    filename: resolve(__dirname, "target/app/css/app-demo.min.css"),
  }),
);

plugins.push(
  new CompressionWebpackPlugin({
    test: /\.js/
  })
);

const babelOptions = {
  babelrc: false,
  presets: [
    'es2015',
    'angular2',
  ]
};

module.exports = {
  devServer: {
    contentBase: resolve(__dirname, 'target'),
    compress: true,
    hot: true,
    port: process.env.PORT || 8080
  },

  devtool: 'source-map',
  entry: resolve(__dirname, 'src/webpack-entry'),
  mode: MODE,

  module: {
    rules: [
      { test: /\.html$/, use: { loader: 'raw-loader' } },
      { test: /\.png$/, loader: 'base64-image-loader' },
      { test: /\.js?/, use: [
          { loader: StringReplacePlugin.replace({
              replacements: [
                {
                  pattern: /require\(([^)]+)\)/ig,
                  replacement: function (match, p1, offset, string) {
                    if (match.indexOf('!') > -1) {
                      return `${match.substr(0, match.indexOf('!'))}')`;
                    }

                    return match;
                  }
                }
              ],
              nextLoaders: [
                { loader: 'babel-loader', options: babelOptions },
                'source-map-loader'
              ]
            })
          }
        ]
      },

      // TODO: This needs some work to make the scss bundling happen and output to the bundle file in the target
      // {
      //   test: /\.scss$/,
      //   use: [
      //     StringReplacePlugin.replace(
      //       [
      //         // "css-loader", // translates CSS into CommonJS
      //         "sass-loader", // compiles Sass to CSS, using Node Sass by default
      //       ], {
      //       replacements: [
      //         {
      //           pattern: /\@import(.+?)\;/ig,
      //           replacement: function (match, p1, offset, string) {
      //             const check = 'node_modules';

      //             if (match.indexOf(check) > -1) {
      //               return `import '../../../node_modules${match.substr(match.indexOf(check) + check.length)}`;
      //             }

      //             return match;
      //           }
      //         }
      //       ],
      //     }),
      //   ]
      // },
    ],
  },

  output: {
    path: resolve('./target/app'),
    filename: 'app.bundle.min.js',
  },

  plugins,

  resolve: {
    modules: ['.', './node_modules', './src'],
    extensions: ['.js', '.json'],
  },

  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  }
};
