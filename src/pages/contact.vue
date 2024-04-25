<script setup>
import { ref } from 'vue'

const question = ref([
	{
		title: '哪些衣服可以回收？',
		text: '我们对旧衣新旧程度、大小、薄厚没有过多的要求(衣物尽量整洁干净就好啦~)春夏衣、秋冬衣、鞋子、包包、童装、帽子、手套、袜子、背包、床单、被罩、毛绒玩具均可回收。'
	},
	{
		title: '回收的衣服怎么处理？',
		text: '在分拣工厂里，根据衣服的新旧程度，决定是否环保再生，还有部分会出口到三方国家。'
	},
	{
		title: '回收需要付运费吗？',
		text: '回收旧衣不需要支付运费，运费用由我们承担。若遇到快递小哥收运费，告知平台走的是“月结”账户即可。'
	}
])

function reload() {
	console.log("换一批")
}

function getPhoneService() {
	// #ifdef WEB
	window.open('tel:400-082-5552', '_blank');
	// #endif

	// #ifdef MP-WEIXIN
	uni.makePhoneCall({
		phoneNumber: '400-082-5552' //仅为示例
	});
	// #endif
}

function getOnlineService() {
	// #ifdef WEB
	window.open('https://work.weixin.qq.com/kfid/kfc295ba09441737869', '_blank');
	// #endif

	// #ifdef MP-WEIXIN
	uni.openCustomerServiceChat({
		extInfo: {
			url: 'https://work.weixin.qq.com/kfid/kfc295ba09441737869'
		},
		corpId: 'wwbce17209113d598e',
	})
	// #endif
}
</script>

<template>
	<scroll-view>
		<view class="header">
			<view class="title">
				还有不明白的问题可以咨询客服
			</view>
			<view class="image"></view>
		</view>
		<view class="body">
			<view class="contact">
				<view class="title">
					常见问题
					<view class="reload" @click="reload">
						换一批
						<uv-icon name="reload"></uv-icon>
					</view>
				</view>
			</view>

			<uv-collapse accordion :border="false" :value="0">
				<uv-collapse-item v-for="item, index in question" :title="item.title" :name="index">
					<text class="uv-collapse-content">{{ item.text }}</text>
				</uv-collapse-item>
			</uv-collapse>
		</view>
		<view class="empty"></view>
		<view class="serviceLine">
			<view class="phoneService" @click="getPhoneService">
				电话客服
			</view>
			<view class="onlineService" @click="getOnlineService">
				在线客服
			</view>
		</view>
	</scroll-view>
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

	.title {
		font-size: 4vw;
		font-weight: 700;
		color: #fff;
	}

	.image {
		margin-left: auto;
		width: 38%;
		background-image: url("https://www.yueguangling.top/uploads/image/more/contact.png");
		height: 14vh;
		background-size: 90% auto;
		background-repeat: no-repeat;
		background-position-y: center;
		image-rendering: -webkit-optimize-contrast;
	}
}


.body {
	position: relative;
	top: -10vw;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 20px;
	background-color: white;

	.contact {
		.title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 15px;
			font-size: 18px;
			font-weight: 700;

			.reload {
				display: flex;
				align-items: center;
				color: #777;
				font-size: 10px;
			}
		}
	}
}

.empty {
	height: calc(65px + env(safe-area-inset-bottom));
	height: calc(65px + constant(safe-area-inset-bottom));
}

.serviceLine {
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

	.phoneService {
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



	.phoneService {
		margin-right: 10px;
		width: 50%;
	}

	.onlineService {
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
}

::v-deep .uv-cell__body {
	padding: 10px 0px !important;
}

::v-deep .uv-cell__title-text {
	font-weight: bolder;
}

::v-deep .uv-cell {
	background-color: rgba(0, 0, 0, 0) !important;
}

::v-deep .uv-collapse-item__content__text {
	padding: 0px 4px !important;
	color: #999 !important;
	font-size: 13px !important;
}
</style>