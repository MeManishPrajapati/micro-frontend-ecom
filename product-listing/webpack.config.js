const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.js'),
	devServer: {
		port: 3001,
		historyApiFallback: true,
		// Allow Host (3000) to fetch remoteEntry and chunks
		headers: {
			'Access-Control-Allow-Origin': 'http://localhost:3000',
			'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD',
			'Access-Control-Allow-Headers':
				'X-Requested-With, Content-Type, Authorization',
		},
		// Ensure middleware serves from 'auto' publicPath
		devMiddleware: {
			publicPath: 'auto',
		},
		// Configure HMR websocket for cross-origin clients (host will load the remote bundle)
		client: {
			webSocketURL: {
				hostname: 'localhost',
				port: 3001,
				protocol: 'ws',
				pathname: '/ws',
			},
		},
	},
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
			name: 'listing',
			filename: 'remoteEntry.js',
			exposes: {
				'./Listing': './src/Listing.jsx',
			},
			remotes: {
				hostModules: 'host@http://localhost:3000/remoteEntry.js',
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: false },
				'react-dom': { singleton: true, eager: true, requiredVersion: false },
				'react-router-dom': { singleton: true, eager: true, requiredVersion: '^7.9.6' },
			},
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
	],
};
