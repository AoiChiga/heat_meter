<template>
	<div
		class="subfield-container po-relative h-100"
		:class="toggle ? 'subfield-close' : 'subfield-open'"
	>
		<!-- 收缩盒子 -->
		<div class="subfield-content h-100">
			<!-- 左侧 -->
			<div
				class="
					el-card
					subfield-item
					zy-card
					subfield-left
					mr-1
					fl
					ova
					yes-head
					is-always-shadow
				"
			>
				<div class="el-card__header">
					<div class="card-head">
						<div class="font-16 text-white lh-20">
							<i class="iconfont icon-xiaoqu"></i> {{ xqTitle }}
						</div>
					</div>
				</div>
				<div class="el-card__body">
					<div class="village-search mb-2">
						<div class="font-16 mb-1">小区名称：</div>
						<div class="d-flex">
							<el-input
								class="ml-1 mr-1"
								v-model="inputModel"
								placeholder="筛选小区"
							></el-input>
							<el-button
								type="primary"
								size="small"
								@click="btnClick"
								>{{ zyBtn.btnTitle }}</el-button
							>
						</div>
					</div>
					<div class="village-list">
						<el-tree
							class="filter-tree"
							:filter-node-method="filterNode"
							:props="props"
							:load="loadNode"
							lazy
							accordion
							check-strictly
							show-checkbox
							check-on-click-node
							@check="nodeClick"
							node-key="id"
							ref="zyTree"
						>
						</el-tree>
					</div>
				</div>
			</div>

			<!-- 右侧 -->
			<div
				class="
					subfield-item
					el-card
					is-always-shadow
					no-head
					subfield-right
					fl
					w-100
					ova
				"
			>
				<slot name="subfield-right"></slot>
			</div>
		</div>

		<!-- 收缩按钮 -->
		<div
			ref="toggleBtn"
			@click="handleToggleClick"
			class="toggle-content po-absolute d-flex jc-center ai-center cu-p"
		>
			<i class="icon-ai203 iconfont text-white"></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String
		},
		xqTitle: {
			type: String,
			default: "小区列表"
		}
	},
	data() {
		return {
			// 收缩开关
			toggle: false,
			props: {
				label: "name",
				children: "zones",
				isLeaf: "leaf"
			},
			zyBtn: {
				btnTitle: "搜索"
			},

			inputModel: this.value || ""
		}
	},
	methods: {
		filterNode(value, data) {
			if (!value) return true
			return data.name.indexOf(value) !== -1
		},
		btnClick() {
			this.$emit("click")
		},
		// toggle切换
		handleToggleClick() {
			this.toggle = !this.toggle
			/**
			 * toggle切换回调
			 */
			this.$emit("toggle-click-cb", this.toggle)
		},
		// lazy-load加载事件
		loadNode(node, resolve) {
			this.$emit("load-node", node, resolve)
		},
		nodeClick(v1, v2) {
			if (v2.checkedKeys.length > 1) {
				for (let key of v2.checkedKeys) {
					if (key != v1.id) {
						this.$refs.zyTree.setChecked(key, false)
					}
				}
			}
			let obj = {
				apartmentComplexName: undefined,
				building: undefined,
				unit: undefined,
				room: undefined
			}
			let building, unit
			if (this.$refs.zyTree.getNode(v1).checked) {
				switch (this.$refs.zyTree.getNode(v1.id).level) {
					case 1:
						obj = {
							apartmentComplexName: this.$refs.zyTree.getNode(
								v1.id
							).data.name,
							building: undefined,
							unit: undefined,
							room: undefined
						}
						break
					case 2:
						building = this.$refs.zyTree
							.getNode(v1.id)
							.data.name.replace("号楼", "")
						obj = {
							apartmentComplexName: this.$refs.zyTree.getNode(
								v1.id
							).parent.data.name,
							building: building,
							unit: undefined,
							room: undefined
						}
						break
					case 3:
						building = this.$refs.zyTree
							.getNode(v1.id)
							.parent.data.name.replace("号楼", "")
						unit = this.$refs.zyTree
							.getNode(v1.id)
							.data.name.replace("单元", "")
						obj = {
							apartmentComplexName: this.$refs.zyTree.getNode(
								v1.id
							).parent.parent.data.name,
							building: building,
							unit: unit,
							room: undefined
						}
						break
					case 4:
						building = this.$refs.zyTree
							.getNode(v1.id)
							.parent.parent.data.name.replace("号楼", "")
						unit = this.$refs.zyTree
							.getNode(v1.id)
							.parent.data.name.replace("单元", "")
						obj = {
							apartmentComplexName: this.$refs.zyTree.getNode(
								v1.id
							).parent.parent.parent.data.name,
							building: building,
							unit: unit,
							room: this.$refs.zyTree.getNode(v1.id).data.name
						}
						break
				}
			} else {
				switch (this.$refs.zyTree.getNode(v1.id).level) {
					case 1:
						obj.apartmentComplexName = undefined
						break
					case 2:
						obj.building = undefined
						break
					case 3:
						obj.unit = undefined
						break
					case 4:
						obj.room = undefined
						break
				}
			}
			this.$emit("check", v1, v2, obj)
		}
	},
	created() {},
	watch: {
		inputModel(val) {
			this.$refs.zyTree.filter(val)
		}
	}
}
</script>
