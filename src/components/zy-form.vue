<template>
	<div class="zy-form">
		<el-form
			:inline="inline"
			:model="value"
			:label-position="lpo"
			:label-width="lw"
			:size="size || 'small'"
			:disabled="disabled"
			:rules="formConfig.rules"
			class="ml-2 mt-1"
		>
			<slot name="formItem"></slot>
			<el-form-item
				v-for="(item, index) in formConfig.formItemList"
				:key="index"
				:label="item.label"
				:prop="item.prop"
				:required="item.required || false"
				class="mr-3"
			>
				<!-- 输入框 -->
				<!-- 需要用到icon的时候要加上iconfont的classname -->
				<el-input
					v-if="item.type == 'input'"
					auto-complete="new-password"
					:type="item.inputType || ''"
					v-model="value[item.prop]"
					:maxlength="item.max || ''"
					:minlength="item.min || ''"
					:placeholder="item.placeholder || ''"
					:disabled="item.disabled || false"
					:clearable="item.clear || false"
					:show-password="item.password || false"
					:class="[
						item.select ? 'input-with-select' : '',
						item.className
					]"
					:prefix-icon="item.preicon || ''"
					:suffix-icon="item.sufficon || ''"
					:name="item.name || ''"
					:autofocus="item.auto || false"
					:readonly="item.read || false"
					:validate-event="item.vali || false"
					:style="{ width: item.width || '200px' }"
					@input="item.oninput"
					@change="item.onchange"
				>
					<!-- 前置内容 -->
					<template v-if="item.prepend || false" slot="prepend">{{
						item.prepend || ""
					}}</template>
					<!-- 后置内容 -->
					<template v-if="item.append || false" slot="append">{{
						item.append || ""
					}}</template>
					<!-- 选择器复合类型 -->
					<el-select
						slot="prepend"
						v-if="item.select"
						v-model="value['select']"
						placeholder="请选择"
						style="width: 60px"
					>
						<el-option
							v-for="(opItem, index) in provinceList"
							:key="index"
							:label="opItem.label"
							:value="opItem.value"
						></el-option>
					</el-select>
				</el-input>
				<!-- 文本域 -->
				<el-input
					v-if="item.type == 'textarea'"
					type="textarea"
					autosize
					v-model="value[item.prop]"
					:disabled="item.disabled || false"
					:clearable="item.clearable || false"
					:style="{ width: item.width || '200px' }"
				></el-input>

				<!-- 选择器 -->
				<el-select
					:clearable="item.clear"
					v-if="item.type == 'select'"
					v-model="value[item.prop]"
					:disabled="item.disabled || false"
					:multiple="item.mul || false"
					:collapse-tags="item.ct || false"
					:name="item.name || ''"
					:placeholder="item.placeholder || ''"
					:filterable="item.filter || true"
					:filter-method="item.filterFunc"
					:remote="item.remote || false"
					:remote-method="item.remoteFunc"
					:loading="item.load || false"
					:loading-text="item.loadtext || '加载中'"
					:no-match-text="item.nmt || '无匹配数据'"
					:no-data-text="item.ndt || '无数据'"
					:popper-class="item.pcName || ''"
					@change="item.onchange"
					:style="{ width: item.width || '200px' }"
				>
					<el-option
						v-for="(opItem, index) in item.opList"
						:key="index"
						:label="opItem.label"
						:value="opItem.value"
					>
					</el-option>
				</el-select>
				<!-- 时间选择器 -->
				<el-date-picker
					v-if="item.type == 'date'"
					v-model="value[item.prop]"
					:type="item.datetype || 'date'"
					:disabled="item.disabled || false"
					:clearable="item.clearable || false"
					:style="{ width: item.width || '200px' }"
					:placeholder="item.plh || ''"
					:value-format="item.vf || 'yyyy-MM-dd'"
					:range-separator="item.rs || '至'"
					:start-placeholde="item.sp || '开始日期'"
					:end-placeholde="item.ep || '结束日期'"
					:readonly="item.read || false"
					:editable="item.editable || true"
					:time-arrow-control="item.tac || false"
					:popper-class="item.pcName || ''"
					:name="item.name || ''"
					:unlink-panels="item.up || false"
					:class="item.className || ''"
					:prefix-icon="item.preicon || 'el-icon-date'"
					:clear-icon="item.clricon || 'el-icon-circle-close'"
					@change="item.onchange"
				></el-date-picker>
				<!-- 图片 -->
				<div
					class="demo-image"
					v-if="item.type == 'img'"
					style="overflow: auto; width: 200px"
				>
					<el-image
						:src="value[item.prop]"
						style="width: 50px; height: 50px"
					></el-image>
				</div>
				<!-- 上传 -->
				<!-- http://81.70.59.8:9010/gas/uploadFile -->
				<el-upload
					v-if="item.type == 'upload'"
					:class="[item.className, 'upload-demo']"
					:headers="token"
					action="http://81.70.59.8:9010/gas/uploadFile"
					:address="value[item.prop]"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:on-error="handleError"
					:before-remove="beforeRemove"
					:multiple="item.multiple || false"
					:drag="item.drag || false"
					:limit="item.limit || 1"
					:on-exceed="handleExceed"
					:on-success="item.handleSuccess"
					:file-list="fileList"
					:list-type="item.list || 'file'"
					:name="item.name || 'file'"
					:with-credentials="item.wc || false"
					:show-file-list="item.sfl || true"
					:disabled="item.disabled || false"
				>
					<el-input
						:style="{ width: item.width || '200px' }"
						:placeholder="item.placeholder"
					></el-input>
				</el-upload>
				<!-- <el-dialog title="图片预览" :visible.sync="visible" width="50%">
					<img :src="preview" alt class="preview" />
				</el-dialog> -->
			</el-form-item>
			<!-- 按钮 -->
			<el-form-item v-if="btn">
				<el-button
					v-for="(item, index) in formConfig.operate"
					:key="index"
					:size="item.size || ''"
					:type="item.type || 'primary'"
					:class="item.className || ''"
					:round="item.round || false"
					:plain="item.plain || false"
					:loading="item.loading || false"
					@click="item.handleClick"
				>
					{{ item.name }}
				</el-button>
				<slot name="operate"></slot>
			</el-form-item>
			<div v-if="radio" class="d-flex jc-around">
				<el-form-item
					v-for="(item, index) in formConfig.radio"
					:key="index"
					:label="item.label"
				>
					<el-radio-group
						v-model="item.active"
						v-for="(label, index) in item.radioList"
						:key="index"
						@change="item.onchange"
					>
						<el-radio :label="index" class="mr-1">{{
							label
						}}</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>
<script>
import { getToken } from "../utils/cookies"
export default {
	name: "zy-form",
	props: {
		formConfig: {
			type: Object,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		btn: {
			type: Boolean
		},
		lpo: {
			type: String,
			default: "right"
		},
		inline: {
			type: Boolean,
			default: true
		},
		lw: {
			type: String,
			default: "90px"
		},
		size: {
			type: String
		},
		disabled: {
			type: Boolean,
			default: false
		},
		oninput: {
			type: Function
		},
		radio: {
			type: Boolean
		}
	},
	data() {
		return {
			fileList: [],
			visible: false,
			preview: "",
			provinceList: []
		}
	},
	methods: {
		setDefaultValue() {
			const formData = { ...this.value }
			//设置默认值
			this.formConfig.formItemList.forEach(({ key, value }) => {
				if (formData[key] === undefined || formData[key] === null) {
					formData[key] = value
				}
			})
			this.$emit("input", formData)
		},
		/**
		 * 文件移除时的钩子
		 * param file fileList
		 */
		handleRemove() {},
		/**
		 * 点击文件列表种已上传文件时的钩子
		 * param file
		 */
		handlePreview() {
			// this.preview = file.url
			// this.visible = true
		},
		/**
		 * 文件超出个数限制时的钩子
		 * param files fileList
		 */
		handleExceed(files, fileList) {
			this.$message.error(`当前限制选择 ${fileList.length} 个文件`)
		},

		/**
		 * 上传文件之前的钩子
		 * 参数为上传的文件
		 * 若返回false或者返回Promise且被reject
		 * 则停止删除
		 */
		beforeUpload(file) {
			return this.$confirm(`确定上传${file.name}？`)
		},
		/**
		 * 删除文件之前的钩子
		 * 参数为上传的文件和文件列表
		 * 若返回false或者返回Promise且被reject
		 * 则停止删除
		 */
		beforeRemove() {
			// return this.$confirm(`确定移除 ${file.name}？`);
		},
		/**
		 * 文件上传错误时的钩子
		 * param error，file，fileList
		 */
		handleError() {
			// console.log(err, file, fileList)
		},
		getProvinceList() {
			const province = [
				"京",
				"津",
				"沪",
				"渝",
				"冀",
				"豫",
				"云",
				"辽",
				"黑",
				"湘",
				"皖",
				"鲁",
				"新",
				"苏",
				"浙",
				"赣",
				"鄂",
				"桂",
				"甘",
				"晋",
				"蒙",
				"陕",
				"吉",
				"闽",
				"贵",
				"粤",
				"青",
				"藏",
				"川",
				"宁",
				"琼"
			]
			let arr = []
			province.forEach((item) => {
				arr.push({
					label: item,
					value: item
				})
			})
			this.provinceList = arr
		}
	},
	mounted() {
		this.setDefaultValue()
	},
	created() {
		this.getProvinceList()
		const token = getToken()
		this.token = { token: token }
	}
}
</script>
