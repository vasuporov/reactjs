const path = require('path');

const merge = require('webpack-merge');

const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

const NpmInstallPlugin = require('npm-install-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry: {
		app: PATHS.app
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