import {
	createSSRApp
} from "vue";
import App from "./App.vue";
function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}

// 静默登录
function appSetLogin() {
	// 先检查本地有没有sid
	// 没有登录，有的话再checkSession，失效就登录
	// uni.checkSession({
	// 	fail: function () {
	uni.login({
		provider: 'weixin',
		success: function (loginRes) {
			console.log(loginRes.code);
		}
	})
	// 	}
	// })
}

export {
	createApp,
	appSetLogin
}