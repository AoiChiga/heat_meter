<template>
	<div class="zy-page">
		<!-- 分页 -->
		<i-page
			@on-page-size-change="handleSizeChange"
			@on-change="handleCurrentChange"
			:curren="pageModel.pageNum"
			:page-size-opts="[5, 100, 200, 300, 500]"
			:page-size="pageModel.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			show-total
			show-elevator
			show-sizer
		></i-page>
	</div>
</template>

<script>
export default {
	name: "zy-page",
	props: {
		// 分页查询数据
		pageModel: Object,
		// 总数
		total: Number
	},
	data() {
		return {}
	},
	methods: {
		handleSizeChange(ns) {
			this.$emit("size-change", ns)
		},
		handleCurrentChange(np) {
			this.$emit("current-change", np)
		}
	}
}
</script>
