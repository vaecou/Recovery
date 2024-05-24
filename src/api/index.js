import axios from 'axios-miniprogram';
import useUserStore from '@/store/user'
import { ref } from 'vue'

const api = axios.create({
	baseURL: "http://127.0.0.1:8000/",
	timeout: 1000 * 60,
})
const userStore = useUserStore()


api.interceptors.request.use(
	(request) => {
		// 全局拦截请求发送前提交的参数
		// 设置请求头
		if (request.headers) {
			if (userStore.isLogin) {
				request.headers.Authorization = `Bearer ${userStore.token}`
			}
		}
		return request
	},
)

// 定义待重试的请求队列
let loginCalled = false;
api.interceptors.response.use(
	async (response) => {
		/**
		 * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
		 * 假设返回数据格式为：{ status: 1, error: '', data: '' }
		 * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
		 * 请求出错时 error 会返回错误信息
		 */
		if (response.data.code !== 0) {
			if (response.data.message !== '' && response.data.message !== 'Token验证失败') {
				// 错误提示
				// ElMessage({ message: response.data.message, type: 'error' })
				uni.showToast({
					title: response.data.message,
					icon: 'none',
					duration: 3000
				});
				return Promise.reject(response.data)
			} else {
				// 将请求加入重试队列
				// 如果尚未开始登录流程，则开始
				if (!loginCalled) {
					loginCalled = true;
					userStore.login(); // 等待登录完成
					var retryQueue = ref(response.config);
					// 已经开始登录流程，但还没完成，等待登录成功
					await new Promise((resolve) => {
						let intervalId = setInterval(() => {
							if (userStore.token) { // 检查token是否已更新
								clearInterval(intervalId);
								resolve();
								// 重试队列
								var res = api.request(retryQueue.value);
								response.data = res
							}
						}, 100);
					});
				} else {
					var retryQueue2 = ref(response.config);
					// 已经开始登录流程，但还没完成，等待登录成功
					await new Promise((resolve) => {
						let intervalId = setInterval(() => {
							if (userStore.token) { // 检查token是否已更新
								clearInterval(intervalId);
								resolve();
								// 重试队列
								var res = api.request(retryQueue2.value);
								response.data = res
							}
						}, 100);
					});
				}
			}
		}
		return response.data
	},
	(error) => {
		let message = error.message
		if (message === 'request fail') {
			message = '后端网络故障'
		}
		else if (message.includes('timeout')) {
			message = '接口请求超时'
		}
		else if (message.includes('Request failed with status code')) {
			message = `接口${message.substr(message.length - 3)}异常`
		}
		// ElMessage({ message, type: 'error' })
		uni.showToast({
			icon: 'none',
			title: message,
			duration: 3000
		});
		return Promise.reject(error)
	},
)
export default api
