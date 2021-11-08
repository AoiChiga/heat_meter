<template>
	<div class="zy-echart-bar">
		<div ref="barChart" :style="{ height: height }"></div>
	</div>
</template>

<script>
export default {
	name: "zy-echart-bar",
	props: {
		height: String,
		data: Object
	},
	data() {
		const data = this.data
		const color = data.color
		const starEnd = data.starEnd || {
			start: 0,
			end: 100
		}
		const dataZoom = [
			{
				type: "slider",
				start: starEnd.start,
				end: starEnd.end
			}
		] //用于添加滚轮缩放
		const textStyle = {
			color: "#999"
		}

		const tooltip = {
			trigger: "axis",
			axisPointer: {
				type: "cross"
			},
			textStyle: {
				color: "#fff",
				fontStyle: "normal",
				fontFamily: "微软雅黑",
				fontSize: 12
			}
		}
		const toolbox = {
			show: true,
			feature: {
				// magicType: {
				//     show: true,
				//     type: ["line", "bar"]
				// },
				// restore: {
				//     show: true
				// },
				saveAsImage: {
					show: true
				}
			},
			left: "3%",
			right: "4%"
		}

		const legend = {
			icon: "square",
			data: data.title,
			itemGap: 30,
			right: 0,
			top: 4,
			padding: 0
		}

		const grid = {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		}

		const xAxis = [
			{
				type: "category",
				data: data.xAxis,
				axisTick: {
					show: false
				},
				axisLine: {
					//横坐标线
					lineStyle: {
						color: "#ccc"
					}
				},
				axisLabel: {
					color: "#4C647C"
				}
			}
		]

		const yAxis = [
			{
				type: "value",
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					formatter: "{value}℃",
					color: "#4C647C"
				},
				splitLine: {
					lineStyle: {
						//网格线
						type: "solid",
						color: "#F0F0F0"
					}
				}
			}
		]

		let series = []
		for (let info of data.series) {
			series.push({
				type: "bar",
				name: info.name,
				barWidth: "8px",
				data: info.data,
				itemStyle: {
					normal: {
						//柱形图圆角，顺时针左上，右上，右下，左下）
						barBorderRadius: 12
					}
				},
				color: color
			})
		}

		const title = {
			text: data.titles,
			x: "center"
		}

		return {
			option: {
				title,
				textStyle,
				tooltip,
				legend,
				grid,
				xAxis,
				yAxis,
				series,
				toolbox,
				backgroundColor: "#fff",
				dataZoom
			}
		}
	},
	mounted() {
		const _this = this
		_this.chart = this.$echarts.init(_this.$refs.barChart)
		_this.chart.setOption(_this.option)
		window.addEventListener("resize", _this.resizeHandler)
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.resizeHandler)
		this.chart.dispose()
	},
	methods: {
		resizeHandler() {
			this.chart.resize()
		}
	}
}
</script>
