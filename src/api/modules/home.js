import api from '../index'

export default {
	// 获取首页人数
	num: () => api.get('mini/num')
}