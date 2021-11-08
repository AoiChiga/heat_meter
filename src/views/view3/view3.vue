<template>
	<div class="view3 h-100">
		<div class="el-card__body">
			<div class="view3-head mb-1">
				<el-card class="zy-card ova">
					<div class="d-flex mt-1 mb-1 ml-1">
						<!-- <i-select
							class="mr-1"
							placeholder="系统类型"
							v-model="tableModel.system"
							style="width:172px"
							@on-change="systemChange"
						>
							<i-option
								v-for="item in typeOption"
								:value="item.value"
								:key="item.value"
							>
								{{ item.label }}
							</i-option>
						</i-select> -->
						<zy-btn
							:btnIcon="searchIcon"
							btnTitle="搜索"
							@click="btnClick"
						></zy-btn>
						<zy-btn
							btnTitle="导出"
							@click="exportClick"
							:btnIcon="exportIcon"
						></zy-btn>
					</div>
				</el-card>
			</div>
			<div class="view3-content">
				<el-card class="zy-card mb-1">
					<i-table :columns="tbHead" :data="tbBody"> </i-table>
					<!-- <zy-page
						:pageModel="pageModel"
						:total="500"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					></zy-page> -->
				</el-card>
			</div>
		</div>
	</div>
</template>
<script>
import zySubfield from "../../mixins/zy-subfield"
import zyBtn from "../../mixins/buttons/zy-btn"
import excel from "../../mixins/excel"
// import zyPage from "../../mixins/page"
export default {
	name: "view3",
	mixins: [zyBtn, excel,  zySubfield],
	components: {},
	data() {
		return {
			tbHead: [
				{
					key: "",
					title: "用户名",
					minWidth: 80,
					overflow: true
				},
				{
					key: "",
					title: "流量月止数",
					minWidth: 120,
					overflow: true
				},
				{
					key: "",
					title: "流量月始数",
					minWidth: 110,
					overflow: true
				},
				{
					key: "",
					title: "流量月表走数(t)",
					minWidth: 130,
					overflow: true
				},
				{
					key: "",
					title: "热量月止数",
					minWidth: 110,
					overflow: true
				},
				{
					key: "",
					title: "热量月始数",
					minWidth: 110,
					overflow: true
				},
				{
					key: "",
					title: "月表走数(gj)",
					minWidth: 110,
					overflow: true
				},
				{
					key: "",
					title: "卡余(t)",
					minWidth: 110,
					overflow: true
				}
			],
			tbBody: [],
			loading: true
		}
	},
	methods: {
		async getTable() {
			this.$progress.configure({
				showSpinner: false
			})
			this.$progress.start()

			// const model = {
			// 	...this.tableModel,
			// 	...this.pageModel
			// }

			// this.tbBody = res.data.list
			this.loading = false
			// this.total = res.data.total
			this.$progress.done()
		},
		async exportClick() {
			const tbHead = this.tbHead
			const tbBody = this.tbBody
			this.handleExcelClick(tbHead, tbBody, "历史数据")
		}
	},
	created() {
		// this.getTable()
	}
}
</script>
