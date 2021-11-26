import axios from "axios"
import { Message } from "iview"
import store from "../store"
import { getToken } from "../utils/cookies"
import conf from "../config"
import "nprogress/nprogress.css"
import NProgress from "nprogress"

const http = axios.create({
	baseURL: conf.http.baseURL1,
	withCredentials: conf.http.voucher,
	timeout: conf.http.timeout
})

// 请求拦截
http.interceptors.request.use(
	(config) => {
		NProgress.configure({
			showSpinner: false
		})
		NProgress.start()
		const token = store.getters.token ? store.getters.token : getToken()
		if (token) {
			config.headers[conf.token.key] = token
		}
		// config.headers[conf.token.key] = "e681f6583ab7483298fe456e1b72623b"
		return config
	},
	(error) => {
		console.log(error)
		return Promise.reject(error)
	}
)

// 响应拦截
http.interceptors.response.use(
	(response) => {
		const res = response.data

		if (res.code !== 200) {
			Message.error({
				content: res.msg || "Error",
				duration: 1
			})
			NProgress.done()
			return Promise.reject(new Error(res.msg || "Error"))
		} else {
			NProgress.done()
			return res
		}
	},
	(error) => {
		console.log("err" + error)

		Message.error({
			content: error.message,
			duration: 1
		})
		return Promise.reject(error)
	}
)

export default http
