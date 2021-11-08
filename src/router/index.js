import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./route"
import store from "@/store"
import { getToken } from "../utils/cookies"
Vue.use(VueRouter)

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

//解决elementui导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
// roter守卫
router.beforeEach((to, from, next) => {
	// token 验证
	const token = store.getters.token ? store.getters.token : getToken()
	if (!to.meta.isPublic && !token) {
		return next("/login")
	} else {
		next()
	}

	// 验证通过后 记录面包屑
	const brn = store.getters.brn ? JSON.parse(store.getters.brn) : []
	if (to.path === "/views/") {
		to.name = "index"
	}
	const inow = brn.filter((item) => {
		if (item.name == to.name) return item
	})

	if (inow.length > 0) return

	// datav 判断
	brn.push({
		name: to.name,
		title: to.meta.title,
		path: to.path
	})
	store.commit("SET_BRN", JSON.stringify(brn))
})
export default router
