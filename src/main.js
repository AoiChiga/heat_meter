import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import "echarts-liquidfill"
// import {
//     borderBox10
// } from '@jiaminghi/data-view'
// Vue.use(borderBox10)
import Print from "vue-print-nb"
Vue.use(Print)
import VueAMap from "vue-amap"
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
	key: "3709d5908f395104fdc16548dbd989da",
	plugin: [
		"AMap.Autocomplete",
		"AMap.PlaceSearch",
		"AMap.Scale",
		"AMap.OverView",
		"AMap.ToolBar",
		"AMap.MapType",
		"AMap.PolyEditor",
		"AMap.CircleEditor",
		"AMap.MouseTool"
	],
	// 默认高德 sdk 版本为 1.4.4
	v: "1.4.4"
})

Vue.config.productionTip = false

import config from "./config"
Vue.prototype.$config = config

//element
import element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(element)

//style
import "./assets/css/style.scss"

// axios
import api from "./axios"
Vue.prototype.$api = api
import axios from "axios"
Vue.prototype.$axios = axios

//echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts

import print from "./utils/print"
Vue.use(print)

import dataV from "@jiaminghi/data-view"

//moment
import moment from "moment"
Vue.prototype.$moment = moment

//虚拟滚动
import "xe-utils"
import VXETAble from "vxe-table"
import "vxe-table/lib/style.css"
Vue.use(VXETAble)

import NProgress from "nprogress"
Vue.prototype.$progress = NProgress
import "nprogress/nprogress.css"

Vue.prototype.color = "#000"

//按需引入 iview
// import "iview/dist/styles/iview.css"
import ViewUI from "view-design"
import "./my-theme/index.less"

Vue.use(ViewUI)
import {
	Input,
	Button,
	Page,
	Message,
	Table,
	Select,
	Option,
	Card,
	Icon,
	Divider
} from "iview"
Vue.component("i-input", Input)
Vue.component("i-button", Button)
Vue.component("i-page", Page)
Vue.component("i-table", Table)
Vue.component("i-select", Select)
Vue.component("i-option", Option)
Vue.component("i-card", Card)
Vue.component("i-icon", Icon)
Vue.component("i-divider", Divider)
Vue.prototype.$msg = Message

Vue.use(dataV)
import BinTreeOrg from "bin-tree-org"
import "bin-tree-org/lib/styles/index.css"
Vue.component("bin-tree-org", BinTreeOrg)
import router from "./router"
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app")
