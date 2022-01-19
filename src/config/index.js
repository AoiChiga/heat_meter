const index = {
	name: "实时数据",
	icon: "icon-shishishuju",
	type: "index",
	path: "index"
}
const view1 = {
	name: "历史数据",
	icon: "icon-lishishuju",
	type: "view1",
	path: "view1/view1"
}
const view3 = {
	name: "日报表",
	icon: "icon-ribaobiao",
	type: "view3",
	path: "view3/view3"
}
const view4 = {
	name: "月报表",
	icon: "icon-yuebaobiao",
	type: "view4",
	path: "view4/view4"
}
const view2 = {
	name: "生产报表",
	icon: "icon-baobiao",
	type: "view2",
	path: "view2/view2"
}
const sys = {
	name: "设备管理",
	icon: "icon-shebeiguanli",
	type: "sys",
	path: "sys/setting"
}

const navbar = [index, view1, view3, view4, view2, sys]

const token = {
	//缓存中token-name
	name: "token",
	//请求头token-key
	username: "username",
	key: "token"
}

const http = {
	baseURL: "http://192.168.0.101:8085/jsrl",
	// baseURL: "http://121.36.204.245:8082/jsrl",
	// baseURL1: "http://192.168.0.101:8083/fm_new",
	baseURL1: "http://121.36.204.245:8082/dbjc",
	voucher: false,
	timeout: 9999990
}

const company = {
	name: "ZYIS 工业用户热表集抄",
	copyright: "河南众源系统工程有限公司",
	address: "河南省郑州市高新区国槐街8号火炬大厦A座1602",
	tele: "0371-67896222"
}

const map = {
	ak: "HE5BlZinsvqCISbVv2ABE1DdDWPKgtGW"
}

export default {
	navbar,
	token,
	http,
	company,
	map
}
