const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/bootstrap.js'),
	devServer: { port: 3000, historyApiFallback: true },
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
			name: 'host',
			remotes: {
				// map import name to `scope@url`
				listingModules: 'listing@http://localhost:3001/remoteEntry.js',
				detailsModules: 'details@http://localhost:3002/remoteEntry.js',
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: false },
				'react-dom': { singleton: true, eager: true, requiredVersion: false },
				'react-router-dom': { singleton: true, requiredVersion: '^7.9.6' },
			},
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
	],
};
