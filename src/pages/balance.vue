<script setup>
import { ref } from 'vue'

const freezeModal = ref()

const list = [
	{
		name: '全部'
	},
	{
		name: '收入'
	},
	{
		name: '提现'
	}
]

function contact() {
	uni.navigateTo({
		url: "./contact"
	})
}
</script>

<template>
	<view class="header">
		<view class="balance">
			<view class="num">
				￥10.00
			</view>
			<view class="tips" @click="freezeModal.open()">
				冻结余额：21.37
				<uv-icon name="question-circle" color="#fff"></uv-icon>
			</view>
		</view>
		<view class="image"></view>
	</view>

	<view class="body">
		<view class="card">
			<view class="title">提现</view>
			<uv-input placeholder="请输入需要提现的金额" type="digit">
				<template v-slot:prefix>
					<uv-text text="￥" margin="0 3px 0 0" type="tips"></uv-text>
				</template>
				<template v-slot:suffix>
					<uv-button @click="getCode" text="全部提现" type="success" size="mini" color="#0ec4b9"></uv-button>
				</template>
			</uv-input>
			<view class="carry">
				提现
			</view>
		</view>
	</view>

	<view class="detail">
		<view class="tabs">
			<uv-tabs :list="list" :scrollable="false" lineColor="#0ec4b9"
				:activeStyle="{ color: '#0ec4b9', fontWeight: 'bold', fontSize: '4.5vw' }"
				:inactiveStyle="{ color: '#777', fontWeight: 'bold', fontSize: '4vw' }"></uv-tabs>
		</view>
	</view>

	<view class="list">
		<view class="emptyData">
			<uv-empty icon="https://cdn.uviewui.com/uview/empty/data.png" text="您还没有记录"></uv-empty>
		</view>
	</view>

	<view class="empty"></view>

	<view>
		<uv-modal ref="freezeModal">
			<slot>
				<view class="freezeContent">
					<view class="freezeTitle">
						余额说明
					</view>
					<view class="freezeItemCon">
						<view class="freezeItem">
							<view class="img">
								<uv-image src="https://www.yueguangling.top/uploads/image/balance/freeze.png"
									height="42px" width="42px"></uv-image>
							</view>
							<view class="freezeItemContent">
								<view class="freezeItemTitle">
									冻结余额
								</view>
								<view class="freezeItemTxt">
									当仓库签收订单并确认无异常后，冻结余额则会变更为正常状态。
								</view>
							</view>
						</view>
						<view class="freezeItem">
							<view class="img">
								<uv-image src="https://www.yueguangling.top/uploads/image/balance/service.png"
									height="42px" width="42px"></uv-image>
							</view>
							<view class="freezeItemContent">
								<view class="freezeItemTitle">
									联系客服
								</view>
								<view class="freezeItemTxt">
									如果您有其他的问题可以联系我们的客服：
									<view class="click" @click="contact">
										点击前往
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</slot>
			<template v-slot:confirmButton>
				<uv-button @click="freezeModal.close()"
					custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">好的</uv-button>
			</template>
		</uv-modal>
	</view>
</template>

<style lang="scss" scoped>
.header {
	align-items: center;
	display: flex;
	background: linear-gradient(90deg, #0ec4b9, rgba(55, 116, 246, .1));
	height: 150px;
	padding-left: 30px;
	box-sizing: border-box;
	position: relative;
	width: 100%;

	.balance {
		font-weight: 700;

		.num {
			color: #fff;
			font-size: 6vw;
		}

		.tips {
			margin-top: 2vw;
			margin-left: 1vw;
			color: #fff;
			font-size: 3.5vw;
			display: flex;
			align-items: center;
		}
	}

	.image {
		margin-left: auto;
		width: 38%;
		background-image: url("https://www.yueguangling.top/uploads/image/balance/coin.png");
		height: 20vh;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position-y: center;
		image-rendering: -webkit-optimize-contrast;
	}
}

.body {
	position: relative;
	z-index: 1;
	top: -10vw;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 20px;
	background-color: white;

	.card {
		.title {
			margin-bottom: 15px;
			font-size: 18px;
			font-weight: 700;
		}

		.carry {
			margin-top: 15px;
			line-height: 55px;
			align-items: center;
			display: flex;
			justify-content: center;
			background: #0ec4b9;
			border-radius: 4px;
			color: #fff;
			font-size: 17px;
			height: 45px;
			width: 100%;
		}
	}

}

.detail {
	position: relative;
	z-index: 1;
	top: -10vw;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 8px;
	background-color: white;
}

.list {
	.emptyData {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.empty {
	height: calc(65px + env(safe-area-inset-bottom));
	height: calc(65px + constant(safe-area-inset-bottom));
}

.freezeContent {
	.freezeTitle {
		color: #3b3b3b;
		font-size: 23px;
		font-weight: 400;
		margin-bottom: 20px;
		text-align: center;
	}

	.freezeItemCon {
		display: flex;
		flex-wrap: wrap;
		margin: 5px;
		justify-content: space-between;

		.freezeItem {
			width: 100%;
			display: flex;
			align-items: center;

			.img {
				margin-right: 15px;
				border-radius: 8px;
				border: 1px solid #0ec4b94a;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.freezeItemContent {
				.freezeItemTitle {
					font-size: 14px;
					font-weight: bolder;
				}

				.freezeItemTxt {
					color: #777;
					font-size: 12px;

					.click {
						display: contents;
						color: #0ec4b9;
					}
				}
			}
		}

		.freezeItem:nth-child(n+2) {
			margin-top: 20px;
		}
	}
}

// 穿透修改根组件css
::v-deep .uv-button {
	width: 93% !important;
}

::v-deep .uv-icon--right {
	margin-left: 1vw !important;
}
</style>