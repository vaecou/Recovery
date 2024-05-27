import api from '../index'

export default {
	get_order_list: (data) => api.get('mini/order/list', data),

	cancel_order: (data) => api.put('mini/order', data),

	delete_order: (data) => api.delete('mini/order', data),

	add_order: (data) => api.post('mini/order', data),
}