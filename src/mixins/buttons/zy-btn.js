import zyBtn from "../../components/buttons/zy-btn.vue"
export default {
	components: {
		zyBtn
	},
	data() {
		return {
			exLoading: false,
			btnTitle: "搜索",
			btnType: "primary",
			height: "350px",
			inputModel: "",
			searchIcon: "el-icon-search font-16",
			exportIcon: "el-icon-folder-opened font-16",
			sendIcon: "el-icon-upload font-16",
			defaultSort: {
				field: "collectTime",
				order: "desc"
			},
			eleQuantityOp: [
				{
					value: "优秀",
					label: "优秀"
				},
				{
					value: "良好",
					label: "良好"
				},
				{
					value: "需要换电池",
					label: "需要换电池"
				},
				{
					value: "必须换电池",
					label: "必须换电池"
				}
			],
			signalOp: [
				{
					value: "强",
					label: "强"
				},
				{
					value: "中",
					label: "中"
				},
				{
					value: "弱",
					label: "弱"
				}
			]
		}
	},
	methods: {
		btnClick() {
			this.getTable()
		}
	}
}
