<script setup>
import { ref } from 'vue'
import api from '@/api/modules/regions'
import api2 from '@/api/modules/user'
import api3 from '@/api/modules/order'

const categoryModal = ref()	// 初始化不回收品类弹窗状态
const recoveryModal = ref()	// 初始化不回收地区弹窗状态
const timeModal = ref()	// 初始化上门时间弹窗
const reservationModal = ref() // 初始化确定预约弹窗

const futureDays = ref([]) // 未来七天的日期数组
const futureTimes = ref([]) // 时间段数组

const today = new Date()
const selectedDayIndex = ref(0)
const selectedTimeIndex = ref(0)

const isphone = ref(false)

const timeTips = ref('请预约上门时间')

// Kg光标索引
const selectedKgIndex = ref(1)
// 公斤数组
const kgArr = ref([
	{ label: '5KG以下', tips: '暂不回收', disabled: true },
	{ label: '5-20KG', tips: '约10-40件', disabled: false },
	{ label: '20-50KG', tips: '约40-100件', disabled: false },
	{ label: '50KG以上', tips: '约100件以上', disabled: false },
])

const tips = ref({
	title: '请选择取件地址',
	content: '',
})

const form = ref({
	name: '',
	phone: '',
	provinces: '',
	citys: '',
	areas: '',
	detail: '',
	day: '',
	week: '',
	time: '',
	type: '',
	estimate: ''
})

// 更新日期光标
function selectDay(index, day) {
	if (!futureDays.value[index].disabled) {
		changeDay(day)
		selectedDayIndex.value = index;
	}
}

// 更新时间段光标
function selectTime(index) {
	if (!futureTimes.value[index].disabled) {
		selectedTimeIndex.value = index;
	}
}

// 更新kg的光标
function selectKg(index) {
	if (index == 0) {
		handle5KG()
	}
	if (!kgArr.value[index].disabled) {
		selectedKgIndex.value = index;
	}
}

// 点击确定选择的按钮
function confirm() {
	form.value.day = futureDays.value[selectedDayIndex.value].formattedDate
	form.value.week = futureDays.value[selectedDayIndex.value].dayOfWeek
	form.value.time = futureTimes.value[selectedTimeIndex.value].label
	form.value.type = 1
	form.value.estimate = kgArr.value[selectedKgIndex.value].label
	// 修改时间文字
	timeTips.value = `${futureDays.value[selectedDayIndex.value].formattedDate}（${futureDays.value[selectedDayIndex.value].dayOfWeek}） ${futureTimes.value[selectedTimeIndex.value].label}`
	// 关闭弹窗
	timeModal.value.close()
	console.log(form.value)
}

// 点击取件地址
function handleAddress() {
	uni.navigateTo({
		url: "./address",
		events: {
			acceptDataFormDetail(data) {
				form.value.name = data.data.name
				form.value.phone = data.data.phone
				form.value.provinces = data.data.provinces
				form.value.citys = data.data.citys
				form.value.areas = data.data.areas
				form.value.detail = data.data.detail
				tips.value.title = data.data.name + " " + data.data.phone
				tips.value.content = data.data.provinces + data.data.citys + data.data.areas + data.data.detail
			}
		}
	})
}

// 点击5KG以下
function handle5KG() {
	uni.showToast({
		title: '5KG以下暂不回收',
		icon: 'none'
	})
}

// 点击日期
function changeDay(e) {
	futureDays.value = [];
	futureTimes.value = [];
	//初始化未来七天的日期
	for (let i = 0; i < 7; i++) {
		var futureDay = new Date(today.getTime());
		futureDay.setDate(today.getDate() + i);
		futureDays.value.push({
			day: futureDay.getDate(),
			formattedDate: `${(futureDay.getMonth() + 1).toString().padStart(2, '0')}-${futureDay.getDate().toString().padStart(2, '0')}`,
			dayOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][futureDay.getDay()],
			disabled: false,
		});
	}
	var currentHour = today.getHours();
	if (today.getDate() == e && currentHour < 17) {
		for (let i = 0; i < 6; i++) {
			if (i == 0) {
				futureTimes.value.push({
					label: "2小时内上门",
					disabled: currentHour >= 9 && currentHour < 17 ? false : true
				});
			} else {
				var startTime = 7 + i * 2;
				var endTime = startTime + 2;
				var timeLabel = `${startTime.toString().padStart(2, '0')}:00-${endTime}:00`;

				futureTimes.value.push({
					label: timeLabel,
					disabled: currentHour >= startTime
				});
			}
		}
	} else {
		if (currentHour >= 17) {
			futureDays.value[0].disabled = true;
			futureDays.value[0].dayOfWeek = "快递已停收";
		}

		for (let i = 0; i < 6; i++) {
			if (i == 0) {
				futureTimes.value.push({
					label: "2小时内上门",
					disabled: true
				});
			} else {
				var startTime = 7 + i * 2;
				var endTime = startTime + 2;
				var timeLabel = `${startTime.toString().padStart(2, '0')}:00-${endTime}:00`;

				futureTimes.value.push({
					label: timeLabel,
					disabled: false
				});
			}
		}
	}

	for (let i = 0; i < futureDays.value.length; i++) {
		if (!futureDays.value[i].disabled) {
			selectedDayIndex.value = i;
			break;
		}
	}
	for (let i = 0; i < futureTimes.value.length; i++) {
		if (!futureTimes.value[i].disabled) {
			selectedTimeIndex.value = i;
			break;
		}
	}
}

function protocol() {
	uni.navigateTo({
		url: "./protocol"
	})
}

function submit() {
	if (timeTips.value == '请预约上门时间') {
		uni.showToast({
			title: '请选择上门时间',
			icon: 'none'
		})
		return
	}
	if (tips.value.title == '请选择取件地址') {
		uni.showToast({
			title: '请选择取件地址',
			icon: 'none'
		})
		return
	}
	reservationModal.value.open()
}

function getRadio() {
	api.get_radio().then(res => {
		if (res.data != null) {
			form.value.name = res.data.name
			form.value.phone = res.data.phone
			form.value.provinces = res.data.provinces
			form.value.citys = res.data.citys
			form.value.areas = res.data.areas
			form.value.detail = res.data.detail
			tips.value.title = res.data.name + " " + res.data.phone
			tips.value.content = res.data.provinces + res.data.citys + res.data.areas + res.data.detail
		}
	})
}
getRadio()

function getPhone() {
	api2.get_user_phone().then(res => {
		if (res.data != null) {
			isphone.value = res.data.result
		}
	})
}
getPhone()

function getPhoneCode(e) {
	api2.save_user_phone({
		"code": e.code
	}).then(() => {
		submitOrder()
	})
}

function submitOrder() {
	reservationModal.value.close()
	api3.add_order(form.value).then(() => {
		uni.switchTab({
			url: "./order",
			success: () => {
				let page = getCurrentPages().pop();
				page.$vm.clean();
				page.$vm.getData();

				uni.showToast({
					title: '预约成功',
					icon: 'none'
				})
			}
		})
	})
}

changeDay(today.getDate())
</script>
<template>
	<scroll-view>
		<!-- 不回收品类 -->
		<view class="categoryItem">
			<view class="categoryLine">
				回收品类
				<view class="categoryInfo" @click="categoryModal.open()">
					暂不回收品类
					<uv-icon name="info-circle"></uv-icon>
				</view>
			</view>
			<view class="categoryListLine">
				<view class="categoryList">
					<uv-image src="https://www.yueguangling.top/uploads/image/category/clothes.png" height="44px"
						width="44px"></uv-image>
					<view class="iconTxt">
						四季衣服
					</view>
				</view>
				<view class="categoryList">
					<uv-image src="https://www.yueguangling.top/uploads/image/category/shoes.png" height="44px"
						width="44px"></uv-image>
					<view class="iconTxt">
						成双鞋靴
					</view>
				</view>
				<view class="categoryList">
					<uv-image src="https://www.yueguangling.top/uploads/image/category/bag.png" height="44px"
						width="44px"></uv-image>
					<view class="iconTxt">
						包包
					</view>
				</view>
				<view class="categoryList">
					<uv-image src="https://www.yueguangling.top/uploads/image/category/hat.png" height="44px"
						width="44px"></uv-image>
					<view class="iconTxt">
						帽子围巾
					</view>
				</view>
				<view class="categoryList">
					<uv-image src="https://www.yueguangling.top/uploads/image/category/chrild.png" height="44px"
						width="44px"></uv-image>
					<view class="iconTxt">
						童衣童鞋
					</view>
				</view>
				<view class="categoryList">
					<uv-image src="https://www.yueguangling.top/uploads/image/category/toys.png" height="44px"
						width="44px"></uv-image>
					<view class="iconTxt">
						毛绒玩具
					</view>
				</view>
			</view>
		</view>

		<!-- 上门回收 -->
		<view class="recoveryIndex">
			<view class="doorLine">
				<view class="doorTitle">
					上门回收
					<view class="zeroFreightWrapper">
						<view class="zero">
							0运费
						</view>
						<view class="zeroExpressText">
							顺丰/京东/德邦
						</view>
					</view>
				</view>
				<view class="doorInfo" @click="recoveryModal.open()">
					暂不上门地区
					<uv-icon name="info-circle"></uv-icon>
				</view>
			</view>

			<view class="recoveryInfo" @click="timeModal.open()">
				<view class="recoveryInfoTitle">
					{{ timeTips }}
				</view>
				<uv-icon name="arrow-right"></uv-icon>
			</view>
			<view class="recoveryInfo" @click="handleAddress">
				<view class="recoveryInfoData">
					<view class="recoveryInfoTitle">
						{{ tips.title }}
					</view>
					<view class="recoveryInfoContent">
						{{ tips.content }}
					</view>
				</view>
				<uv-icon name="arrow-right"></uv-icon>
			</view>
		</view>
		<!-- 预估重量 -->
		<view class="eestimated">
			<view class="eestimatedLine">
				<view class="eestimatedTitle">
					预估重量
				</view>
			</view>
			<view class="eestimatedList">
				<view v-for="(item, index) in kgArr" :key="index"
					:class="{ 'eestimatedItem': 'eestimatedItem', 'disabled': item.disabled, 'selected': selectedKgIndex === index }"
					@click="selectKg(index)">
					<view class="eestimatedItemTitle">
						{{ item.label }}
					</view>
					<view class="eestimatedItemText">
						{{ item.tips }}
					</view>
				</view>
			</view>
		</view>

		<view class="empty"></view>

		<view class="submitLine">
			<view class="submit" @click="submit">
				提交预约
			</view>
		</view>


		<!-- 下面都为弹窗 -->


		<!-- 不回收品类弹窗 -->
		<view>
			<uv-modal ref="categoryModal" zIndex="10076">
				<slot>
					<view class="promptContent">
						<view class="promptTitle">
							暂不回收品类
						</view>
						<view class="promptItemCon">
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/damage.png"
									height="36px" width="36px"
									customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									破损衣服
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/dirty.png"
									height="36px" width="36px"
									customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									脏污衣服
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/damp.png" height="36px"
									width="36px" customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									潮湿异味
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/nonwoven.png"
									height="36px" width="36px"
									customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class=" promptItemText">
									非纺织品
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/single.png"
									height="36px" width="36px"
									customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									单只鞋靴
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/mattress.png"
									height="36px" width="36px"
									customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									床垫棉被
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/sofa.png" height="36px"
									width="36px" customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									沙发垫
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/prompt/garbage.png"
									height="36px" width="36px"
									customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									生活垃圾
								</view>
							</view>
						</view>
					</view>
				</slot>
				<template v-slot:confirmButton>
					<uv-button @click="categoryModal.close()"
						custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">我知道了</uv-button>
				</template>
			</uv-modal>
		</view>

		<!-- 不上门地区弹窗 -->
		<view>
			<uv-modal ref="recoveryModal">
				<slot>
					<view class="promptContent">
						<view class="promptTitle">
							暂不上门地区
						</view>
						<view class="promptItemCon">
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/adressicon.png" height="36px"
									width="36px" customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									新疆
								</view>
							</view>
							<view class="promptItem">
								<uv-image src="https://www.yueguangling.top/uploads/image/adressicon.png" height="36px"
									width="36px" customStyle="display: block; margin: 0 auto 5px;"></uv-image>
								<view class="promptItemText">
									西藏
								</view>
							</view>
						</view>
					</view>
				</slot>
				<template v-slot:confirmButton>
					<uv-button @click="recoveryModal.close()"
						custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">我知道了</uv-button>
				</template>
			</uv-modal>
		</view>

		<!-- 上门日期弹窗 -->
		<view>
			<uv-popup ref="timeModal" mode="bottom" round="10px">
				<view class="content">
					<view class="title">
						预约上门日期
						<view class="tips">
							左右滑动可以选择其他日期
						</view>
					</view>
					<uv-scroll-list :indicator="false">
						<view class="scroll-list">
							<view v-for="(item, index) in futureDays" :key="index"
								:class="{ 'item': 'item', 'disabled': item.disabled, 'selected': selectedDayIndex === index }"
								@click="selectDay(index, item.day)">
								<view class="time">
									{{ item.formattedDate }}
								</view>
								<view class="tips">
									({{ item.dayOfWeek }})
								</view>
							</view>
						</view>
					</uv-scroll-list>
					<view class="title">
						预约上门时间段
					</view>
					<view class="time-list">
						<view v-for="(item, index) in futureTimes" :key="index"
							:class="{ 'time': 'time', 'disabled': item.disabled, 'selected': selectedTimeIndex === index }"
							@click="selectTime(index)">
							{{ item.label }}
						</view>
					</view>
				</view>
				<uv-button @click="confirm"
					custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">确定选择</uv-button>
			</uv-popup>
		</view>

		<!-- 确定预约弹窗 -->
		<view>
			<uv-modal ref="reservationModal">
				<slot>
					<view class="promptContent">
						<view class="promptTitle">
							确认预约
						</view>
						<view class="promptItemCon">
							<view class="reservationItem">
								<view class="img">
									<uv-image src="https://www.yueguangling.top/uploads/image/reservation/queding.png"
										height="42px" width="42px"></uv-image>
								</view>
								<view class="reservationItemContent">
									<view class="reservationItemTitle">
										符合回收标准
									</view>
									<view class="reservationItemTxt">
										目前不回收的品类有这些：
										<view class="click" @click="categoryModal.open()">
											点击查看
										</view>
									</view>
								</view>
							</view>
							<view class="reservationItem">
								<view class="img">
									<uv-image
										src="https://www.yueguangling.top/uploads/image/reservation/zhongliang.png"
										height="42px" width="42px"></uv-image>
								</view>
								<view class="reservationItemContent">
									<view class="reservationItemTitle">
										重量超过5KG
									</view>
									<view class="reservationItemTxt">
										请确认打包的物品重量超过5KG。
									</view>
								</view>
							</view>
							<view class="reservationItem">
								<view class="img">
									<uv-image src="https://www.yueguangling.top/uploads/image/reservation/guizhong.png"
										height="42px" width="42px"></uv-image>
								</view>
								<view class="reservationItemContent">
									<view class="reservationItemTitle">
										是否有贵重物品
									</view>
									<view class="reservationItemTxt">
										请仔细检查回收物品中，是否遗漏贵重或重要物品，以免给您带来损失。
									</view>
								</view>
							</view>
							<view class="reservationItem">
								<view class="img">
									<uv-image src="https://www.yueguangling.top/uploads/image/reservation/queding.png"
										height="42px" width="42px"></uv-image>
								</view>
								<view class="reservationItemContent">
									<view class="reservationItemTitle">
										回收协议
									</view>
									<view class="reservationItemTxt">
										点击下方已阅读并确定按钮将默认为同意此协议：
										<view class="click" @click="protocol">
											点击查看
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</slot>
				<template v-slot:confirmButton>
					<uv-button v-if="isphone" @click="submitOrder"
						custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">已阅读并确定</uv-button>
					<uv-button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneCode"
						custom-style="font-size:18px; margin: 0 auto 12px;background: #0ec4b9;border-radius: 10px;color: #fff;font-weight: 700;height: 45px;">已阅读并确定</uv-button>
				</template>
			</uv-modal>
		</view>
	</scroll-view>
</template>

<style lang="scss" scoped>
// 回收品类的样式
.categoryItem {
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;

	.categoryLine {
		display: flex;
		justify-content: space-between;

		.categoryInfo {
			display: flex;
			align-items: center;
			color: #777;
			font-size: 10px;
		}
	}

	.categoryListLine {
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin-top: 10px;

		.iconTxt {
			color: #3b3b3b;
			font-size: 10px;
		}
	}
}

// 上门回收
.recoveryIndex {
	z-index: 999;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;

	.doorLine {
		display: flex;
		justify-content: space-between;

		.doorTitle {
			display: flex;
			align-items: center;

			.zeroFreightWrapper {
				background: rgba(250, 137, 45, .1);
				border-radius: 54px 54px 54px 54px;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				height: 20px;
				font-size: 10px;
				line-height: 20px;
				margin-left: 5px;

				.zero {
					background: #fd7a12;
					border-radius: 54px 54px 54px 54px;
					color: #fff;
					font-weight: 400;
					text-align: center;
					width: 38px;
				}

				.zeroExpressText {
					margin-right: 5px;
					color: #fd7a12;
					font-weight: 400;
					margin-left: 5px;
				}
			}
		}

		.doorInfo {
			display: flex;
			align-items: center;
			color: #777;
			font-size: 10px;
		}
	}

	.recoveryInfo {
		font-size: 14px;
		background: #fafafa;
		border-radius: 4px;
		box-sizing: border-box;
		margin: 10px 0 auto;
		padding: 16px 11px;
		position: relative;
		align-items: center;
		display: flex;
		justify-content: space-between;

		.recoveryInfoTitle {
			font-weight: 600;
		}

		.recoveryInfoData {
			.recoveryInfoContent {
				font-size: 12px;
			}
		}
	}
}

// 预估重量
.eestimated {
	z-index: 999;
	margin: 10px;
	box-shadow: 0px 1px 7px 0px hsl(0deg 0% 78% / 40%);
	border-radius: 10px;
	padding: 10px;

	.eestimatedLine {
		display: flex;
	}

	.eestimatedList {
		display: flex;
		justify-content: space-between;

		.eestimatedItem {
			display: flex;
			flex-direction: column;
			justify-content: center;
			background: #f3f6f6;
			border-radius: 10px;
			height: 67px;
			margin-top: 10px;
			width: 100px;
			color: #777;
			text-align: center;

			.eestimatedItemTitle {
				font-weight: 600;
				font-size: 4vw;
				line-height: 20px;
			}

			.eestimatedItemText {
				font-size: 3vw;
				margin-top: 5px;
			}
		}

		.selected {
			background-color: #0ec4b8;
			color: #fff;
		}

		.eestimatedItem:nth-child(n+2) {
			margin-left: 5px;
		}
	}


}

.empty {
	height: calc(65px + env(safe-area-inset-bottom));
	height: calc(65px + constant(safe-area-inset-bottom));
}

// 提交预约按钮
.submitLine {
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

	.submit {
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


// 不回收地区的样式
.promptContent {
	.promptTitle {
		color: #3b3b3b;
		font-size: 23px;
		font-weight: 400;
		margin-bottom: 20px;
		text-align: center;
	}

	.promptItemCon {
		display: flex;
		flex-wrap: wrap;
		margin: 5px;
		justify-content: space-between;

		.promptItem {
			flex-basis: 25%;
			width: 52px;

			.promptItemText {
				color: #3b3b3b;
				font-size: 10px;
				font-weight: 400;
				text-align: center;
			}
		}

		.promptItem:nth-child(n+5) {
			margin-top: 16px;
		}

		.reservationItem {
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

			.reservationItemContent {

				.reservationItemTitle {
					font-size: 14px;
					font-weight: bolder;
				}

				.reservationItemTxt {
					color: #777;
					font-size: 12px;

					.click {
						display: contents;
						color: #0ec4b9;
					}
				}
			}
		}

		.reservationItem:nth-child(n+2) {
			margin-top: 20px;
		}
	}
}

// 上门时间弹窗组件的样式
.content {
	.title {
		display: flex;
		justify-content: space-between;
		margin: 15px;

		.tips {
			display: flex;
			align-items: center;
			color: #777;
			font-size: 10px;
		}
	}

	.scroll-list {
		display: flex;

		.item {
			margin-left: 15px;
			background: #f7f7f7;
			border-radius: 5px;
			display: inline-block;
			font-size: 14px;
			font-weight: 700;
			text-align: center;
			width: 100px;

			.time {
				padding: 10px 0 0px;
			}

			.tips {
				padding: 0 0 10px;
			}
		}

		.item:last-child {
			margin-right: 15px;
		}

		.selected {
			background-color: #0ec4b8;
			color: #fff;
		}

		.disabled {
			color: #aaa;
		}
	}

	.time-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: center;
		justify-content: center;
		align-items: center;

		.time {
			align-items: center;
			background: #f7f7f7;
			border-radius: 5px;
			font-size: 14px;
			font-weight: 700;
			height: 50px;
			display: flex;
			justify-content: center;
			width: 45%;
			margin-bottom: 10px;

		}

		.selected {
			background-color: #0ec4b8;
			color: #fff;
		}

		.disabled {
			color: #aaa;
		}

		.time:nth-child(2n) {
			margin-left: 10px;
		}
	}
}

// 穿透修改根组件css
::v-deep .uv-button {
	width: 93% !important;
}
</style>