const view1 = [
	{
		meta: {
			title: "view1"
		},
		component: "view1/view1"
	}
]
const view2 = [
	{
		meta: {
			title: "view2"
		},
		component: "view2/view2"
	}
]
const view3 = [
	{
		meta: {
			title: "view3"
		},
		component: "view3/view3"
	}
]
const view4 = [
	{
		meta: {
			title: "view4"
		},
		component: "view4/view4"
	}
]
const sys = [
	{
		meta: {
			title: "sys"
		},
		component: "sys/setting"
	}
]

const routes = [
	{
		path: "/login",
		component: "Login",
		meta: {
			isPublic: true
		}
	},
	{
		path: "/",
		redirect: {
			name: "index"
		},
		component: "Home",
		children: [
			{
				meta: {
					title: "后台首页"
				},
				component: "index/index"
			},
			...view1,
			...view2,
			...view3,
			...view4,
			...sys
		]
	}
]
export default routes
