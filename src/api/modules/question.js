import api from '../index'

export default {
	// 获取首页人数
	question: () => api.get('mini/question')
}