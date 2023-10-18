import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import ProgressPlugin from 'progress-webpack-plugin';
import common from './webpack.common';

export default merge(common, {
	mode: 'production',
	plugins: [
		new ProgressPlugin(true),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				minify: TerserPlugin.esbuildMinify,
				terserOptions: {},
			}),
		],
	},
});
