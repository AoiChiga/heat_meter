import {
	getToken,
	setToken,
	removeToken,
	setUsername,
	getUsername,
	removeUsername,
	getColor
} from "@/utils/cookies"
import api from "@/axios"

const state = {
	token: getToken(),
	username: getUsername(),
	color: getColor()
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERNAME: (state, username) => {
		state.username = username
	},
	SET_COLOR: (state, color) => {
		state.color = color
	}
}

const actions = {
	// 登录
	login: ({ commit }, model) => {
		return new Promise((resolve, reject) => {
			api.login
				.login(model)
				.then((res) => {
					commit("SET_TOKEN", res.data.token)
					commit("SET_USERNAME", res.data.username)
					setToken(res.data.token)
					setUsername(res.data.username)
					resolve()
				})
				.catch((err) => {
					reject(err)
				})
		})
	},

	// 退出
	logout: ({ commit, state }) => {
		console.log(state)
		commit("SET_TOKEN", "")
		commit("SET_USERNAME", "")
		removeToken()
		removeUsername()
	},

	// 清空token
	clearToken({ commit }) {
		return new Promise((resolve) => {
			commit("SET_TOKEN", "")
			commit("SET_USERNAME", "")
			removeToken()
			resolve()
		})
	}
}

export default {
	state,
	mutations,
	actions
}
