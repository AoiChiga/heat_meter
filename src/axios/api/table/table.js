import http from "../../http"
const jsTable = {
	//月报表
	selectYue(model) {
		return http.post("shuju/selectYue", model)
	},
	//日报表
	selectDay(model) {
		return http.post("shuju/selectDay", model)
	},
	//历史数据
	selectHis(model) {
		return http.post("info/selectHis", model)
	},
	//实时数据
	selectInfo(model) {
		return http.post("info/selectInfo", model)
	},
	//设备管理 电厂南/北
	selectNanBei() {
		return http.post("info/selectNanBei", {})
	}
}
export default jsTable
