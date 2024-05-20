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
export {
	createApp,
}