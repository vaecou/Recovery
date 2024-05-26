import api from '../index'

export default {
	regions_list: () => api.get('mini/regions/list'),

	create: (data) => api.post('mini/address', data),

	address_list: () => api.get('mini/address/list'),

	update_radio: (data) => api.put('mini/address/radio', data),

	delete_address: (data) => api.delete('mini/address', data),

	address: (data) => api.get('mini/address', data),

	update_address: (data) => api.put('mini/address', data),
}