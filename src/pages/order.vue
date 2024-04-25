<script setup>
const list = [
	{
		name: '所有预约'
	},
	{
		name: '等待取件'
	},
	{
		name: '回收中'
	},
	{
		name: '完成回收'
	}
]

function tabsClick(index, item) {
	console.log('阿巴阿巴')
	console.log(index, item)
}
</script>

<template>
	<view class="tabs">
		<uv-tabs :list="list" @click="tabsClick" :scrollable="false" lineColor="#0ec4b9"
			:activeStyle="{ color: '#0ec4b9', fontWeight: 'bold', fontSize: '3.7vw' }"
			:inactiveStyle="{ color: '#777', fontWeight: 'bold', fontSize: '3vw' }"></uv-tabs>
	</view>

	<view class="list">
		<view class="emptyData">
			<uv-empty icon="https://cdn.uviewui.com/uview/empty/data.png" text="您还没有订单信息"></uv-empty>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.tabs {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;
}

.list {
	.emptyData {
		display: flex;
		height: 60vh !important;
		justify-content: center;
		align-items: center;
	}
}
</style>