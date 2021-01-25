// next.config.js
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
	cssLoaderOptions: {
		sourceMap: true,
		esModule: true,
		modules: {
			mode: 'pure',
		}
	},
	webpack(config) {
		return config;
	},
});
