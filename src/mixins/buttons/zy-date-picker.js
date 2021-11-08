import zyDatePicker from "../../components/buttons/zy-date-picker.vue"
export default {
	components: {
		zyDatePicker
	},
	data() {
		return {
			read: false,
			editable: true,
			tac: false,
			pcName: "",
			up: false,
			className: "",
			preicon: "el-icon-date",
			clricon: "el-icon-circle-close",
			name: "",
			clearable: false
		}
	},
	methods: {
		dateChange(val) {
			if (val) {
				this.tableModel.startTime = val[0]
				this.tableModel.endTime = val[1]
			} else {
				this.tableModel.startTime = undefined
				this.tableModel.endTime = undefined
			}
		}
	}
}
