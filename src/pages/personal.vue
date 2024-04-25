<script setup>
import { ref } from 'vue'
const tipsModal = ref()	// 初始化不回收品类弹窗状态

function order() {
	uni.switchTab({
		url: "./order"
	})
}

function balance() {
	uni.navigateTo({
		url: "./balance"
	})
}
function about() {
	uni.navigateTo({
		url: "./about"
	})
}

function contact() {
	uni.navigateTo({
		url: "./contact"
	})
}
</script>

<template>
	<view class="cardOne">
		<view class="miniCard" @click="order">
			<view class="title">
				累计回收
			</view>
			<view class="content">
				0KG
			</view>
		</view>
		<view class="miniCard" @click="balance">
			<view class="title">
				账户余额
			</view>
			<view class="content">
				0元
			</view>
		</view>
	</view>

	<view class="cardTwo">
		<view class="protectionLine">
			<view class="left">
				环保贡献
			</view>
			<view class="right" @click="tipsModal.open()">
				数据说明
				<uv-icon name="info-circle"></uv-icon>
			</view>
		</view>
		<view class="protectionContent">
			<view class="contribute">
				<view class="image one"></view>
				<view class="text">
					<view class="title">
						绿化面积
					</view>
					<view class="num">
						0.00m²
					</view>
				</view>
			</view>
			<view class="contribute">
				<view class="image two"></view>
				<view class="text">
					<view class="title">
						减碳量
					</view>
					<view class="num">
						0.00kg
					</view>
				</view>
			</view>
			<view class="contribute">
				<view class="image three"></view>
				<view class="text">
					<view class="title">
						节省石油
					</view>
					<view class="num">
						0.00kg
					</view>
				</view>
			</view>
		</view>
	</view>

	<view class="cardThree">
		<view class="title">
			更多服务
		</view>
		<view class="content">
			<view class="list" @click="about">
				<view class="image one"></view>
				<view class="text split">
					关于我们
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="list" @click="contact">
				<view class="image two"></view>
				<view class="text">
					联系客服
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
		</view>
	</view>

	<!-- 不上门地区弹窗 -->
	<view>
		<uv-modal ref="tipsModal">
			<slot>
				<view class="promptContent">
					<view class="data">
						<view class="image one"></view>
						<view class="text">
							<view class="title">
								绿化面积
							</view>
							<view class="num">
								1kg旧衣=0.19㎡绿地
							</view>
						</view>
					</view>
					<view class="data">
						<view class="image two"></view>
						<view class="text">
							<view class="title">
								减碳量
							</view>
							<view class="num">
								1kg旧衣=3.6kgCO2
							</view>
						</view>
					</view>
					<view class="data">
						<view class="image three"></view>
						<view class="text">
							<view class="title">
								节省石油
							</view>
							<view class="num">
								1kg旧衣=0.92kg石油
							</view>
						</view>
					</view>
				</view>
			</slot>
			<template v-slot:confirmButton>
				<uv-button @click="tipsModal.close()"
					custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">我知道了</uv-button>
			</template>
		</uv-modal>
	</view>
</template>

<style lang="scss" scoped>
.cardOne {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;
	display: flex;
	justify-content: space-between;

	.miniCard {
		border-radius: 10px;
		padding: 10px;
		width: 38vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f9f9f9;

		.title {
			font-weight: 700;
			color: #aaa;
			font-size: 15px;
			margin-bottom: 8px;
		}

		.content {
			font-size: 14px;
			color: #1b4442;
			font-weight: 700;
		}
	}

	.miniCard:nth-child(1) {
		margin-right: 5px;
	}

	.miniCard:nth-child(2) {
		margin-left: 5px;
	}
}

.cardTwo {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;

	.protectionLine {
		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;
		}

		.right {
			display: flex;
			align-items: center;
			color: #777;
			font-size: 10px;
		}
	}

	.protectionContent {
		display: flex;
		justify-content: space-between;

		.contribute {
			box-sizing: border-box;
			margin-top: 10px;
			position: relative;
			width: calc(33% - 5px);

			.image {
				height: 15vh;
				border-radius: 10px;
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position-y: center;
				background-position-x: center;
				image-rendering: -webkit-optimize-contrast;
			}

			.one {
				background-image: url("https://www.yueguangling.top/uploads/image/more/tree.png");
			}

			.two {
				background-image: url("https://www.yueguangling.top/uploads/image/more/ball.png");
			}

			.three {
				background-image: url("https://www.yueguangling.top/uploads/image/more/people.png");
			}

			.text {
				left: 10px;
				position: absolute;
				top: 10px;
				font-size: 11px;
				font-weight: 600;
			}
		}
	}
}

.cardThree {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;

	.content {
		margin-top: 3px;

		.list {
			align-items: center;
			display: flex;

			.image {
				height: 18px;
				margin-right: 10px;
				width: 18px;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}

			.one {
				background-image: url("data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAWlBMVEUAAABERERERERFRUVERERERERFRUVFRUVISEhKSko7dvhERERISEhGRkZFRUVFRUVGRkZGRkZJSUk3dfdFRUVDgP8+fP84dvg6dvo3dfg3dfc4dfZEREQ3dPYd96A0AAAAHHRSTlMA5dUu8rOpkSMTJ8A3Gbl2ZmMm98oPDE4wJbmudK/fkgAAAQtJREFUOMuVVO2SwiAMhPBZKf1Sq96t7/+ad0MV24YOY/40wGZYkt2KryN6pXw8Ple9Iam1JNOrIqC1Gjm0bRmgcRKA7Kxztkupa3YcDIAwTstqGgMA49cIfwFoWJU1AwGXuNowQFA7agSYT5EDyO/Z+QC4XCBBbaEHBPnetsCQDx6PnA6AfaE1Qr70ej5fM8UAvTDsgTFXnp7PU16MQJ8SAzmVIZOESV0jdKIMER0o/n+8hD2CWEi/sHVHEJf41iH1ixjd+XabGd38aBbp0bx14n4Xm9bxAcxsAHyMvz98jIsYVEHvSQwfSQUuKQLcWphMVCpshCliWd5bC5RMEutWqxq2avvqz+Pb+AOH1hbxCu34UAAAAABJRU5ErkJggg==");
			}

			.two {
				background-image: url("data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAllBMVEUAAABLS0tERERERERFRUVERERKSkpFRUVERERERERERERERERPT09ERERERERERERHR0dJSUlERERHR0dFRUVFRUVFRUVERERGRkZGRkZERERFRUVERERHR0dEREQ3dfhERERJSUlBff83dfc3dPdEREQ4dfdDQ0M4dfdFRUU6dvg+d/84dPY3dfY4dfc3dvhEREQ3dPYvTOl8AAAAMHRSTlMAEPYs+q4LkPDl4J0HzcjAHhe1QNVpgnFUTuuGRzi5i2YlEffDon16cVxCGM6wqGZk0tX8AAABc0lEQVQ4y52S6XaCMBCFs0EWwLCKaK1LN+16ef+Xq6aikYLntPcPc8g3ycydIX9VmG4436Th2HnWSFtqxnRpZZMNAGk9gadJnfaJJgEgyvxJyqe8FACS5gqIIwWYqDhlpkVkACX9KiXAIu4n8YgBMjzfMRXQVUyuL641xLT7Wcyh1+SXZhrz4iek9xAVGVAlcE9ddCcQhINGBhB3Lopc0FOXHDlTE0zoMEInSLKjCQYBGVEAc7SKM8gxRIJxD3kbQCKoI7LR7qFduxp7qKvpuW2/eoDrJDs1PTt8Htt2te35i1OZBXMmbg/Mw+ezVxK1YEVnIty8Vg9t275ekBecbV9qsMWR2e4+3i/IQsGcF2Q/B5vSnrMHQnnTXSvA7j0oLHKA1X5ObQCRL10cU77OGWBePKBbxDIm2SKwiQLATgme4pmBDZcWTvO8oYOTt5UBdGKDiocjy6EZEPDMHY8ggHK9jyIJUM7ITeUq4OS2KKfkn/oGVdgkEP6xOc0AAAAASUVORK5CYII=");
			}

			.text {
				border-bottom: 1px solid #f6f6f6;
				box-sizing: border-box;
				flex: 1;
				padding: 14px 0;
				align-items: center;
				display: flex;
				justify-content: space-between;
			}
		}
	}
}

.promptContent {
	width: 99%;
	box-sizing: border-box;

	.data {
		height: 110px;
		padding-left: 22px;
		position: relative;
		align-items: center;
		display: flex;


		.image {
			border-radius: 10px;
			height: 100%;
			left: 0;
			position: absolute;
			width: 100%;
			background-size: cover;
		}

		.one {
			background-image: url("https://www.yueguangling.top/uploads/image/data/one.png");
		}

		.two {
			background-image: url("https://www.yueguangling.top/uploads/image/data/two.png");
		}

		.three {
			background-image: url("https://www.yueguangling.top/uploads/image/data/three.png");
		}

		.text {
			z-index: 2;
			color: #fff;

			.title {
				font-size: 22px;
			}

			.num {
				margin-top: 3px;
			}
		}
	}

	.data:nth-child(n+2) {
		margin-top: 8px;
	}
}

// 穿透修改根组件css
::v-deep .uv-button {
	width: 93% !important;
}

::v-deep .uv-modal__content {
	padding: 11px !important;
}
</style>