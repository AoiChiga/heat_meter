<template>
	<div class="view2 h-100">
		<div class="el-card__body">
			<div class="view2-head mb-1">
				<i-card class="zy-card">
					<div class="d-flex">
						<zy-date-picker
							size="small"
							datePickerType="datetimerange"
							vf="yyyy-MM-dd HH:mm:ss"
							v-model="tableModel.times"
							class="mr-1"
							width="330px"
							datep="选择日期"
							@change="timesChange"
						></zy-date-picker>
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
				</i-card>
			</div>
			<div class="view2-content">
				<i-card class="zy-card mb-1">
					<i-table
						ref="zyTable"
						class="w-100 zy-table"
						show-header
						:columns="tbHead"
						:data="tbBody"
						maxHeight="700"
						:loading="loading"
						:row-class-name="rowClassName"
						stripe
					>
					</i-table>
				</i-card>
			</div>
		</div>
	</div>
</template>
<script>
import zySubfield from "../../mixins/zy-subfield"
import zyBtn from "../../mixins/buttons/zy-btn"
import excel from "../../mixins/excel"
import zyDatePicker from "../../mixins/buttons/zy-date-picker"
export default {
	name: "view2",
	mixins: [zyBtn, excel, zySubfield, zyDatePicker],
	components: {},
	data() {
		return {
			tbHead: [
				{
					key: "yhname",
					title: "站名",
					minWidth: 80,
					tooltip: true
				},
				{
					key: "bendLl",
					title: "截止累计流量",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "bstartLl",
					title: "起始累计流量",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "czLl",
					title: "用流量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "bendRl",
					title: "截止累计热量",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "bstartRl",
					title: "起始累计热量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "czRl",
					title: "用热量",
					minWidth: 140,
					tooltip: true
				},
				{
					key: "syl",
					title: "卡余",
					minWidth: 130,
					tooltip: true
				}
			],
			tbBody: [],
			loading: true,
			tableModel: {
				times: [],
				startTime: undefined,
				endTime: undefined
			}
		}
	},
	methods: {
		async getTable() {
			this.$progress.configure({
				showSpinner: false
			})
			this.$progress.start()
			const res = await this.$api.table.selectAllByTimes(this.tableModel)
			this.tbBody = res.data

			this.loading = false
			this.$progress.done()
		},
		async exportClick() {
			this.$progress.configure({
				showSpinner: false
			})
			this.$progress.start()
			const res = await this.$api.table.selectAllByTimes(this.tableModel)
			const tbHead = this.tbHead
			const tbBody = res.data
			this.handleExcelClick(
				["金山热力公司生产报表"],
				[
					`日期：${this.$moment().format("yyyy-MM-DD")} 制表人：${
						this.$store.state.user.username
					}`
				],
				tbHead,
				tbBody,
				"生产报表"
			)
			this.$progress.done()
		},
		timesChange(val) {
			this.tableModel.times = val
			if (val) {
				this.tableModel.startTime = val[0]
				this.tableModel.endTime = val[1]
			} else {
				this.tableModel.startTime = null
				this.tableModel.endTime = null
			}
		},
		rowClassName(row) {
			if (row.yhname.indexOf("合计") != -1) {
				return "total-success-row UnidreamLED font-18"
			} else if (row.yhname.indexOf("损失量") != -1) {
				return "loss-success-row UnidreamLED font-18"
			} else if (row.yhname.indexOf("比例") != -1) {
				return "proportion-success-row UnidreamLED font-18"
			}
			return ""
		}
	},
	created() {
		this.tableModel.startTime = `${this.$moment()
			.subtract(1, "days")
			.format("yyyy-MM-DD")} 00:00:00`
		this.tableModel.endTime = `${this.$moment().format(
			"yyyy-MM-DD"
		)} 00:00:00`
		this.tableModel.times = [
			`${this.$moment()
				.subtract(1, "days")
				.format("yyyy-MM-DD")} 00:00:00`,
			`${this.$moment().format("yyyy-MM-DD")} 00:00:00`
		]
		this.getTable()
	}
}
</script>
