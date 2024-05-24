const storage = {
	local: {
		// has: (key) => {
		// 	return Object.prototype.hasOwnProperty.call(localStorage, `${key}`)
		// },
		get: (key) => {
			return uni.getStorageSync(key);
		},
		set: (key, value) => {
			uni.setStorage({
				key: key,
				data: value,
			});
		},
		remove: (key) => {
			uni.removeStorage({
				key: key,
			});
		},
		clear: () => {
			uni.clearStorage();
		},
	},
}

export default storage
