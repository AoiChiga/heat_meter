<template>
	<div class="view3 h-100">
		<div class="el-card__body">
			<div class="view3-head mb-1">
				<i-card class="zy-card  ">
					<div class="d-flex">
						<zy-date-picker
							size="small"
							datePickerType="date"
							v-model="tableModel.times"
							class="mr-1"
							width="140px"
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
							:loading="exLoading"
							btnType="error"
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
			<div class="view3-content">
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
	name: "view3",
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
					key: "lastNum",
					title: "截止流量（t）",
					minWidth: 135,
					tooltip: true
				},
				{
					key: "todayNum",
					title: "起始流量（t）",
					minWidth: 135,
					tooltip: true
				},
				{
					key: "czNum",
					title: "日用流量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "yczNum",
					title: "月用流量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "rlLastNum",
					title: "截止热量（GJ）",
					minWidth: 135,
					tooltip: true
				},
				{
					key: "rlDayNum",
					title: "起始热量（GJ）",
					minWidth: 135,
					tooltip: true
				},
				{
					key: "brlNum",
					title: "热量日差值（GJ）",
					minWidth: 145,
					tooltip: true
				},
				{
					key: "czrlYueNum",
					title: "热量月差值（GJ）",
					minWidth: 145,
					tooltip: true
				},
				{
					key: "syl",
					title: "卡余（t）",
					minWidth: 110,
					tooltip: true
				}
			],
			tbBody: [],
			loading: true,
			tableModel: {
				times: undefined
			}
		}
	},
	methods: {
		async getTable() {
			const res = await this.$api.table.selectDay(this.tableModel)
			res.data.forEach((item) => {
				if (
					item.yhname.indexOf("合计") != -1 ||
					item.yhname.indexOf("损失量") != -1 ||
					item.yhname.indexOf("比例") != -1
				) {
					item.cellClassName = {
						yhname: "font-12"
					}
				}
			})
			this.tbBody = res.data

			this.loading = false
		},
		async exportClick() {
			this.exLoading = true
			const res = await this.$api.table.selectDay(this.tableModel)
			const tbHead = this.tbHead
			const tbBody = res.data
			this.handleExcelClick(
				["金山热力公司日报表"],
				[
					`日期：${this.$moment().format("yyyy-MM-DD")} 制表人：${
						this.$store.state.user.username
					}`
				],
				tbHead,
				tbBody,
				"日报表"
			)
			this.exLoading = false
		},
		timesChange(val) {
			this.tableModel.times = val
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
		const times = this.$moment()
			.subtract(1, "days")
			.format("yyyy-MM-DD")
		this.tableModel.times = times
		this.getTable()
	}
}
</script>
