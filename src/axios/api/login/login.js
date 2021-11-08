import http from "../../http"
const user = {
	login(model) {
		return http.post("user/login", model)
	}
}
export default user
