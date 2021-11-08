import { getBrn } from "../../utils/cookies"

const state = {
	brn: getBrn()
}

const mutations = {
	SET_BRN: (state, brn) => {
		state.brn = brn
	}
}

const actions = {}

export default {
	state,
	mutations,
	actions
}
