<script setup>
import { ref, reactive } from 'vue'
import api from '@/api/modules/home'
import api2 from '@/api/modules/question'

const state = reactive({
	// 首页幻灯片
	banner: [
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
	],

	//用户数量
	userNumber: 0,

	// 广播
	broadcast: [
		'张**回收衣物获得16元',
		'李**回收衣物获得10元',
		'王**回收衣物获得8元',
		'赵**回收衣物获得6元',
		'刘**回收衣物获得4元',
		'陈**回收衣物获得2元',
	],

	// 问题
	problem: []
})


// 跳转至预约回收页面
function goRecyc() {
	uni.navigateTo({
		url: "./recyc"
	})
}

function getNum() {
	api.num().then((res) => {
		state.userNumber = res.data.num
	})
}
function getQuestion() {
	api2.question().then((res) => {
		state.problem = res.data
	})
}

// 获取页面信息
function getInfo() {
	getNum()
	getQuestion()
}


getInfo()
</script>

<template>
	<scroll-view>
		<!-- Banner图 -->
		<view class="banner">
			<uv-swiper :list="state.banner" indicator indicatorMode="line" interval="4000" circular></uv-swiper>
		</view>

		<!-- 回收指南 -->
		<view class="recycItem">
			<view class="recycLine">
				回收指南
				<view class="recycUser">
					累计回收
					<view class="numberItemContent">
						<view class="squareNumb" v-for="item in state.userNumber.toString().split('')">
							{{ item }}
						</view>
					</view>
					人
				</view>
			</view>

			<view class="procedureItem" @click="goRecyc"></view>

			<view class="btnRecycSmall" @click="goRecyc"></view>

			<view class="broadcast">
				<uv-notice-bar :text="state.broadcast" direction="column" bgColor="#0ec4b91a" color="#777"
					customStyle="border-radius: 5px;line-height: 34px;"></uv-notice-bar>
			</view>

			<view class="recycMenu"></view>
		</view>

		<!-- 常见问题 -->
		<view class="problemItem">
			<view class="problemLine">
				常见问题
			</view>
			<view class="problemList">
				<uv-list>
					<uv-list-item v-for="item in state.problem">
						<view class="problemCon">
							<view class="problemQ">
								{{ item.title }}
							</view>
							<view class="problemA">
								{{ item.content }}
							</view>
						</view>
					</uv-list-item>
				</uv-list>
			</view>
		</view>
		<uv-safe-bottom></uv-safe-bottom>
	</scroll-view>
</template>

<style lang="scss" scoped>
.banner {
	margin: 10px;
}

.recycItem {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;

	.recycLine {
		display: flex;
		justify-content: space-between;


		.recycUser {
			display: flex;
			align-items: center;
			color: #777;
			font-size: 10px;

			.numberItemContent {
				display: flex;
				height: 14px;

				.squareNumb {
					margin: 0 3px;
					color: #0ec4b9;
					background-image: url("../static/home/user_number_background.png");
					font-size: 9px;
					display: flex;
					width: 10px;
					justify-content: center;
					align-items: center;
				}
			}
		}

	}

	.procedureItem {
		background-image: url("../static/home/user_procedure.png");
		margin: 16px auto 0;
		height: 14vh;
		background-size: 90% auto;
		background-repeat: no-repeat;
		background-position-y: center;
		background-position-x: center;
		image-rendering: -webkit-optimize-contrast;
	}

	.btnRecycSmall {
		background-image: url("../static/home/index_btn_wx_small.png");
		height: 12vh;
		margin: 16px auto 0;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position-y: center;
		background-position-x: center;
		image-rendering: -webkit-optimize-contrast;
	}

	.broadcast {
		margin: 16px auto 0;
	}

	.recycMenu {
		margin: 16px auto 0;
		background-image: url("../static/home/index_menu.png");
		height: 2vh;
		margin: 16px auto 0;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position-y: center;
		background-position-x: center;
		image-rendering: -webkit-optimize-contrast;
	}
}

.problemItem {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;
	margin-bottom: 10px;

	.problemLine {
		display: flex;
		justify-content: space-between;
	}

	.problemList {
		.problemCon {
			background: #00ccff0a;
			border-radius: 5px;
			padding: 10px;
			margin-top: 10px;

			.problemQ {
				color: #3b3b3b;
				font-size: 14px;
				font-weight: 700;
				margin-bottom: 5px;
			}

			.problemA {
				color: #777;
				font-size: 13px;
			}
		}
	}
}
</style>
