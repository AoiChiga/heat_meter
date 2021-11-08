export default {
	filters: {
		// 格式化时间
		dateFormat(str) {
			const dt = new Date(str)
			const y = dt.getFullYear()
			const m = (dt.getMonth() + 1 + "").padStart(2, "0")
			const d = (dt.getDate() + "").padStart(2, "0")
			const hh = (dt.getHours() + "").padStart(2, "0")
			const mm = (dt.getMinutes() + "").padStart(2, "0")
			const ss = (dt.getSeconds() + "").padStart(2, "0")

			return `${y}-${m}-${d},${hh}:${mm}:${ss}`
		},

		// 保留小数位
		retainDecimal(data, num) {
			return data.toFixed(num)
		},

		// 金钱格式化
		cashFormat(str) {
			return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		},
		toBias(str) {
			return str.replace(/_/g, "/")
		}
	}
}
