import Cookies from "js-cookie"
import config from "../config"

// 从cookie中获取token
export function getToken() {
	return Cookies.get(config.token.name)
}

// set-token
export function setToken(token) {
	return Cookies.set(config.token.name, token)
}

// remove-token
export function removeToken() {
	return Cookies.remove(config.token.name)
}

// 面包屑相关
export function getBrn() {
	return Cookies.get("brn")
}

export function setBrn(brn) {
	return Cookies.set("brn", brn)
}
export function setUsername(username) {
	return Cookies.set("username", username)
}
export function getUsername() {
	return Cookies.get("username")
}
// remove-token
export function removeUsername() {
	return Cookies.remove(config.token.username)
}

// 从cookie中获取Color
export function getColor() {
	return Cookies.get("color")
}

// set-Color
export function setColor(color) {
	return Cookies.set("color", color)
}

// remove-Color
export function removeColor() {
	return Cookies.remove("color")
}
