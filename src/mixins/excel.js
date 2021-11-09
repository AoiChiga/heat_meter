import excel from "../utils/excel"
export default {
	methods: {
		// 导出
		handleExcelClick(title, subTitle, tbHead, tbBody, name) {
			excel({
				title,
				subTitle,
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
