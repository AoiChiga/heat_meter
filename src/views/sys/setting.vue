<template>
	<div class="setting h-100">
		<div class="el-card__body">
			<el-row class="mb-1">
				<el-col>
					<div class="d-flex mb-1">
						<i-select
							clearable
							class="mr-1"
							placeholder="站点名称"
							v-model="selectValveModel.yhname"
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
							ghost
							btnTitle="遥测"
							@click="btnClick"
						></zy-btn>
						<i-select
							class="mr-1"
							placeholder="请选择"
							v-model="selectValveModel.valve"
							style="width:80px"
							@on-change="selectValveChange"
						>
							<i-option
								v-for="item in setValveOption"
								:value="item.value"
								:key="item.value"
							>
								{{ item.label }}
							</i-option>
						</i-select>
						<zy-btn
							ghost
							btnTitle="设置开度"
							@click="confirmClick"
						></zy-btn>
					</div>
				</el-col>
			</el-row>
			<i-divider></i-divider>
			<el-row :gutter="10" class="mt-1">
				<el-col
					:span="12"
					v-for="(item, index) in cardList"
					:key="index"
				>
					<i-card>
						<p slot="title" class="text-primary">
							<i class="iconfont icon-dianchang"></i>
							{{ item.title }}
						</p>
						<i-table
							stripe
							:border="true"
							:columns="tbHead"
							:data="item.tbBody"
						></i-table>
					</i-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import zyBtn from "../../mixins/buttons/zy-btn"

export default {
	mixins: [zyBtn],
	components: {},
	data() {
		return {
			setValveOption: [],
			setValve: undefined,
			selectValveModel: {
				valve: "0"
			},
			tbHead: [
				{
					title: "类型",
					key: "type",
					width: 100,
					tooltip: true
				},
				{
					title: "昨日用量",
					key: "Last",
					minWidth: 100,
					tooltip: true
				},
				{
					title: "今日用量",
					key: "today",
					minWidth: 100,
					tooltip: true
				},
				{
					title: "本月累计",
					key: "Yue",
					minWidth: 100,
					tooltip: true
				}
			],
			cardList: [
				{
					title: "电厂南",
					tbBody: []
				},
				{
					title: "电厂北",
					tbBody: []
				}
			],
			yhnameList: []
		}
	},
	methods: {
		async getTable() {
			this.$progress.configure({
				showSpinner: false
			})
			this.$progress.start()
			const res = await this.$api.table.selectNanBei()
			this.cardList[0].tbBody = res.nan
			this.cardList[1].tbBody = res.bei
			this.$progress.done()
		},
		confirmClick() {
			if (!this.selectValveModel.yhname) {
				this.$msg.warning({
					content: "请选择一个站点",
					duration: 2
				})
			} else {
				console.log(this.selectValveModel)

				this.$confirm("确定进行此操作吗？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(async () => {
						// let res = await this.$api.lkForm.updateDd(
						// 	this.selectValveModel
						// )
						// if (res.code == 200) {
						// 	this.$msg.success({
						// 		content: res.msg,
						// 		duration: 1
						// 	})
						// 	this.getTable()
						// }
					})
					.catch(() => {
						this.closed = false
						this.$msg.info({
							content: "取消操作",
							duration: 1
						})
					})
			}
		},
		async btnClick() {
			if (!this.selectValveModel.yhname) {
				this.$msg.warning({
					content: "请选择一个站点",
					duration: 2
				})
			} else {
				this.$progress.configure({
					showSpinner: false
				})
				this.$progress.start()
				const res = await this.$api.info.sentZl(this.selectValveModel)
				console.log(res)
				this.$progress.done()
			}
			// this.getTable()
		},
		selectValveChange(val) {
			this.selectValveModel.valve = val
		},
		async getList() {
			let arr1 = []
			const res1 = await this.$api.info.selectYhName()
			res1.data.forEach((item) => {
				arr1.push({
					label: item.yhname,
					value: item.yhname
				})
			})
			this.yhnameList = arr1
			// let arr2 = []
			// const res2 = await this.$api.info.selectYhName()
			// res2.data.forEach((item) => {
			// 	arr2.push({
			// 		label: item.yhname,
			// 		value: item.yhname
			// 	})
			// })
			// this.yhnameList = arr2
		},
		yhnameChange(val) {
			this.selectValveModel.yhname = val
		}
	},
	created() {
		for (let i = 0; i < 19; i++) {
			this.setValveOption.push({
				value: `${i * 5}`,
				label: `${i * 5}%`
			})
		}
		this.getList()
		// this.selectCorn()
		this.getTable()
	}
}
</script>
