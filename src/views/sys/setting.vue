<template>
	<div class="setting h-100">
		<div class="el-card__body">
			<el-row class="mb-1">
				<el-col>
					<div class="d-flex mb-1"></div>
					<div class="d-flex mb-1">
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
			<el-divider></el-divider>
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
			<!-- <i-modal
				v-model="dialogVisible"
				:title="modalTitle"
				draggable
				sticky
				class-name="vertical-center-modal"
			>
				
				<div slot="footer">
					<zy-btn btnTitle="确认" @click="confirmClick"></zy-btn>
				</div>
			</i-modal> -->
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
				id: undefined,
				valve: "5"
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
					key: "",
					tooltip: true
				},
				{
					title: "今日用量",
					key: "",
					tooltip: true
				},
				{
					title: "本月累计",
					key: "",
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
			]
		}
	},
	methods: {
		async getTable() {
			this.$progress.configure({
				showSpinner: false
			})
			this.$progress.start()
			const res = await this.$api.lkTable.selectZhanDian(this.pageModel1)
			console.log(res)
			// this.tbBody = res.data
			// this.total1 = res.count
			// this.loading1 = false
			// const r = await this.$api.lkTable.selectJzq(this.pageModel2)
			// this.jzqBody = r.data
			// this.total2 = r.count
			// this.loading2 = false
			this.$progress.done()
		},
		confirmClick() {
			this.$confirm("确定进行此操作吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(async () => {
					let res = await this.$api.lkForm.updateDd(
						this.selectValveModel
					)
					if (res.code == 200) {
						this.$msg.success({
							content: res.msg,
							duration: 1
						})
						this.getTable()
					}
				})
				.catch(() => {
					this.closed = false
					this.$msg.info({
						content: "取消操作",
						duration: 1
					})
				})
		},
		btnClick() {
			this.getTable()
		},
		selectValveChange(val) {
			this.selectValveModel.valve = val
		}
	},
	created() {
		for (let i = 0; i < 19; i++) {
			this.setValveOption.push({
				value: `${i * 5}`,
				label: `${i * 5}%`
			})
		}
		// this.selectCorn()
		// this.getTable()
	}
}
</script>
