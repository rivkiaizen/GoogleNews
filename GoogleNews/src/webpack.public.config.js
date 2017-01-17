'use strict';

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var _ = require('lodash');

var path = require('path');
var fs = require('fs');

var config = _.assign({}, _.cloneDeep(webpackConfig), {
	output: {
		publicPath: '/assets/',
		path: 'dist/assets/',
		filename: 'app.[chunkhash].js'
	},

	debug: false,
	devtool: false,

	stats: {
		colors: true,
		reasons: false
	},

	plugins: [
		function() {
			this.plugin('compile', function(stats) {
				var replaceInFile = function(filePath, toReplace, replacement) {
					var replacer = function(match) {
						console.log('Replacing in %s: %s => %s', filePath, match, replacement);
						return replacement;
					};
					var str = fs.readFileSync(filePath, 'utf8');
					var out = str.replace(new RegExp(toReplace, 'g'), replacer);
					fs.writeFileSync(filePath, out);
				};
			});
		},
		new BowerWebpackPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		//new ExtractTextPlugin('app.css', { allChunks: true }),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
		new webpack.NoErrorsPlugin(),
		function() {
			this.plugin('done', function(stats) {
				var replaceInFile = function(filePath, toReplace, replacement) {
					var replacer = function(match) {
						console.log('Replacing in %s: %s => %s', filePath, match, replacement);
						return replacement;
					};
					var str = fs.readFileSync(filePath, 'utf8');
					var out = str.replace(new RegExp(toReplace, 'g'), replacer);
					fs.writeFileSync(filePath, out);
				};

				replaceInFile(path.join(__dirname, 'dist', 'index.html'),
					'app.js',
					stats.toJson().assetsByChunkName.app
				);

				replaceInFile(path.join(__dirname, 'dist', 'index.html'),
					'vendor.js',
					stats.toJson().assetsByChunkName.vendor
				);
			});
		}
	]
});

config.resolve.alias.mocks = __dirname + '/app/mocks/mocks.public.js';

config.module.loaders.push({
	test: /\.js$/,
	loader: 'ng-annotate'
});

module.exports = config;