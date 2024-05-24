import apiUser from '@/api/modules/user'
import storage from '@/utils/storage'
import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

const useUserStore = defineStore(
	// 唯一ID
	'user',
	() => {
		const token = ref(storage.local.get('token') ?? '')
		const isLogin = computed(() => {
			if (token.value) {
				return true
			}
			return false
		})
		// 登录
		async function login() {
			uni.login({
				success: async function (data) {
					const res = await apiUser.login(data)
					storage.local.set('token', res.data.token)
					token.value = res.data.token
				}
			})
		}
		// 登出
		async function logout() {
			storage.local.remove('token')
			token.value = ''
		}
		return {
			isLogin,
			token,
			login,
			logout,
		}
	},
)

export default useUserStore
