const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const HtmlPlugin = require( 'html-webpack-plugin' );

const isProd = process.env.NODE_ENV === 'production';
const LIB_NAME = 'JustTabs';
const PLUGIN_NAME = 'just-tabs';
const BANNER_TEXT = '@author putn1k\n' +
                    `@source https://github.com/putn1k/JustTabs\n` +
                    '@description Simple and lightweight JS library for tabs\n' +
                    '@license ISC';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: [
    './src/style/style.scss',
    `./src/js/class.js`
  ],
  output: {
    clean: true,
    filename: `./${PLUGIN_NAME}.min.js`,
    library: LIB_NAME,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  devtool: isProd ? false : 'source-map',
  plugins: [
    new MiniCssExtractPlugin( {
      filename: `./${PLUGIN_NAME}.min.css`,
    } ),
    new webpack.BannerPlugin({
      test: /\.js$/,
      banner: BANNER_TEXT
    }),
    new HtmlPlugin( {
      template: 'src/index.html',
      minify: false,
      inject: false,
      scriptLoading: 'blocking'
    } )
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchFiles: ['src/index.html'],
    client: {
      overlay: true
    }
  },
  module: {
    rules: [ {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
                sourceMap: true
              }
            }
          }

        ],
      },
    ],
  },
};
