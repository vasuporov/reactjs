const path = require('path');

const merge = require('webpack-merge');

const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

const NpmInstallPlugin = require('npm-install-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
	entry: {
		app: PATHS.app
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				// Include accepts either a path or an array of paths.
				include: PATHS.app
			},
			{
				test: /\.jsx?$/,
				// Enable caching for improved performance during development
				// It uses default OS directory by default. If you need something
				// more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
				loaders: ['babel-loader?cacheDirectory'],
				// Parse only app files! Without this it will go through entire project.
				// In addition to being slow, that will most likely result in an error.
				include: PATHS.app
			}
		]
	}
};

//default configuration
if(TARGET === 'start' || !TARGET){
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer:{
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
			save: true // --save
			})
		]
	});
}

if(TARGET == 'build'){
	module.exports = merge(common, {});
}