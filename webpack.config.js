const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HappyPack = require('happypack');

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,

		// Debugging options
    // debug: true,
    // verbose: true,
  });
}

const config = {
  resolve: {
    alias: {
			src: path.join(__dirname, './src')
		}
  },
  entry: {
    common_desktop: 'src/main.scss',
  },
  module: {
    loaders: [
      {
        test: /\.scss/,
				/* 1. With ExtractTextPlugin */
        loader: ExtractTextPlugin.extract('style', 'happypack/loader?id=sass', {
          allChunks: true
        }),

				/* 2. Also an issue without ExtractTextPlugin */
				// loader: 'happypack/loader?id=sass',

				/* FIXED - This fixes it, not using HappyPack */
        // loader: ExtractTextPlugin.extract('style-loader', 'css!sass', {
        //   allChunks: true
        // }),
        include: [
          /src\//
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/build/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),

    // createHappyPlugin('sass', ['css!sass']),

		/* 3. Specifying the importLoaders query doesn't help */
    createHappyPlugin('sass', ['css?importLoaders=1!sass']),
  ],
};

module.exports = config;
