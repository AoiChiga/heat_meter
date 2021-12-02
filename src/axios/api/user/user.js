import http from "../../http"
const user = {
	insertUsers(model) {
		return http.post("user/insertUsers", model)
	}
}
export default user
