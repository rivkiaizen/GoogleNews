'use strict';
var Promise = require('es6-promise').Promise;

var webpack = require('webpack');
var grunt = require('grunt');
var path = require('path');
var fs = require('fs');

var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bowerJSON = grunt.file.readJSON('bower.json');
var packageJSON = grunt.file.readJSON('package.json');

var bowerDependencies = Object.keys(bowerJSON.dependencies).map(function (key) {
    return key;
});
var npmDependencies = Object.keys(packageJSON.dependencies).map(function (key) {
    return key;
});


module.exports = {
    entry: {
        app: [
			__dirname + '/app/app.js'
        ],
        vendor: npmDependencies.concat(bowerDependencies)
    },

    output: {
        filename: 'app.js',
        path: '.tmp/assets/',
        publicPath: '/assets/'
    },

    cache: true,
    debug: true,


    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        root: __dirname,
        extensions: ['', '.js'],
        alias: {
            mocks: path.join(__dirname, 'app/mocks/mocks.js')
        },
        modulesDirectories: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'app/bower_components')]
    },
    module: {
        loaders: [
			{
			    test: /templates(\\|\/)[^/]*\.html$/,
			    loader: 'file?name=templates/[hash].[ext]'
			},
			{
			    test: /\.json$/,
			    loader: 'json-loader'
			},
			{
			    test: /\.css$/,
			    loader: 'style-loader!css-loader'
			}
        ]
    },

    plugins: [
		function () {
		    this.plugin('compile', function (stats) {
		        var replaceInFile = function (filePath, toReplace, replacement) {
		            var replacer = function (match) {
		                console.log('Replacing in %s: %s => %s', filePath, match, replacement);
		                return replacement;
		            };
		            var str = fs.readFileSync(filePath, 'utf8');
		            var out = str.replace(new RegExp(toReplace, 'g'), replacer);
		            fs.writeFileSync(filePath, out);
		        };

		    });
		},
		new BowerWebpackPlugin({
		    modulesDirectories: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'app/bower_components')]
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
};