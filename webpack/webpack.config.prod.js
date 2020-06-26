const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const Path = require('path');
const glob = require('glob');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	stats: 'errors-only',
	bail: true,
	entry: Path.resolve(__dirname, '../src/scripts/index.js'),
	output: {
		// filename: 'js/[name].[chunkhash:8].js',
		// chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
		filename: 'js/upc-payment.js'
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new Webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.s?css/i,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
			}
		]
	}
});
