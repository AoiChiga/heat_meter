import http from "../../http"
const jsSet = {
	shezhiKd(model) {
		return http.post("socket/shezhiKd", model)
	}
}
export default jsSet
