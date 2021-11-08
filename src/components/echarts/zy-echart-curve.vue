<template>
	<div class="zy-echart-curve">
		<div ref="myChart" :style="{ height: height }"></div>
	</div>
</template>

<script>
export default {
	name: "zy-echart-curve",
	props: {
		height: String,
		data: Object,
		starEnd: Object,
		rotate: {
			type: String,
			default: "0"
		}
	},
	data() {
		const data = this.data
		const color = data.color
		const starEnd = this.starEnd || {
			start: 0,
			end: 100
		}

		const title = data.title
		const tooltip = {
			trigger: "axis",
			axisPointer: {
				type: "line",
				lineStyle: {
					color: "#DFE6E9",
					width: 2
				}
			}
		}

		const legend = {
			itemGap: 30,
			right: 0,
			top: 4,
			padding: 0,
			textStyle: {
				color: "#4c9bfd"
			},
			data: title.title
		}
		const toolbox = {
			show: true,
			feature: {
				// magicType: { show: true, type: ["line", "bar"] },
				// restore: { show: true },
				saveAsImage: { show: true }
			},
			left: "3%",
			right: "4%"
		}
		const grid = {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		}

		const xAxis = {
			type: "category",
			boundaryGap: false,
			data: data.data.xAxis,
			axisTick: {
				show: false
			},
			axisLabel: {
				color: "#4C647C",
				interval: 0,
				rotate: this.rotate
			},
			axisLine: {
				show: false
			}
		}

		const yAxis = {
			type: "value",
			axisTick: { show: false },
			axisLine: {
				show: false
			},
			axisLabel: {
				formatter: "{value}℃",
				color: "#4C647C"
			},
			splitLine: {
				lineStyle: {
					color: "#F0F0F0"
				}
			}
		}

		const series = [
			{
				name: title.title1,
				type: "line",
				//stack: "总量",
				smooth: true,
				data: data.data.data1,
				color: color[0],
				symbolSize: 5,
				barWidth: 10,
				showSymbol: false,
				lineStyle: {
					color: "#3275FB",
					width: 2,
					shadowColor: "rgba(0, 0, 0, 0.3)", //设置折线阴影
					shadowBlur: 3,
					shadowOffsetY: 10
				},
				areaStyle: {
					//区域填充样式
					normal: {
						//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
						color: new this.$echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: "rgba(25,163,223,.3)"
								},
								{
									offset: 1,
									color: "rgba(25,163,223, 0)"
								}
							],
							false
						),
						shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
						shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
					}
				}
			},
			{
				name: title.title2,
				type: "line",
				//stack: "总量",
				smooth: true,
				data: data.data.data2,
				color: color[1],
				symbolSize: 5,
				barWidth: 10,
				showSymbol: false,
				lineStyle: {
					color: color[1],
					width: 2,
					shadowColor: "rgba(0, 0, 0, 0.3)", //设置折线阴影
					shadowBlur: 3,
					shadowOffsetY: 10
				},
				areaStyle: {
					//区域填充样式
					normal: {
						//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
						color: new this.$echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: "rgba(54,206,158,.3)"
								},
								{
									offset: 1,
									color: "rgba(54,206,158, 0)"
								}
							],
							false
						),
						shadowColor: "rgba(54,206,158, 0.1)", //阴影颜色
						shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
					}
				}
			}
		]
		const dataZoom = [
			{
				type: "inside",
				start: starEnd.start,
				end: starEnd.end
			}
		] //用于添加滚轮缩放

		return {
			option: {
				title,
				color,
				data,
				tooltip,
				legend,
				grid,
				xAxis,
				yAxis,
				series,
				toolbox,
				dataZoom
			}
		}
	},
	mounted() {
		this.chart = this.$echarts.init(this.$refs.myChart)
		this.chart.setOption(this.option)

		// 绑定监听事件
		window.addEventListener("resize", this.resizeHandler)
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
		}
	}
}
</script>
