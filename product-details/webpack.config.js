const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/App.jsx'),
	devServer: { port: 3002, historyApiFallback: true },
	output: { publicPath: 'auto' },
	module: {
		rules: [
			{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/i, use: ['style-loader', 'css-loader'] },
		],
	},

	resolve: { extensions: ['.js', '.jsx'] },
	plugins: [
		new ModuleFederationPlugin({
			name: 'details',
			filename: 'remoteEntry.js',
			exposes: {
				'./Details': './src/Details.jsx',
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: false },
				'react-dom': { singleton: true, eager: true, requiredVersion: false },
			},
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
	],
};
