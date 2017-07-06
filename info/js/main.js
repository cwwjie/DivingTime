/**
 * 本地环境 http://192.168.0.100:8080
 * 生产环境 www.divingtime.asia
 * 生产环境 http://112.74.92.97:8080
 */
// var URLbase = "http://192.168.0.100:8080";
/**
 * 本地 /Dvt-web
 * 生产 /dvtweb
 */
// var URLversion = "/Dvt-web"
/*———————————————————————————————————————————暂时———————————————————————————————————————————*/


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
							"infoId":loginSuccessful.infoId,"isRead":"N","readTime":null,"orderSn":loginSuccessful.orderSn,"orderSrc":loginSuccessful.orderSrc,"template":loginSuccessful.template,"orderName":loginSuccessful.orderName,"roomNum":loginSuccessful.roomNum,"peopleNum":loginSuccessful.peopleNum,"checkIn":loginSuccessful.checkIn,"checkOut":loginSuccessful.checkOut,"orderAmount":loginSuccessful.orderAmount,"discount":loginSuccessful.discount,"payAmount":loginSuccessful.payAmount,"notPayAmount":loginSuccessful.notPayAmount,"present":"","signName":null,"payAccount":null,"mobile":null,"email":null,"outboundNum":null,"landTime":null,"landDate":null,"inboundNum":null,"takeoffTime":null,"takeoffDate":null,"inHarbourNum":null,"hLandTime":null,"hLandDate":null,"outHarbourNum":null,"hTakeoffTime":null,"hTakeoffDate":null,roomInfoList:[]
						}
						function newroomInfo() {
							var roomInfo = {"roomId":null,"iceName":null,"iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"infoId":null,"customerInfoList":[]}
							return roomInfo
						}
						for (var i = 0; i < loginSuccessful.roomNum; i++) {
							_obj.roomInfoList.push(newroomInfo());
						}
						// ES5 深层复制
						loaddata =JSON.parse(JSON.stringify(_obj));
						finaldata = JSON.parse(JSON.stringify(_obj));
					}else{
						// ES5 深层复制
						loaddata = JSON.parse(JSON.stringify(message.data));
						finaldata = JSON.parse(JSON.stringify(message.data));
					}
					initAll();
					$("#allllllll").css('display', 'block');
				}else{
					Materialize.toast('请你重新输入密码，原因:发生未知错误-'+message.message, 4000);
				}
			}
		})
	}



	return
	// 下面的方法都不用了


	// 判断是否支持方法
	sessionStorage.setItem('sessionStorageStandby','1');
	if ( sessionStorage.getItem('sessionStorageStandby') == '1' ) {
		// 说明支持
	}else {
		// 说明不支持
		alert("非常抱歉，暂不支持此浏览器，我们将尽快解决此问题，请联系客服或更换您的浏览器。");
		return
	}

	// 抛弃
	// THERUL = loadPageVar("uk");
    // 初始化模态框
    $('.modal-trigger').leanModal({
    	dismissible: false // 点击模态框外部则关闭模态框
    });
    THERUL = localStorage.getItem('_uniqueKey');

    // 下面的不需要了
	// $.ajax({
	// 	type:"GET",
	// 	url: URLbase + URLversion + "/gather/link/"+THERUL+"/check.do",
	// 	contentType:"application/json; charset=utf-8", 
	// 	success: function (message) {
	// 		if (message.result == "4") {
	// 			submitgetinfor();
	// 			// 登录模块废弃掉了
	// 			// getlinkInfo2();
	// 		}else if (message.result == "2") {
	// 			// 弹出 失效 模态框
	// 			$('#modal4').openModal({
	// 				dismissible: false // 点击模态框外部则关闭模态框
	// 			});
	// 		}
	// 	}
	// })
	function submitgetinfor(){
		// 用户登录 这里是根据账号输入获取 token digest
		$.ajax({
			type:"POST",
			url: URLbase + URLversion + "/gather/link/login.do",
			contentType:"application/json; charset=utf-8", 
			data: JSON.stringify({
				uniqueKey:THERUL,
				passwd:localStorage.getItem('_passwd')
			}),
			dataType: "json",
			success: function (message) {
				if (message.result == "0") {
					// 登录成功保存 sessionStorage loginSuccessful
					sessionStorage.setItem('loginSuccessful',JSON.stringify(message.data));
					loginSuccessful = message.data;
					$('#modal2').closeModal();
					sessionStorage.setItem('_token',message.data.token);
					sessionStorage.setItem('_digest',message.data.digest);
					// 获取所有信息 (根据获取用户登陆信息)
					getGatherInfo();
					$("#allllllll").css('display', 'block');
				}else{
					Materialize.toast('登录失败，原因:'+message.message, 4000);
				}
			}
		})
	}

	loginSuccessful = JSON.parse(localStorage.getItem('getItem'));

	sessionStorage.setItem('_token',localStorage.getItem('_token'));
	sessionStorage.setItem('_digest',localStorage.getItem('_digest'));
	getGatherInfo();

	// 获取所有信息
	function getGatherInfo() {
		// 获取旅客信息 这是根据  token digest
		$.ajax({
			type:"GET",
			url:URLbase + URLversion + "/gather/link/getGatherInfo.do",
			contentType:"application/json; charset=utf-8",  
			headers: {
				'token':localStorage.getItem('_token'),
				'digest':localStorage.getItem('_digest')
			},
			success: function (message) {
				if (message.result == "0") {
					localStorage.setItem('loginSuccessURL',loadPageVar("uk"));
					// 如果 data 不存在
					if (!message.data) {
						_first = true
						var _obj = {
							"adultNum":loginSuccessful.adultNum,
							"calMethod":loginSuccessful.calMethod,
							"childNum":loginSuccessful.childNum,
							"orderDesc":loginSuccessful.orderDesc,
							"payStatus":loginSuccessful.payStatus,
							"productAmount":loginSuccessful.productAmount,
							flightNote:"",
							// "userId":loginSuccessful.userId,
							"infoId":loginSuccessful.infoId,"isRead":"N","readTime":null,"orderSn":loginSuccessful.orderSn,"orderSrc":loginSuccessful.orderSrc,"template":loginSuccessful.template,"orderName":loginSuccessful.orderName,"roomNum":loginSuccessful.roomNum,"peopleNum":loginSuccessful.peopleNum,"checkIn":loginSuccessful.checkIn,"checkOut":loginSuccessful.checkOut,"orderAmount":loginSuccessful.orderAmount,"discount":loginSuccessful.discount,"payAmount":loginSuccessful.payAmount,"notPayAmount":loginSuccessful.notPayAmount,"present":"","signName":null,"payAccount":null,"mobile":null,"email":null,"outboundNum":null,"landTime":null,"landDate":null,"inboundNum":null,"takeoffTime":null,"takeoffDate":null,"inHarbourNum":null,"hLandTime":null,"hLandDate":null,"outHarbourNum":null,"hTakeoffTime":null,"hTakeoffDate":null,roomInfoList:[]
						}
						function newroomInfo() {
							var roomInfo = {"roomId":null,"iceName":null,"iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"infoId":null,"customerInfoList":[]}
							return roomInfo
						}
						for (var i = 0; i < loginSuccessful.roomNum; i++) {
							_obj.roomInfoList.push(newroomInfo());
						}
						// ES5 深层复制
						loaddata =JSON.parse(JSON.stringify(_obj));
						finaldata = JSON.parse(JSON.stringify(_obj));
					}else{
						// ES5 深层复制
						loaddata = JSON.parse(JSON.stringify(message.data));
						finaldata = JSON.parse(JSON.stringify(message.data));
					}
					initAll();
				}else{
					// 弹出 获取用户登陆信息模块模态框
					// $('#modal2').openModal({
					// 	dismissible: false // 点击模态框外部则关闭模态框
					// });
					Materialize.toast('请你重新输入密码，原因:发生未知错误-'+message.message, 4000);
					// Cookies.remove('_token', { path: '/info' });
					// Cookies.remove('_digest', { path: '/info' });
					// sessionStorage.setItem('loginSuccessful',"");
				}
			}
		})
	}
	// 初始化获取用户登陆信息模块 v2.0
    function getlinkInfo2() {
		// 如果不等于TB 说明不是淘宝，弹出 失效、因为暂时没有做这块
		if (loadPageVar("flag").slice(0,2) != "TB") {
			// 弹出 失效 模态框
			$('#modal4').openModal({
				dismissible: false // 点击模态框外部则关闭模态框
			});
			return
		}
    	// 判断 cookie 是否存在？
    	if ( sessionStorage.getItem('_token') || sessionStorage.getItem('_digest') ) {
    		// 存在，判断RUL是否改变？
			if (sessionStorage.getItem('loginSuccessURL') != loadPageVar("uk")) {
				// 如果改变，弹出密码框
				$('#modal2').openModal({
					dismissible: false // 点击模态框外部则关闭模态框
				});
			}else {
				// 如果未改变，根据 cookie getGatherInfo
				var data = sessionStorage.getItem('loginSuccessful');
				if (data == '') {
					$('#modal2').openModal({
						dismissible: false // 点击模态框外部则关闭模态框
					});
					return
				}
				// 转换成为字符串
				var obj = JSON.parse(data);
				loginSuccessful = obj;
				getGatherInfo();
				$("#allllllll").css('display', 'block');
			}
    	}else {
    		// 不存在，弹出密码框
			$('#modal2').openModal({
				dismissible: false // 点击模态框外部则关闭模态框
			});
    	}
    }

	// 下面是账号输入
	$("#getinforUserName").val(THERUL)
	$("#getinforUserName").attr('disabled','');
	//$("#getinforUserName").css('display', 'none');
	// $("#modal2").css('height', '320px');
	//$("#getinforUserName").next().css('display', 'none');
	$("#getinforPassword").blur(function(event) {
		if (event.target.value.trim() == "" || event.target.value.trim() == null) {
			Materialize.toast('密码 不能为空', 4000)
			setTimeout(function(){
				event.target.setAttribute("class","validate invalid");
			},100);
			return
		}
	});
	$("#submitgetinfor").click(function(event) {
		var _passwd = $("#getinforPassword").val()
		if (_passwd== "" || _passwd== null) {
			Materialize.toast('密码 不能为空', 4000)
			return
		}
		submitgetinfor();
	});
});



// 加载进来的信息
var loginSuccessful = {},
	THERUL = "";
	loaddata = {},
    // 最终上传的数据
    finaldata = {},
    _first=false;// 如果是 true 就是第一次






// 判断成功 初始化页面
function initAll() {
	/**
	 * 下面是常规的初始化(技术相关)
	 */
	 // 初始化工具提示
	    $('.tooltipped').tooltip({delay: 50});
	 // 初始化 选择框
		$('#selectAnnex').material_select();
		$('#liveCountry').material_select();
		$('#Depth_level').material_select();
		$('#Divelevel').material_select();
		$('#livebed').material_select();
	    // 初始化 日期选择 http://www.jqueryscript.net/demo/Lightweight-jQuery-Date-Input-Picker/docs.htm
	 $('.datepicker').pickadate({
	 	today: false,
	 	format: 'yyyy mm dd',
	 	formatSubmit: 'yyyy/mm/dd',
	 	selectMonths: true,
	 	selectYears: 90
	 });
	 $("#liveBirthday").data('pickadate').clear()
	 $('.datepicker_diving').pickadate({
	 	format: 'yyyy mm dd',
	 	formatSubmit: 'yyyy/mm/dd',
	 	selectMonths: true,
	 	selectYears: 15
	 });
	 var _today = new Date();
	 $('.datepicker_flightDate').pickadate({
	 	min: _today,
	 	format: 'yyyy mm dd',
	 	formatSubmit: 'yyyy/mm/dd',
	 	selectMonths: true,
	 	selectYears: 3
	 });
	    $('ul.tabs').tabs();
	 // 初始化 第一页
	 pageFirst.init();
	 // 初始化 第二页
	 pageSecond.init();
	 // 初始化 第三页
	 pageThird.init();


	/**
	 * 下面是业务相关的初始化
	 */
	// 判断是否阅读、
	if (loaddata.isRead == "Y") {
		$("#Terms").attr('checked','');
		$("#toPageSecond").trigger('click');
	}
	// 渲染订单编号
	$("#orderSn").text( loaddata.orderSn )
	// 判断来源
	if ( loaddata.orderSrc == "DVT" ) {
		$("#orderSrc").text("潜游时光")
	}else{
		$("#orderSrc").text("淘宝")
	}


	// 渲染套餐名称
	$("#orderName").text( loaddata.orderName )
	// 渲染周期长度
	var cycleLength = Math.floor((loaddata.checkOut - loaddata.checkIn)/86400000);
	$("#cycleLength").text( (cycleLength+1)+'天'+cycleLength+'晚' );
	$("#cycleLength1").text( (cycleLength+1)+'天'+cycleLength+'晚' );
	// 渲染房间总数
	$("#roomNum").text( loaddata.roomNum )
	// 渲染总人数
	$("#peopleNum").text( loaddata.peopleNum )
	// 渲染入住日期
	$("#checkIn").text( returnDate(loaddata.checkIn) )
	$("#checkIn1").text( returnDate(loaddata.checkIn) )
	// 渲染退房日期
	$("#checkOut").text( returnDate(loaddata.checkOut) )
	$("#checkOut1").text( returnDate(loaddata.checkOut) )
	// 渲染订单总额
	$("#orderAmount").text( loaddata.orderAmount )
	// 渲染优惠金额
	$("#discount").text( loaddata.discount )
	// 渲染已付金额
	$("#payAmount").text( loaddata.payAmount )
	// 渲染未付金额
	$("#notPayAmount").text( loaddata.notPayAmount )

	// 渲染计算方式
	$("#calMethod").text( loaddata.calMethod )
	// 渲染儿童人数
	$("#childNum").text( loaddata.childNum )
	// 渲染成人人数
	$("#adultNum").text( loaddata.adultNum )
	// 渲染计算方式
	$("#calMethod").text( loaddata.calMethod )
	// 渲染订单状态
	if (loaddata.payStatus == 1) {
		$("#payStatus").text( "已付全款" );
		$("#payStatusFTB").css( "display","none");
	}else if (loaddata.payStatus == 2) {
		$("#payStatus").text( "已付定金" )
	}
	// 渲染产品总金额
	$("#productAmount").text( loaddata.productAmount )



	// 保险
		// 判断
		var _present = null,
			_begin = null,
			_end = null,
			_Info = null;
		if (_first) {
			// 第一次
			_present = loginSuccessful.present;
			_begin = loginSuccessful.insuranceBegin;
			_end = loginSuccessful.insuranceEnd;
			_Info = loginSuccessful.transfersInfo;
		}else {
			// 可能修改情况
			_present = loaddata.present;
			_begin = loaddata.insuranceBegin;
			_end = loaddata.insuranceEnd;
			_Info = loaddata.transfersInfo;
		}
		// 数据
		finaldata.present = _present;
		finaldata.insuranceBegin = _begin;
		finaldata.insuranceEnd = _end;
		finaldata.transfersInfo = _Info;
		var _stringData = returnDate(_begin) +" 至 "+ returnDate(_end);
		// 渲染
		if (!_present) {
			$("#present").css("display","none");
		}else if (_present == "1") {
			$("#transfers").css("display","none");
			$("#InsuranceInfo").text(_stringData);
		}else if (_present == "2") {
			$("#Insurance").css("display","none");
			$("#transfersInfo").text(_Info);
		}else if (_present == "1,2") {
			$("#InsuranceInfo").text(_stringData);
			$("#transfersInfo").html(_Info);
		}

	// 渲染下单人姓名
	$("#signName").val( loaddata.signName )
	$("#signName").next().attr('class', 'value active');
	// 渲染付款账号名
	$("#payAccount").val( loaddata.payAccount )
	$("#payAccount").next().attr('class', 'value active');
	// 渲染下单人手机
	$("#BasicPhone").val( loaddata.mobile );
	$("#BasicPhone").next().attr('class', 'value active');
	// 渲染下单人邮箱
	$("#BasicEmail").val( loaddata.email );
	$("#BasicEmail").next().attr('class', 'value active');


	// 渲染 国际航班号（出境）
	$("#outboundNum").val( loaddata.outboundNum );
	$("#outboundNum").next().attr('class', 'value active');
	// 渲染 抵达日期（国际航班）
	$("#landDate").val( returnDate(loaddata.landDate) );
	// 渲染 抵达时间（国际航班）
	// $("#landTime").val( returnTimestamp(loaddata.landTime) );
	// $("#landTime").next().attr('class', 'value active');
	if (loaddata.landTime != null) {
		var showlandTime = loaddata.landTime + 28800000;
		$("#_landTime select[name='hour']").val(Math.floor(showlandTime/3600000));
		$("#_landTime select[name='Minute']").val(Math.floor((showlandTime - (3600000*Math.floor(showlandTime/3600000)))/60000));
	}

	// 渲染 国际航班号（入境）
	$("#inboundNum").val( loaddata.inboundNum );
	$("#inboundNum").next().attr('class', 'value active');
	// 渲染 起飞时间（国际航班）
	$("#takeoffDate").val( returnDate(loaddata.takeoffDate) );
	// 渲染 起飞日期（国际航班）
	// $("#takeoffTime").val( returnTimestamp(loaddata.takeoffTime) );
	// $("#takeoffTime").next().attr('class', 'value active');
	if (loaddata.landTime != null) {
		var showtakeoffTime = loaddata.takeoffTime + 28800000;
		$("#_takeoffTime select[name='hour']").val(Math.floor(showtakeoffTime/3600000));
		$("#_takeoffTime select[name='Minute']").val(Math.floor((showtakeoffTime - (3600000*Math.floor(showtakeoffTime/3600000)))/60000));
	}

	// 渲染 到港航班号
	$("#inHarbourNum").val( loaddata.inHarbourNum );
	$("#inHarbourNum").next().attr('class', 'value active');
	// 渲染 抵达日期
	$("#hLandDate").val( returnDate(loaddata.hLandDate) );
	// 渲染 抵达时间
	// $("#hLandTime").val( returnTimestamp(loaddata.hLandTime) );
	// $("#hLandTime").next().attr('class', 'value active');
	if (loaddata.landTime != null) {
		var showhLandTime = loaddata.hLandTime + 28800000;
		$("#_hLandTime select[name='hour']").val(Math.floor(showhLandTime/3600000));
		$("#_hLandTime select[name='Minute']").val(Math.floor((showhLandTime - (3600000*Math.floor(showhLandTime/3600000)))/60000));
	}

	// 渲染 离港航班号
	$("#outHarbourNum").val( loaddata.outHarbourNum );
	$("#outHarbourNum").next().attr('class', 'value active');
	// 渲染 起飞日期
	$("#hTakeoffDate").val( returnDate(loaddata.hTakeoffDate) );
	// 渲染 起飞时间
	// $("#hTakeoffTime").val( returnTimestamp(loaddata.hTakeoffTime) );
	// $("#hTakeoffTime").next().attr('class', 'value active');
	if (loaddata.landTime != null) {
		var showhTakeoffTime = loaddata.hTakeoffTime + 28800000;
		$("#_hTakeoffTime select[name='hour']").val(Math.floor(showhTakeoffTime/3600000));
		$("#_hTakeoffTime select[name='Minute']").val(Math.floor((showhTakeoffTime - (3600000*Math.floor(showhTakeoffTime/3600000)))/60000));
	}

	// 渲染 备注
	$("#flightNote").val( loaddata.flightNote );
	$("#flightNote").next().attr('class', 'value active');

	// 声明条款一
	if ( loaddata.template == 1 || loaddata.template == 2 || loaddata.template == 4 || loaddata.template == 5 || loaddata.template == 6 || loaddata.template == 7 || loaddata.template == 8 ) {
		// 只有 2 个 航班
		$("#outboundclass").css('display', 'none');
		$("#inboundclass").css('display', 'none');

		// 显示模板条款 隐藏其他模板条款
		$("#templateThree").css('display', 'none');
	} else if ( loaddata.template == 3 || loaddata.template == 9) {// 声明条款三 只赠送保险
		// 显示斗湖条款 隐藏其他模板条款
		$("#templateOther").css('display', 'none');
	}

	// 渲染 潜游时光额外赠送项目
	if ( loaddata.template == 1 || loaddata.template == 2 || loaddata.template == 3 || loaddata.template == 5 || loaddata.template == 6 || loaddata.template == 7 || loaddata.template == 8 ) {
		$("#renderEG").html('现预定仙本那度假村的客户：<br/>'//
			+'2-3人每人赠送7天安联境外保险或一次往返亚庇机场到市区酒店的接送（时间为6:05-21:55之间，超出时间需付35元夜间服务费）；<br/>'//
			+'4-7人每人赠送7天安联境外保险和一次往返亚庇机场到市区酒店的接送（时间不限）；<br/>'//
			+'如需增加保险天数可代为购买5元/天/人，临时预定需自行购买保险，如未填写亚庇接送，默认赠送保险。');
	}else {
		$(".extraGift").css('display', 'none');
	}

	// 附件信息
	if (loaddata.template == 3) {
	}else {
		$("#annexInfo").css('display', 'none');
	}


	// 渲染 度假村接送时间
	if (loaddata.template == 1) {// 马达京
		$("#pickUp").css('display', 'block');
		$("#pickUp-item1").css('display', 'block');
	}else if (loaddata.template == 2) {// 马布岛-----------水屋
		$("#pickUp").css('display', 'block');
		$("#pickUp-item6").css('display', 'block');
	}else if (loaddata.template == 3) {// 卡帕莱
		$("#pickUp").css('display', 'block');
		$("#pickUp-item3").css('display', 'block');
	}else if (loaddata.template == 4) {// 平台
	}else if (loaddata.template == 5) {// 邦邦岛------龙珠
		$("#pickUp").css('display', 'block');
		$("#pickUp-item5").css('display', 'block');
	}else if (loaddata.template == 6) {// 马布岛-----------木屋
		$("#pickUp").css('display', 'block');
		$("#pickUp-item6").css('display', 'block');
	}else if (loaddata.template == 7) {// 邦邦岛------白珍珠
		$("#pickUp").css('display', 'block');
		$("#pickUp-item7").css('display', 'block');
	}else if (loaddata.template == 8) {// 马布岛-----------婆罗
		$("#pickUp").css('display', 'block');
		$("#pickUp-item2").css('display', 'block');
	}else if (loaddata.template == 9) {// 兰卡央
		$("#pickUp").css('display', 'block');
		$("#pickUp-item9").css('display', 'block');
	}
	// 渲染 特别注意
	if (loaddata.template == 1) {// 马达京
		$("#Related1").css('display', 'block');
	}else if (loaddata.template == 2) {// 马布岛-----------水屋
		$("#Related6").css('display', 'block');
	}else if (loaddata.template == 3) {// 卡帕莱
		$("#Related3").css('display', 'block');
	}else if (loaddata.template == 4) {// 平台
		$("#Related4").css('display', 'block');
	}else if (loaddata.template == 5) {// 邦邦岛------龙珠
		$("#Related5").css('display', 'block');
	}else if (loaddata.template == 6) {// 马布岛-----------木屋
		$("#Related6").css('display', 'block');
	}else if (loaddata.template == 7) {// 邦邦岛------白珍珠
		$("#Related5").css('display', 'block');
	}else if (loaddata.template == 8) {// 马布岛-----------婆罗
		$("#Related2").css('display', 'block');
	}else if (loaddata.template == 9) {// 兰卡央
		$("#hLandDate").attr('placeholder', '山打根抵达日期');
		$("#hTakeoffDate").attr('placeholder', '山打根离开日期');
	}

	// 渲染 补齐余款
	// 卡帕莱 兰卡央 36 其他 46 天
	if (loaddata.template == 3 || loaddata.template == 9) {// 马达京
		$("#FillTheBalance").text('35');
	}

	// 退款说明：
	if (loaddata.template == 1) {// 马达京
		$("#Refundinstruction1").css('display', 'block');
	}else if (loaddata.template == 2 || loaddata.template == 6) {// 马布岛 水屋 木屋
		$("#Refundinstruction2").css('display', 'block');
	}else if (loaddata.template == 3) {// 卡帕莱
		$("#Refundinstruction3").css('display', 'block');
	}else if (loaddata.template == 4) {// 平台
		$("#Refundinstruction1").css('display', 'block');
	}else if (loaddata.template == 5) {// 邦邦岛 龙珠
		$("#Refundinstruction1").css('display', 'block');
	}else if (loaddata.template == 7) {// 邦邦岛 白珍珠
		$("#Refundinstruction4").css('display', 'block');
	}else if (loaddata.template == 8) {// 马布岛 婆罗
		$("#Refundinstruction1").css('display', 'block');
	}else if (loaddata.template == 9) {// 兰卡央
		$("#Refundinstruction3").css('display', 'block');
	}

	$.ajax({
		type:"GET",
		url:URLbase + URLversion + "/admin/"+loginSuccessful.createBy+"/getAdminInfo.do",
		contentType:"application/json; charset=utf-8",
		success: function (val) {
			if (val.result == "0") {
				$(".qrCode").html(
					"<img src='" + URLbase + val.data.qrCode + "'/>"
				);
				$("#Contactname1").text(val.data.name);
				$("#Contactwebchat1").text(val.data.webchat);
				$("#Contactname2").text(val.data.name);
				$("#Contactwebchat2").text(val.data.webchat);
				$("#Contactname3").text(val.data.name);
				$("#Contactwebchat3").text(val.data.webchat);
			}
		}
	})

}



/**
 * 第一页
 */
var pageFirst = (function(){
	function init() {
		// 点击已经阅读以上条款
		$("#Terms").click(function(event) {
			if ($("#Terms").is(':checked')) {
				// 如果已经选中
				finaldata.isRead = "Y"
			}else {
				// 如果未选中
				finaldata.isRead = "N"
			}
		});
		// 点击下一页
		$("#toPageSecond").click(function(event) {
			nextPage();
		});
	}
	// 点击下一步
	function nextPage() {
		if (!($("#Terms").is(':checked'))) {
			Materialize.toast('请仔细阅读条款', 4000)
			return
		}
		// 隐藏这一页按钮
		$("#toPageSecond").css('display', 'none');
		// 显示下一页按钮
		$("#returnPageFirst").css('visibility', 'visible');
		$("#returnPageFirst").css('display', 'inline-block');
		$("#toPageThird").css('display', 'inline-block');
		// 跳转到下一页
    	$('ul.tabs').tabs('select_tab', 'test2');
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();



/**
 * 第二页
 */
var pageSecond = (function(){
	// 初始化 设置 所有数据
	var dataAllow = {
		signName:{
			// false 表示必填 才可以通过 true 表示不填 都可以通过
			allow:false,
			// data 表示数据
			data:null
		},
		payAccount:{
			allow:true,
			data:null
		},
		mobile:{
			allow:false,
			data:null
		},
		email:{
			allow:false,
			data:null
		},
		// 国际航班号
		outboundNum:{
			allow:true,
			data:null
		},
		landDate:{
			allow:true,
			data:null
		},
		landTime:{
			allow:true,
			data:null
		},
		// 到港航班号
		inboundNum:{
			allow:true,
			data:null
		},
		takeoffDate:{
			allow:true,
			data:null
		},
		takeoffTime:{
			allow:true,
			data:null
		},
		// 国际航班号
		inHarbourNum:{
			allow:true,
			data:null
		},
		hLandDate:{
			allow:true,
			data:null
		},
		hLandTime:{
			allow:true,
			data:null
		},
		// 离港航班号
		outHarbourNum:{
			allow:true,
			data:null
		},
		hTakeoffDate:{
			allow:true,
			data:null
		},
		hTakeoffTime:{
			allow:true,
			data:null
		},
		flightNote:{
			allow:true,
			data:''
		},
		// present:{ // 这个是赠送
		// 	allow:false,
		// 	data:""
		// },
		// insuranceBegin:{ // 保险开始日期
		// 	allow:true,
		// 	data:""
		// },
		// insuranceEnd:{ // 保险结束日期
		// 	allow:true,
		// 	data:""
		// },
		// transfersInfo:{ // 这个是接送信息
		// 	allow:true,
		// 	data:""
		// },
		attachmentList:{
			allow:true,
			data:[]
		}
	}
	function init() {
		// 初始化 dataAllow 数据
		for(var _cardperson in dataAllow){
			// 如果传进来的数据已经填写
			if (loaddata[_cardperson] != null) {
				// 那么赋值进去
				dataAllow[_cardperson].data = loaddata[_cardperson]
				// 如果这个数据必填 false
				if (dataAllow[_cardperson].allow == false) {
					dataAllow[_cardperson].allow = true;
				}
			}
		}
		// 初始化 time 选择器
		$('#landTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#takeoffTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#hLandTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#hTakeoffTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		// 初始化新版 time 选择器
		$(".select-field").html(RenderingTime());

		// 绑定事件
		$("#_landTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.landTime.allow = false;
				$("#_landTime div").text('请选择正确的时间');
				return
			}
			if ($("#_landTime select[name='Minute']").val() == "null") {
				$("#_landTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_landTime select[name='Minute']").val()) * 60000;
			dataAllow.landTime.data = showdate-28800000;
			$("#_landTime div").text('');
			dataAllow.landTime.allow = true;
		});
		$("#_landTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.landTime.allow = false;
				$("#_landTime div").text('请选择正确的时间');
				return
			}
			if ($("#_landTime select[name='hour']").val() == "null") {
				$("#_landTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_landTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.landTime.data = showdate-28800000;
			$("#_landTime div").text('');
			dataAllow.landTime.allow = true;
		});

		$("#_hLandTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hLandTime.allow = false;
				$("#_hLandTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hLandTime select[name='Minute']").val() == "null") {
				$("#_hLandTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_hLandTime select[name='Minute']").val()) * 60000;
			dataAllow.hLandTime.data = showdate-28800000;
			$("#_hLandTime div").text('');
			dataAllow.hLandTime.allow = true;
		});
		$("#_hLandTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hLandTime.allow = false;
				$("#_hLandTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hLandTime select[name='hour']").val() == "null") {
				$("#_hLandTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_hLandTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.hLandTime.data = showdate-28800000;
			$("#_hLandTime div").text('');
			dataAllow.hLandTime.allow = true;
		});

		$("#_hTakeoffTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hTakeoffTime.allow = false;
				$("#_hTakeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hTakeoffTime select[name='Minute']").val() == "null") {
				$("#_hTakeoffTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_hTakeoffTime select[name='Minute']").val()) * 60000;
			dataAllow.hTakeoffTime.data = showdate-28800000;
			$("#_hTakeoffTime div").text('');
			dataAllow.hTakeoffTime.allow = true;
		});
		$("#_hTakeoffTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hTakeoffTime.allow = false;
				$("#_hTakeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hTakeoffTime select[name='hour']").val() == "null") {
				$("#_hTakeoffTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_hTakeoffTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.hTakeoffTime.data = showdate-28800000;
			$("#_hTakeoffTime div").text('');
			dataAllow.hTakeoffTime.allow = true;
		});

		$("#_takeoffTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.takeoffTime.allow = false;
				$("#_takeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_takeoffTime select[name='Minute']").val() == "null") {
				$("#_takeoffTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_takeoffTime select[name='Minute']").val()) * 60000;
			dataAllow.takeoffTime.data = showdate-28800000;
			$("#_takeoffTime div").text('');
			dataAllow.takeoffTime.allow = true;
		});
		$("#_takeoffTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.takeoffTime.allow = false;
				$("#_takeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_takeoffTime select[name='hour']").val() == "null") {
				$("#_takeoffTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_takeoffTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.takeoffTime.data = showdate-28800000;
			$("#_takeoffTime div").text('');
			dataAllow.takeoffTime.allow = true;
		});


		// 返回上一页
		$("#returnPageFirst").click(function(event) {
			// 隐藏这一页两个按钮
			$("#returnPageFirst").css('visibility', 'hidden');
			$("#toPageThird").css('display', 'none');
			// 显示上一页的一个按钮
			$("#toPageSecond").css('display', 'inline-block');
			// 跳转到上一页
    		$('ul.tabs').tabs('select_tab', 'test1');
		});
		// 进入下一页
		$("#toPageThird").click(function(event) {
			nextPage();
		})

		// 将数据 验证 并入主数据
		$("#signName").blur(function(event) {
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				$("#signName").next().text("预定人姓名 不能为空");
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataAllow.signName.allow = false;
				return
			}
			$("#signName").next().text("")
			dataAllow.signName.data = event.target.value.trim();
			dataAllow.signName.allow = true;
		});
		$("#payAccount").blur(function(event) {
			dataAllow.payAccount.data = event.target.value.trim();
			dataAllow.payAccount.allow = true;
		});
		$("#BasicPhone").blur(function(event) {
			if (event.target.value == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicPhone").next().text("不能为空");
				dataAllow.mobile.allow = false;
				return
			}else if ( !(/^[0-9]*$/.test(parseInt(event.target.value.trim()))) ) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicPhone").next().text("必须纯数字");
				dataAllow.mobile.allow = false;
				return
			}
			$("#BasicPhone").next().text("");
			dataAllow.mobile.data = event.target.value.trim();
			dataAllow.mobile.allow = true;
		});
		$("#BasicEmail").blur(function(event) {
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicEmail").next().text("不能为空");
				dataAllow.email.allow = false;
				return
			}
			if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value.trim()))) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicEmail").next().text("邮箱不正确");
				dataAllow.email.allow = false;
				return
			}
			$("#BasicEmail").next().text("");
			dataAllow.email.data = event.target.value.trim();
			dataAllow.email.allow = true;
		});
		// 国际航班号
		$("#outboundNum").blur(function(event) {
			dataAllow.outboundNum.data = event.target.value.trim();
			dataAllow.outboundNum.allow = true;
		})
		$("#landDate").change(function(event) {
			dataAllow.landDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.landDate.allow = true;
		})
		// $("#landTime").change(function(event) {
		// 	dataAllow.landTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.landTime.allow = true;
		// })
		// 到港航班号
		$("#inboundNum").blur(function(event) {
			dataAllow.inboundNum.data = event.target.value.trim();
			dataAllow.inboundNum.allow = true;
		})
		$("#takeoffDate").change(function(event) {
			dataAllow.takeoffDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.takeoffDate.allow = true;
		})
		// $("#takeoffTime").change(function(event) {
		// 	dataAllow.takeoffTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.takeoffTime.allow = true;
		// })
		// 国际航班号
		$("#inHarbourNum").blur(function(event) {
			dataAllow.inHarbourNum.data = event.target.value.trim();
			dataAllow.inHarbourNum.allow = true;
		})
		$("#hLandDate").change(function(event) {
			dataAllow.hLandDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.hLandDate.allow = true;
		})
		// $("#hLandTime").change(function(event) {
		// 	dataAllow.hLandTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.hLandTime.allow = true;
		// })
		// 离港航班号
		$("#outHarbourNum").blur(function(event) {
			dataAllow.outHarbourNum.data = event.target.value.trim();
			dataAllow.outHarbourNum.allow = true;
		})
		$("#hTakeoffDate").change(function(event) {
			dataAllow.hTakeoffDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.hTakeoffDate.allow = true;
		})
		// $("#hTakeoffTime").change(function(event) {
		// 	dataAllow.hTakeoffTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.hTakeoffTime.allow = true;
		// })
		$("#flightNote").change(function(event) {
			dataAllow.flightNote.data = event.target.value;
		})

		/**
		 * 初始化 添加附件信息模态框
		 */
		$('#openAnnex').click(function(event) {
			var file = document.getElementById("AnnexFile");
			file.outerHTML = file.outerHTML;
			$("#AnnexText").val("")
			$('#modalAnnex').openModal({
				dismissible: false
			});
		});
		$('#colseAnnex').click(function(event) {
			$('#modalAnnex').closeModal()
		});
		$('#UploadAnnex').click(function(event) {
			if ($("#selectAnnex").val() == null || $("#selectAnnex").val() == 'null') {
				Materialize.toast('你尚未选择证件类型', 4000)
				return
			}
			var AnnexFileList = document.getElementById("AnnexFile").files;
			if (AnnexFileList.length == 0) {
				Materialize.toast('你尚未选择任何文件', 4000)
				return
			}
			var AnnexFile = AnnexFileList[0]
			if ( AnnexFile.type != "image/jpeg" && AnnexFile.type != "image/png" && AnnexFile.type != "image/jpg" ) {
				Materialize.toast('请选择 jpg 或 png 格式的文件', 4000)
				return
			}
			var uploadForm = new FormData();
			uploadForm.append("attachFile", AnnexFile);
			$("#UploadAnnex").text('正在上传')
			if (loaddata.infoId == null || loaddata.infoId == '') {
				fetch(
					URLbase + URLversion + "/gather/attach/"+$("#selectAnnex").val()+"/add.do",{
					method: 'POST',
					headers: {
						token: localStorage.getItem('_token'),
						digest: localStorage.getItem('_digest')
					},
					body: uploadForm
				}).then(function(response) {
					return response.json()
				}).then(function(json) {
					dealwith(json);
				})
			}else {
				fetch(
					URLbase + URLversion + "/gather/attach/"+$("#selectAnnex").val()+"/"+loaddata.infoId+"/add.do",{
					method: 'POST',
					headers: {
						token: localStorage.getItem('_token'),
						digest: localStorage.getItem('_digest')
					},
					body: uploadForm
				}).then(function(response) {
					return response.json()
				}).then(function(json) {
					dealwith(json);
				})
			}
			function dealwith(json) {
				if (json.result == "0") {
					var _data = dataAllow.attachmentList.data;
					var newArray = []
					for (var i = 0; i < _data.length; i++) {
						if (_data[i].attachId != null && _data[i].attachType != null && _data[i].attachThumb != null && _data[i].attachPath != null) {
							_data[i].infoId = loaddata.infoId;
							newArray.push(_data[i]);
						}
					}
					json.data.infoId = loaddata.infoId;
					newArray.push(json.data);
					dataAllow.attachmentList.data = newArray;
					renderAnnex();
					$('#modalAnnex').closeModal();
				}else {
					Materialize.toast('上传失败,原因:'+json.message, 4000);
				}
				$("#UploadAnnex").text('上传')
			}
		});
		function renderAnnex() {
			var _data = dataAllow.attachmentList.data,
				_string = ""
			for (var i = 0; i < _data.length; i++) {
				if (_data[i].attachType == null) {return}
				if (_data[i].attachThumb == null) {return}
				_string += "<div class='theCar'><div>"//
					+(_data[i].attachType=='PT'?"机票":"结婚证")+"<span id='deleteAnnex"//
					+i+"' data-ID="//
					+_data[i].attachId+" data-Array="//
					+i+">X</span></div><img src='"//
					+URLbase + _data[i].attachThumb+"'></div>"
			}
			$("#annex").html(_string);
			for (var j = 0; j < _data.length; j++) {
				$("#deleteAnnex"+j).click(function(event) {
					var _confirm=confirm("确认要删除?")
					if (_confirm == true){
					}else{
						return
					}
					var _data = dataAllow.attachmentList.data
					$.ajax({ 
						type: "GET", 
						url: URLbase + URLversion + "/gather/attach/"+event.target.getAttribute('data-ID')+"/del.do", 
						contentType:"application/json; charset=utf-8",  
						headers: {
							'token':localStorage.getItem('_token'),
							'digest':localStorage.getItem('_digest')
						},
						success: function (message) {
							if (message.result == "0") {
								dataAllow.attachmentList.data.splice(parseInt(event.target.getAttribute('data-Array')),1)
								renderAnnex();
							}else {
							}
						}
					});
				});

			}
		}
		renderAnnex();
	}
	// 进入下一页
	function nextPage() {
		// 进行判断是否可以下一页
		for(var _cardperson in dataAllow){
			if (dataAllow[_cardperson].allow == false) {
				if ( _cardperson == "signName" ) {
					$("#signName").next().text("必填");
				}else if (_cardperson == "mobile" ) {
					$("#BasicPhone").next().text("有误");
				}else if (_cardperson == "email" ) {
					$("#BasicEmail").next().text("有误");
				}
				return
			}
		}
		// 如果验证完毕 可以下一页，那么将数据并入主数据！
		for(var _cardperson2 in dataAllow){
			finaldata[_cardperson2] = dataAllow[_cardperson2].data
		}
		// 隐藏这一页两个按钮
		$("#returnPageFirst").css('visibility', 'hidden');
		$("#toPageThird").css('display', 'none');
		// 显示下一页的两个个按钮
		$("#returnPageSecond").css('display', 'inline-block');
		$("#toPageFourth").css('display', 'inline-block');
		// 跳转到下一页
		$('ul.tabs').tabs('select_tab', 'test3');
		if (_first == true) {
			$("#addTravelers1").trigger("click");
			$("#liveName").val(dataAllow.signName.data);
			$("#livePhone").val(dataAllow.mobile.data);
			$("#liveEmail").val(dataAllow.email.data);
			dataModal.chineseName.data = dataAllow.signName.data;
			dataModal.chineseName.allow  = true;
			dataModal.mobile.data = dataAllow.mobile.data;
			dataModal.mobile.allow = true;
			dataModal.email.data = dataAllow.email.data;
			dataModal.email.allow = true;
			$("#liveName").trigger("blur");
			$("#livePhone").trigger("blur");
			$("#liveEmail").trigger("blur");
			$("#liveName").trigger("click");
			$("#livePhone").trigger("click");
			$("#liveEmail").trigger("click");
		}
	}
	var obj = {
		init:function(){
			init();
		},
		data:dataAllow
	}
	return obj;
})();




/**
 * 第三页
 */
// 初始化必要的信息,暂定
var allRoom = [];
// 获取到模态框数据 并且并入 allRoom 的临时数据
var dataModal = {};

var pageThird = (function(){


	// 初始化模态框使用到的最初数据
	function initiModal() {
		var obj = {"mobile":{allow:false,data:null},"email":{allow:false,data:null},"passportNo":{allow:true,data:null},"nationality":{allow:false,data:null},"chineseName":{allow:false,data:null},"pinyinName":{allow:false,data:null},"gender":{allow:true,data:1},"birthday":{allow:false,data:null},"isDive":{allow:true,data:"N"},"divingRank":{allow:true,data:null},"divingCount":{allow:true,data:null},"lastDiveTime":{allow:true,data:null},"anamnesis":{allow:true,data:"无"},"roomId":{allow:true,data:null},"divingNo":{allow:true,data:null}}
		return obj
	}
	function init() {
		/**
		 * 下方是数据的初始化
		 */
		 // 一间空房子
		 function outputRoom() {
		 	// 如果是模板 3 紧急联系人是必填
		 	if ( loaddata.template == 3 ) {
				var obj = {
				    "roomId":{allow:true,data:null},
				    "bedType":{allow:false,data:null},
				    "iceName":{allow:false,data:null},
				    "iceRelation":{allow:false,data:null},
				    "iceMobile":{allow:false,data:null},
				    "iceEmail":{allow:false,data:null},
				    "infoId":{allow:true,data:null},
				    "customerInfoList":[]
				};
				return obj
		 	}else {
				var obj = {
				    "roomId":{allow:true,data:null},
				    "bedType":{allow:false,data:null},
				    "iceName":{allow:true,data:null},
				    "iceRelation":{allow:true,data:null},
				    "iceMobile":{allow:true,data:null},
				    "iceEmail":{allow:true,data:null},
				    "infoId":{allow:true,data:null},
				    "customerInfoList":[]
				};
				return obj
		 	}
		 }
		 // 一个空顾客
		 function outputCustomer() {
			var obj = {
	            "customerId":{allow:false,data:null},
	            "passportNo":{allow:false,data:null},
	            "nationality":{allow:false,data:null},
	            "chineseName":{allow:false,data:null},
	            "pinyinName":{allow:false,data:null},
	            "gender":{allow:false,data:null},
	            "birthday":{allow:false,data:null},
	            "mobile":{allow:false,data:null},
	            "email":{allow:false,data:null},
	            "isDive":{allow:false,data:null},
	            "divingRank":{allow:false,data:null},
	            "divingCount":{allow:false,data:null},
	            "lastDiveTime":{allow:false,data:null},
	            "anamnesis":{allow:false,data:"无"},
	            "roomId":{allow:true,data:null},
	            "divingNo":{allow:true,data:null}
			}
			return obj
		 }
		 // 当传进来的数据为空，渲染房间数！
		 if (loaddata.roomInfoList.length == 0) {
			var _Array = [];
			for (var i = 0; i < loaddata.roomNum; i++) {
				_Array.push(outputRoom());
			}
			allRoom = _Array;
		 }else {

		 	// 当传进来的数据不为空
			// 先创建临时对象
			var _Array = [];
			// 渲染空房间数
			for (var j = 0; j < loaddata.roomNum; j++) {
				_Array.push(outputRoom());
			}
			for (var i = 0; i < loaddata.roomInfoList.length; i++) {
				// 初始化 roomId infoId
				var _addID = outputRoom();
				_addID.roomId.data = i+1;
				_addID.infoId.data = loginSuccessful.infoId;
				// 初始化新房间,根据加载进来的数据
				_Array[i] = _addID;
				// 再看是否有顾客,根据加载进来的数据
				for (var j = 0; j < loaddata.roomInfoList[i].customerInfoList.length; j++) {
					// 初始化roomID
					var _roomId = outputCustomer();
					_roomId.roomId.data = i+1;
					// 如果有顾客就初始化进去
					_Array[i].customerInfoList.push(_roomId);
				}
			}
			// 进行数据转换！(如果有数据就转换)
			for (var i = 0; i < loaddata.roomInfoList.length; i++) {
				for(var _roomInfo in loaddata.roomInfoList[i]){
					// 将非 customerInfoList 的数据转换成为 临时对象数据
					if (_roomInfo != "customerInfoList") {
						_Array[i][_roomInfo].data = loaddata.roomInfoList[i][_roomInfo];
						// 只要数据不为空 或者 不为null 就让数据进行通过
						if (loaddata.roomInfoList[i][_roomInfo] == null) {
						}else {
							_Array[i][_roomInfo].allow = true;
						}
					}
				}
				for (var j = 0; j < loaddata.roomInfoList[i].customerInfoList.length; j++) {
					for(var _customerInfo in loaddata.roomInfoList[i].customerInfoList[j]){
						// 把age跳过
						if ( _customerInfo == "age" ) {continue}
						_Array[i].customerInfoList[j][_customerInfo].data = loaddata.roomInfoList[i].customerInfoList[j][_customerInfo];
						// 只要数据不为空 或者 不为null 就让数据进行通过
						if (loaddata.roomInfoList[i].customerInfoList[j][_customerInfo] != null ||loaddata.roomInfoList[i].customerInfoList[j][_customerInfo] != "" ) {
							_Array[i].customerInfoList[j][_customerInfo].allow = true;
						}
					}
				}
			}
			allRoom = _Array;
		 }
		 var _Num = 0;
		 for (var k = 0; k < loaddata.roomInfoList.length; k++) {
		 	_Num = _Num + loaddata.roomInfoList[k].customerInfoList.length;
		 }
		 _Num = loginSuccessful.peopleNum - _Num;
		 $("#_RoomNumber").text( "还可入住" + _Num + "人" )

		 // 渲染房间
		 RenderRoom();




		/**
		 * 下方是事件的初始化
		 */
		// 初始化 模态框保存
		$("#colseModal").click(function(event) {
			// 判断 dataModal 的数据，如果等于 false 不通过并且弹出警告
			if (chackTraveler() == false) {
				return
			}
			// 判断 修改的是哪间房的 旅客信息
			var RoomID = parseInt($("#colseModal").attr('data-RoomID'));
			// 判断 data-type 是 add 新增数据 还是 change修改数据
			if ($("#colseModal").attr('data-type') == "add") {
				// 将 dataModal 的数据 混入 allRoom 里面
				allRoom[RoomID].customerInfoList.push(dataModal);
			}else {
				var CardID = parseInt($("#colseModal").attr('data-CardID'));
				allRoom[RoomID].customerInfoList.splice(CardID,1,dataModal);
			}
			RenderCard(RoomID);
			$('#RoomInformation').closeModal();
			clearModal();
			countRoom();
		});

		// 初始化模态框的事件
		// 护照号码
		$("#PassportNumber").change(function(event){
			dataModal.passportNo.data = event.target.value.trim();
		});
		// 国籍
		$("#_liveCountry").change(function(event){
			if (event.target.value == "0") {
				event.target.nextSibling.nextElementSibling.innerHTML = '国籍为必选';
				dataModal.nationality.allow = false;
				return
			}
			event.target.nextSibling.nextElementSibling.innerHTML = '';
			dataModal.nationality.data = event.target.value;
			dataModal.nationality.allow = true;
		});
		// 姓名(中文)
		$("#liveName").blur(function(event){
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.chineseName.allow  = false;
				event.target.nextSibling.nextElementSibling.innerHTML ='姓名为必填'
				return
			}else if ( !(/^[\u4E00-\u9FA5]+$/.test(event.target.value.trim())) ) {
				// 判断是否全是中中文
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.chineseName.allow  = false;
				event.target.nextSibling.nextElementSibling.innerHTML ='必须为中文'
				return
			}else if ( event.target.value.length >= 15 ) {
				// 判断是否小于5个汉字
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				event.target.nextSibling.nextElementSibling.innerHTML ='不能超出15个汉字'
				dataModal.chineseName.allow  = false;
				return
			}
			event.target.nextSibling.nextElementSibling.innerHTML =''
			dataModal.chineseName.allow  = true;
			dataModal.chineseName.data = event.target.value.trim();

			$("#livePinyin").val($(this).toPinyin());
			$("#livePinyin").next().attr('class', 'value active');
			dataModal.pinyinName.allow = true;
			dataModal.pinyinName.data  = $(this).toPinyin();
		})
		// 姓名(拼音)
		$("#livePinyin").blur(function(event){
			if ( event.target.value.length >= 32 ) {
				// 判断是否小于32个汉字
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				event.target.nextSibling.nextElementSibling.innerHTML ='不能超过32位'
				dataModal.pinyinName.allow  = false;
				return
			}else if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				event.target.nextSibling.nextElementSibling.innerHTML ='不能为空'
				dataModal.pinyinName.allow  = false;
				return
			}
			event.target.nextSibling.nextElementSibling.innerHTML =''
			dataModal.pinyinName.allow  = true;
			dataModal.pinyinName.data = event.target.value.trim();
		});
		// 性别
			$("#client_man").click(function(){
				dataModal.gender.allow = true;
				dataModal.gender.data  = 1;
			})
			$("#client_girls").click(function(){
				dataModal.gender.allow = true;
				dataModal.gender.data  = 2;
			})
		// 生日
		$("#liveBirthday").change(function(event){
			if (event.target.value == "") {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.birthday.allow = false;
				dataModal.birthday.data = null;
				return
			}
			dataModal.birthday.allow = true;
			document.getElementById('liveBirthday').setAttribute("class", "");
			dataModal.birthday.data = returnDatestamp(event.target.value);
		});
		// 判断 手机号码 是否正确
		$("#livePhone").blur(function(event){
			if (event.target.value == "" || event.target.value.trim() == null) {
				event.target.nextSibling.nextElementSibling.innerHTML = '不能为空';
				dataModal.mobile.allow = false;
				return
			}
			event.target.nextSibling.nextElementSibling.innerHTML = '';
			dataModal.mobile.data = event.target.value.trim();
			dataModal.mobile.allow = true;
		})
		// 判断 邮箱 是否正确
		$("#liveEmail").blur(function(event){
			if (event.target.value == "" || event.target.value.trim() == null) {
				event.target.nextSibling.nextElementSibling.innerHTML = '不能为空';
				dataModal.email.allow = false;
				return
			}else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value.trim()))) {
				// 邮箱不正确
				event.target.nextSibling.nextElementSibling.innerHTML = '邮箱不正确';
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.email.allow = false;
				return
			}
			event.target.nextSibling.nextElementSibling.innerHTML = '';
			dataModal.email.data = event.target.value.trim();
			dataModal.email.allow = true;
		})

		// 初始化选择度假潜水类型
			// 选择深潜
			$("#lever_Depth").click(function(){
				// 显示深潜
				document.getElementById("Diving_Depth").setAttribute("style","display:block;")
				dataModal.isDive.data="Y";
			});
			// 选择浮潜
			$("#lever_Simple").click(function(){
				// 隐藏深潜
				document.getElementById("Diving_Depth").setAttribute("style","display:none;")
				dataModal.isDive.data="N";
				// 清空显示
				$("#_Depthlevel").val("0")
				$("#Depth_divingNo").val("")
				$("#Depth_time").val("")
				$("#Depth_Amount").val("")
				// 清空数据
				dataModal.divingRank.data=null;
				dataModal.divingNo.data=null;
				dataModal.lastDiveTime.data=null;
				dataModal.divingCount.data=null;
			});

		// 请选择潜水级别
		$("#_Depthlevel").change(function(event){
			if (event.target.value == "0") {
				dataModal.divingRank.data = null;
			}else{
				dataModal.divingRank.data = event.target.value;
			}
		});
		// 潜水证号
		$("#Depth_divingNo").change(function(event){
			// 长度不能超过 16位
			if (event.target.value.length > 16) {
				event.target.nextSibling.nextElementSibling.innerHTML = '潜水证号长度不能超过 16位';
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.divingNo.data = null;
				dataModal.divingNo.allow = false;
				return
			}
			event.target.nextSibling.nextElementSibling.innerHTML = '';
			dataModal.divingNo.allow = true;
			dataModal.divingNo.data = event.target.value.trim();
		});
		// 上次潜水时间
		$("#Depth_time").change(function(event){
			if (event.target.value == "") {
				dataModal.lastDiveTime.data = null;
				return
			}
			dataModal.lastDiveTime.data = returnDatestamp(event.target.value);
		});
		// 潜水次数
		$("#Depth_Amount").change(function(event){
			if ( !(/^\d+$/.test(event.target.value.trim())) ) {
				// 判断是否全为数字
				if (event.target.value.trim() != "") {
					event.target.nextSibling.nextElementSibling.innerHTML = '潜水次数必须全为数字';
					dataModal.divingCount.allow = false;
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					dataModal.divingCount.data = null;
					return
				}
			}
			event.target.nextSibling.nextElementSibling.innerHTML = '';
			dataModal.divingCount.allow = true;
			dataModal.divingCount.data = event.target.value.trim();
		});


		// 以往重大病史
		$("#MajorDisease").change(function(event){
			dataModal.anamnesis.data = event.target.value.trim();
		});

		// 关闭模态框
		$("#CloseTraModal").click(function(event) {
			clearModal();
			$('#RoomInformation').closeModal();
		});

		// 下一页 nextPage
		$("#toPageFourth").click(function(event) {
			nextPage();
		});
		$("#returnPageSecond").click(function(event) {
			$('ul.tabs').tabs('select_tab', 'test2');
			// 隐藏这一页按钮
			$("#returnPageSecond").css('display', 'none');
			$("#toPageFourth").css('display', 'none');
			// 显示上一页按钮
			$("#returnPageFirst").css('visibility', 'visible');
			$("#returnPageFirst").css('display', 'inline-block');
			$("#toPageThird").css('display', 'inline-block');
		});
	}
	// 清空模态框
	function clearModal() {
		// 清空数据
		dataModal = initiModal();

		// 通用清空样式
		$("#RoomInformation input").val("");
		$("#RoomInformation input").removeClass('invalid');
		$("#RoomInformation input").removeClass('valid');

		// 初始化国籍
		$("#_liveCountry").val("0")
		// 清空生日
		$("#liveBirthday").val("")

		// 初始化 隐藏选择度假潜水类型
		$("#lever_Simple").click();

		// 清空 潜水级别
		$("#_Depthlevel").val("0")
		// 清空 潜水级别
		$("#Depth_divingNo").val("")
		// 清空 潜水证号
		$("#Depth_time").val("")
		// 清空 潜水次数
		$("#Depth_Amount").val("")
	}
	// 渲染新的 房间
	function RenderRoom() {
		// 渲染新的 房间导航
		var _navString = '';
		// 每间房间的唯一标示ID为 i+1
		for (var i = 0; i < allRoom.length; i++) {
			if ( i == 0 ) {
				_navString += "<li class='tab collection-item'><a class='active' href='#room1'>房间1</a></li>";
			}else {
				_navString +="<li class='tab collection-item'><a href='#room"+(i+1)+"'>房间"+(i+1)+"</a></li>";
			}
		}
		$("#RoomNav").html(_navString);
		// 渲染新的 房间
		var _roomString = '';
		for (var i = 0; i < allRoom.length; i++) {
			_roomString += "<div id='room"//
				+ (i+1) +"' class='col s12'><div class='card-title _title'>房间"//
				+ (i+1) +"<a id='addTravelers"//
				+ (i+1) +"' class='waves-effect waves-light btn tooltipped right addTravelers' data-position='bottom' data-delay='50' data-tooltip='点击添加旅客信息'>旅客信息<i class='mdi-content-add'></i></a></div><div class='row'><div class='input-field col s12 bedtype' id='bedtype"//
				+ (i+1) +"'><select id='livebed"//
				+ (i+1) +"' class='initialized'><option value='0' disabled selected>请选择床型</option>"//
				+ correspondBedtype()
				// + "<option value='大床'>大床</option><option value='双床'>双床</option><option value='蜜月大床'>蜜月大床</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option>"//
				+"</select><label>床型</label></div></div><div class='_roomInfoList' id='Render"//
				+ (i+1) +"'></div><div class='_urgent'><div class='card-title Voids'>紧急联系人信息</div><div class='row'><div class='newInput col s6'><input id='urgentName"//
				+ (i+1) +"' type='text' data-ID='urgentName' value='"//
				+ ((allRoom[i].iceName.data==null)?"":allRoom[i].iceName.data) +"' placeholder='姓名(必填)'><div></div></div><div class='newInput col s6'>"//
				+ renderurgentRelation(i,allRoom[i].iceRelation.data) + "<div></div></div></div><div class='row'><div class='newInput col s6'><input id='urgentPhone"//
				+ (i+1) +"' type='tel' class='validate' data-ID='urgentPhone' value='"//
				+ ((allRoom[i].iceMobile.data==null)?"":allRoom[i].iceMobile.data) +"' placeholder='手机/电话(必填)'><div></div></div><div class='newInput col s6'><input id='urgentEmail"//
				+ (i+1) +"' type='email' class='validate' data-ID='urgentEmail' value='"//
				+ ((allRoom[i].iceEmail.data==null)?"":allRoom[i].iceEmail.data) +"' placeholder='邮箱(必填)'><div></div></div></div></div></div>";
		}
		$("._Travelers").html(_roomString);
		$('ul.tabs').tabs();

		// 如果 模板 3 ，不需要填写紧急联系人信息
		if (loaddata.template == 3 || loaddata.template == 9) {
		}else {
			$("._urgent").css("display","none");
		}

		// 绑定新的房间 所有事件
		for (var i = 0; i < allRoom.length; i++) {
			$("#bedtype"+(i+1)).html(livebedToString(allRoom[i].bedType.data,(i+1)))
			// 初始化床型选择框
			$('#livebed'+(i+1)).material_select();
			$('#livebed'+(i+1)).attr('data-RoomID',i);
			// 初始化所有旅客信息
			RenderCard(i);
			// 初始化添加旅客信息
			$("#addTravelers"+(i+1)).attr('data-RoomID',i);
			$("#addTravelers"+(i+1)).click(function(event) {
				var num = 0;
				for (var i = 0; i < allRoom.length; i++) {
					num += allRoom[i].customerInfoList.length
				}
				// 判断是否达到最大人数，如果是，不给继续添加！
				if (num >= loaddata.peopleNum) {
					Materialize.toast('达到最大人数', 4000)
					return
				}
				// 初始化模态框数据，指向新的数据、旧数据自动垃圾回收、
				dataModal = initiModal();
				dataModal.roomId.data = allRoom[event.target.getAttribute("data-Roomid")].roomId.data;
				// 判断 编辑还是添加 旅客信息
				$("#colseModal").attr('data-type','add');
				// 判断 修改的是哪间房的 旅客信息
				$("#colseModal").attr('data-RoomID',event.target.getAttribute("data-Roomid"));
				// 打开模态框
				$('#RoomInformation').openModal({
					dismissible: false
				});
				SetModalHeight();
			});
			// 选择床型并入到主数据
			$('#livebed'+(i+1)).change(function(event) {
				var RoomID = event.target.getAttribute("data-RoomID");
				allRoom[RoomID].bedType.allow= true;
				allRoom[RoomID].bedType.data = event.target.value.trim();
			});
			// 紧急联系人姓名并入到主数据
			$("#urgentName"+(i+1)).attr('data-RoomID',i);
			$("#urgentName"+(i+1)).blur(function(event) {
				var RoomID = event.target.getAttribute("data-RoomID");
				allRoom[RoomID].iceName.allow= false;
				if (event.target.value.trim() == "" || event.target.value.trim() == null) {
					event.target.nextSibling.innerHTML ='不能为空'
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					return
				}else if ( !(/^[\u4E00-\u9FA5]+$/.test(event.target.value.trim())) ) {
					// 判断是否全是中中文
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					event.target.nextSibling.innerHTML ='必须为中文'
					return
				}else if ( event.target.value.length >= 5 ) {
					// 判断是否小于5个汉字
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					event.target.nextSibling.innerHTML ='不能超出5个汉字'
					return
				}
				event.target.nextSibling.innerHTML =''
				allRoom[RoomID].iceName.allow= true;
				allRoom[RoomID].iceName.data = event.target.value.trim();
			});
			// 紧急联系人关系并入到主数据
			$("#_urgentRelation"+(i+1)).attr('data-RoomID',i);
			$("#_urgentRelation"+(i+1)).change(function(event) {
				var RoomID = event.target.getAttribute("data-RoomID");
				allRoom[RoomID].iceRelation.allow = false;
				if (event.target.value == "0") {
					event.target.nextSibling.innerHTML ='紧急联系人关系是必选'
					return
				}
				event.target.nextSibling.innerHTML =''
				allRoom[RoomID].iceRelation.allow= true;
				allRoom[RoomID].iceRelation.data = event.target.value;
			});
			// 紧急联系人手机(电话)并入到主数据
			$("#urgentPhone"+(i+1)).attr('data-RoomID',i);
			$("#urgentPhone"+(i+1)).blur(function(event) {
				var RoomID = event.target.getAttribute("data-RoomID");
				allRoom[RoomID].iceMobile.allow= false;
				if (event.target.value.trim() == "" || event.target.value.trim() == null) {
					event.target.nextSibling.innerHTML ='不能为空'
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					return
				}
				if (!(/^1[34578]\d{9}$/.test(event.target.value.trim()))) {
					// 号码错误
					event.target.nextSibling.innerHTML ='格式错误'
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					return
				}
				event.target.nextSibling.innerHTML =''
				allRoom[RoomID].iceMobile.allow= true;
				allRoom[RoomID].iceMobile.data = event.target.value.trim();
			});
			// 紧急联系人邮箱并入到主数据
			$("#urgentEmail"+(i+1)).attr('data-RoomID',i);
			$("#urgentEmail"+(i+1)).blur(function(event) {
				var RoomID = event.target.getAttribute("data-RoomID");
				allRoom[RoomID].iceEmail.allow= false;
				if (event.target.value.trim() == "" || event.target.value.trim() == null) {
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					event.target.nextSibling.innerHTML ='不能为空'
					return
				}
				if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value))) {
				// 邮箱不正确
					event.target.nextSibling.innerHTML ='格式不正确'
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					return
				}
					event.target.nextSibling.innerHTML =''
				allRoom[RoomID].iceEmail.allow= true;
				allRoom[RoomID].iceEmail.data = event.target.value.trim();
			});
		}
		// 渲染关系方法
		function renderurgentRelation(_id,_data) {
			if (!_data) {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0' selected>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}if (_data == '兄弟姐妹') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹' selected>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}else if (_data == '父母') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母' selected>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}else if (_data == '夫妻') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻' selected>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}else if (_data == '朋友') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友' selected>朋友</option><option value='其他'>其他</option></select>"
			}else {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他' selected>其他</option></select>"
			}
		}
	}
	/**
	 * 渲染(模态框)(根据 RoomID 以及 CarID )
	 */
	function renderModal(RoomID,CarID) {
		// 数据部分
		var _data = allRoom[RoomID].customerInfoList[CarID];
		dataModal = allRoom[RoomID].customerInfoList[CarID];

		// 护照号码
		$("#PassportNumber").val(_data.passportNo.data)
		$("#PassportNumber").next().attr('class', 'value active');// 浏览器兼容
		// 国籍
		$('#_liveCountry').val(_data.nationality.data);
		// 姓名
		$("#liveName").val(_data.chineseName.data)
		$("#liveName").next().attr('class', 'value active');
		// 拼音
		$("#livePinyin").val(_data.pinyinName.data)
		$("#livePinyin").next().attr('class', 'value active');
		// 渲染性别
		if (_data.gender.data == 1) {
			$("#client_man").attr('checked','');
		}else {
			$("#client_girls").attr('checked','');
		}
		// 生日
		$("#liveBirthday").val(returnDate(_data.birthday.data))
		// 手机号码
		$("#livePhone").val(_data.mobile.data)
		$("#livePhone").next().attr('class', 'value active');
		// 邮箱
		$("#liveEmail").val(_data.email.data)
		$("#liveEmail").next().attr('class', 'value active');

		// 潜水类型
		if (_data.isDive.data == "Y") {
			$("#lever_Depth").click();
			document.getElementById("Diving_Depth").setAttribute("style","display:block;")

			// 级别
			$("#_Depthlevel").val(_data.divingRank.data);
			// 潜水证号
			$('#Depth_divingNo').val(_data.passportNo.data);
			$("#Depth_divingNo").next().attr('class', 'value active');
			// 上次潜水时间
			$('#Depth_time').val(_data.lastDiveTime.data);
			// 潜水次数
			$('#Depth_Amount').val(_data.divingCount.data);
			$("#Depth_Amount").next().attr('class', 'value active');
		}

		// 渲染以往重大病史
		$("#MajorDisease").val(_data.anamnesis.data);
		$("#MajorDisease").next().attr('class', 'value active');
	}
	/**
	 * 验证(模态框填写的所有数据)
	 * 判断 dataModal 的数据，如果等于 false 不通过并且弹出警告
	 */
	function chackTraveler() {
		for(var data in dataModal) {
			if (data == "customerId") {
				// 这个是例外，不需要进行判断！
			}else {
				if (dataModal[data].allow == false) {
					if (data == "mobile") {
						Materialize.toast('请填写手机号码', 4000);
						document.getElementById('livePhone').nextSibling.nextElementSibling.innerHTML = '请填写手机号码';
					}else if (data == "email") {
						Materialize.toast('请填写邮箱', 4000);
						document.getElementById('liveEmail').nextSibling.nextElementSibling.innerHTML = '请填写邮箱';
					}else if (data == "nationality") {
						Materialize.toast('请选择国籍', 4000);
						document.getElementById('_liveCountry').nextSibling.nextElementSibling.innerHTML = '请选择国籍';
					}else if (data == "chineseName") {
						Materialize.toast('请填写中文名', 4000);
						document.getElementById('liveName').nextSibling.nextElementSibling.innerHTML = '请填写中文名';
					}else if (data == "pinyinName") {
						Materialize.toast('请填写英文名', 4000);
						document.getElementById('livePinyin').nextSibling.nextElementSibling.innerHTML = '请填写英文名';
					}else if (data == "birthday") {
						Materialize.toast('请选择生日日期', 4000);
					}
					return false
				}
			}
		}
	}
	/**
	 * 渲染新的 客人信息
	 * @param    {number}  roomNum    渲染第几间房间下的的所有Card
	 */
	function RenderCard(roomNum) {
		var allCard = allRoom[roomNum].customerInfoList;
		var _carString = ""
		for (var i = 0; i < allCard.length; i++) {
			// 判断 深潜
			var _chack;
			if (allCard[i].isDive.data=="Y") {
				_chack = "block"
			}else {
				_chack = "none"
			}
			// 渲染
			_carString += "<div class='card-panel _part' id='card-panel"//
				+i+"'><div class='row delete'><a class='title'>旅客信息"//
				+(i+1)+"</a><i id='delete"//
				+i+"Room"+roomNum+"' class='mdi-navigation-close right'></i></div><div class='row'><div class='input-field col s6'>护照号:<span>"//
				+testDataNull(allCard[i].passportNo.data)+ "</span></div><div class='input-field col s6'>国籍:<span>"//
				+testDataNull(allCard[i].nationality.data)+"</span></div></div><div class='row'><div class='input-field col s6'>姓名(中文):<span>"//
				+testDataNull(allCard[i].chineseName.data)+"</span></div><div class='input-field col s6'>姓名(拼音):<span>"//
				+testDataNull(allCard[i].pinyinName.data)+"</span></div></div><div class='row'><div class='input-field col s6'>性别:<span>"//
				+(allCard[i].gender.data==1?"男":"女")+"</span></div><div class='input-field col s6'>生日:<span>"//
				+returnDate(testDataNull(allCard[i].birthday.data))+"</span></div></div><div class='row'><div class='input-field col s6'>手机(电话):<span>"//
				+testDataNull(allCard[i].mobile.data)+"</span></div><div class='input-field col s6'>邮箱:<span>"//
				+testDataNull(allCard[i].email.data)+"</span></div></div><div class='row'><div class='input-field col s6'>是否深潜:<span>"//
				+((allCard[i].isDive.data=="Y")?"深潜":"浮潜")+"</span></div><div class='input-field col s6' style='display:"//
				+_chack+";'>潜水证号:<span>"//
				+testDataNull(allCard[i].divingNo.data)+"</span></div></div><div class='row'><div class='input-field col s6' style='display:"//
				+_chack+";'>潜水级别:<span>"//
				+DivelevelToChinese(allCard[i].divingRank.data)+"</span></div><div class='input-field col s6' style='display:"//
				+_chack+";'>潜水次数:<span>"//
				+testDataNull(allCard[i].divingCount.data)+"</span></div></div><div class='row'><div class='input-field col s12' style='display:"//
				+_chack+";'>上次潜水:<span>"//
				+((allCard[i].lastDiveTime.data==""||allCard[i].lastDiveTime.data==null)?"未填写":returnDate(allCard[i].lastDiveTime.data))+"</span></div></div><div class='row'><div class='input-field col s12'>重大病史:<span>"//
				+((allCard[i].anamnesis.data==null||allCard[i].anamnesis.data=="")?"无":allCard[i].anamnesis.data)+"</span></div></div><div class='_editTravelers'><button id='_editTravelers"//
				+i+"Room"+roomNum+"' class='btn waves-effect waves-light right'>编辑</button></div></div>"
		}
		var RenderID = roomNum + 1 ;
		$("#Render"+RenderID).html(_carString);
		// 初始化 事件
		for (var i = 0; i < allCard.length; i++) {
			// 初始化 删除事件
			$("#delete"+i+"Room"+roomNum).attr('data-RoomID',roomNum);
			$("#delete"+i+"Room"+roomNum).attr('data-CardID',i);
			$("#delete"+i+"Room"+roomNum).click(function(event) {
				var RoomID = parseInt(event.target.getAttribute('data-RoomID')),
					CardID = parseInt(event.target.getAttribute('data-CardID'));
				var _Array = allRoom[RoomID].customerInfoList;
				_Array.splice(CardID,1);
				allRoom[RoomID].customerInfoList = _Array;
				RenderCard(RoomID);
				countRoom();
			});
			// 初始化编辑旅客信息
			$("#_editTravelers"+i+"Room"+roomNum).attr('data-RoomID',roomNum);
			$("#_editTravelers"+i+"Room"+roomNum).attr('data-CardID',i);
			$("#_editTravelers"+i+"Room"+roomNum).click(function(event) {
				// 初始化模态框数据，指向新的数据、旧数据自动垃圾回收、
				dataModal = initiModal();
				dataModal.roomId.data = allRoom[event.target.getAttribute("data-RoomID")].roomId.data
				// 进行模态框渲染
				renderModal(event.target.getAttribute("data-RoomID"),event.target.getAttribute("data-CardID"));
				// 判断 编辑还是添加 旅客信息
				$("#colseModal").attr('data-type','change');
				// 判断 修改的是哪间房的 旅客信息
				$("#colseModal").attr('data-RoomID',event.target.getAttribute("data-RoomID"));
				// 判断 修改的是第几个 旅客信息
				$("#colseModal").attr('data-CardID',event.target.getAttribute("data-CardID"));
				// 打开模态框
				$('#RoomInformation').openModal({
					dismissible: false
				});
				SetModalHeight();
			});
		}
	}
	// 还剩下多少间房间
	function countRoom() {
		var _Num = 0;
		for (var k = 0; k < allRoom.length; k++) {
			_Num = _Num + allRoom[k].customerInfoList.length;
		}
		_Num = loginSuccessful.peopleNum - _Num;
		$("#_RoomNumber").text( "还可入住" + _Num + "人" )
	}
	function nextPage() {
		// 用来判断是否通过
		var _allow = true,
			_toast = '您有信息仍未完善';
		for (var i = 0; i < allRoom.length; i++) {
			for(var _roomInfo in allRoom[i]){
				if (_roomInfo == "customerInfoList") {
					// 将忽略掉 customerInfoList 客户信息验证
				}else{
					if (allRoom[i][_roomInfo].allow == false) {
						// 如果有一个验证不通过，不让通过
						if (_roomInfo == "bedType") {_toast = '每间房间必须选择床型'}
						else if (_roomInfo == "iceEmail") {_toast = '每间房间必须填写紧急联系人邮箱'}
						else if (_roomInfo == "iceRelation") {_toast = '每间房间必须填写紧急的关系'}
						else if (_roomInfo == "iceMobile") {_toast = '每间房间必须填写紧急联系人的手机'}
						else if (_roomInfo == "iceName") {_toast = '每间房间必须填写紧急联系人姓名'}
						_allow = false;
					}
				}
			}
			if (allRoom[i].customerInfoList.length == 0) {
				_allow = false;
				Materialize.toast('每间房间至少填写一人旅客信息', 4000);
				return
			}else{
				for (var j = 0; j < allRoom[i].customerInfoList.length; j++) {
					for(var _customerInfo in allRoom[i].customerInfoList[j]){
						if (_customerInfo == "roomId") {
							// 忽略掉 roomId
						}else{
							if (allRoom[i].customerInfoList[j][_customerInfo].allow == false) {
								// 如果有一个验证不通过，不让通过
								_allow = false;
							}
						}
					}
				}
			}
		}
		if (_allow == false) {
			Materialize.toast(_toast, 4000)
			return
		}
		// 验证通过将数据并入主数据
		var temObj = [];
		for (var i = 0; i < allRoom.length; i++) {
			function creatRoom() {
				var obj = {"roomId":null,"iceName":null, "iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"customerInfoList":[]}
				return obj
			}
			temObj.push(creatRoom())
			for(var _roomInfo in allRoom[i]){
				if (_roomInfo == "customerInfoList") {
					// 将忽略掉 customerInfoList 客户信息验证
				}else{
					temObj[i][_roomInfo] = allRoom[i][_roomInfo].data
				}
			}
			for (var j = 0; j < allRoom[i].customerInfoList.length; j++) {
				function creatCustomer() {
					var obj = {"customerId":null,"passportNo":null,"nationality":null,"chineseName":null,"pinyinName":null,"gender":null,"birthday":null,"mobile":null,"email":null,"isDive":null,"divingRank":null,"divingCount":null,"lastDiveTime":null,"anamnesis":null,"roomId":null}
					return obj
				}
				temObj[i].customerInfoList.push(creatCustomer())
				for(var _customerInfo in allRoom[i].customerInfoList[j]){
					temObj[i].customerInfoList[j][_customerInfo] = allRoom[i].customerInfoList[j][_customerInfo].data
				}

			}
		}
		finaldata.roomInfoList = temObj
		// 并入成功跳转下一页
		// 隐藏这一页按钮
		$("#returnPageSecond").css('visibility', 'hidden');
		$("#toPageFourth").css('display', 'none');
		// 显示下一页的两个个按钮
		$("#returnPageThird").css('display', 'inline-block');
		$("#toPageFives").css('display', 'inline-block');
		// 跳转到下一页
    	$('ul.tabs').tabs('select_tab', 'test4');
    	// 提交数据
    	// pageFourth.init();
    	pageEspecially.init();
		// for (var i = 0; i < allRoom.length; i++) {
		// 	for(var _roomInfo in allRoom[i]){
		// 		if (_roomInfo == "customerInfoList") {
		// 			// 将忽略掉 客户信息
		// 		}
		// 		finaldata.roomInfoList[i][_roomInfo] = allRoom[i][_roomInfo].data;
		// 	}
		// }
	}
	var obj = {
		init:function(){
			init();
		},
		RenderCard:function(roomNum){
			RenderCard(roomNum)
		}
	}
	return obj;
})();



/**
 * 新增特别注意页面
 */
var pageEspecially = (function(){
	function init() {
		// 下一页 nextPage
		$("#toPageFives").click(function(event) {
			nextPage();
		});
		$("#returnPageThird").click(function(event) {
			$('ul.tabs').tabs('select_tab', 'test3');
			// 隐藏这一页按钮
			$("#returnPageThird").css('display', 'none');
			$("#toPageFives").css('display', 'none');
			// 显示上一页按钮
			$("#returnPageSecond").css('visibility', 'visible');
			$("#returnPageSecond").css('display', 'inline-block');
			$("#toPageFourth").css('display', 'inline-block');
		});
	}
	// 点击下一步
	function nextPage() {
	// 隐藏这一页两个按钮
	$("#returnPageThird").css('display', 'none');
	$("#toPageFives").css('display', 'none');
		// 跳转到下一页，并且提交数据
		$('ul.tabs').tabs('select_tab', 'test5');
		pageFourth.init();
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();


/**
 * 第四页
 */
var pageFourth = (function(){
	function init() {
		// 表示第一次提交
		if (loaddata.isRead == "Y") {
			$.ajax({ 
				type: "POST", 
				url: URLbase + URLversion + "/gather/"+THERUL+"/updateForm.do", 
				contentType:"application/json; charset=utf-8",  
				headers: {
					'token':localStorage.getItem('_token'),
					'digest':localStorage.getItem('_digest')
				},
				data: JSON.stringify(finaldata),
				dataType: "json",
				success: function (message) {
					if (message.result == "0") {
						$("#_END").text('您的信息已提交，并已邮件的形式通知客服!');
						$("#_ENDiconOk").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDBTN").css('display', 'block');
						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "2") {

						$("#_END").text('非常抱歉，该链接已经失效');
						$("#_ENDiconError").css('display', 'block');

						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "3") {

						$("#_END").text('非常抱歉，无法进行数据修改');
						$("#_ENDiconError").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDADD").text('如需修改请联系后台客服人员');

						$("#_ENDiconNo").css('display', 'none');
					}else {

						$("#_END").text("发生未知错误，"+message.message);
						$("#_ENDiconError").css('display', 'block');

						$("#_ENDiconNo").css('display', 'none');
					}
				}
			});
		}else {
			$.ajax({ 
				type: "POST", 
				url: URLbase + URLversion + "/gather/"+THERUL+"/gather.do",
				contentType:"application/json; charset=utf-8",  
				headers: {
					'token':localStorage.getItem('_token'),
					'digest':localStorage.getItem('_digest')
				}, 
				data: JSON.stringify(finaldata),
				dataType: "json",
				success: function (message) {
					if (message.result == "0") {
						$("#_END").text('恭喜你的信息提交成功');
						$("#_ENDiconOk").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDBTN").css('display', 'block');
						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "2") {

						$("#_END").text('非常抱歉，该链接已经失效');
						$("#_ENDiconError").css('display', 'block');

						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "3") {

						$("#_END").text('非常抱歉，无法进行数据修改');
						$("#_ENDiconError").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDADD").text('如需修改请联系后台客服人员');

						$("#_ENDiconNo").css('display', 'none');
					}else {

						$("#_END").text("发生未知错误，"+message.message);
						$("#_ENDiconError").css('display', 'block');

						$("#_ENDiconNo").css('display', 'none');
					}
				}
			});
		}
		$("#_ENDBTN").click(function(event) {
			window.location = sessionStorage.getItem('AllUrl');
		});
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();





// 下面是一下全局的方法---------------------------------------------------------------------------------------


 /**
  * 测试手机
  */
 function testPhone(event) {
 	var obj = {
 		data:event.target.value.trim()
 	};
 	if (!(/^1[34578]\d{9}$/.test(event.target.value.trim()))) {
 		// 号码错误
 		setTimeout(function(){
 			event.target.setAttribute("class","validate invalid");
 		},100);
 		obj.allow = false;
 	}else {
 		// 号码正确
 		event.target.setAttribute("class","validate valid");
 		obj.allow = true;
 	}
 	return obj
 }
 /**
  * 测试数据是否为空
  * @param    {person}  data     数据
  * @return   {string}  ""       说明
  */
 function testDataNull(data) {
 	if (data == null) {
 		return "未填写"
 	}else {
 		return data
 	}
 }
 /**
  * 测试DOM为空
  */
 function testNull(event) {
 	var obj = {
 		data:event.target.value.trim()
 	};
 	if (event.target.value.trim() == "") {
 		// 为空
 		setTimeout(function(){
 			event.target.setAttribute("class","validate invalid");
 		},100);
 		obj.allow = false;
 	}else {
 		// 不为空
 		setTimeout(function(){
 			event.target.setAttribute("class","validate valid");
 		},100);
 		obj.allow = true;
 	}
 	return obj
 }
 /**
  * 测试拼音
  */
 function testPinyin(event) {
 	var obj = {
 		data:event.target.value.trim()
 	};
 	if (event.target.value.trim() == "") {
 		// 为空
 		setTimeout(function(){
 			event.target.setAttribute("class","validate invalid");
 		},100);
 		obj.allow = false;
 	}else if (!(/^[a-zA-Z]{0,10000}$/.test(event.target.value.trim()))) {
 		// 拼音错误
 		setTimeout(function(){
 			event.target.setAttribute("class","validate invalid");
 		},100);
 		obj.allow = false;
 	}else {
 		// 拼音正确
 		event.target.setAttribute("class","validate valid");
 		obj.allow = true;
 	}
 	return obj
 }
 /**
  * 测试邮箱
  */
 function testEmail(event) {
 	var obj = {
 		data:event.target.value.trim()
 	};
 	if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value.trim()))) {
 		// 邮箱不正确
 		setTimeout(function(){
 			event.target.setAttribute("class","validate invalid");
 		},100);
 		obj.allow = false;
 	}else {
 		// 邮箱正确
 		event.target.setAttribute("class","validate valid");
 		obj.allow = true;
 	}
 	return obj
 }
 // 获取一个 window.location.search 键值（key value）
 function loadPageVar(sVar) {
   return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
 }

 // 方法 - 获取时间返回201x-xx-xx
 function returnDate(date) {
 	if (date == null) {
 		return ""
 	}
 	var newdate = new Date(date),
 		thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
 	return thisString
 }
 // 方法 - "201x xx xx" 转换字符串
 function returnDatestamp(data) {
 	var _Array = data.split(' ');
 	var Timestamp = Date.parse(new Date(_Array[0],(parseInt(_Array[1]) - 1),_Array[2]));
 	return Timestamp;
 }
 // 方法 -  获取时间返回 "xx:xx"
 function returnTimestamp(date) {
 	if (date == null) {return ""}
 	var newdate = new Date(date),
 		thisString = ( newdate.getHours()<10 ? ("0"+newdate.getHours()) : (newdate.getHours()) ) + ":" + ( newdate.getMinutes()<10 ? ("0"+newdate.getMinutes()) : (newdate.getMinutes()) )
 	return thisString
 }
 // Cookies的方法 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
 var docCookies = {
   getItem: function (sKey) {
     return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
   },
   setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
     if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
     var sExpires = "";
     if (vEnd) {
       switch (vEnd.constructor) {
         case Number:
           sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
           break;
         case String:
           sExpires = "; expires=" + vEnd;
           break;
         case Date:
           sExpires = "; expires=" + vEnd.toUTCString();
           break;
       }
     }
     document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
     return true;
   },
   removeItem: function (sKey, sPath, sDomain) {
     if (!sKey || !this.hasItem(sKey)) { return false; }
     document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
     return true;
   },
   hasItem: function (sKey) {
     return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
   },
   keys: /* optional method: you can safely remove it! */ function () {
     var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
     for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
     return aKeys;
   }
 };
 // 生成国籍的方法
 function nationaToString(string) {
 	var _string = "";
 	_string += "<select id='liveCountry' class='initialized'><option value='0' selected>"//
 		+string+"</option><option value='CHINA'>中国 CHINA</option><option value='HONGKONG CHINA'>中国-香港 HONGKONG-CHINA</option><option value='MACAO CHINA'>中国-澳门 MACAO-CHINA</option><option value='TAIWAN CHINA'>中国-台湾 TAIWAN-CHINA</option></select>"
 	return _string
 }
 // 生成潜水等级的方法
 function DivelevelToString(string) {
 	var _string = "";
 	_string +="<select id='Depth_level' class='initialized Divelevel'><option value='0' selected>"//
 		+string+"</option><option value='1'>OW</option><option value='2'>AOW及以上</option><option value='null'>无</option></select><label></label>";
 	return _string
 }
 // 潜水等级转换中文
 function DivelevelToChinese(num) {
 	if (num==0) {return "请选择潜水级别"}
 	else if (num==1) {return "OW"}
 	else if (num==2) {return "AOW及以上"}
 	else if (num==null) {return "无"}
 }
 // 床型转换 HTML结构
 function livebedToString(num,id) {
 	if (num == null) { num = "请选择床型" }
 	var _string = "";
 	_string +="<select id='livebed"
 		+ id +"' class='initialized'><option value='0' disabled selected>"//
 		+ num +"</option>"//
 		+ correspondBedtype()
 		// + "<option value='大床'>大床</option><option value='双床'>双床</option><option value='蜜月大床'>蜜月大床</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option>"//
 		+ "</select><label>床型</label>"
 	return _string
 }

 function SetModalHeight() {
	// 如果可见区域小于850
	if (document.documentElement.clientHeight < 850) {
 		setTimeout(function(){
			$("#RoomInformation")[0].setAttribute('style','z-index: 1003; display: block; opacity: 1; transform: scaleX(1); top: 0%; height: 100%;')
 		},1000);
	}
 }



function myBrowser() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    if (Sys.ie) {
    	return 'IE: ' + Sys.ie
	}
    if (Sys.firefox) {
    	return 'Firefox: ' + Sys.firefox
	}
    if (Sys.chrome) {
    	return 'Chrome: ' + Sys.chrome
	}
    if (Sys.opera) {
    	return 'Opera: ' + Sys.opera
	}
    if (Sys.safari) {
    	return 'Safari: ' + Sys.safari
	}
}
function DetectIsIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // 回傳版本 <=10 的版本
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // 回傳版本 >=11 的版本
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // 判斷Edge
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

// 根据模板渲染床型
function correspondBedtype() {
	if (loaddata.template == 1) {// 马达京
		return "<option value='大床'>大床</option><option value='双床'>双床(仅园景房提供)</option><option value='蜜月大床'>蜜月大床(需半年内结婚证申请/含免费花瓣铺床，烛光晚餐)</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床(仅园景房和半独立房提供)</option>"
	}else if(loaddata.template == 2) {// 马布岛-----------水屋
		return "<option value='大床'>大床</option><option value='双床'>双床</option><option value='大床+单床'>大床+单床(联排不可选)</option><option value='双床+单床'>双床+单床(联排不可选)</option><option value='大床+床垫'>大床+床垫(只限联排房间)</option><option value='双床+床垫'>双床+床垫(只限联排房间)</option><option value='蜜月大床'>蜜月大床(需半年内结婚证申请/含免费花瓣铺床)</option>"
	}else if(loaddata.template == 3) {// 卡帕莱
		return "<option value='单床'>单床(一人入住只能选)</option><option value='大床'>大床</option><option value='双床'>双床</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option><option value='蜜月大床'>蜜月布置大床(需要支付160马币/仅限入住当天)</option>"
	}else if(loaddata.template == 4) {// 平台
		return "<option value='单床'>单床(仅限四人间选)</option><option value='双床'>双床(二人间可选)</option><option value='大床'>大床(二人间可选)</option>"
	}else if(loaddata.template == 5) {// 邦邦岛------龙珠
		return "<option value='大床'>大床</option><option value='双床'>双床</option><option value='蜜月大床'>蜜月大床(需半年内结婚证申请/含免费花瓣铺床)</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option>"
	}else if(loaddata.template == 6) {// 马布岛-----------木屋
		return "<option value='大床'>大床</option><option value='双床'>双床</option><option value='大床+单床'>大床+单床(联排不可选)</option><option value='双床+单床'>双床+单床(联排不可选)</option><option value='大床+床垫'>大床+床垫(只限联排房间)</option><option value='双床+床垫'>双床+床垫(只限联排房间)</option><option value='蜜月大床'>蜜月大床(需半年内结婚证申请/含免费花瓣铺床)</option>"
	}else if(loaddata.template == 7) {// 邦邦岛------白珍珠
		return "<option value='大床'>大床</option><option value='双床'>双床</option><option value='蜜月大床'>蜜月大床(需半年内结婚证申请/含免费花瓣铺床)</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option>"
	}else if(loaddata.template == 8) {// 马布岛-----------婆罗
		return "<option value='大床'>大床</option><option value='双床'>双床</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option><option value='大床+床垫'>大床+床垫</option><option value='双床+床垫'>双床+床垫</option><option value='蜜月大床'>蜜月大床(需半年内结婚证申请/含免费花瓣铺床)</option>"
	}else if(loaddata.template == 9) {// 兰卡央
		return "<option value='单床'>单床</option><option value='大床'>大床</option><option value='双床'>双床</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option><option value='蜜月大床'>蜜月布置大床(需要支付160马币/仅限入住当天)</option>"
	}
}
function RenderingTime() {
	var _string = "<select name='hour'><option value='null'>--</option><option value='0'>0</option>";
	for (var i = 0; i < 23; i++) {
		_string += "<option value='"+(i+1)+"'>"+(i+1)+"</option>";
	}
	_string += "</select><label for='hour'>时</label><select name='Minute'><option value='null'>--</option><option value='0'>0</option>";
	for (var j = 0; j < 59; j++) {
		_string += "<option value='"+(j+1)+"'>"+(j+1)+"</option>";
	}
	_string += "</select><label for='Minute'>分</label><div></div>";
	return _string;
}




