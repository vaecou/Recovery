<script setup>

</script>

<template>
	<view class="header">
		<view class="title">
			为环保回收贡献自己的一份力量
		</view>
		<view class="image"></view>
	</view>
	<view class="body">
		<view class="about">
			<view class="title">关于我们</view>
			<view class="content">
				我们是一个提供“旧衣服上门回收服务”的平台。目前已开通300多座城市，用户只需预约一下，就会安排快递小哥上门回收，然后运输到旧衣再生工厂，通过分拣，归类，实现旧衣服的循环再生。减少因传统渠道（焚烧，填埋）给环境带来的污染。
			</view>
			<view class="content">
				我国每年产生3000多万吨废旧纺织品，再利用率不到10%，很多废旧纺织品，特别是旧衣服，存留在各家各户衣橱里，形成了客观存在的资源浪费。我们希望号召更多人的参与旧衣回收，让家中闲置的旧衣，变成可以循环利用的资源，为环保贡献一份自己的力量。
			</view>
		</view>
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

	.title {
		font-size: 4vw;
		font-weight: 700;
		color: #fff;
	}

	.image {
		margin-left: auto;
		width: 38%;
		background-image: url("https://qiniu.lvmifo.com/0b9ada7fa79a65f4/4468caf3cac79e2c.png");
		height: 14vh;
		background-size: 90% auto;
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

	.about {
		.title {
			margin-bottom: 15px;
			font-size: 18px;
			font-weight: 700;
		}
	}

	.content {
		color: #777;
		text-indent: 2em;
		font-size: 14px;
	}

	.content:nth-child(3) {
		margin-top: 12px;
	}
}
</style>