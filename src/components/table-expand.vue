<template>
	<div>
		<xxx-echart
			height="300px"
			:data="curveData"
			v-if="curveData.flag"
		></xxx-echart>
	</div>
</template>
<script>
import xxxEchart from "./echarts/zy-echart-curve.vue"
export default {
	props: {
		row: {
			type: Object
		}
	},
	components: {
		xxxEchart
	},
	data() {
		return {
			curveData: {
				dataTitle: ["累计流量", "累计流量"],
				xAxis: ["1", "2"],
				series: [
					{
						data: [
							{ value: 80, name: "1" },

							{ value: 90, name: "2" }
						]
					}
				],
				flag: false,
				color: "简洁",
				toolbox: { show: false }
			}
		}
	},
	methods: {
		setCurve() {}
	},
	created() {
		console.log(this.row, this.columns)
	}
}
</script>
