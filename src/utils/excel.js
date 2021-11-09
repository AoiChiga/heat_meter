function excel({
	title,
	subTitle,
	tbHead,
	tbBody,
	filename,
	autoWidth = true,
	bookType = "xlsx",
	merges = [
		{ s: { r: 0, c: 0 }, e: { r: 0, c: tbHead.length - 1 } },
		{ s: { r: 1, c: 0 }, e: { r: 1, c: tbHead.length - 1 } }
	],
	multiHeader = []
} = {}) {
	import("../assets/js/Export2Excel.js").then((excel) => {
		// 表头
		const header = []

		// prop
		const filterVal = []

		// 如果没有表头 return
		if (!tbHead) {
			return
		}

		// 筛选头部+prop
		tbHead.forEach((item) => {
			header.push(item.title)
			filterVal.push(item.key)
		})

		// 内容
		const data = tbBody.map((v) => filterVal.map((j) => v[j]))

		// 导出
		excel.export_json_to_excel({
			title,
			subTitle,
			header,
			data,
			filename: filename || "表格",
			autoWidth: autoWidth || false,
			bookType: bookType || "xlsx",
			merges,
			multiHeader
		})
	})
}

export default excel
