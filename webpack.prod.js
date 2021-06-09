const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Client',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: '/.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/frontend/views/index.html',
      filename: './index.html',
    }),
    // new WorkboxPlugin.GenerateSW(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
};
