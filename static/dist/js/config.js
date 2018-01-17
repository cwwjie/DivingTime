
var appConfig = (function () {
	var URLbase = 'http://192.168.0.100:8080';

	return {
		/**
		* 本地环境 http://192.168.0.100:8080
		* 生产环境 www.divingtime.asia
		* 生产环境 http://112.74.92.97:8080
		*/
		urlBase: URLbase,
		/**
		 * 本地 /Dvt-web
		 * 生产 /dvtweb
		 */
		version: URLbase + '/Dvt-web',
		/**
		 * 本地 /Dvt-reserve
		 * 生产 /dvtreserve
		 */
		village: URLbase + '/Dvt-reserve',
	}
})();
