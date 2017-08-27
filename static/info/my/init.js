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
	if (loaddata.isRead == "N") {// 第一次填写
		loaddata.signName = loginSuccessful.signName;
		loaddata.pinyinName = loginSuccessful.pinyinName;
		$("#signName").val( loginSuccessful.signName );
		$("#signName").next().attr('class', 'value active');
		// 渲染下单人姓名(英文)
		$("#pinyinName").val( loginSuccessful.pinyinName );
		$("#pinyinName").next().attr('class', 'value active');
	}else {
		// 渲染下单人姓名(中文)
		$("#signName").val( loaddata.signName );
		$("#signName").next().attr('class', 'value active');
		// 渲染下单人姓名(英文)
		$("#pinyinName").val( loaddata.pinyinName );
		$("#pinyinName").next().attr('class', 'value active');
	}
	// 渲染付款账号名
	$("#payAccount").val( loaddata.payAccount );
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
	if (loaddata.takeoffTime != null) {
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
	if (loaddata.hLandTime != null) {
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
	if (loaddata.hTakeoffTime != null) {
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
	loaddata.template = 9;
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
				$(".D2code .weche").html("微信:"+val.data.webchat);
				$(".D2code .name").html(val.data.name);
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

var loding = {
	show:function() {
		$("#loding").css('display','block');
		setTimeout(function(){
			$("#loding").css('display','none');
		},1000);
	},
	begin:function(){
		$("#loding").css('display','block');
	},
	end:function(){
		$("#loding").css('display','none');
	}
}

