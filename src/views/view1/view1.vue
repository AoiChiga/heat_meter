<template>
	<div class="view1 h-100">
		<div class="el-card__body">
			<div class="view1-head mb-1">
				<el-card class="zy-card ova">
					<div class="d-flex mt-1 mb-1 ml-1">
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
						</i-select>
						<i-select
							class="mr-1"
							placeholder="站名"
							v-model="tableModel.hrz"
							style="width:172px"
							@on-change="hrzChange"
						>
							<i-option
								v-for="item in hrzList"
								:value="item.value"
								:key="item.value"
							>
								{{ item.label }}
							</i-option>
						</i-select>
						<zy-btn
							:btnIcon="searchIcon"
							btnTitle="搜索"
							@click="btnClick"
						></zy-btn> -->
					</div>
				</el-card>
			</div>
			<div class="view1-content">
				<el-card class="zy-card mb-1">
					<i-table
						ref="zyTable"
						class="w-100 zy-table"
						header-row-class-name="zy-table-header"
						:columns="tbHead"
						:data="tbBody"
						:height="height"
						:header-cell-style="{
							padding: '7px 0',
							fontSize: '14px'
						}"
						:cell-style="{ padding: '4px 0' }"
						border
					>
					</i-table>
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
	name: "view1",
	mixins: [zyBtn, excel, zySubfield],
	components: {},
	data() {
		return {
			tbHead: [
				{
					key: "",
					title: "站名",
					minWidth: 80,
					tooltip: true
				},
				{
					key: "",
					title: "本月流量差（t）",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "",
					title: "上月流量差（t）",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "",
					title: "月走数",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "",
					title: "本月热量（GJ）",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "",
					title: "上月热量（GJ）",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "",
					title: "热量差值（GJ）",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "",
					title: "卡余（t）",
					minWidth: 110,
					tooltip: true
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

			this.loading = false
			this.$progress.done()
		},
		async exportClick() {
			const tbHead = this.tbHead
			const tbBody = this.tbBody
			this.handleExcelClick(tbHead, tbBody, "历史数据")
		}
	},
	created() {}
}
</script>
