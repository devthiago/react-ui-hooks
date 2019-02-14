const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = path.join(__dirname, '../docs/');

const config = {
  entry: [
    `${rootDir}/src/index.js`
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${rootDir}/public/index.html`,
      publicUrl: '.'
    })
  ],
  output: {
    path: `${rootDir}/dist`,
    filename: 'docs.js'
  },
  devServer: {
    contentBase: `${rootDir}/public`,
    historyApiFallback: true
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          context: `${rootDir}/public/`,
          from: '**/*',
          to: `${rootDir}/dist`,
          ignore: '**/*.html',
          force: true
        } 
      ])
    );
  }

  return config;
};