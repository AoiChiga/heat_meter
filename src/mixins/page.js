// page组件
import zyPage from "../components/zy-page.vue"

// 需要外部定义一个getPageList方法并返回一个func
// func中执行后续操作
export default {
	data() {
		return {
			pageModel: {
				query: "",
				pageNum: 1,
				pageSize: 50
			},
			total: 0
		}
	},
	methods: {
		handleSizeChange(val) {
			this.pageModel.pageNum = 1
			this.pageModel.pageSize = val
			this.getTable()
		},
		handleCurrentChange(val) {
			this.pageModel.pageNum = val
			this.tableModel.pageNum = val
			this.getTable()
		}
	},
	components: {
		zyPage
	}
}
