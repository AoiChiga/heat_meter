<template>
	<!-- 起止日期 -->
	<div class="zy-date-picker d-flex ai-center">
		<el-date-picker
			size=""
			class="mr-1"
			v-model="datePickerModel"
			:type="datePickerType"
			:placeholder="datep"
			:style="{ width: width }"
			@change="datePickerChange"
			:disabled="disabled"
			:clearable="clearable"
			:value-format="vf"
			:range-separator="rs"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			:readonly="read"
			:editable="editable"
			:time-arrow-control="tac"
			:popper-class="pcName"
			:name="name"
			:unlink-panels="up"
			:class="className"
			:prefix-icon="preicon"
			:clear-icon="clricon"
		>
		</el-date-picker>
	</div>
</template>
<script>
export default {
	name: "zy-date-picker",
	props: {
		// 时间选择类型
		datePickerType: {
			type: String,
			default: "daterange"
		},
		value: {},
		width: {
			type: String,
			default: ""
		},
		datep: {
			type: String,
			default: "选择日期"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: true
		},
		vf: {
			type: String,
			default: "yyyy-MM-dd"
		},
		rs: {
			type: String,
			default: "-"
		},
		read: {
			type: Boolean
		},
		editable: {
			type: Boolean
		},
		tac: {
			type: Boolean
		},
		pcName: {
			type: String
		},
		up: {
			type: Boolean
		},
		className: {
			type: String
		},
		preicon: {
			type: String
		},
		clricon: {
			type: String
		},
		name: {
			type: String
		}
	},
	data() {
		return {
			datePickerModel: this.value || ""
		}
	},
	methods: {
		datePickerChange(val) {
			// console.log(this.datePickerModel);
			this.$emit("change", val)
		}
	},
	watch: {
		value(newval) {
			this.datePickerModel = newval
		}
	}
}
</script>
