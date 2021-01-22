const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const slugify = require('slugify')

const PAGES = ['index']
const PAGE_TITLES = {
  index: 'Accueil',
}

const urlify = content => slugify(content, {lower: true, strict: true})

const pageFactory = (name, index) => {
  let next_name = PAGES[index + 1] || PAGES[0]
  console.log('page', name)
  return new HtmlWebpackPlugin({
    template: `./src/${name}.pug`,
    favicon: './src/favicon.ico',
    filename: `${name}.html`,
    page_title: PAGE_TITLES[name],
    name,
    footer: {
      title: PAGE_TITLES[next_name],
      link: `${next_name}.html`,
      name: next_name
    }
  })
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /(node_modules|bower_components)/,
        use: ['pug-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(otf|ttf|woff)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    ...PAGES.map(pageFactory),
  ],
}
