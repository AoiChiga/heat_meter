import http from "../../http"
const jsSet = {
    //设置开度
	shezhiKd(model) {
		return http.post("socket/shezhiKd", model)
	}
}
export default jsSet
