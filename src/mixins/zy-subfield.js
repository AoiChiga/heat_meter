import zySubfield from "../components/zy-subfield.vue"
export default {
	components: {
		zySubfield
	},
	methods: {
		loadNode(node, resolve) {
			const { level, label } = node

			if (node.level > 3) {
				return resolve([])
			}
			setTimeout(async () => {
				// 数据处理
				const active_key_name = Object.keys(this.model_tree)[level - 1]
				this.model_tree[active_key_name] = label
				// 发送请求
				const res = await this.treeData(level, this.model_tree)
				// 数据处理
				const children = []
				// if (!res.success) return this.$message.error("获取数据失败")
				res.forEach((item) => {
					const obj = {
						name: item,
						leaf: level > 2,
						id: `${item}+${this.model_tree.apartmentComplexName}`
					}
					children.push(obj)
				})
				resolve(children)
			}, 100)
		},
		//获取树形控件需要的数据
		async treeData(level, model_tree) {
			let res
			switch (level) {
				case 0:
					res = await this.$api.treeData.selectApartmentComplexList(
						model_tree
					)
					break
				case 1:
					res = await this.$api.treeData.selectBuildingList(
						model_tree
					)
					break
				case 2:
					model_tree.building = model_tree.building.replace(
						"号楼",
						""
					)
					res = await this.$api.treeData.selectUnitList(model_tree)
					break
				case 3:
					model_tree.building = model_tree.building.replace(
						"号楼",
						""
					)
					model_tree.unit = model_tree.unit.replace("单元", "")

					res = await this.$api.treeData.selectRoomList(model_tree)
					break
			}
			return res.data
		}
	},
	data() {
		return {
			model_tree: {
				apartmentComplexName: undefined,
				building: undefined,
				unit: undefined,
				room: undefined
			}
		}
	}
}
