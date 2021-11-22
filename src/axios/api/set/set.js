import http from "../../http1"
const jsSet = {
    //设置开度
	shezhiKd(model) {
		return http.post("YhInfo/findKd.action", model)
	}
}
export default jsSet
