// 入口
$(document).ready(function() {
	// 检测是否 safari 无痕模式
	function isLocalStorageSupported() {
	    var testKey = 'test',
	        storage = window.sessionStorage;
	    try {
	        storage.setItem(testKey, 'testValue');
	        storage.removeItem(testKey);
	        return true;
	    } catch (error) {
	        return false;
	    }
	}
	if (isLocalStorageSupported() == false) {
		// 是 safari 无痕模式
		alert("非常抱歉，暂不支持此浏览器，我们将尽快解决此问题，请联系客服或更换您的浏览器。");
		return
	}
	// 判断是否支持方法
	sessionStorage.setItem('sessionStorageStandby','1');
	if ( sessionStorage.getItem('sessionStorageStandby') == '1' ) {
		// 说明支持
	}else {
		// 说明不支持
		alert("非常抱歉，暂不支持此浏览器，我们将尽快解决此问题，请联系客服或更换您的浏览器。");
		return
	}
	if (window.ActiveXObject || "ActiveXObject" in window) {
		if (confirm("检测到您的浏览器为IE内核，请问你需要继续浏览吗？(建议更换浏览器，否则可能会发生不可预知的错误)")) {
		}else {
			return
		}
	}


	sessionStorage.setItem('AllUrl',window.location.href);
  THERUL = localStorage.getItem('_uniqueKey');

	loginSuccessful = JSON.parse(localStorage.getItem('loginSuccessful'));

	sessionStorage.setItem('_token',localStorage.getItem('_token'));
	sessionStorage.setItem('_digest',localStorage.getItem('_digest'));
	newgetGatherInfo();

	// 获取所有信息
	function newgetGatherInfo() {
		// 获取旅客信息 这是根据  token digest
		$.ajax({
			type:"GET",
			// url:URLbase + URLversion + "/gather/link/getGatherInfo.do",
			url:URLbase + URLversion + "/gather/link/"+THERUL+"/getGatherInfo.do",
			contentType:"application/json; charset=utf-8",  
			headers: {
				'token':localStorage.getItem('_token'),
				'digest':localStorage.getItem('_digest')
			},
			success: function (message) {
				if (message.result == "0") {
					// 如果 data 不存在
					if (!message.data) {
						_first = true;
						var _obj = {
							"adultNum":loginSuccessful.adultNum,
							"calMethod":loginSuccessful.calMethod,
							"childNum":loginSuccessful.childNum,
							"orderDesc":loginSuccessful.orderDesc,
							"payStatus":loginSuccessful.payStatus,
							"productAmount":loginSuccessful.productAmount,
							flightNote:"",
							// "userId":loginSuccessful.userId,
							"infoId":loginSuccessful.infoId,
							"isRead":"N",
							"readTime":null,
							"orderSn":loginSuccessful.orderSn,
							"orderSrc":loginSuccessful.orderSrc,
							"template":loginSuccessful.template,
							"orderName":loginSuccessful.orderName,
							"roomNum":loginSuccessful.roomNum,
							"peopleNum":loginSuccessful.peopleNum,
							"checkIn":loginSuccessful.checkIn,
							"checkOut":loginSuccessful.checkOut,
							"orderAmount":loginSuccessful.orderAmount,
							"discount":loginSuccessful.discount,
							"payAmount":loginSuccessful.payAmount,
							"notPayAmount":loginSuccessful.notPayAmount,
							"present":loginSuccessful.present,
							"payAccount":null,
							"signName":null,
							"pinyinName":null,
							"mobile":null,
							"email":null,
							"outboundNum":null,
							"landTime":null,
							"landDate":null,
							"inboundNum":null,
							"takeoffTime":null,
							"takeoffDate":null,
							"inHarbourNum":null,
							"hLandTime":null,
							"hLandDate":null,
							"outHarbourNum":null,
							"hTakeoffTime":null,
							"hTakeoffDate":null,
							"roomInfoList":[]
						}
						function newroomInfo() {
							var roomInfo = {"roomId":null,"iceName":null,"iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"infoId":null,"customerInfoList":[]}
							return roomInfo
						}
						for (var i = 0; i < loginSuccessful.roomNum; i++) {
							_obj.roomInfoList.push(newroomInfo());
						}
						// ES5 深层复制
						var myTempData = inforData.get();
						if (myTempData) {
							if (confirm('你有一份数据尚未填写完毕,请问你要继续填写这份数据吗?')) {
								loaddata = myTempData;
								finaldata = myTempData;
								initAll();
								$("#allllllll").css('display', 'block');
							}else {
								loaddata = JSON.parse(JSON.stringify(_obj));
								finaldata = JSON.parse(JSON.stringify(_obj));
								initAll();
								$("#allllllll").css('display', 'block');
								inforData.clear();
							}
						}else {
							loaddata = JSON.parse(JSON.stringify(_obj));
							finaldata = JSON.parse(JSON.stringify(_obj));
							initAll();
							$("#allllllll").css('display', 'block');
						}
					}else{
						// ES5 深层复制
						loaddata = JSON.parse(JSON.stringify(message.data));
						finaldata = JSON.parse(JSON.stringify(message.data));
						initAll();
						$("#allllllll").css('display', 'block');
					}
				}else{
					Materialize.toast('信息收集初页面始化失败，原因:发生未知错误-'+message.message, 4000);
				}
			}
		})
	}
});