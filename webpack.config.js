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
    // 1a. CSS only version
    common_desktop: 'src/main.css',
  },
  module: {
    loaders: [
      // 1b. CSS only version
      {
        test: /\.css$/,

        /**
         * With only CSS, the following breaks with happypack:
         *
         * Module parse failed: /Users/christian/code/happy-repo/src/common-css/include.css * Unexpected token (1:5)
         * You may need an appropriate loader to handle this file type.
         * SyntaxError: Unexpected token (1:5)
         */
        loader: ExtractTextPlugin.extract('style', 'happypack/loader?id=css', {
          allChunks: true
        })

        // 2. CSS only with no webpack => works correctly
        // loader: ExtractTextPlugin.extract('style', 'css', {
        //   allChunks: true
        // })
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

    /* 1c. CSS only (no SASS) version */
    createHappyPlugin('css', ['css'])
  ],
};

module.exports = config;
