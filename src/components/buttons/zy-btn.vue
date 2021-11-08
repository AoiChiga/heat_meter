<template>
	<!-- 按钮 -->
	<i-button
		@click="btnClick"
		:class="['zy-btn', className]"
		:size="size"
		:type="btnType"
		:ghost="ghost"
	>
		<i :class="[btnIcon]"></i>
		{{ btnTitle }}</i-button
	>
</template>
<script>
export default {
	name: "zy-btn",
	props: {
		// 预留按钮
		btn: {
			type: Boolean,
			default: false
		},
		className: {
			type: String,
			default: "mr-1"
		},

		// 预留按钮title
		btnTitle: {
			type: String,
			default: "按钮"
		},

		// 预留按钮类型
		btnType: {
			type: String,
			default: "primary"
		},
		size: {
			type: String,
			default: "default"
		},
		btnIcon: {
			type: String,
			default: ""
		},
		ghost: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		btnClick() {
			this.$emit("click")
		}
	}
}
</script>
