<script setup>
import { reactive } from 'vue'

const state = reactive({
	address: [
		// {
		// 	name: '张三',
		// 	phone: '12345678901',
		// 	province: '广东省',
		// 	city: '广州市',
		// 	county: '天河区',
		// 	address: '天河区天河公园',
		// 	isDefault: true
		// },
	]
})


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
			console.log(res.userName)
			console.log(res.postalCode)
			console.log(res.provinceName)
			console.log(res.cityName)
			console.log(res.countyName)
			console.log(res.detailInfo)
			console.log(res.nationalCode)
			console.log(res.telNumber)
		}
	})
}
</script>

<template>
	<scroll-view>

		<view v-if="state.address.length === 0" class="emptyData">
			<uv-empty icon="https://cdn.uviewui.com/uview/empty/data.png" text="您没有添加过回收地址"></uv-empty>
		</view>

		<view v-else class="address-item" v-for="(item, index) in state.address" :key="index">
			<view class="title">
				<view class="info">
					<view class="name">{{ item.name }}</view>
					<view class="phone">{{ item.phone }}</view>
				</view>
				<view class="button">
					使用
				</view>
			</view>
			<view class="address">
				{{ item.province }}{{ item.city }}{{ item.county }}{{ item.address }}
				<uv-icon name="edit-pen"></uv-icon>
			</view>
			<view class="default">
				<uv-radio-group customStyle="flex: unset;">
					<uv-radio activeColor="#0ec4b9">默认地址</uv-radio>
				</uv-radio-group>
				<view class="split"></view>
				删除地址
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