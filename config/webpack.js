const path = require('path');

const config = {
  resolve: {
    alias: {
      ['@hooks']: path.resolve(__dirname, '../src/hooks')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

module.exports = (env, argv) => config;
