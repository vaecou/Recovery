import axios from 'axios-miniprogram';

const api = axios.create({
	baseURL: "http://127.0.0.1:8000/",
	timeout: 1000 * 60,
})

export default api
