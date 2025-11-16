const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.js'),
	devServer: { port: 3001, historyApiFallback: true },
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
                'hostModules': 'host@http://localhost:3000/remoteEntry.js'
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
