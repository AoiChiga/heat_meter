<template>
	<div class="index h-100">
		<div class="el-card__body">
			<div class="index-head mb-1">
				<i-card class="zy-card">
					<div class="d-flex">
						<i-select
							clearable
							class="mr-1"
							placeholder="站点名称"
							v-model="tableModel.yhname"
							style="width:120px"
							@on-change="yhnameChange"
						>
							<i-option
								v-for="item in yhnameList"
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
							@on-change="yhnameChange"
						>
							<i-option
								v-for="item in yhnameList"
								:value="item.value"
								:key="item.value"
							>
								{{ item.label }}
							</i-option>
						</i-select> -->
					</div>
				</i-card>
			</div>
			<div class="index-content">
				<i-card class="zy-card mb-1">
					<i-table
						ref="zyTable"
						class="w-100 zy-table"
						show-header
						:columns="tbHead"
						:data="tbBody"
						maxHeight="700"
						:loading="loading"
						stripe
					>
						<template slot-scope="{ row }" slot="mj">
							<i
								class="iconfont icon-menjin_kaimen text-red font-22"
								v-if="row.mj == '1'"
							></i>
							<i
								class="iconfont icon-menjin_guanmen text-green font-22"
								v-else
							></i>
						</template>
						<template slot-scope="{ row }" slot="gd">
							<i
								class="iconfont icon-wUPSgongdianzhuangzhi text-red font-22"
								v-if="row.gd == '1'"
							></i>
							<i
								class="iconfont icon-zuoce-gongdian text-green font-22"
								v-else
							></i>
						</template> </i-table
					><zy-page
						:pageModel="pageModel"
						:total="total"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					></zy-page>
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
import zyPage from "../../mixins/page"
export default {
	name: "index",
	mixins: [zyBtn, excel, zySubfield, zyDatePicker, zyPage],
	data() {
		return {
			tbHead: [
                {
					key: "nums",
					title: "序号",
					width: 70,
					tooltip: true
				},
				{
					key: "yhname",
					title: "站名",
					minWidth: 100,
					tooltip: true
				},
				{
					key: "cjsj",
					title: "采集时间",
					minWidth: 130,
					tooltip: true
				},
				{
					key: "yl",
					title: "压力",
					minWidth: 85,
					tooltip: true
				},
				{
					key: "wd",
					title: "温度",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "ssll",
					title: "瞬时流量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "ljll",
					title: "累计流量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "ssrl",
					title: "瞬时热量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "rh",
					title: "热焓值",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "ljrl",
					title: "累计热量",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "syl",
					title: "卡余",
					minWidth: 110,
					tooltip: true
				},
				{
					key: "fw",
					title: "设定阀位",
					minWidth: 90,
					tooltip: true
				},
				{
					key: "md",
					title: "密度",
					minWidth: 85,
					tooltip: true
				},
				{
					key: "pl",
					title: "频率",
					minWidth: 85,
					tooltip: true
				},
				{
					slot: "mj",
					title: "门禁",
					width: 65,
					tooltip: true
				},
				{
					slot: "gd",
					title: "供电",
					width: 65,
					tooltip: true
				}
			],
			tbBody: [],
			loading: true,
			tableModel: {},
			yhnameList: [],
			adressList: []
		}
	},
	methods: {
		async getTable() {
			this.loading = true
			const model = {
				...this.pageModel,
				...this.tableModel
			}
			const res = await this.$api.table.selectInfo(model)
			// res.data.forEach((item) => {
			// 	if (
			// 		item.yhname.indexOf("合计") != -1 ||
			// 		item.yhname.indexOf("损失量") != -1 ||
			// 		item.yhname.indexOf("比例") != -1
			// 	) {
			// 		item.cellClassName = {
			// 			yhname: "font-12"
			// 		}
			// 	}
			// })
			this.tbBody = res.data
			this.total = res.count
			this.loading = false
		},
		async exportClick() {
			this.exLoading = true
			const model = {
				...this.tableModel,
				...{ pageNum: 1, pageSize: this.total }
			}
			const res = await this.$api.table.selectInfo(model)
			const tbHead = this.tbHead
			const tbBody = res.data
			this.handleExcelClick(
				["金山热力公司实时数据"],
				[
					`日期：${this.$moment().format("yyyy-MM-DD")} 制表人：${
						this.$store.state.user.username
					}`
				],
				tbHead,
				tbBody,
				"实时数据"
			)
			this.exLoading = false
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
		},
		btnClick() {
			this.pageModel.pageNum = 1
			this.getTable()
		},
		yhnameChange(val) {
			this.tableModel.yhname = val
		},
		adressChange(val) {
			this.tableModel.adress = val
		},
		async getList() {
			// let arr1 = []
			// const res1 = await this.$api.info.selectAdress()
			// res1.data.forEach((item) => {
			// 	arr1.push({
			// 		label: item.adress,
			// 		value: item.adress
			// 	})
			// })
			// this.adressList = arr1
			let arr2 = []
			const res2 = await this.$api.info.selectYhName()
			res2.data.forEach((item) => {
				arr2.push({
					label: item.yhname,
					value: item.yhname
				})
			})
			this.yhnameList = arr2
		}
	},
	created() {
		this.getTable()
		this.getList()
		setInterval(() => {
			this.getTable()
		}, 120000)
	}
}
</script>
