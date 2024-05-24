import api from '../index'

export default {
	login: (data) => api.post('mini/login', data),
}