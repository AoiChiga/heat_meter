export default {
	randomColor() {
		//macaron色系
		const cream = "#f16d7a"
		const rose = "#e27386"
		const rosep = "#f55066"
		const anperiaru = "#ef5464"
		const almond = "#ae716e"
		const choco = "#cb8e85"
		const kernel = "#cf8878"
		const raspberry = "#c86f67"
		const caramel = "#f1ccbe"
		const vanilla = "#f2debd"
		const matcha = "#b7d28d"
		const pistachio = "#dcff93"
		const wcoffee = "#ff9b6a"
		const mpink = "#f1b8e4"
		const mpurple = "#d9b8f1"
		const morange = "#f1ccb8"
		const myellow = "#f1f1b8"
		const mgreen = "#b8f1cc"
		const aniyu = "#e7dac9"
		const vine = "#e1622f"
		const grapefruit = "#f3d64e"
		const rfruit = "#fd7d36"
		const cheese = "#fe9778"
		const lavender = "#c38e9e"
		const mchoco = "#f28869"
		const damian = "#de772c"
		const nutchoco = "#e96a25"
		const bcurrant = "#ca7497"
		const passion = "#e29e4b"
		const powaru = "#edbf2b"
		const mango = "#fecf45"
		const mgrapefruit = "#f9b747"
		const mbrown = "#c17e61"
		const nougat = "#ed9678"
		const pineapple = "#ffe543"
		const tea = "#e37c5b"
		const ochoco = "#ff8240"
		const cherry = "#aa5b71"
		const bananu = "#f0b631"
		const kurakkure = "#cf8888"
		const macaron = [
			cream,
			rose,
			rosep,
			anperiaru,
			almond,
			choco,
			kernel,
			raspberry,
			caramel,
			vanilla,
			matcha,
			pistachio,
			wcoffee,
			mpink,
			mpurple,
			morange,
			myellow,
			mgreen,
			aniyu,
			vine,
			grapefruit,
			rfruit,
			cheese,
			lavender,
			mchoco,
			damian,
			nutchoco,
			bcurrant,
			passion,
			powaru,
			mango,
			mgrapefruit,
			mbrown,
			nougat,
			pineapple,
			tea,
			ochoco,
			cherry,
			bananu,
			kurakkure
		]
		const random = parseInt(Math.random() * (macaron.length - 1), 10)
		return macaron[random]
	},
	//
	naturalColor() {
		const naturalColor = [
			"#99CC99",
			"#666600",
			"#996633",
			"#99CC66",
			"#006600",
			"#66CC66",
			"#CCCC66",
			"#669933",
			"#CCCC33",
			"#663300",
			"#666633",
			"#999933",
			"#CC9966",
			"#003300",
			"#CCCC99",
			"#006633",
			"#999999",
			"#333300",
			"#66CC99",
			"#339933"
		]
		const random = parseInt(Math.random() * (naturalColor.length - 1), 10)
		return naturalColor[random]
	},
	//
	elegantColor() {
		const elegantColor = [
			"#CCCCCC",
			"#CC99CC",
			"#CC3399",
			"#FFCCCC",
			"#FF99CC",
			"#CCCCFF",
			"#9933CC",
			"#9999CC",
			"#663366",
			"#FF9999",
			"#996666",
			"#CC99CC",
			"#CC9999",
			"#996699",
			"#6666CC",
			"#990066",
			"#993399",
			"#006699"
		]
		const random = parseInt(Math.random() * (elegantColor.length - 1), 10)
		return elegantColor[random]
	},
	//
	simpleColor() {
		const simpleColor = [
			"#99CCFF",
			"#666666",
			"#336666",
			"#999999",
			"#0099CC",
			"#CCCCCC",
			"#663366",
			"#6699CC",
			"#333366",
			"#669999",
			"#336699",
			"#003366",
			"#99CCCC",
			"#3399CC",
			"#009999",
			"#666699",
			"#66CCCC",
			"#6699FF",
			"#993366"
		]
		const random = parseInt(Math.random() * (simpleColor.length - 1), 10)
		return simpleColor[random]
	}
}
