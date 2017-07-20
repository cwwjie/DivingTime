/**
 * 目录
 */
var localDate = {},
documentDate = {};



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
	init();
});

function init() {
	localDate = JSON.parse(localStorage.getItem('loginSuccessful'));
	$.ajax({
		type:"GET",
		url:URLbase + URLversion + "/gather/link/"+localStorage.getItem('_uniqueKey')+"/getGatherInfo.do",
		contentType:"application/json; charset=utf-8",  
		headers: {
			'token':localStorage.getItem('_token'),
			'digest':localStorage.getItem('_digest')
		},
		success: function (message) {
			if (message.result == "0") {
				documentDate = JSON.parse(JSON.stringify(message.data));
				initEvent();
				renderMain();
			}else{
				alert("非常抱歉，发生未知错误，错误原因："+message.message+"。请联系客服")
			}
		}
	})
}

function renderMain() {

	// 初始化二维码
	$.ajax({
		type:"GET",
		url:URLbase + URLversion + "/admin/"+localDate.createBy+"/getAdminInfo.do",
		contentType:"application/json; charset=utf-8",
		success: function (val) {
			if (val.result == "0") {
				$(".qrCode").html(
					"<img src='" + URLbase + val.data.qrCode + "'/>"
				);
				$(".D2code .weche").html("微信:"+val.data.webchat);
				$(".D2code .name").html(val.data.name);
				$("#Contactname").text(val.data.name);
				$("#Contactwebchat").text(val.data.webchat);
			}
		}
	})


	// 渲染订单编号
	$("#orderSn").text( localDate.orderSn )
	// 判断来源
	if ( localDate.orderSrc == "DVT" ) {
		$("#orderSrc").text("潜游时光")
	}else{
		$("#orderSrc").text("淘宝")
	}
	// 渲染套餐名称
	$("#orderName").text( localDate.orderName )
	// 渲染周期长度
	var cycleLength = Math.floor((localDate.checkOut - localDate.checkIn)/86400000);
	$("#cycleLength").text( (cycleLength+1)+'天'+cycleLength+'晚' );
	$("#cycleLength1").text( (cycleLength+1)+'天'+cycleLength+'晚' );
	// 渲染房间总数
	$("#roomNum").text( localDate.roomNum )
	// 渲染总人数
	$("#peopleNum").text( localDate.peopleNum )
	// 渲染入住日期
	$("#checkIn").text( returnDate(localDate.checkIn) )
	$("#checkIn1").text( returnDate(localDate.checkIn) )
	// 渲染退房日期
	$("#checkOut").text( returnDate(localDate.checkOut) )
	$("#checkOut1").text( returnDate(localDate.checkOut) )
	// 渲染订单总额
	$("#orderAmount").text( localDate.orderAmount )
	// 渲染优惠金额
	$("#discount").text( localDate.discount )
	// 渲染已付金额
	$("#payAmount").text( localDate.payAmount )
	// 渲染未付金额
	$("#notPayAmount").text( localDate.notPayAmount )

	// 渲染计算方式
	$("#calMethod").text( localDate.calMethod )
	// 渲染儿童人数
	$("#childNum").text( localDate.childNum )
	// 渲染成人人数
	$("#adultNum").text( localDate.adultNum )
	// 渲染计算方式
	$("#calMethod").text( localDate.calMethod )
	// 渲染订单状态
	if (localDate.payStatus == 1) {
		$("#payStatus").text( "已付全款" );
		$("#payStatusFTB").css( "display","none");
	}else if (localDate.payStatus == 2) {
		$("#payStatus").text( "已付定金" )
	}
	// 渲染产品总金额
	$("#productAmount").text( localDate.productAmount )


	// 保险
		// 预定仙本那
		if ( localDate.template == 1 || localDate.template == 2 || localDate.template == 3 || localDate.template == 5 || localDate.template == 6 || localDate.template == 7 || localDate.template == 8 ) {
			$("#renderEG").html('<div>现预定仙本那度假村的客户：<br/>'//
				+'2-3人每人赠送7天安联境外保险或一次往返亚庇机场到市区酒店的接送（时间为6:05-21:55之间，超出时间需付35元夜间服务费）；<br/>'//
				+'4-7人每人赠送7天安联境外保险和一次往返亚庇机场到市区酒店的接送（时间不限）；<br/>'//
				+'如需增加保险天数可代为购买5元/天/人，临时预定需自行购买保险，如未填写亚庇接送，默认赠送保险。</div>');
		}
		// 判断
		var _present = localDate.present,
			_begin = localDate.insuranceBegin,
			_end = localDate.insuranceEnd,
			_Info = localDate.transfersInfo;
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
	$("#signName").html( documentDate.signName )
	// 渲染付款账号名
	$("#payAccount").html( documentDate.payAccount )
	// 渲染下单人手机
	$("#BasicPhone").html( documentDate.mobile );
	// 渲染下单人邮箱
	$("#BasicEmail").html( documentDate.email );


	// 渲染 国际航班号（出境）
	$("#outboundNum").html( documentDate.outboundNum );
	// 渲染 抵达日期（国际航班）
	$("#landDate").html( returnDate(documentDate.landDate) );
	// 渲染 抵达时间（国际航班）
	if (documentDate.landTime != null) {
		var showlandTime = documentDate.landTime + 28800000;
		$("#_landTime").html(Math.floor(showlandTime/3600000)+'时'+Math.floor((showlandTime - (3600000*Math.floor(showlandTime/3600000)))/60000)+'分');
	}else {
		$("#_landTime").html("");
	}

	// 渲染 到港航班号
	$("#inHarbourNum").html( documentDate.inHarbourNum );
	// 渲染 抵达日期
	if (documentDate.template == 9) {
		$("#_hLandDate").html("山打根抵达日期:<span id='hLandDate'>正在加载...</span>");
	}
	$("#hLandDate").html( returnDate(documentDate.hLandDate) );
	// 渲染 抵达时间
	if (documentDate.hLandTime != null) {
		var showhLandTime = documentDate.hLandTime + 28800000;
		$("#_hLandTime").html(Math.floor(showhLandTime/3600000)+'时'+Math.floor((showhLandTime - (3600000*Math.floor(showhLandTime/3600000)))/60000)+'分');
	}else {
		$("#_hLandTime").html("");
	}

	// 渲染 离港航班号
	$("#outHarbourNum").html( documentDate.outHarbourNum );
	// 渲染 起飞日期
	if (documentDate.template == 9) {
		$("#_hTakeoffDate").html("山打根离开日期:<span id='hTakeoffDate'>正在加载...</span>");
	}
	$("#hTakeoffDate").html( returnDate(documentDate.hTakeoffDate) );
	// 渲染 起飞时间
	// $("#hTakeoffTime").val( returnTimestamp(documentDate.hTakeoffTime) );
	// $("#hTakeoffTime").next().attr('class', 'value active');
	if (documentDate.hTakeoffTime != null) {
		var showhTakeoffTime = documentDate.hTakeoffTime + 28800000;
		$("#_hTakeoffTime").html(Math.floor(showhTakeoffTime/3600000)+'时'+Math.floor((showhTakeoffTime - (3600000*Math.floor(showhTakeoffTime/3600000)))/60000)+'分');
	}else {
		$("#_hTakeoffTime").html("");
	}

	// 渲染 国际航班号（入境）
	$("#inboundNum").html( documentDate.inboundNum );
	// 渲染 起飞时间（国际航班）
	$("#takeoffDate").html( returnDate(documentDate.takeoffDate) );
	// 渲染 起飞日期（国际航班）
	if (documentDate.takeoffTime != null) {
		var showtakeoffTime = documentDate.takeoffTime + 28800000;
		$("#_takeoffTime").html(Math.floor(showtakeoffTime/3600000)+'时'+Math.floor((showtakeoffTime - (3600000*Math.floor(showtakeoffTime/3600000)))/60000)+'分');
	}else {
		$("#_takeoffTime").html("");
	}

	// 渲染 备注
	$("#flightNote").html( documentDate.flightNote );

	// 声明条款一
	if ( documentDate.template == 1 || documentDate.template == 2 || documentDate.template == 4 || documentDate.template == 5 || documentDate.template == 6 || documentDate.template == 7 || documentDate.template == 8 ) {
		// 只有 2 个 航班
		$("#outboundclass").css('display', 'none');
		$("#inboundclass").css('display', 'none');
	}


	// 渲染 度假村接送时间
	if (documentDate.template == 1) {// 马达京
		$("#pickUp").css('display', 'block');
		$("#pickUp-item1").css('display', 'block');
	}else if (documentDate.template == 2) {// 马布岛-----------水屋
		$("#pickUp").css('display', 'block');
		$("#pickUp-item6").css('display', 'block');
	}else if (documentDate.template == 3) {// 卡帕莱
		$("#pickUp").css('display', 'block');
		$("#pickUp-item3").css('display', 'block');
	}else if (documentDate.template == 4) {// 平台
	}else if (documentDate.template == 5) {// 邦邦岛------龙珠
		$("#pickUp").css('display', 'block');
		$("#pickUp-item5").css('display', 'block');
	}else if (documentDate.template == 6) {// 马布岛-----------木屋
		$("#pickUp").css('display', 'block');
		$("#pickUp-item6").css('display', 'block');
	}else if (documentDate.template == 7) {// 邦邦岛------白珍珠
		$("#pickUp").css('display', 'block');
		$("#pickUp-item7").css('display', 'block');
	}else if (documentDate.template == 8) {// 马布岛-----------婆罗
		$("#pickUp").css('display', 'block');
		$("#pickUp-item2").css('display', 'block');
	}else if (documentDate.template == 9) {// 兰卡央
		$("#pickUp").css('display', 'block');
		$("#pickUp-item9").css('display', 'block');
	}

	// 渲染紧急联系人
	if (documentDate.template == 3) {
		$("#EmergencyCT").css('display', 'block');
		$("#_ugName").html(documentDate.roomInfoList[0].iceName);
		$("#_ugRelation").html(roomInfoList[0].iceRelation);
		$("#_ugPhone").html(documentDate.roomInfoList[0].iceMobile);
		$("#_ugEmail").html(documentDate.roomInfoList[0].iceEmail);
	}

	// 渲染房间
	var roomInfoString = '';
	for (var i = 0; i < documentDate.roomInfoList.length; i++) {
		roomInfoString +="<div class='room'><div class='room-title'>房间1</div><div class='room-content'><div class='row bed'><div class='col-12'>床型:<span>"//
			+documentDate.roomInfoList[i].bedType+"</span></div></div>";
		for (var j = 0; j < documentDate.roomInfoList[i].customerInfoList.length; j++) {
			roomInfoString += "<div class='room-panel' data-show='false'><div class='show'><span class='provision-btn'>▶</span><span class='provision-click'>旅客信息"//
				+(j+1)+"</span></div><div class='hide'><div class='row'><div class='col-6'>护照号:<span>"//
				+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].passportNo)+"</span></div><div class='col-6'>国籍:<span>"//
				+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].nationality)+"</span></div></div><div class='row'><div class='col-6'>姓名(中文):<span>"//
				+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].chineseName)+"</span></div><div class='col-6'>姓名(拼音):<span>"//
				+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].pinyinName)+"</span></div></div><div class='row'><div class='col-6'>性别:<span>"//
				+(documentDate.roomInfoList[i].customerInfoList[j].gender==1?"男":"女")+"</span></div><div class='col-6'>生日:<span>"//
				+returnDate(documentDate.roomInfoList[i].customerInfoList[j].birthday)+"</span></div></div><div class='row'><div class='col-6'>手机(电话):<span>"//
				+documentDate.roomInfoList[i].customerInfoList[j].mobile+"</span></div><div class='col-6'>邮箱:<span>"//
				+documentDate.roomInfoList[i].customerInfoList[j].email+"</span></div></div>";
			if (documentDate.roomInfoList[i].customerInfoList[j].isDive == "Y") {
				roomInfoString += "<div class='row'><div class='col-6'>是否深潜:<span>深潜</span></div><div class='col-6'>潜水证号:<span>"//
					+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].divingNo)+"</span></div></div><div class='row'><div class='col-6'>潜水级别:<span>"//
					+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].divingRank)+"</span></div><div class='col-6'>潜水次数:<span>"//
					+testDataNull(documentDate.roomInfoList[i].customerInfoList[j].divingCount)+"</span></div></div><div class='row'><div class='col-12'>上次潜水:<span>"//
					+returnDate(documentDate.roomInfoList[i].customerInfoList[j].lastDiveTime)+"</span></div></div>";
			}else {
				roomInfoString += "<div class='row'><div class='col-12'>是否深潜:<span>浮潜</span></div></div>";
			}
			roomInfoString += "<div class='row'><div class='col-12'>重大病史:<span>"//
				+documentDate.roomInfoList[i].customerInfoList[j].anamnesis+"</span></div></div></div></div>";
		}
	}
	roomInfoString +='<div class="panel-bottom"></div></div></div>';
	$("#renderRoom").html(roomInfoString);
	initPanel();

	// 渲染房间还可入住几人
	var _roomNum = 0;
	for (var k = 0; k < documentDate.roomInfoList.length; k++) {
		_roomNum = _roomNum + documentDate.roomInfoList[k].customerInfoList.length;
	}
	_roomNum = localDate.peopleNum - _roomNum;
	if (_roomNum != 0) {
		$("#_RoomNumber").html( "<div>还可入住" + _roomNum + "人</div>" )
	}

	// 退款说明：
	if (documentDate.template == 1) {// 马达京
		$("#Refundinstruction1").css('display', 'block');
	}else if (documentDate.template == 2 || documentDate.template == 6) {// 马布岛 水屋 木屋
		$("#Refundinstruction2").css('display', 'block');
	}else if (documentDate.template == 3) {// 卡帕莱
		$("#Refundinstruction3").css('display', 'block');
	}else if (documentDate.template == 4) {// 平台
		$("#Refundinstruction1").css('display', 'block');
	}else if (documentDate.template == 5) {// 邦邦岛 龙珠
		$("#Refundinstruction1").css('display', 'block');
	}else if (documentDate.template == 7) {// 邦邦岛 白珍珠
		$("#Refundinstruction4").css('display', 'block');
	}else if (documentDate.template == 8) {// 马布岛 婆罗
		$("#Refundinstruction1").css('display', 'block');
	}else if (documentDate.template == 9) {// 兰卡央
		$("#Refundinstruction3").css('display', 'block');
	}

	// 渲染 特别注意
	if (documentDate.template == 1) {// 马达京
		$("#Related1").css('display', 'block');
	}else if (documentDate.template == 2) {// 马布岛-----------水屋
		$("#Related6").css('display', 'block');
	}else if (documentDate.template == 3) {// 卡帕莱
		$("#Related3").css('display', 'block');
	}else if (documentDate.template == 4) {// 平台
		$("#Related4").css('display', 'block');
	}else if (documentDate.template == 5) {// 邦邦岛------龙珠
		$("#Related5").css('display', 'block');
	}else if (documentDate.template == 6) {// 马布岛-----------木屋
		$("#Related6").css('display', 'block');
	}else if (documentDate.template == 7) {// 邦邦岛------白珍珠
		$("#Related5").css('display', 'block');
	}else if (documentDate.template == 8) {// 马布岛-----------婆罗
		$("#Related2").css('display', 'block');
	}else if (documentDate.template == 9) {// 兰卡央
	}

}

function initEvent() {
	// 初始化条款声明
	var provisionShow = false;
	$("#provision-show").click(function(){
		if (provisionShow == false) {
			provisionShow = true;
			$("#provision-hide").css({'display':"block"});
			$("#provision-hide").animate({opacity:"1"});
			$(".provision-btn").css({
				'transform': 'rotate(90deg)',
				'-ms-transform': 'rotate(90deg)',
				'-webkit-transform': 'rotate(90deg)',
				'-o-transform': 'rotate(90deg)',
				'-moz-transform': 'rotate(90deg)',
			})
		}else {
			provisionShow = false;
			$("#provision-hide").animate({opacity:"0"},function(){
				$("#provision-hide").css({'display':"none"});
			});
			$(".provision-btn").css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)',
				'-o-transform': 'rotate(0deg)',
				'-moz-transform': 'rotate(0deg)',
			})
		}
	});
	$("#edit").click(function(){
        location = "./../gather.html";
	});
}
function initPanel() {
	$(".room-panel").click(function(event){
		var panelShow = event.currentTarget.getAttribute('data-show');
		if (panelShow == 'false') {
			event.currentTarget.setAttribute('data-show','true');
			event.currentTarget.childNodes["0"].childNodes["0"].innerHTML = '▼';
			event.currentTarget.children[1].setAttribute('style','display: block;');
		}else {
			event.currentTarget.setAttribute('data-show','false');
			event.currentTarget.childNodes["0"].childNodes["0"].innerHTML = '▶';
			event.currentTarget.children[1].setAttribute('style','display: none;');
		}
		// if (panelShow == 'false') {
		// 	event.currentTarget.setAttribute('data-show','true');
		// 	console.log(event.currentTarget.childNodes[3])
		// 	event.currentTarget.childNodes[1].childNodes["0"].innerHTML = '▼';
		// 	event.currentTarget.childNodes[3].setAttribute('style','display: block;');
		// }else {
		// 	event.currentTarget.setAttribute('data-show','false');
		// 	event.currentTarget.childNodes[1].childNodes["0"].innerHTML = '▶';
		// 	event.currentTarget.childNodes[3].setAttribute('style','display: none;');
		// }
	});
}



