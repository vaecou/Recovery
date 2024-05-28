<script setup>
import { ref } from 'vue'
import api from '@/api/modules/order'
import { onReachBottom } from '@dcloudio/uni-app';

onReachBottom(() => {
	// console.log(form.value.data)
	// console.log(form.value.page)

	if (form.value.status !== 'nomore') {
		form.value.status = 'loading';
	}
	setTimeout(() => {
		getData()
	}, 2000)
})

const modal = ref()
const order = ref()

const form = ref({
	page: 1,
	type: 0,
	data: [],
	status: 'loadmore',
})

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

function tabsClick(index) {
	form.value.page = 1
	form.value.data = []
	form.value.type = index.index
	form.value.status = 'loadmore'
	getData()
}

function copy(order_id) {
	// 将order_id转为string
	order_id = String(order_id)
	uni.setClipboardData({
		data: order_id,
		success: function () {
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			})
		}
	})
}

function cancel(order_id) {
	order.value = order_id
	modal.value.open()
}

function confirm() {
	api.cancel_order({
		"order_id": order.value
	}).then(res => {
		if (res.code === 0) {
			uni.showToast({
				title: '取消成功',
				icon: 'none'
			})
			modal.value.close()
			clean()
			getData()
		}
	})
}

function delete_order(order_id) {
	api.delete_order({
		"order_id": order_id
	}).then(res => {
		if (res.code === 0) {
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			})
			clean()
			getData()
		}
	})
}

function clean() {
	form.value.page = 1
	form.value.data = []
	form.value.status = 'loadmore'
}

function getData() {
	api.get_order_list({
		"type": form.value.type,
		"page": form.value.page,
		"limit": 30
	}).then(res => {
		if (res.data !== null && form.value.status !== 'nomore') {
			res.data.forEach(element => {
				form.value.data.push(element)
			});
			form.value.status = 'loadmore'
			form.value.page = ++form.value.page;
		} else {
			form.value.status = 'nomore'
		}
	})
}
getData()

// setup模式下导出状态和函数
defineExpose({
	clean,
	getData
});
</script>

<template>
	<view class="tabs">
		<uv-tabs :list="list" @click="tabsClick" :scrollable="false" lineColor="#0ec4b9"
			:activeStyle="{ color: '#0ec4b9', fontWeight: 'bold', fontSize: '3.7vw' }"
			:inactiveStyle="{ color: '#777', fontWeight: 'bold', fontSize: '3vw' }"></uv-tabs>
	</view>
	<view class="list" v-if="form.data === null || form.data.length === 0">
		<view class="emptyData">
			<uv-empty icon="https://cdn.uviewui.com/uview/empty/data.png" text="您还没有订单信息"></uv-empty>
		</view>
	</view>
	<uv-list v-else>
		<uv-list-item customStyle="color: #222;font-size: 14px;z-index: 10;" v-for="(item, index) in form.data"
			:key="index">
			<view class="tabs">
				<view class="line" @click="copy(item.order_id)">
					<view class="left">
						订单编号：{{ item.order_id }}
						<uv-icon name="file-text"></uv-icon>
					</view>
					<view class="right">
						<!-- 如果 item.type为0就显示已取消，1为等待取件，2为回收中，3完成回收-->
						<view v-if="item.type === 0" style="color: red;">已取消</view>
						<view v-else-if="item.type === 1" style="color: #777;">等待取件</view>
						<view v-else-if="item.type === 2" style="color: #777;">
							回收中
						</view>
						<view v-else-if="item.type === 3" style="color: #0ec4b9;">
							完成回收
						</view>
					</view>
				</view>
				<view class="order_info" v-if="item.type === 2 || item.type === 3">
					重量：{{ item.kg }}KG
					奖励：{{ item.balance }}元
				</view>
				<view class="content">
					<view class="info">
						联系姓名：{{ item.name }}
					</view>
					<view class="info">
						联系电话：{{ item.phone }}
					</view>
					<view class="info">
						预估重量：{{ item.estimate }}
					</view>
					<view class="info">
						预约时间：{{ item.day }}（{{ item.week }}）{{ item.time }}
					</view>
					<view class="info">
						订单时间：{{ item.created_at }}
					</view>
					<view class="info">
						取件地址：{{ item.provinces }}{{ item.citys }}{{ item.areas }}{{ item.detail }}
					</view>
				</view>
				<view class="bottom">
					<view v-if="item.type === 0" @click="delete_order(item.order_id)">删除订单</view>
					<view v-else-if="item.type === 1" @click="cancel(item.order_id)">取消订单</view>
				</view>
			</view>
		</uv-list-item>
		<uv-load-more :status="form.status" />
	</uv-list>

	<view>
		<uv-modal ref="modal" showCancelButton buttonReverse content='确定取消该订单吗？' confirmColor="#606266"
			cancelColor="#0ec4b9" @confirm="confirm"></uv-modal>
	</view>
</template>

<style lang="scss" scoped>
.tabs {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;
	// 悬浮在顶部
	position: sticky;
	top: 10px;
	z-index: 100;
	background-color: #fff;

	.line {
		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			color: #777;
		}
	}

	.order_info {
		color: #0ec4b9;
		font-size: 12px;
		float: right;
	}

	.content {
		padding: 15px;

		.info {
			font-size: 12px;
			box-sizing: border-box;
			width: 100%;
		}

		// 从第二个开始
		.info:nth-child(n+2) {
			margin-top: 5px;
		}
	}

	.bottom {
		// 靠右
		text-align: right;
	}
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