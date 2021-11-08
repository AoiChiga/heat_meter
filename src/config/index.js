const index = {
	name: "主页",
	icon: "icon-zhuye",
	type: "index",
	path: "index"
}
const view1 = {
	name: "月报表",
	icon: "icon-yuebaobiao",
	type: "view1",
	path: "view1/view1"
}
const view2 = {
	name: "日报表",
	icon: "icon-ribaobiao",
	type: "view2",
	path: "view2/view2"
}
const view3 = {
	name: "实时数据",
	icon: "icon-shishishuju",
	type: "view3",
	path: "view3/view3"
}
const view4 = {
	name: "历史数据",
	icon: "icon-lishishuju",
	type: "view4",
	path: "view4/view4"
}
const sys = {
	name: "设备管理",
	icon: "icon-shebeiguanli",
	type: "sys",
	path: "sys/setting"
}

const navbar = [index, view2,view1, view3, view4,sys]

const token = {
	//缓存中token-name
	name: "token",
	//请求头token-key
	username: "username",
	key: "token"
}

const http = {
	baseURL: "http://192.168.0.101:8085/jsrl",
	// baseURL: "http://81.70.59.8:8082/nb",
	voucher: false,
	timeout: 50000
}

const company = {
	name: "ZYIS-H ",
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
