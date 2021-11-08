var card = {
	card(val) {
		var id = val
			.replace(/\s/g, "")
			.replace(/(\d{10})\d*([0-9a-zA-Z]{4})/, "$1****$2")
		return id
	},
	tel(val) {
		var id = val
			.replace(/\s/g, "")
			.replace(/(\d{3})\d*([0-9a-zA-Z]{4})/, "$1****$2")
		return id
	}
}
export default card
