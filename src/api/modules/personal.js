import api from '../index'

export default {
	get_info: () => api.get('mini/personal')
}