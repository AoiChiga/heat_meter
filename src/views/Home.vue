<template>
	<div class="home-content h-100">
		<!-- 菜单+用户信息+功能 -->
		<el-row
			class="
				w-100
				home-main
				d-flex
				jc-between
				ai-center
				el-card
				is-always-shadow
			"
		>
			<!-- 公司名称 -->
			<el-col :span="4" class="header-company ml-2 font-20">
				<p class="woh">{{ $config.company.name }}</p>
			</el-col>
			<el-col :span="20" class="d-flex jc-between ova">
				<!-- 菜单 -->
				<el-menu
					class="d-flex"
					router
					mode="horizontal"
					unique-opened
					:collapse-transition="false"
					:default-active="$route.path"
				>
					<el-menu-item
						class="mr-1"
						v-for="(navItem, navIndex) in navbar"
						:key="navIndex"
						:index="('/' + navItem.path) | toBias"
					>
						<div class="d-flex ai-center">
							<span
								:class="['iconfont', 'font-16', navItem.icon]"
							></span>
							<i class="d-block bg-primary nav-line"></i>
							<span class="pl-1 pr-1">{{ navItem.name }}</span>
						</div>
					</el-menu-item>
				</el-menu>
				<div class="mr-5 home-close fw-600 mt-2 d-flex">
					<!-- <div class="mr-2 d-flex">
						<span class="lh-22">主题色：</span>
						<el-color-picker
							size="small"
							v-model="themeColor"
							@change="setThemeColor"
							:predefine="[
								'#61B2EE',
								'#01ADA8',
								'#f16d7a',
								'#aa5b71',
								'#ae716e',
								'#999',
								'#e37c5b',
								'#ed9678',
								'#edbf2b',
								'#d9b8f1'
							]"
						>
						</el-color-picker>
					</div> -->
					<div class="d-flex mr-3 mt-1">
						<span class="text-primary lh-16" style="width: 100px"
							>报警声音开关：</span
						>
						<el-switch
							v-model="soundSwitch"
							active-color="#13ce66"
							inactive-color="#ff4949"
						>
						</el-switch>
					</div>
					<div class="mr-2 text-primary lh-18">
						<i class="iconfont icon-user"></i>
						{{
							this.$store.state.user.username
								? this.$store.state.user.username
								: null
						}}
					</div>
					<div class="cu-p text-primary lh-18" @click="signOut">
						<i class="iconfont icon-tuichu"></i> 退出登录
					</div>
				</div>
			</el-col>
		</el-row>
		<!-- 主要区域 -->
		<div class="home-main flex-1 po-relative">
			<!-- 视图 -->
			<div class="home-view box-border h-100">
				<!-- 主要试图 -->
				<div class="view h-100"><router-view /></div>
			</div>
		</div>
	</div>
</template>

<script>
import filters from "../utils/filters"

import { removeToken, setColor } from "../utils/cookies"
export default {
	name: "Home",
	mixins: [filters],
	data() {
		return {
			//侧边栏
			navbar: this.$config.navbar,
			themeColor: "#61B2EE",
			zyAudio: new Audio(),
			soundSwitch: false
		}
	},
	methods: {
		signOut() {
			removeToken()
			this.$router.push("/login")
		},
		async loginInfo() {
			// const res = await this.$api.nbSelectAll.loginInfo()
			// this.username = res.data.username
		},
		setThemeColor(val) {
			document
				.getElementsByTagName("body")[0]
				.style.setProperty("--primary", val)
			setColor(val)
		},
		initThemeColor() {
			if (this.$store.state.user.color) {
				this.themeColor = this.$store.state.user.color
				setColor(this.$store.state.user.color)
				document
					.getElementsByTagName("body")[0]
					.style.setProperty(
						"--primary",
						this.$store.state.user.color
					)
			} else {
				setColor("#61B2EE")
			}
		},
		async selectNowNotice() {
			const res = await this.$api.info.baojinTs()
			if (res.data.length) {
				this.playAlarm(res.data)
			}
		},
		playAlarm(msg) {
			if (this.soundSwitch) {
				this.zyAudio = new Audio()
				this.zyAudio.src = "http://121.36.204.245:8082/yinpin/12297.wav"
				this.zyAudio.play()
				this.zyAudio.addEventListener("ended", () => {
					this.zyAudio.pause()
					this.zyAudio = null
				})
			}
			let arr = []
			msg.forEach((item) => {
				arr.push(
					`<i><span class='text-gray-darker'><i class='iconfont icon-baojing text-yellow font-22'></i>${item}</span></i>`
				)
			})
			arr = arr.join("<br/>")
			this.$notify({
				title: "实时报警",
				dangerouslyUseHTMLString: true,
				message: arr,
				// type: "warning",
				position: "bottom-right",
				iconClass: "iconfont icon-baojing1 text-warning"
			})
		}
	},
	created() {
		this.loginInfo()
		setInterval(this.selectNowNotice, 1000)
	}
}
</script>
