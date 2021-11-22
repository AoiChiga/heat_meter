import http from "../../http"
import http1 from '../../http1'
const jsInfo = {
    //站点编号查询
	selectAdress() {
		return http.post("info/selectAdress", {})
	},
    //站点名称查询
	selectYhName() {
		return http.post("info/selectYhName", {})
	},
    //遥测
	sentZl(model) {
		return http1.post("YhInfo/findZL.action", model)
	}
}
export default jsInfo
