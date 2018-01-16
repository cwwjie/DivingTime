$(document).ready(function(){
	orderIdGet();
});

// 判断数据库是否修改
function orderIdGet() {
	var out_trade_no = loadPageVar("out_trade_no");

	if (out_trade_no.slice(-1) === 'E' || out_trade_no.slice(-1) === 'R' ) {
		$.ajax({
			type: "GET", 
			url: appConfig.urlBase + '/order/sn/' + loadPageVar("out_trade_no").slice(0, (loadPageVar("out_trade_no").length - 1)) + "/getWith.do", 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					if (message.data.paymentInfo.payStatus === 0) {
						setTimeout(function(){
							orderIdGet()
						},1000)
					}else{
						renderPymentInfo(message.data);
					}
				}
			}
		});
	} else {
		$.ajax({
			type: "GET", 
			url: appConfig.urlBase + '/order/sn/' + loadPageVar("out_trade_no") + "/getWith.do", 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					if (message.data.paymentInfo.payStatus === 0) {
						setTimeout(function(){
							orderIdGet()
						},1000)
					}else{
						renderPymentInfo(message.data);
					}

				}
			}
		});
	}

}

function renderPymentInfo(date) {
	// for(var i = 0; i < 30; i++ ){
	// 	(function(x){
	// 		setTimeout(function(){
	// 			if (x === 29) {
	// 				window.location.href="./../../user/account.html#Orders";
	// 			}
	// 		},x*1000)
	// 	})(i)
	// }
	$(".spinner").css("display","none");
	$("#main").css("display","block");

	$("#productName").text(date.orderItemList[0].productName);
	$("#productPrice").html("<span>"+date.orderAmount+"</span> RMB");
	$("#departureDate").html("<i class='part1-Icon' style='background-position:-16px -99px'></i><span>"+timeConversion_noUTC(date.departureDate)+" 至 "+timeConversion_noUTC(date.leaveDate)+"（"+ date.orderItemList[0].period + "天" + (date.orderItemList[0].period-1) + "晚）</span>");

	$("#orderSn").html("<span>订单编号:</span>"+date.orderSn);
	$("#orderTime").html("<span>下单时间:</span>"+timeConversionS(date.orderTime));
	$("#productAmount").html("<span data-price='"+date.productAmount+"'>产品总额:</span>"+date.productAmount + " RMB");
	$("#orderAmount").html("<span>已付款:</span>"+ date.paymentInfo.payAmount + " RMB");
	$("#discount").html("<span>未付款:</span>"+ date.paymentInfo.notPayAmount + " RMB");
}

// 方法 - 时间差  timestamp -> 时间戳
function UTC2LocalTime(timestamp) {
	//将 服务器UTC时间戳 转为Date
	var d = new Date(timestamp);
	//服务器UTC时间 与 GMT时间的时间 偏移差
	var offset = d.getTimezoneOffset() * 60000;
	return new Date(timestamp - offset);
}

// 时间戳转换 20xx-xx-xx 24:60:00
function timeConversionS(time_to) {
	var data = new Date(UTC2LocalTime(time_to)),
		string = "";
	string += data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate() + " " + data.getHours()+":"+data.getMinutes()+":"+data.getSeconds() ;
	return string
}

// 时间戳转换 20xx-xx-xx
function timeConversion(time_to) {
	var data = new Date(UTC2LocalTime(time_to)),
		string = "";
	string += data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate();
	return string
}

// 时间戳转换 20xx-xx-xx
function timeConversion_noUTC(time_to) {
	var data = new Date(time_to),
		string = "";
	string += data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate();
	return string
}

// 获取URL键值 (sVar : "key" ) => value
function loadPageVar(sVar) {
  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
