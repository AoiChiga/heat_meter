<template>
	<div class="setting h-100">
		<div class="el-card__body">
			<el-row class="mb-1" :gutter="10">
				<el-col :span="12">
					<i-card>
						<p slot="title" class="text-primary">
							<i class="el-icon-user"></i>
							用户注册
						</p>
						<zy-form
							ref="zyForm"
							:formConfig="formConfig"
							:value="userModel"
						></zy-form>
						<zy-btn ghost btnTitle="注册" @click="registeClick">
						</zy-btn>
					</i-card>
				</el-col>
				<i-divider type="vertical"></i-divider>
				<el-col :span="12">
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
							v-model="selectValveModel.kd"
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
import zyForm from "../../components/zy-form.vue"
export default {
	mixins: [zyBtn],
	components: { zyForm },
	data() {
		return {
			setValveOption: [],
			setValve: undefined,
			selectValveModel: {
				kd: "0"
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
			yhnameList: [],
			userModel: {},
			formConfig: {
				formItemList: [
					{
						type: "input",
						label: "用户名：",
						prop: "username",
						width: "160px",
						onchange() {}
					},
					{
						type: "input",
						label: "密码：",
						prop: "password",
						onchange() {},
						width: "160px",
						inputType: "password",
						password: true
					},
					{
						type: "select",
						label: "角色：",
						prop: "role",
						onchange() {},
						width: "160px",
						opList: [
							{
								label: "管理员",
								value: "管理员"
							},
							{
								label: "操作员",
								value: "操作员"
							}
						]
					}
				],
				rules: {
					username: [
						{
							required: true,
							trigger: "blur",
							message: "不能为空"
						}
					],
					password: [
						{
							required: true,
							trigger: "blur",
							message: "不能为空"
						}
					],
					role: [
						{
							required: true,
							trigger: "blur",
							message: "不能为空"
						}
					]
				}
			}
		}
	},
	methods: {
		async getTable() {
			const res = await this.$api.table.selectNanBei()
			this.cardList[0].tbBody = res.nan
			this.cardList[1].tbBody = res.bei
		},
		confirmClick() {
			if (!this.selectValveModel.yhname) {
				this.$msg.warning({
					content: "请选择一个站点",
					duration: 2
				})
			} else {
				this.$confirm("确定进行此操作吗？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(async () => {
						const res = await this.$api.set.shezhiKd(
							this.selectValveModel
						)
						if (res.code == 200) {
							this.$msg.success({
								content: res.msg,
								duration: 2
							})
						} else {
							this.$msg.error({
								content: res.msg,
								duration: 2
							})
						}
					})
					.catch(() => {
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
				const res = await this.$api.info.sentZl(this.selectValveModel)
				if (res.code == 200) {
					this.$msg.success({
						content: res.msg,
						duration: 2
					})
				} else {
					this.$msg.error({
						content: res.msg,
						duration: 2
					})
				}
			}
			// this.getTable()
		},
		selectValveChange(val) {
			this.selectValveModel.kd = val
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
		},
		yhnameChange(val) {
			this.selectValveModel.yhname = val
		},
		registeClick() {
			this.$refs.zyForm.$children[0].validate((valid) => {
				if (valid) {
					this.$confirm("确定注册吗？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(async () => {
							const res = await this.$api.user.insertUsers(
								this.userModel
							)
							if (res.code == 200) {
								this.$msg.success({
									content: res.msg,
									duration: 2
								})
								this.userModel = {}
							} else {
								this.$msg.error({
									content: res.msg,
									duration: 2
								})
							}
						})
						.catch(() => {
							this.$msg.info({
								content: "取消操作",
								duration: 1
							})
						})
				}
			})
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
		this.getTable()
	}
}
</script>
