const rule = {
	// 用户名验证
	name: {
		type: /^[a-zA-Z0-9_-]{4,16}$/,
		title: "请输入4-16位用户名",
		msg: "用户名格式错误"
	},

	// 邮箱验证
	email: {
		type: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
		title: "请输入邮箱",
		msg: "邮箱格式错误"
	},

	// 手机号验证
	mobile: {
		type: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
		title: "请输入11位手机号",
		msg: "手机号格式错误"
	}
}

/**
 * 数据验证
 * @param {name} 上边定义的~
 * @param {value} 需要验证的数据
 */
function valid(name, value) {
	console.log(name, value)
	const { type, title, msg } = rule[name]

	const data = {
		// 数据是否通过验证
		bla: type.test(value),
		// 数据格式
		title,
		// 错误信息
		msg
	}

	return data
}

export default valid
