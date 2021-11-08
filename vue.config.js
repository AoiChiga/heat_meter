module.exports = {
	productionSourceMap: false,
	devServer: {
		proxy: {
			"/nb": {
				target: "http://192.168.0.144:8081",
				changeOrigin: true
			}
		}
	}
}
