<script setup>
import { ref, getCurrentInstance } from 'vue'
import api from '@/api/modules/regions'

const $instance = ref(getCurrentInstance().proxy)

const state = ref({
	address: [],
	radiovalue: 0
})


function getAddressList() {
	api.address_list().then((res) => {
		state.value.address = res.data.list
		if (res.data.radio != null) {
			state.value.radiovalue = res.data.radio.id
		}
	})
}
getAddressList()

// 点击添加回收地址
function handleAddAddress() {
	uni.navigateTo({
		url: "./add_address"
	})
}

// 获取微信地址
function getWechatAddress() {
	uni.chooseAddress({
		success(res) {
			let form = ref({
				name: res.userName,
				phone: res.telNumber,
				provinces: res.provinceName,
				citys: res.cityName,
				areas: res.countyName,
				detail: res.detailInfo,
				default: false
			})

			api.create(form.value).then(() => {
				uni.navigateBack()
				uni.showToast({
					title: "保存成功",
					icon: 'none',
				});
			})
		}
	})
}

function changeRadio(props) {
	api.update_radio({
		"id": props
	}).then(() => {
		setTimeout(() => {
			getAddressList()
		}, 500)
	})
}

function deleteAddress(props) {
	api.delete_address({
		"id": props
	}).then(() => {
		setTimeout(() => {
			getAddressList()
		}, 500)
	})
}

function updateAddress(props) {
	uni.navigateTo({
		url: "./add_address?id=" + props
	})
}

function apply(data) {
	uni.navigateBack()
	//跳转成功以后传递一个事件
	const eventChannel = $instance.value.getOpenerEventChannel();
	eventChannel.emit('acceptDataFormDetail', {
		data: data
	})
}

// setup模式下导出状态和函数
defineExpose({
	getAddressList
});
</script>

<template>
	<scroll-view>
		<view v-if="state.address === null || state.address.length === 0" class="emptyData">
			<uv-empty icon="https://cdn.uviewui.com/uview/empty/data.png" text="您没有添加过回收地址"></uv-empty>
		</view>
		<view v-else class="address-item" v-for="item in state.address" :key="item.id">
			<view class="title" @click="apply(item)">
				<view class="info">
					<view class="name">{{ item.name }}</view>
					<view class="phone">{{ item.phone }}</view>
				</view>
				<view class="button">
					使用
				</view>
			</view>
			<view class="address" @click="updateAddress(item.id)">
				{{ item.provinces }}{{ item.citys }}{{ item.areas }}{{ item.detail }}
				<uv-icon name="edit-pen"></uv-icon>
			</view>
			<view class="default">
				<uv-radio-group v-model="state.radiovalue" customStyle="flex: unset;">
					<uv-radio :key="item.id" :name="item.id" @change="changeRadio" activeColor="#0ec4b9">默认地址</uv-radio>
				</uv-radio-group>
				<view class="split"></view>
				<view @click="deleteAddress(item.id)">
					删除地址
				</view>
			</view>
		</view>
		<view class="empty"></view>
		<view class="addAddressLine">
			<view class="addAddress" @click="handleAddAddress">
				添加回收地址
			</view>
			// #ifdef MP-WEIXIN
			<view class="wechatAddress" @click="getWechatAddress">
				授权微信地址
			</view>
			// #endif
		</view>
	</scroll-view>
</template>

<style lang="scss" scoped>
.emptyData {
	display: flex;
	height: 60vh !important;
	justify-content: center;
	align-items: center;
}

.address-item {
	border-radius: 8px;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	box-sizing: border-box;
	padding: 10px;

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.info {
			display: flex;
			align-items: center;

			.name {
				font-weight: bolder;
			}

			.phone {
				font-size: 14px;
				margin-left: 10px;
			}
		}

		.button {
			font-size: 11px;
			border: 1px solid #eee;
			border-radius: 5px;
			color: #666;
			margin-left: 13px;
			padding: 2px 11px;
		}
	}

	.address {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #7d7e80;
		background: rgba(0, 204, 255, 0.0392156863);
		border-radius: 8px;
		box-sizing: border-box;
		margin: 11px 0 13px;
		padding: 11px;
		width: 100%;
	}

	.default {
		font-size: 14px;
		color: #999;
		align-items: center;
		display: flex;

		.split {
			width: 1px;
			height: 15px;
			margin: 0 16px;
			background: #ddd;
		}
	}
}

.empty {
	height: calc(65px + env(safe-area-inset-bottom));
	height: calc(65px + constant(safe-area-inset-bottom));
}

.addAddressLine {
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

	.addAddress {
		line-height: 55px;
		align-items: center;
		display: flex;
		justify-content: center;
		background: #0ec4b9;
		border-radius: 4px;
		color: #fff;
		font-size: 17px;
		height: 55px;
	}

	// #ifdef WEB
	.addAddress {
		width: 100%;
	}

	// #endif

	// #ifdef MP-WEIXIN
	.addAddress {
		margin-right: 10px;
		width: 50%;
	}

	.wechatAddress {
		line-height: 55px;
		box-sizing: border-box;
		margin-left: 10px;
		align-items: center;
		display: flex;
		justify-content: center;
		background: #fff;
		border-radius: 4px;
		border: 1px solid #09bb07;
		color: #09bb07;
		height: 55px;
		font-size: 17px;
		width: 50%;
	}

	// #endif
}
</style>