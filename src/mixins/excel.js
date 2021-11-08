import excel from "../utils/excel"
export default {
	methods: {
		// 导出
		handleExcelClick(tbHead, tbBody, name) {
			excel({
				tbHead: tbHead,
				tbBody: tbBody,
				filename: name
			})
		}
	},
	components: {
		excel
	}
}
