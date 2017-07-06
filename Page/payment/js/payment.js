$(document).ready(function(){
	judgLogin();
	login();
	orderIdGet();
});
// 获取URL键值 (sVar : "key" ) => value
function loadPageVar(sVar) {
  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
// 判断数据库是否修改
function orderIdGet() {
	$.ajax({
		type: "GET", 
		url: appConfig.getOrderBySn+loadPageVar("out_trade_no")+"/getWith.do", 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			if (message.result == "0") {
				if (message.data.paymentInfo.payStatus !== 1) {
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
// 登录(功能)
function login() {
	function LoginFun() {
		// 显示隐藏模态框(登录)
		this.Show = function() {
			$("#loginModal").modal('show');
			$(".input1 input").val("");
			$(".input2 input").val("");
		}
		this.hide = function() {
			$("#loginModal").modal('hide');
			$(".input1 input").val("");
			$(".input2 input").val("");
		}
		// 验证(登录)
		this.checkUser = function() {
			if(!(/^1[34578]\d{9}$/.test($("#User").val())) && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))){
				$(".input1 i").removeClass("correcticon");
				$(".input1 i").addClass("mistakeicon");
				$(".input1 span").text("请输入正确格式邮箱或手机");
				return false
			}else {
				$(".input1 i").removeClass("mistakeicon");
				$(".input1 i").addClass("correcticon");
				$(".input1 span").text("输入正确");
				return true
			}
		}
		// 验证(密码)
		this.checkPassword = function() {
			if ($("#password").val().length < 8) {
				$(".input2 i").removeClass("correcticon");
				$(".input2 i").addClass("mistakeicon");
				$(".input2 span").text("密码必须大于8位数字");
				return false
			}else if(/\s/.test($("#password").val())){
				$(".input2 i").removeClass("correcticon");
				$(".input2 i").addClass("mistakeicon");
				$(".input2 span").text("密码不能有空格");
				return false
			}else{
				$(".input3").css("display","block")
				$(".input2 i").removeClass("mistakeicon");
				$(".input2 i").removeClass("correcticon");
				$(".input2 span").text("");
				return true
			}
		}
	}
	function loginPush() {
		var RememberCookie,
			json,
			date = new Date();
		// json(手机登录or邮箱登录)
		if ((/^1[34578]\d{9}$/.test($("#User").val()))) {
			json = {"mobile" : $("#User").val(),"passwd" : $("#password").val()};
		}else if ((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))) {
			json = {"email" : $("#User").val(),"passwd" : $("#password").val()};
		}
		$.ajax({ 
			type: "POST", 
			url: appConfig.logurl, 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(json), 
			dataType: "json", 
			success: function (message) {
				$("#loginBtn").attr("title","ready");
				$("#loginBtn").text("登录");
				if (message.result == "0") {
					if ($("#RememberCookie").is(':checked')) {
						$.cookie('token', message.data.token,{
							expires:7,
							path:'/'
						});
						$.cookie('digest', message.data.digest,{
							expires:7,
							path:'/'
						});
					}else{
						$.cookie('token', message.data.token,{
							path:'/'
						});
						$.cookie('digest', message.data.digest,{
							path:'/'
						});
					}
					var loginTem = new LoginFun();
					loginTem.hide();
					judgLogin();
				}else if (message.result == "10001") {
					$(".input1 i").removeClass("correcticon");
					$(".input1 i").addClass("mistakeicon");
					$(".input1 span").text(message.message);
					$(".input2 i").removeClass("mistakeicon");
					$(".input2 i").removeClass("correcticon");
					$(".input2 span").text("");
					return
				}else if (message.result == "10002"){
					$(".input1 i").removeClass("mistakeicon");
					$(".input1 i").addClass("correcticon");
					$(".input1 span").text("用户名正确");
					$(".input2 i").removeClass("correcticon");
					$(".input2 i").addClass("mistakeicon");
					$(".input2 span").text("密码错误");
					return
				}else {
					$(".input1 i").addClass("mistakeicon");
					$(".input1 i").removeClass("correcticon");
					$(".input1 span").text(message.message);
					$(".input2 i").removeClass("correcticon");
					$(".input2 i").removeClass("mistakeicon");
					$(".input2 span").text("");
					return
				}
			}
		});
	}
	function Bindevents() {
		var log = new LoginFun();
		$("#User").change(function(){
			log.checkUser();
		});
		$("#password").change(function(){
			log.checkPassword();
		});
		$("#ShowPassword").click(function(){
			if ($("#password").attr('type') == "password") {
				$("#password").attr('type','text');
				$(".ShowPassword").addClass("Show");
				$(".ShowPassword").removeClass("hiden");
			}else if ($("#password").attr('type') == "text") {
				$("#password").attr('type','password');
				$(".ShowPassword").addClass("hiden");
				$(".ShowPassword").removeClass("Show");
			}
		});
		$("#loginBtn").click(function(){
			if ($("#loginBtn").attr("title") == "loading") {
				return
			}
			if (log.checkUser() == false) {
				return
			}else if (log.checkPassword() == false) {
				return
			}
			$("#loginBtn").text("正在登录");
			$("#loginBtn").attr("title","loading");
			loginPush();
		});
	}
	Bindevents();
}
function Logout() {
	$.ajax({
		type: "POST", 
		url: appConfig.logout, 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			if (message.result == "0" ) {
				$.cookie('token',null,{path: '/' });
				$.cookie('digest',null,{path: '/' });
				$("#login").addClass('login')
				$("#login").html("<div><a href='./../../user/signup.html' target='_blank'>注册</a></div><div><a href='JavaScript:;' onclick='log_fun.Show()' target='_self'>登录</a></div>")
			}
		}
	});
}
function judgLogin() {
	$.ajax({
		type: "GET", 
		url: appConfig.getUserInfo, 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			if (message.result == "0" ) {
				$("#login").removeClass('login');
				$("#login").html("<div class='Center'><i class='left'></i><span>"+message.data.nickname+"</span><i class='right'></i><div class='dropdown'><ul><a href='./../../user/account.html#Person' onclick='window.location.reload()'><li class='First'><i style='background-position:-216px -185px;'></i>个人中心</li></a><a href='./../../user/account.html#Orders' onclick='window.location.reload()'><li><i style='background-position:-248px -185px;'></i>我的订单</li></a><a href='./../../user/account.html#Accoun' onclick='window.location.reload()'><li><i style='background-position:-280px -185px;'></i>账号中心</li></a><a href='./../../user/account.html#Addres' onclick='window.location.reload()'><li><i style='background-position:-344px -185px;'></i>收货地址</li></a><a href='./../../user/account.html#Client' onclick='window.location.reload()'><li><i style='background-position:-376px -185px;'></i>旅客信息</li></a><a onclick='Logout();'><li><i style='background-position:-312px -185px;'></i>退出登录</li></a></ul></div></div>")
			}
		}
	});
}
// 清空数据
var log_fun ={
	Show:function () {
		$("#loginModal").modal('show');
		$(".input1 input").val("");
		$(".input2 input").val("");
		$(".input1 i").removeClass("correcticon");
		$(".input1 i").removeClass("mistakeicon");
		$(".input2 i").removeClass("correcticon");
		$(".input2 i").removeClass("mistakeicon");
		$(".input1 span").text("");
		$(".input2 span").text("");
	},
	hide:function () {
		$("#loginModal").modal('hide');
		$(".input1 input").val("");
		$(".input2 input").val("");
		$(".input1 i").removeClass("correcticon");
		$(".input1 i").removeClass("mistakeicon");
		$(".input2 i").removeClass("correcticon");
		$(".input2 i").removeClass("mistakeicon");
		$(".input1 span").text("");
		$(".input2 span").text("");
	}
}