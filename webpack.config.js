const path = require( 'path' );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const HtmlPlugin = require( 'html-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const isProd = process.env.NODE_ENV === 'production';
const PLUGIN_NAME = 'just-tabs';

const PROD_PLUGINS = [
  new MiniCssExtractPlugin( {
    filename: `${PLUGIN_NAME}.min.css`,
  } ),
];
const DEV_PLUGINS = [
  ...PROD_PLUGINS,
  new HtmlPlugin( {
    template: 'src/index.html',
  } ),
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: `${PLUGIN_NAME}.min.js`,
    path: path.resolve( __dirname, 'dist' ),
    library: {
      type: 'module',
    },
    globalObject: 'this',
  },
  devtool: isProd ? false : 'source-map',
  optimization: {
    minimizer: [ new TerserPlugin() ],
  },
  plugins: isProd ? PROD_PLUGINS : DEV_PLUGINS,
  module: {
    rules: [ {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      },
    ],
  },
};
