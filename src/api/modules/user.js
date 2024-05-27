import api from '../index'

export default {
	login: (data) => api.post('mini/login', data),
	get_user_phone: () => api.get('mini/user/phone'),
	save_user_phone: (data) => api.put('mini/user/phone', data),
}