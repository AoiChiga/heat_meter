<template>
	<div class="login-container po-relative">
		<!-- header -->
		<div class="login-header p-2">
			<!-- 二维码 -->
			<div class="qr-code d-flex jc-end ai-center po-relative">
				<!-- 小二维码 -->
				<div class="mr-1"></div>

				<!-- title -->
				<div class="lh-2 font-16 text-white">
					<!-- 扫码下载App -->
				</div>

				<!-- 大二维码 -->
				<div class="po-absolute"></div>
			</div>

			<!-- logo -->
			<div class="header-logo d-flex jc-center ai-center">
				<!-- logo -->
				<!-- <div class="logo mr-2">
                    <img
                        class="w-100"
                        src="../assets/images/login/logo.png"
                        alt=""
                    />
                </div> -->
				<!-- title -->
				<div class="title fw-600 text-white">
					{{ $config.company.name }}
				</div>
			</div>
		</div>

		<div class="login-main">
			<div class="main-img"></div>
			<i-card class="zy-card">
				<el-form
					ref="logoModelRef"
					:model="logoModel"
					class="login-form ml-2"
				>
					<el-form-item class="" prop="username">
						<i
							class="
								el-icon-user
								form-icon
								text-white
								font-18
							"
						></i>
						<i-input
							prefix="md-person"
							type="text"
							class="form-input"
							v-model="logoModel.username"
							placeholder="用户名"
							size="large"
						>
						</i-input>
					</el-form-item>

					<el-form-item class="" prop="password">
						<i
							class="
								el-icon-unlock
								form-icon
								text-white
								font-18
							"
						></i>
						<i-input
							prefix="ios-lock"
							type="password"
							class="form-input"
							v-model="logoModel.password"
							placeholder="密码"
							size="large"
						>
						</i-input>
					</el-form-item>

					<i-button class="form-enter bg-white mb-2" @click="login"
						>登录</i-button
					>
				</el-form>
			</i-card>
		</div>

		<!-- 底部 -->
		<div class="login-footer po-absolute w-100 ta-center">
			<!-- 版权 -->
			<div
				class="
					footer-copyright
					d-flex
					jc-center
					ai-center
					text-white
					font-16
					mb-1
				"
			>
				<div class="item mr-1">
					©版权所有：{{ $config.company.copyright }}
				</div>
				<div class="item mr-1">地址：{{ $config.company.address }}</div>
				<div class="item mr-1">
					&nbsp;热线电话：{{ $config.company.tele }}
				</div>
			</div>

			<!-- 备案信息 -->
			<!-- <div class="footer-record d-flex jc-center ai-center ">
                <div class="ba-icon"></div>
                <el-link type="success" class="text-white mr-1">
                    {{ $config.company.icp }}
                </el-link>

                <el-link type="success" class="text-white mr-1">
                    {{ $config.company.gwa }}
                </el-link>
            </div> -->
		</div>
	</div>
</template>

<script>
import valid from "../utils/valid"
export default {
	name: "Login",
	data() {
		// 验证用户名
		let validUserName = (rule, value, callback) => {
			const res = valid("name", value)
			if (!res.bla) {
				return callback(new Error(res.msg + " ：" + res.title))
			}
		}

		// 验证密码
		let validPassword = (rule, value, callback) => {
			if (value.length < 6) {
				return callback(new Error("密码至少6位"))
			}
		}
		return {
			logoModel: {
				username: "",
				password: ""
			},
			//登录表单验证
			loginModelRules: {
				username: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					},
					{
						validator: validUserName,
						trigger: "blur"
					}
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					},
					{
						validator: validPassword,
						trigger: "blur"
					}
				]
			}
		}
	},
	created() {
		this.$progress.configure({
			showSpinner: false
		})
		this.$progress.start()
		let that = this
		document.onkeypress = function(e) {
			var keycode = document.all ? event.keyCode : e.which
			if (keycode == 13) {
				that.login() // 登录方法名
				return false
			}
		}

		this.$progress.done()
	},
	methods: {
		login() {
			this.$store
				.dispatch("login", this.logoModel)
				.then(() => {
					// console.log(res)
					this.$router.push("/index")
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
</script>
