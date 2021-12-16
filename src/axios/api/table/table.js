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
	},
	//根据时间段查询累计流量
	selectAllByTimes(model) {
		return http.post("info/selectAllByTimes", model)
	},
	//卡号
	selectKaXx(model) {
		return http.post("info/selectKaXx", model)
	}
}
export default jsTable
