import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

/**
 *  modulesFiles: func
 *  modulesFiles(req) => return require(req) require方式
 *  modulesFiles.keys() => return ['filename']
 */
const modulesFiles = require.context("./modules", true, /\.js$/)

/**
 * 读取modules文件夹
 * model: 包含文件内容的一个对象 格式：user: import方式
 * modulePath：文件路径 ./user.js
 */
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// ./user.js => user
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")

	// require(filepath)
	const value = modulesFiles(modulePath)

	modules[moduleName] = value.default
	return modules
}, {})

import getters from "./getters"
export default new Vuex.Store({
	getters,
	modules
})
