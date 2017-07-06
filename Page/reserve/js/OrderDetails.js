$(document).ready(function(){
	renderBasis();
	selectContactInformation();
	Addpassengerinformation();
	birthday();
	judgLogin();
	// 登录(功能)
	login();
	// 提交(订单)
	ConfirmOrder();
	// 城市初始化
	var Cityinit = new SelectCity();
	Cityinit.bindEvents();
	Cityinit.renderRegion(1);
	Cityinit.renderRegion(2);
	Cityinit.renderRegion(3);
	Cityinit.renderProv($("#city .prov"));
});
// 获取URL键值 (sVar : "key" ) => value
function loadPageVar(sVar) {
  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
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
				$("#login").html("<div><a href='./../../user/signup.html' target='_blank'>注册</a></div><div><a href='./../../user/login.html' target='_self'>登录</a></div>")
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
				sessionStorage.setItem('judgLogin',message.data.userId);
				$("#login").removeClass('login');
				$("#login").html("<div class='Center'><i class='left'></i><span>"+message.data.nickname+"</span><i class='right'></i><div class='dropdown'><ul><a href='./../../user/account.html#Person' onclick='window.location.reload()'><li class='First'><i style='background-position:-216px -185px;'></i>个人中心</li></a><a href='./../../user/account.html#Orders' onclick='window.location.reload()'><li><i style='background-position:-248px -185px;'></i>我的订单</li></a><a href='./../../user/account.html#Accoun' onclick='window.location.reload()'><li><i style='background-position:-280px -185px;'></i>账号中心</li></a><a href='./../../user/account.html#Addres' onclick='window.location.reload()'><li><i style='background-position:-344px -185px;'></i>收货地址</li></a><a href='./../../user/account.html#Client' onclick='window.location.reload()'><li><i style='background-position:-376px -185px;'></i>旅客信息</li></a><a onclick='Logout();'><li><i style='background-position:-312px -185px;'></i>退出登录</li></a></ul></div></div>")
			}else {
				sessionStorage.setItem('judgLogin','failure');
				window.location.href="./../../user/login.html";
			}
		}
	});
}
// 登录(功能)
function login() {
	function LoginFun() {
		// 显示隐藏模态框(登录)
		this.Show = function() {
			$("#loginModal").modal('show');
		}
		this.hide = function() {
			$("#loginModal").modal('hide');
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
		// Cookie(保存7天or一个小时)
		if ($("#RememberCookie").is(':checked')) {
			RememberCookie = 7;
		}else{
			date.setTime(date.getTime()+60*60*1000)
			RememberCookie = date;
		}
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
				$("#loginBtn").text("登录");
				$("#loginBtn").attr("title","ready");
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
// 渲染(URL传过来的参数)
function renderBasis() {
	// 获取到时间戳
	var timestamp = Date.parse(loadPageVar("departureDate"));
	timestamp = timestamp / 1000;
	var newDate = new Date();
	newDate.setTime(timestamp * 1000);
	// 渲染产品信息
	function renderBasic(data) {
		$("#productName").text(data.productName);
		$("#productPrice span").text((data.promotePrice == null)?(data.productPrice):(data.promotePrice));
		$("#departureDate span").text(newDate.toLocaleDateString());
		$("#productNum").text(loadPageVar("productNum"));
		parseInt(loadPageVar("productNum"))*parseInt((data.promotePrice == null)?(data.productPrice):(data.promotePrice))
		$("#totalPrice").text(parseInt(loadPageVar("productNum"))*parseInt((data.promotePrice == null)?(data.productPrice):(data.promotePrice))+" RMB");
	}
	$.ajax({
		type: "GET", 
		url: URLbase+URLversion+"/product/" + loadPageVar("productId") + "/get.do", 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			renderBasic(message.data);
		}
	});
	// 渲染(退款说明)
	function renderRule(data) {
		$("#refundDesc").text(data.refundDesc);
		$("#refundName").text(data.refundName);
		var ruleItemList = data.ruleItemList,
			string = "",
			string2 = "";
		function judgDay(data) {
			if(data.endDay < 0){
				return data.beginDay + "天以上"
			}else {
				return data.endDay + "天"
			}
		}
		function percentage(data) {
			var string = data.substring(0,data.length-1);
			if (string == "100") {
				return "1"
			}else {
				string = "0." + string;
				return string
			}
		}
		for (var i = 0; i < ruleItemList.length; i++) {
			var j = ruleItemList.length - i - 1;
			string += "<div style='width:" + parseInt(100/ruleItemList.length * (i+1)) + "%;background:rgba(69, 90, 100,"+ percentage(ruleItemList[i].deductionRatio) +");'><span style='color:#4d5d77'>"+ judgDay(ruleItemList[i]) +"</span><a style='color:#fff;position:absolute;z-index:10;top:2px;left:4px;'>扣除"+ ruleItemList[i].deductionRatio+"</a></div>";
			string2 += "<p>"+ ruleItemList[i].ruleDesc +"</p>";
		}
		$("#ruleItemList").html(string);
		$("#ruleDesc").html(string2);
	}
	$.ajax({
		type: "GET", 
		url: URLbase+URLversion"/product/refundrule/"+ loadPageVar("productId") +"/item/list.do", 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			if (message.data == null) {
				$("#thePolicy").css("display","none");
			}else {
				renderRule(message.data);
			}
		}
	});
}
// 已经删除 (旅客信息 && 联系人信息)
function showPassengerInformation() {
	// 渲染(用户收货地址)   data => (第几个联系人信息): 0 1 2 3 4 5 ....
	function RenderAddress(data) {
		var renderCity = new SelectCity();
		var address_Array = JSON.parse(sessionStorage.getItem('Address'));
		for (var i = 0; i < address_Array.length; i++) {
			if (i ==  parseInt(data)) {
				$("#Consignee").val(address_Array[i].consignee);
				renderCity.renderProv($("#city .prov"),address_Array[i].province);
				renderCity.renderChil(address_Array[i].province,$("#city .city"),address_Array[i].city);
				renderCity.renderChil(address_Array[i].city,$("#city .dist"),address_Array[i].district);
				$("input[name=street]").val(address_Array[i].street);
				$("input[name=zipcode]").val(address_Array[i].zipcode);
				$("input[name=mobile]").val(address_Array[i].mobile);
				$("input[name=telephone]").val(address_Array[i].telephone);
			}
		}
	}
	// 渲染(收货列表)       data => 所有用户收货地址
	function RenderAddressTitle(data) {
		var data_String = "<option value='value' selected data-select='default'>联系人信息</option>"
		for (var i = 0; i < data.length; i++) {
			data_String += "<option value="+i+">"+data[i].consignee+"</option>"
		}
		$("#RenderAddress").html(data_String);
	}
	// 查询登录用户所有收货地址记录
	$.ajax({
		type: "GET", 
		url: appConfig.findByUserId, 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			RenderAddressTitle(message.data);
			sessionStorage.setItem('Address',JSON.stringify(message.data));
		}
	});
	// 渲染(用户入住)       data(第几个入住信息): 0 1 2 3 4 5   DOM: input父元素
	function renderUserinfo(data,DOM) {
		var DOM_input = DOM.getElementsByTagName('input'),
			DOM_select= DOM.getElementsByTagName('select'),
			userinfo_Array = JSON.parse(sessionStorage.getItem('userinfo'));
		for (var i = 0; i < userinfo_Array.length; i++) {
			if (i ==  parseInt(data)) {
				DOM_input["0"].value=userinfo_Array[i].passportNo = null ? "" : userinfo_Array[i].passportNo ;
				DOM_input["1"].value=userinfo_Array[i].chineseName = null ? "" : userinfo_Array[i].chineseName ;
				DOM_input["2"].value=userinfo_Array[i].pinyinName = null ? "" : userinfo_Array[i].pinyinName ;
				// 性别
				(userinfo_Array[i].gender == 0) ? (DOM_input["3"].checked=true) : (DOM_input["4"].checked=true);
				// 时间
				var data = new Date(userinfo_Array[i].birthday);
				DOM_select["1"].value = data.getFullYear();
				DOM_select["2"].value = (data.getMonth()+1);
				DOM_select["3"].value = data.getDate();
				DOM_input["5"].value=userinfo_Array[i].age = null ? "" : userinfo_Array[i].age ;
				DOM_input["6"].value=userinfo_Array[i].mobile = null ? "" : userinfo_Array[i].mobile ;
				DOM_input["7"].value=userinfo_Array[i].email = null ? "" : userinfo_Array[i].email ;
				DOM_input["8"].value=userinfo_Array[i].divingRank = null ? "" : userinfo_Array[i].divingRank ;
				DOM_input["9"].value=userinfo_Array[i].divingCount = null ? "" : userinfo_Array[i].divingCount ;
			}
		}
	}
	// 渲染(入住列表)       data => 所有用户入住地址
	function renderuserinfoTitle(data) {
		// 渲染(Title数量)
		for (var i = 0; i < $(".userinfo select").length; i++) {
			var data_String = "<option value='value' selected data-select='default'>旅客信息"+(i+1)+"</option>"
			// 渲染(信息数量)
			for (var j = 0; j < data.length; j++) {
				data_String += "<option value="+j+">"+data[j].chineseName+"</option>"
			}
			$("#level_"+i+"").html(data_String);
		}
	}
	// 查询用户信息列表
	$.ajax({
		type: "GET", 
		url: appConfig.userinfoFindByUserId, 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			renderuserinfoTitle(message.data);
			sessionStorage.setItem('userinfo',JSON.stringify(message.data));
		}
	});
	// 绑定事件
	function bindEvents() {
		// 点击(展开出行旅客信息)
		$("#PassengerInformation").click(function () {
			var SHOW = $("#WriteInformation").css("display");
			if ( SHOW === "none" ){
				$("#PassengerInformation").text("稍后填写")
				$("#WriteInformation").css("display","block")
			}else if (SHOW === "block") {
				$("#WriteInformation").css("display","none")
				$("#PassengerInformation").text("现在填写")
			}
		});
		// 选择(联系人信息)
		$("#RenderAddress").change(function(event){
			if (event.currentTarget.value !== "value") {
				RenderAddress(event.currentTarget.value);
			}
		});
		// 恢复选择(联系人信息)
		$("#Address input").change(function(){
			$("#RenderAddress").get(0).selectedIndex = 0;
		});
		// 选择(旅客信息)
		$(".userinfo select").change(function(event){
			renderUserinfo(event.currentTarget.value,event.currentTarget.parentElement.parentElement);
		})
		// 恢复选择(旅客信息)
		$(".User_info input").change(function(event){
			if (event.currentTarget.getAttribute("name") == "sex") {
				return
			}
			var parent_Dom = event.currentTarget.parentElement.parentElement.parentElement.parentElement.getElementsByTagName("select")[0].getAttribute("data-level");
			$("#level_"+parent_Dom).get(0).selectedIndex = 0;
		});
	}
	bindEvents();
};
// 选择(联系人信息)
function selectContactInformation() {
	/*
	 * 主程序入口
	 */
	function main() {
		// 初始化
		initi();
		// 选择(联系人信息)
		$("#RenderAddress").change(function(event){
			if (event.currentTarget.value !== "value") {
				RenderAddress(event.currentTarget.value);
			}
		});
		// 恢复选择(联系人信息)
		$("#Address input").change(function(){
			$("#RenderAddress").get(0).selectedIndex = 0;
		});
	}
	// 渲染(用户收货地址)   data => (第几个联系人信息): 0 1 2 3 4 5 ....
	function RenderAddress(data) {
		var renderCity = new SelectCity();
		var address_Array = JSON.parse(sessionStorage.getItem('Address'));
		for (var i = 0; i < address_Array.length; i++) {
			if (i ==  parseInt(data)) {
				$("#Consignee").val(address_Array[i].consignee);
				renderCity.renderProv($("#city .prov"),address_Array[i].province);
				renderCity.renderChil(address_Array[i].province,$("#city .city"),address_Array[i].city);
				renderCity.renderChil(address_Array[i].city,$("#city .dist"),address_Array[i].district);
				$("input[name=street]").val(address_Array[i].street);
				$("input[name=zipcode]").val(address_Array[i].zipcode);
				$("input[name=mobile]").val(address_Array[i].mobile);
				$("input[name=telephone]").val(address_Array[i].telephone);
			}
		}
	}
	// 方法(初始化)
	function initi() {
		// 查询(联系人信息)
		$.ajax({
			type: "GET", 
			url: appConfig.findByUserId, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				RenderAddressTitle(message.data);
				sessionStorage.setItem('Address',JSON.stringify(message.data));
			}
		});
		// 渲染(收货列表)       data => 所有用户收货地址
		function RenderAddressTitle(data) {
			var data_String = "<option value='value' selected data-select='default'>联系人信息</option>"
			for (var i = 0; i < data.length; i++) {
				data_String += "<option value="+i+">"+data[i].consignee+"</option>"
			}
			$("#RenderAddress").html(data_String);
		}
	}
	main();
}
// 绑定(生日)
function birthday() {
	$(function () {
		$.ms_DatePicker({
	            YearSelector: ".sel_year",
	            MonthSelector: ".sel_month",
	            DaySelector: ".sel_day"
	    });
		$.ms_DatePicker();
	});
};
// 已经隐藏 (支付方式)
function PayTypes() {
	$(".iconHover").click(function(event) {
		for (var i = $(".iconHover").length - 1; i >= 0; i--) {
			$(".iconHover")[i].className = "iconHover";
		}
		event.target.className = "iconHover iconCheck";
		$("#standby").attr("title",event.target.title)
	});
}
// 判断(填写的内容)
function Payconfirm() {
	// 判断真实姓名
	this.checkConsignee = function() {
		if ( $("#Consignee").val() == "") {
			$("#Consignee").parent().next().text("名字不能为空")
			$("#Consignee").parent().next().css('color', 'red');
			return false
		}
		$("#Consignee").parent().next().text("")
		return true
	}
	// 判断所在地区
	this.checkregion = function() {
		if ($("#city .prov").val() == null || $("#city .prov").val() == "null" || $("#city .city").val() == null || $("#city .city").val() == "null" || $("#city .dist").val() == null || $("#city .dist").val() == "null" ) {
			$("#city").parent().next().text("请选择所在地区")
			$("#city").parent().next().css('color', 'red');
			return false
		}else {
			$("#city").parent().next().text("")
			return true
		}
	}
	// 判断居住地址
	this.checkStreet = function() {
		if ( $("input[name=street]").val() == "") {
			$("input[name=street]").parent().next().text("地址不能为空")
			$("input[name=street]").parent().next().css('color', 'red');
			return false
		}
		$("input[name=street]").parent().next().text("")
		return true
	}
	// 判断手机号码
	this.checkMobile = function() {
		if ($("input[name=mobile]").val() == "") {
			$("input[name=mobile]").parent().next().text("手机号码不能为空")
			$("input[name=mobile]").parent().next().css('color', 'red');
			return false
		}else if (!(/^1[34578]\d{9}$/.test($("input[name=mobile]").val()))){
			$("input[name=mobile]").parent().next().text("请输入正确的手机号码")
			$("input[name=mobile]").parent().next().css('color', 'red');
			return false
		}
		$("input[name=mobile]").parent().next().text("")
		return true
	}
	// 判断护照号码
	this.checkPassportNumber = function() {
		var passport_Number = $("input[name=Passport_Number]");
		if (passport_Number.length == 0) {
			return true
		}
		for (var i = 0; i < passport_Number.length; i++) {
			if (passport_Number[i].value == "") {
				passport_Number[i].parentNode.nextSibling.innerHTML="护照号码不能为空";
				passport_Number[i].parentNode.nextSibling.setAttribute("style","color:red");
				return false
			}else {
				passport_Number[i].parentNode.nextSibling.innerHTML="请确保护照的有效期在出行前6个月以上。";
				passport_Number[i].parentNode.nextSibling.setAttribute("style","color:rgba(0, 0, 0, 0.38)");
			}
		}
		return true
	}
	// 判断中文姓
	this.checkChineseName = function() {
		var chineseName_DOM = $("input[name=chineseName]");
		if (chineseName_DOM.length == 0) {
			return true
		}
		for (var i = 0; i < chineseName_DOM.length; i++) {
			if (chineseName_DOM[i].value == "") {
				chineseName_DOM[i].parentNode.nextSibling.innerHTML="中文姓不能为空";
				chineseName_DOM[i].parentNode.nextSibling.setAttribute("style","color:red");
				return false
			}else {
				chineseName_DOM[i].parentNode.nextSibling.innerHTML="请依照护照姓名中文输入。例，张三";
				chineseName_DOM[i].parentNode.nextSibling.setAttribute("style","color:rgba(0, 0, 0, 0.38)");
			}
		}
		return true
	}
	// 判断英文姓
	this.checkPinyinName = function() {
		var pinyinName_DOM = $("input[name=pinyinName]");
		if (pinyinName_DOM.length == 0) {
			return true
		}
		for (var i = 0; i < pinyinName_DOM.length; i++) {
			if (pinyinName_DOM[i].value == "") {
				pinyinName_DOM[i].parentNode.nextSibling.innerHTML="英文姓不能为空";
				pinyinName_DOM[i].parentNode.nextSibling.setAttribute("style","color:red");
				return false
			}else {
				pinyinName_DOM[i].parentNode.nextSibling.innerHTML="请依照护照拼音输入。例，ZHANGSAN";
				pinyinName_DOM[i].parentNode.nextSibling.setAttribute("style","color:rgba(0, 0, 0, 0.38)");
			}
		}
		return true
	}
	// 检测所有(联系人信息)
	this.checkALL = function() {
		if (this.checkConsignee() && this.checkregion() && this.checkStreet() && this.checkMobile()) {
			return true
		}else {
			return false
		}
	}
	// 检测所有(旅客信息)
	this.checkAllPassengerInfo = function() {
		if (this.checkPassportNumber() && this.checkChineseName() && this.checkPinyinName()) {
			return true
		}else {
			return false
		}
	}
};
// inputDOM 转化为 时间戳
function toTimestamp(yearDOM,monthDOM,dayDOM) {
	var year = parseInt(yearDOM.value),
		month= parseInt(monthDOM.value),
		day  = parseInt(dayDOM.value);
	var	Time_stamp = new Date(year,month,day);
	return Date.parse(Time_stamp)
}
// 提交(订单)
function ConfirmOrder() {
	var judge = new Payconfirm();
	/*
	 * 主程序入口(旅客信息)
	 */
	function main() {
		// 判断姓名
		$("#Consignee").change(function(){
			judge.checkConsignee();
		});
		// 判断地址
		$("input[name=street]").change(function(event) {
			judge.checkStreet();
		});
		// 判断手机
		$("input[name=mobile]").change(function(event) {
			judge.checkMobile();
		});
		// 点击(提交订单)
		$("#ConfirmOrder").click(function(){
			// 判断(是否登陆)
			if (sessionStorage.getItem('judgLogin') == 'failure') {
				$("#loginModal").modal('show');
			}else {
				// 判断(填写的内容)
				if (judge.checkALL() && judge.checkAllPassengerInfo()) {
					// 上传(获取数据)
					pushOrder(getdata());
				}else{
					$("#ConfirmOrder").removeClass('Confirm_Order')
					$("#ConfirmOrder").text("参数错误")
					setTimeout(function(){
					$("#ConfirmOrder").addClass('Confirm_Order')
						$("#ConfirmOrder").text("确认订单")
					},1000)
				}
			}
		});
		// 点击跳转到订单中心
		$("#modal_Jump").click(function(){
			window.location.href="./../../user/account.html#Orders";
		})
	}
	/*
	 * 获取(数据)
	 */
	function getdata() {
		var user_Info_List_DOM = $(".User_info"),
			userInfoList = [];
		for (var i = 0; i < user_Info_List_DOM.length; i++) {
			var user_Info_input = user_Info_List_DOM[i].getElementsByTagName("input"),
				user_Info_select = user_Info_List_DOM[i].getElementsByTagName("select"),
				User_Info = {
	            "relId": null,
	            "orderId": null,
	            "chineseName": checkNull(user_Info_input["1"].value),
	            "pinyinName": checkNull(user_Info_input["2"].value),
	            "gender": (user_Info_input["3"].checked)?0:1,
	            "birthday": toTimestamp(user_Info_select["1"],user_Info_select["2"],user_Info_select["3"]),
	            "age": (user_Info_input["5"].value=="")? null : parseInt(user_Info_input["5"].value),
	            "mobile": (user_Info_input["6"].value=="")? null : parseInt(user_Info_input["6"].value),
	            "email": checkNull(user_Info_input["7"].value),
	            "passportNo": checkNull(user_Info_input["0"].value),
	            "divingRank": (user_Info_input["8"].value=="")? null : parseInt(user_Info_input["8"].value),
	            "divingCount": (user_Info_input["9"].value=="")? null : parseInt(user_Info_input["9"].value),
			}
			userInfoList.push(User_Info);
		}
		var json = {
			"address":{
				"addressId": null,
				"consignee":$("#Consignee").val(),
				"userId": parseInt(sessionStorage.getItem("judgLogin")),
				"province": parseInt($("#city .prov").val()),
				"city": parseInt($("#city .city").val()),
				"district": parseInt($("#city .dist").val()),
				"street": $("input[name=street]").val(),
				"zipcode": checkNull($("input[name=zipcode]").val()),
				"telephone": checkNull($("input[name=telephone]").val()),
				"mobile": checkNull($("input[name=mobile]").val())
			},
			"userInfoList":userInfoList
		}
		return json
	}
	/*
	 * 方法(判断是否为空)
	 */
	function checkNull(data) {
		if (data == "") {
			return null
		}else {
			return data
		}
	}
	/*
	 * 提交(上传数据)
	 */
	function pushOrder(json) {
		function departure_Date() {
			var date = new Date(loadPageVar("departureDate")),
				string = "";
			string += date.getFullYear();
			((date.getMonth()+1)<10)?(string += "0" + (date.getMonth()+1)):(string += (date.getMonth()+1));
			(date.getDate()<10)?(string += "0" + date.getDate()):(string += date.getDate());
			return string
		}
		$("#ConfirmOrder").text('正在提交');
		$.ajax({
			type: "POST", 
			url: URLbase + URLversion+"/order/"+loadPageVar("productId")+"/"+loadPageVar("productNum")+"/"+departure_Date()+"/reserve.do", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(json), 
			dataType: "json", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					$("#ConfirmOrder").text('提交成功');
					$('#reserve_Modal').modal('show');
					var Time = document.getElementById("time");
					for(var i = 0; i < 30; i++ ){
						(function(x){
							setTimeout(function(){
								Time.innerHTML=30-x;
								if (x === 29) {
									window.location.href="./../../user/account.html#Orders";
								}
							},x*1000)
						})(i)
					}
				}
			}
		});
	}
	main();
}
// 方法 - 模块(地区)
function SelectCity() {
	var that_is = this;
	// 初始化 1：省，2：市，3：区  =>  储存到 localStorage
	this.renderRegion = function (region) {
		$.ajax({
			type: "GET", 
			url:appConfig.selectProvince+region+"/list.do", 
			contentType: "application/json; charset=utf-8", 
			success: function (message) {
				if (message.result=="0") {
					if (region == 1) {
						localStorage.setItem('province',JSON.stringify(message.data.regionList));
					}else if (region == 2) {
						localStorage.setItem('city',JSON.stringify(message.data.regionList));
					}else if (region == 3) {
						localStorage.setItem('county',JSON.stringify(message.data.regionList));
					}
				}
			}
		});
	}
	// 渲染省
	this.renderProv = function (DOM,regionId) {
		var prov_Array = JSON.parse(localStorage.getItem("province")),
			prov_String = "<option selected value='null' disabled='disabled'>请选择...</option>";;
		for (var i = 0; i < prov_Array.length; i++) {
			if (prov_Array[i].regionId == regionId) {
				prov_String += "<option selected value='"+prov_Array[i].regionId+"'>"+prov_Array[i].regionName+"</option>";
			}else{
				prov_String += "<option value='"+prov_Array[i].regionId+"'>"+prov_Array[i].regionName+"</option>";
			}
		}
		DOM.html(prov_String);
	}
	// parentId(必须) DOM(必须) => 渲染下一个所有节点  regionId => 下一个节点(默认显示)
	this.renderChil =  function (parentId,DOM,regionId) {
		if (DOM !== null) {
			DOM.removeAttr("disabled");
		}
		function renderDOM(data) {
			var region_String = "<option value='null'>请选择...</option>";
			for (var i = 0; i < data.length; i++) {
				if (data[i].regionId == regionId) {
					region_String += "<option selected value='"+data[i].regionId+"'>"+data[i].regionName+"</option>";
				}else{
					region_String += "<option value='"+data[i].regionId+"'>"+data[i].regionName+"</option>";
				}
			}
			DOM.html(region_String);
		}
		$.ajax({
			type: "GET", 
			url: URLbase + URLversion+"/system/region/parentid/"+parentId+"/list.do", 
			contentType: "application/json; charset=utf-8", 
			success: function (message) {
				renderDOM(message.data.regionList);
			}
		});
	}
	this.bindEvents = function () {
		$("#city .prov").change(function(event){
			that_is.renderChil(event.currentTarget.value,$("#city .city"));
			$("#city .dist").html("");
		})
		$("#city .city").change(function(event){
			that_is.renderChil(event.currentTarget.value,$("#city .dist"));
		})
	}
	// renderChil(19,$("#city .city"),231);
	// renderChil(231,$("#city .dist"),2128);
	// renderProv($("#city .prov"),19);
	// renderRegion(1);
	// renderRegion(2);
	// renderRegion(3);
	// bindEvents();
}
// 添加(旅客信息)
function Addpassengerinformation() {
	var judgeMethod = new Payconfirm();
	/*
	 * 主程序入口(旅客信息)
	 */
	function main() {
		// 初始化
		initi();
		// 点击(添加旅客信息) -> 弹出(选择旅客信息)
		$("#add_Passenger_1").click(function(){
			$("#add_Passenger_1").css("display","none");
			$("#add_Passenger_2").css("display","block");
		});
	}
	/*
	 * 初始化(数据)
	 */
	function initi() {
		// 渲染(添加旅客信息 列表)
		function renderAddPassenger(data) {
			var string = "<div class='First_Btn'>自定义旅客信息</div>";
			for (var i = 0; i < data.length; i++) {
				string += "<div data-number="+i+">"+data[i].chineseName+"</div>";
			}
			$("#add_Passenger_2").html(string);
			// 其实这里可以用到继承，因为 这部分的逻辑 应该在主程序里面跑。这样才符合我们代码的阅读习惯？
			$("#add_Passenger_2 div").click(function(event){
				var number = $("#add_Passenger_1").attr('data-number');
				// 隐藏 (旅客信息 选择列表)
				$("#add_Passenger_2").css("display","none");
				$("#add_Passenger_1").css("display","block");
				// 新增页面
				addPage(number);
				// 渲染(旅客信息 内容)
				renderUserinfo(event.target.getAttribute('data-number'),document.getElementById("User_info"+number))
				// JQ日期选择器的方法
				$.ms_DatePicker({
			            YearSelector: ("#sel_year"+number),
			            MonthSelector: ("#sel_month"+number),
			            DaySelector: ("#sel_day"+number),
			            FirstText: "--",
			            FirstValue: 0
			    });
				$.ms_DatePicker();
				// 渲染(旅客信息 下拉框)
				dropDownBox(number);
				// 绑定(选择 旅客信息);
				$("#level_"+number).change(function(event){
					renderUserinfo(event.target.value,event.currentTarget.parentElement.parentElement)
				});
				// 绑定(恢复选择)
				$("#User_info"+number+" input").change(Recovery);
				// 验证(新增页面)
				testnewPage(number);
				// 唯一标识符 +1
				$("#add_Passenger_1").attr('data-number',(parseInt(number)+1));
			})
		}
		$.ajax({
			type: "GET", 
			url: appConfig.userinfoFindByUserId, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				renderAddPassenger(message.data);
				sessionStorage.setItem('userinfo',JSON.stringify(message.data));
			}
		});
	}
	/*
	 * 新增(页面)
	 * num 作用是唯一标识符
	 * num 值为 1、2、3、4、5……
	 */
	function addPage(num) {
		var new_DOM = $("<div class='InformationDetail User_info'></div>");
		var string_DOM = "<div class='InformationDetail' id='User_info"+num+"'><div class='CustomerInformationTitle userinfo'><select name='select' id='level_"+num+"' data-level='"+num+"'><option value='value'>旅客信息"+num+"</option><option value='value'>Value 2</option><option value='value'>Value 3</option></select></div><div class='line'><div class='row'><div class='col-md-2'>护照号码:</div><div class='col-md-4'><input type='text' name='Passport_Number' placeholder='G12345678'></div><div class='col-md-6 prompt'>请确保护照的有效期在出行前6个月以上。</div></div></div><div class='line'><div class='row'><div class='col-md-2'>姓名(中文):</div><div class='col-md-4'><input type='text' name='chineseName' placeholder='张三'></div><div class='col-md-6 prompt'>请依照护照姓名中文输入。例，张三</div></div></div><div class='line'><div class='row'><div class='col-md-2'>姓名(英文):</div><div class='col-md-4'><input type='text' name='pinyinName' placeholder='ZHANGSAN'></div><div class='col-md-6 prompt'>请依照护照拼音输入。例，ZHANGSAN</div></div></div><div class='line'><div class='row'><div class='col-md-2'>性别:</div><div class='col-md-5'><div><input type='radio' name='sex"+num+"' id='male"+num+"'/><label for='male"+num+"'>男</label></div><div><input type='radio' name='sex"+num+"' id='female"+num+"'/><label for='female"+num+"'>女</label></div></div></div></div><div class='line'><div class='row'><div class='col-md-2'>出生日期:</div><div class='col-md-4'><select class='sel_year' id='sel_year"+num+"' rel='2000'></select><span>年</span><select class='sel_month' id='sel_month"+num+"' rel='1'></select><span>月</span><select class='sel_day' id='sel_day"+num+"' rel='1'></select><span>日</span></div><div class='col-md-1'>年龄:</div><div class='col-md-4'><input type='text' name='information'></div></div></div><div class='line'><div class='row'><div class='col-md-2'>手机号码:</div><div class='col-md-4'><input type='text' name='information'></div><div class='col-md-1'>邮箱:</div><div class='col-md-4'><input type='text' name='information'></div></div></div><div class='line'><div class='row'><div class='col-md-2'>潜水等级:</div><div class='col-md-4'><input type='text' name='information'></div><div class='col-md-1'>潜次:</div><div class='col-md-4'><input type='text' name='information'></div></div></div></div>";
		new_DOM.html(string_DOM);
		$("#Render_Passenger").append(new_DOM);
	}
	/*
	 * 渲染(下拉框)
	 * num 作用是唯一标识符
	 */
	function dropDownBox(num) {
		var userinfo_Array = JSON.parse(sessionStorage.getItem("userinfo")),
			string_DOM = "<option value='value' selected data-select='default'>旅客信息"+num+"</option>";
		// 渲染(信息数量)
		for (var i = 0; i < userinfo_Array.length; i++) {
			string_DOM += "<option value="+i+">"+userinfo_Array[i].chineseName+"</option>"
		}
		$("#level_"+num).html(string_DOM);
	}
	/*
	 * 渲染(旅客信息 内容)
	 * data -> 数字(旅客信息 列表)
	 * DOM  -> 节点(旅客信息 内容)
	 */
	function renderUserinfo(data,DOM) {
		var DOM_input = DOM.getElementsByTagName('input'),
			DOM_select= DOM.getElementsByTagName('select'),
			userinfo_Array = JSON.parse(sessionStorage.getItem('userinfo'));
		for (var i = 0; i < userinfo_Array.length; i++) {
			if (i ==  parseInt(data)) {
				DOM_input["0"].value=userinfo_Array[i].passportNo = null ? "" : userinfo_Array[i].passportNo ;
				DOM_input["1"].value=userinfo_Array[i].chineseName = null ? "" : userinfo_Array[i].chineseName ;
				DOM_input["2"].value=userinfo_Array[i].pinyinName = null ? "" : userinfo_Array[i].pinyinName ;
				// 性别
				(userinfo_Array[i].gender == 0) ? (DOM_input["3"].checked=true) : (DOM_input["4"].checked=true);
				// 时间
				var data = new Date(userinfo_Array[i].birthday);
				DOM_select["1"].value = data.getFullYear();
				DOM_select["2"].value = (data.getMonth()+1);
				DOM_select["3"].value = data.getDate();
				DOM_input["5"].value=userinfo_Array[i].age = null ? "" : userinfo_Array[i].age ;
				DOM_input["6"].value=userinfo_Array[i].mobile = null ? "" : userinfo_Array[i].mobile ;
				DOM_input["7"].value=userinfo_Array[i].email = null ? "" : userinfo_Array[i].email ;
				DOM_input["8"].value=userinfo_Array[i].divingRank = null ? "" : userinfo_Array[i].divingRank ;
				DOM_input["9"].value=userinfo_Array[i].divingCount = null ? "" : userinfo_Array[i].divingCount ;
			}
		}
	}
	/*
	 * 恢复(旅客信息 列表)
	 * event -> 改变(旅客信息 内容)
	 */
	function Recovery(event){
		if (event.currentTarget.getAttribute("name") == "sex") {
			return
		}
		var parent_Dom = event.currentTarget.parentElement.parentElement.parentElement.parentElement.getElementsByTagName("select")[0].getAttribute("data-level");
		$("#level_"+parent_Dom).get(0).selectedIndex = 0;
	}
	/*
	 * 验证(新增页面 输入框)
	 * @param {number} 新增页面 ID 唯一标识
	 */
	function testnewPage(number) {
		$("#User_info"+number+" input[name='Passport_Number']").change(function(){
			judgeMethod.checkPassportNumber()
		});
		$("#User_info"+number+" input[name='chineseName']").change(function(){
			judgeMethod.checkChineseName()
		});
		$("#User_info"+number+" input[name='pinyinName']").change(function(){
			judgeMethod.checkPinyinName()
		});
	}
	main();
}
