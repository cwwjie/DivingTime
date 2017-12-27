const URL = (function () {
	// return {
	// 	base:"http://192.168.0.100:8080",
	// 	version:"/Dvt-web"
	// }
	if (process.env.NODE_ENV=="development") {
		return {
			base:"http://192.168.0.100:8080",
			version:"/Dvt-web"
		}
	}else {
		return {
			base:"http://112.74.92.97:8080",
			version:"/dvtweb"
		}
	}
})();
export default URL;