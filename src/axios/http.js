import axios from "axios"
import { Message } from "element-ui"
import store from "../store"
import { getToken } from "../utils/cookies"
import conf from "../config"

const http = axios.create({
	baseURL: conf.http.baseURL,
	withCredentials: conf.http.voucher,
	timeout: conf.http.timeout
})

// 请求拦截
http.interceptors.request.use(
	(config) => {
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

		if (res.code !== 200 && res.code !== "0000") {
			Message({
				message: res.msg || "Error",
				type: "error",
				duration: 1000
			})

			return Promise.reject(new Error(res.msg || "Error"))
		} else {
			return res
		}
	},
	(error) => {
		console.log("err" + error)
		Message({
			message: error.message,
			type: "error",
			duration: 1000
		})
		return Promise.reject(error)
	}
)

export default http
