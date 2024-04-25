<script setup>
import { ref, reactive } from 'vue'

const addressPicker = ref();
// 初始化
const state = reactive({
	loading: true,
	provinces: [], //省
	citys: [], //市
	areas: [], //区
	addressList: [],
	pickerValue: [0, 0, 0],
	defaultValue: [3442, 1, 2],
	text: ''
})

function getData() {
	uni.request({
		method: 'GET',
		url: 'https://www.yueguangling.top/uploads/response.json',
		success: res => {
			const { statusCode, data } = res
			if (statusCode === 200) {
				state.provinces = data.sort((left, right) => (Number(left.code) > Number(right.code) ? 1 : -1));
				handlePickValueDefault()
				setTimeout(() => {
					state.loading = false
				}, 200)
			}
		}
	})
}
getData()

function handlePickValueDefault() {
	// 设置省
	state.pickerValue[0] = state.provinces.findIndex(item => Number(item.id) === state.defaultValue[0]);
	// 设置市
	state.citys = state.provinces[state.pickerValue[0]]?.children || [];
	state.pickerValue[1] = state.citys.findIndex(item => Number(item.id) === state.defaultValue[1]);
	// 设置区
	state.areas = state.citys[state.pickerValue[1]]?.children || [];
	state.pickerValue[2] = state.areas.findIndex(item => Number(item.id) === state.defaultValue[2]);
	// 重置下位置
	addressPicker.value.setIndexs([state.pickerValue[0], state.pickerValue[1], state.pickerValue[2]], true);

	state.addressList = [state.provinces, state.citys, state.areas];
}

function change(e) {
	if (state.loading) {
		return
	}
	const { columnIndex, index, indexs } = e
	// 改变了省
	if (columnIndex === 0) {
		state.citys = state.provinces[index]?.children || []
		state.areas = state.citys[0]?.children || []
		addressPicker.value.setIndexs([index, 0, 0], true)
	} else if (columnIndex === 1) {
		state.areas = state.citys[index]?.children || []
		addressPicker.value.setIndexs(indexs, true)
	}

	state.addressList = [state.provinces, state.citys, state.areas];
}

function open() {
	addressPicker.value.open();
	handlePickValueDefault()
}

function confirm(e) {
	state.text = `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
}
</script>

<template>
	<scroll-view>
		<view class="card">
			<view class="title">
				联系人
			</view>
			<uv-input placeholder="请输入联系人" border="surround" clearable></uv-input>
			<view class="title">
				手机号
			</view>
			<uv-input maxlength="11" placeholder="请输入手机号" border="surround" type="number" clearable></uv-input>
			<view class="title">
				所在区域
			</view>
			<view @click="open">
				<uv-input placeholder="请选择所在区域" :value="state.text" border="surround" readonly></uv-input>
			</view>
			<view class="title">
				详细地址
			</view>
			<uv-textarea v-model="value" count placeholder="请输入详细地址
			"></uv-textarea>
		</view>
		<view class="card">
			<uv-radio-group v-model="radiovalue" placement="column" iconPlacement="right">
				<uv-radio shape="square" label="设为默认地址"></uv-radio>
			</uv-radio-group>
		</view>

		<view class="empty"></view>

		<view class="saveAddressLine">
			<view class="saveAddress" @click="handleSaveAddress">
				保存地址
			</view>
		</view>

		<!-- 地址选择器 -->
		<uv-picker round="10" ref="addressPicker" :columns="state.addressList" :loading="state.loading" keyName="name"
			@change="change" @confirm="confirm">
		</uv-picker>
	</scroll-view>
</template>

<style lang="scss" scoped>
.card {
	border-radius: 8px;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	box-sizing: border-box;
	padding: 10px;

	.title {
		margin-left: 2px;
		color: #8f9ca2;
		margin-bottom: 5px;
		font-size: 14px;
	}

	.title:nth-child(n+2) {
		margin-top: 10px;
	}
}

.empty {
	height: calc(65px + env(safe-area-inset-bottom));
	height: calc(65px + constant(safe-area-inset-bottom));
}

.saveAddressLine {
	padding: 10px;
	align-items: center;
	display: flex;
	bottom: 0;
	box-sizing: border-box;
	left: 0;
	position: fixed;
	width: 100%;
	justify-content: center;
	padding-bottom: calc(10px + constant(safe-area-inset-bottom));
	padding-bottom: calc(10px + env(safe-area-inset-bottom));

	.saveAddress {
		line-height: 55px;
		align-items: center;
		display: flex;
		justify-content: center;
		background: #0ec4b9;
		border-radius: 4px;
		color: #fff;
		font-size: 17px;
		height: 55px;
		width: 100%;
	}
}
</style>