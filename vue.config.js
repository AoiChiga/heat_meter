module.exports = {
	productionSourceMap: false,
	pluginOptions: {
		"style-resources-loader": {
			preProcessor: "less",
			patterns: ["src/my-theme/index.less"]
		}
	}
}
