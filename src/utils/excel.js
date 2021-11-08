function excel({
	tbHead,
	tbBody,
	filename,
	autoWidth = true,
	bookType = "xlsx",
	merges = [],
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
			header.push(item.label)
			filterVal.push(item.prop)
		})

		// 内容
		const data = tbBody.map((v) => filterVal.map((j) => v[j]))

		// 导出
		excel.export_json_to_excel({
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
