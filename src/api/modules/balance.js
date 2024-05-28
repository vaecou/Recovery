import api from '../index'

export default {
	get_info: (data) => api.get('mini/balance', data),
	// 提现
	withdraw: (data) => api.put('mini/balance', data)
}