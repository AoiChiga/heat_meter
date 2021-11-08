<template>
	<div class="zy-echart-flower">
		<div ref="myChart" :style="{ height: height, width: width }"></div>
	</div>
</template>
<script>
export default {
	name: "flower",
	props: {
		height: String,
		flowerData: Object,
		width: String
	},
	data() {
		const flowerData = this.flowerData
		const title = {
			text: flowerData.title,
			x: "center"
		}
		const tooltip = {
			trigger: "item",
			//提示框的数据样式显示
			formatter: "{b}：{c}户 ({d}%) "
		}
		let legend = {}
		if (flowerData.legend) {
			legend = flowerData.legend
		} else {
			legend = {
				x: "right",
				y: "bottom",
				//图例的排列默认属性是：水平或垂直,默认是：水平
				orient: "vertical",
				data: flowerData.titleArr
			}
		}

		const toolbox = {
			show: true,
			feature: {
				saveAsImage: {
					show: true
				}
			},
			left: "1%",
			right: "4%"
		}
		const calculable = true

		const series = [
			{
				name: "面积模式",
				type: "pie",
				radius: [30, 110],
				center: ["50%", 200],
				roseType: "area",
				max: 40,
				sort: "ascending",
				data: flowerData.data,
				label: {
					show: true,
					formatter: "{b}：{c}户 ({d}%) ",
					position: flowerData.position
				}
			}
		]
		return {
			option: {
				title,
				tooltip,
				legend,
				toolbox,
				calculable,
				series
			}
		}
	},
	mounted() {
		this.chart = this.$echarts.init(this.$refs.myChart)
		this.chart.setOption(this.option)

		// 绑定监听事件
		window.addEventListener("resize", this.resizeHandler)
		this.chart.on("click", this.openBlank)
	},
	beforeDestroy() {
		// 销毁监听事件
		window.removeEventListener("resize", this.resizeHandler)
		// 销毁 Echarts 实例
		this.chart.dispose()
	},
	methods: {
		// Echarts 的 resize 方法
		resizeHandler() {
			this.chart.resize()
		},
		openBlank(param) {
			this.$emit("click", param)
		}
	}
}
</script>
