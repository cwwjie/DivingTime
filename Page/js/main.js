$(document).ready(function(){
	if (/^[0-9]*[1-9][0-9]*$/.test(window.location.hash.substr(1))) {
		productID = parseInt(window.location.hash.substr(1));
		sessionStorage.setItem('selectProductID',parseInt(window.location.hash.substr(1)));
	}else {
		productID = parseInt(sessionStorage.getItem('selectProductID'))
	}
	// BotSlide();
	// 滚动监听
	FloatTOP();
	// boostrap 日期选择
	Selectdays();
	// 渲染页面
	renderPage();
	// 判断登陆
	judgLogin();
	// 提交请求
	submitRequest();
	// 登陆
	login();
	// 浮动顶部
	scrollTop();
});
// 产品 ID
var productID;
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
				$("#login").html("<div><a href='./../user/signup.html' target='_blank'>注册</a></div><div><a  href='javascript:;' onclick='log_fun.Show()' target='_self'>登录</a></div>")
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
				$("#login").html("<div class='Center'><i class='left'></i><span>"//
					+message.data.nickname+"</span><i class='right'></i><div class='dropdown'>"//
					+"<ul><a href='./../user/account.html#Person' onclick='window.location.reload()'>"//
					+"<li class='First'><i style='background-position:-216px -185px;'></i>个人中心</li></a><a href='./../user/account.html#Orders' onclick='window.location.reload()'>"//
					+"<li><i style='background-position:-248px -185px;'></i>商城订单</li></a><a href='./../user/account.html#taobao' onclick='window.location.reload()'>"//
					+"<li><i style='background-position:-408px -185px;'></i>淘宝订单</li></a><a href='./../user/account.html#Accoun' onclick='window.location.reload()'>"//
					+"<li><i style='background-position:-280px -185px;'></i>账号中心</li></a>"//
					// +"<a href='./../user/account.html#Addres' onclick='window.location.reload()'><li  tyle='display: none;'><i style='background-position:-344px -185px;'></i>收货地址</li></a>"//
					+"<a href='./../user/account.html#Client' onclick='window.location.reload()'>"//
					+"<li><i style='background-position:-376px -185px;'></i>旅客信息</li></a><a onclick='Logout();'><li><i style='background-position:-312px -185px;'></i>退出登录</li></a></ul></div></div>"
				);
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
// 鼠标滚动监听
function FloatTOP() {
	var topLong = $("#carousel-example-generic"),
		Distance = 0,
		Alabel = $("#NC-L a");
		part1 = $("#MContentTitle1")[0].offsetTop,
		part2 = $("#MContentTitle2")[0].offsetTop,
		part3 = $("#MContentTitle3")[0].offsetTop,
		part4 = $("#MContentTitle4")[0].offsetTop,
		part5 = $("#MContentTitle5")[0].offsetTop;
	for(var i=0;i < Alabel.length;i++) {
		Alabel[i].onclick = function (ev) {
			var ev= ev || window.event,
				id=this.hash,
				thisId=document.querySelector(id);
    		document.documentElement.scrollTop=document.body.scrollTop = thisId.offsetTop-50;
			$(".NC-L a").css("border-bottom","none")
    		ev.preventDefault();
		}
	}
	$(window).scroll(function () {
		Distance = $(window).scrollTop();
		CarSelH = topLong[0].clientHeight;
		if (Distance > CarSelH) {
			if ($("nav").attr("data-display") == "show") {
				$("nav").css("display","block")
				anchor();
				$("#Order").addClass('NewOrder');
			}else if ($("nav").attr("data-display") == "hide") {
				$("nav").css("display","none");
			}
		}else{
			$("nav").css("display","none")
			$("#Order").removeClass("NewOrder");
		}
	});
	function anchor() {
		if (Distance > part1+topLong[0].clientHeight - 50 && Distance < part2+topLong[0].clientHeight - 50) {
			$(".NC-L a").css("border-bottom","none")
			$("#NC1").css("border-bottom","4px solid #00a0ea");
		}else if(Distance > part2+topLong[0].clientHeight - 50 && Distance < part3+topLong[0].clientHeight - 50){
			$(".NC-L a").css("border-bottom","none")
			$("#NC2").css("border-bottom","4px solid #00a0ea");
		}else if(Distance > part3+topLong[0].clientHeight - 50 && Distance < part4+topLong[0].clientHeight - 50){
			$(".NC-L a").css("border-bottom","none")
			$("#NC3").css("border-bottom","4px solid #00a0ea");
		}else if(Distance > part4+topLong[0].clientHeight - 50 && Distance < part5+topLong[0].clientHeight - 50){
			$(".NC-L a").css("border-bottom","none")
			$("#NC4").css("border-bottom","4px solid #00a0ea");
		}else if (Distance > part5+topLong[0].clientHeight - 50){
			$(".NC-L a").css("border-bottom","none")
			$("#NC5").css("border-bottom","4px solid #00a0ea");
		}
	}
}
// Boottrap 日期选择
function Selectdays() {
	$("#OrderDate").click(function (event) {
		$("#datetimepicker").css("display","block");
		event.preventDefault();
	})
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "-" + (mydate.getMonth()+1) + "-"+ mydate.getDate();
	str = str.replace(/\b(\w)\b/g, '0$1');
    $('#datetimepicker').datetimepicker({
        format: "yyyy MM dd",//格式
        autoclose: true,//自动关闭
        todayBtn:  true,//今天
        startDate: str,
        minuteStep: 10, //用于选择分钟
        language: 'zh-CN',
        weekStart: 1,//周一从那天开始
        todayHighlight: true,//高亮今天
        startView: 2,//日期时间选择器打开之后首先显示的视图
        minView: 2,//日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev){
		var SelectDate = new Date(ev.date)
		var string = "" + SelectDate.getFullYear() + "-" + (SelectDate.getMonth()+1) + "-"+ SelectDate.getDate();
		string = string.replace(/\b(\w)\b/g, '0$1');
		$("#datetimepicker").css("display","none");
		$("#OrderDate").text(string);
		$("#OrderDate").attr("data-title",ev.date);
		$("#packagNumber").css("display","block");
		$("#totalPrice").css("display","block");
		$("#OrderConfirm").text("预订套餐");
		event.preventDefault();
	});
}
// 渲染(页面)
function renderPage() {
	// 请求(轮播图)
	$.ajax({
		type: "GET", 
		url: URLbase+URLversion+"/product/relProductGallery/" + productID + "/findByProductId.do", 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			renderCarousel(message.data);
		}
	});
	// 渲染(轮播图)
	function renderCarousel(data){
		var inner = "",
			indicators="";
		for (var i = 0; i < data.length; i++) {
			if (i == 0 ) {
				inner += "<div class='item active'><img src="+URLbase+data[i].gallery.imgUrl+"><div class='carousel-caption'></div></div>"
				indicators += "<li data-target='#carousel-example-generic' data-slide-to="+i+" class='active'></li>"
			}else{
				inner += "<div class='item'><img src="+URLbase+data[i].gallery.imgUrl+"><div class='carousel-caption'></div></div>"
				indicators += "<li data-target='#carousel-example-generic' data-slide-to="+i+"></li>"
			}
		}
		$("#carousel").html(inner);
		$(".carousel-indicators").html(indicators);
		imgRespond();
	}
	// 请求(标题&产品详情)
	$.ajax({
		type: "GET", 
		url: URLbase+URLversion+"/product/" + productID + "/get.do", 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			if (message.data == null) {
				$("#SVG").css("display","block");
			}
			Rule(message.data.refundRuleId);
			renderBasic(message.data);
		}
	});
	// 渲染(标题&产品详情)
	function renderBasic(data){
		// "限时促销" > "新品" > "度假套餐"
		function judgtype() {

			var StartTime = data.promoteStartTime;
			var EndTime = data.promoteEndTime;
			var timestamp = Date.parse(new Date());
			if (data.promotePrice == null || data.promotePrice == 0) {
			}else {
				if (timestamp >= StartTime && timestamp <= EndTime) {
					return "<span style='background: rgba(234,84,91,.87)'>限时促销</span>"
				}
			}
			if (data.isNew=="Y") {
				return "<span style='background: rgba(25,163,220,.87)'>新品</span>"
			}else {
				return "<span style='background: rgba(1,185,105,.87)'>度假套餐</span>"
			}
		}
		/*
		 * 套餐价格
		 */
		function pricePackage() {
			var StartTime = data.promoteStartTime;
			var EndTime = data.promoteEndTime;
			var timestamp = Date.parse(new Date());
			if (data.promotePrice == null || data.promotePrice == 0) {
			}else {
				if (timestamp >= StartTime && timestamp <= EndTime) {
					// 表示促销
					var _string = "<span style='text-decoration:line-through'>"+data.productPrice+"</span> "+data.promotePrice;
					return _string
				}
			}
			// 表示不促销
			return data.productPrice
		}
		$("#product_Name").text(data.productName);
		$("#productPrice").html(pricePackage());

		var StartTime = data.promoteStartTime;
		var EndTime = data.promoteEndTime;
		var timestamp = Date.parse(new Date());
		if (data.promotePrice == null || data.promotePrice == 0) {
			// 表示不促销
			$("#promoteTime").html("暂无");
			// 计算价格
			$("#packagNumber .center").attr("data-price",data.productPrice);
			// 计算价格(废弃)
			$("#totalPrice .tright span").text(data.productPrice);
			// 响应式 价格
			$("aside .Aside-B span").text(data.productPrice);
		}else {
			if (timestamp >= StartTime && timestamp <= EndTime) {
				// 表示促销
				$("#promoteTime").html("<span>" + getdate(data.promoteStartTime) + "</span> 至 <span>" + getdate(data.promoteEndTime) + "</span>");
				// 计算价格
				$("#packagNumber .center").attr("data-price",data.promotePrice);
				// 计算价格(废弃)
				$("#totalPrice .tright span").text(data.promotePrice);
				// 响应式 价格
				$("aside .Aside-B span").text(data.promotePrice);
			}else{
				// 表示不促销
				$("#promoteTime").html("暂无");
				// 计算价格
				$("#packagNumber .center").attr("data-price",data.productPrice);
				// 计算价格(废弃)
				$("#totalPrice .tright span").text(data.productPrice);
				// 响应式 价格
				$("aside .Aside-B span").text(data.productPrice);
			}
		}
		// 标签
		$("#productName").html(data.productName+judgtype());
		// 简单描述
		$("#productDesc").html(data.productDesc);
		// 无所谓
		$("#totalPrice i").attr("title",data.promotePrice==null?("原价"+data.productPrice):("促销价"+data.promotePrice));
	}
	// 请求(套餐说明，交通信息)
	$.ajax({
		type: "GET", 
		url: URLbase+URLversion+"/product/attribute/findByProductId.do?productId=" + productID, 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			renderIncludes(message.data)
		}
	});
	// 渲染(套餐说明，交通信息)
	function renderIncludes(data){
		var string = "";
		for (var i = 0; i < data.length; i++) {
			if (i == (data.length - 1)) {
				string += "<div class='MContentContent'><div class='MCCL'>"+data[i].attrName+"</div><div class='MCCR'>"+data[i].attrValue+"</div></div>";
			}else {
				string += "<div class='MContentContent MCLine'><div class='MCCL'>"+data[i].attrName+"</div><div class='MCCR'>"+data[i].attrValue+"</div></div>";
			}
		}
		string += "</div><div class='ContactUS-R'></div>";
		$("#renderIncludes").html(string);
	}
	// 请求(套餐行程)
	$.ajax({
		type:"GET", 
		url:URLbase+URLversion+"/product/trip/findByProductId.do?productId=" + productID, 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			$.ajax({
				type: "GET", 
				url: URLbase+URLversion+"/product/" + productID + "/get.do", 
				contentType: "application/json; charset=utf-8", 
				success: function (message2) {
					renderTrip(message.data,message2.data.productName);
				}
			});
		}
	});
	// 渲染(套餐行程)
	function renderTrip(data,title){
		function splitArray(data) {
			var dataArray=data.split(","),
				string = "";
			for (var i = 0; i < dataArray.length; i++) {
				string += "<p>"+ dataArray[i] +"</p>";
			}
			return string
		}
		function renderNavigator() {
			var _string = "<div class='_nav'>";
			for (var j = 0; j < data.length; j++) {
				_string += "<div><a href='#_day"+(j+1)+"'>第"+(j+1)+"天</a></div>";
			}
			_string += "</div>";
			return _string;
		}
		var Content = "<div class='MContentform-row FormTitle'><div class='MContentform-row1'>日期</div><div class='MContentform-row2'>项目&amp;活动</div><div class='MContentform-row3'>入宿&amp;景点</div></div>",
			Modal = "<div class='modal-dialog'><div class='modal-content'>"//
				+ renderNavigator() +"<div class='_content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>"//
				+ title + "</h4></div><div class='modal-body'><div class='journey'>";
		for (var i = 0; i < data.length; i++) {
			Content += "<div class='MContentform-row FormLists' data-toggle='modal' data-target='#myModal'><div class='MContentform-row1'>第"//
				+ data[i].tripDay+"天</div><div class='MContentform-row2'>"//
				+ splitArray(data[i].tripEvent) +"</div><div class='MContentform-row3'>"//
				+ splitArray(data[i].tripPlace)+"</div></div>";
			Modal += "<div class='journey-title' id='_day"+(i+1)+"'>第"//
				+ data[i].tripDay +"天 "//
				+ data[i].tripBrief +"</div><div class='journey-content'>"//
				+ data[i].tripDesc +"</div>" ;
		}
		Modal += "</div></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button></div></div></div></div>";
		$("#renderTrip .MContentform").html(Content);
		$("#myModal").html(Modal);
	}
	// 请求(套餐包含)
	$.ajax({
		type: "GET", 
		url: URLbase+URLversion+"/product/costIncludes/findByProductId.do?productId=" + productID, 
		contentType: "application/json; charset=utf-8", 
		success: function (message) {
			renderDescription(message.data);
		}
	});
	// 渲染(套餐包含)
	function renderDescription(data){
		var string = "<div class='MContentRow'><div class='MContentTitle'>套餐包含</div></div>";
		for (var i = 0; i < data.length; i++) {
			if (i == (data.length - 1)) {
				string += "<div class='MContentContent'><div class='MCCL'>"+data[i].costTitle+"</div><div class='MCCR'>"+data[i].costContent+"</div></div>";
			}else {
				string += "<div class='MContentContent MCLine'><div class='MCCL'>"+data[i].costTitle+"</div><div class='MCCR'>"+data[i].costContent+"</div></div>";
			}
		}
		string += "</div><div class='ContactUS-R'></div>";
		$("#renderDescription").html(string);
	}
	/**
	 * 渲染(退款说明)(新) 按照等比渲染
	 * @param {refundRuleId} 退订规则id
	 */
	function Rule(refundRuleId) {
		if (refundRuleId == null) {
			return
		}
		function renderRule(data) {
			$("#refundDesc").text(""/*data.refundDesc*/);
			$("#refundName").text(""/*data.refundName*/);
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
				var j = 1-i*(1/ruleItemList.length);

				string += "<div style='width:" + j*100 + "%;background:rgba(69, 90, 100,"//
					+ (i+1)*(1/ruleItemList.length)+");'><span style='color:#4d5d77'>"//
					+ judgDay(ruleItemList[i]) +"</span><a style='color:#fff;position:absolute;z-index:2;top:2px;left:4px;'>扣"//
					+ ruleItemList[i].deductionRatio+"</a></div>";

				string2 += "<p>"+ ruleItemList[i].ruleDesc +"</p>";
			}
			$("#ruleItemList").html(string);
			$("#ruleDesc").html(string2);
		}
		$.ajax({
			type: "GET", 
			url: URLbase+URLversion+"/product/refundrule/"+ refundRuleId +"/item/list.do", 
			contentType: "application/json; charset=utf-8", 
			success: function (message) {
				if (message.data == null) {
					$("#NC5").css("display","none");
					$("#MContentTitle5").css("display","none");
				}else {
					renderRule(message.data);
				}
			}
		});
	}
}
// 提交(订单)
function submitRequest() {
	// 计算价格(data:"+"or"-") => 合计 && 套餐数量
	function changePrice(data) {
		var theNumber = parseFloat($("#packagNumber .center span").text());
		if (data == "-" && theNumber > 1 ) {
			$("#packagNumber .center span").text( theNumber - 1 );
			$("#totalPrice .tright span").text( ((theNumber - 1) * (parseFloat($("#packagNumber .center").attr("data-price"))*100))/100 );
		}else if (data == "+") {
			$("#packagNumber .center span").text( theNumber + 1 );
			$("#totalPrice .tright span").text( ((theNumber + 1) * (parseFloat($("#packagNumber .center").attr("data-price"))*100))/100 );
		}
	}
	// 预定套餐
	function orderConfirm() {
		if ($("#OrderDate").text() == "出发日期") {
			$("#OrderConfirm").text("请选择出发日期");
			return
		}
		if ($("#OrderConfirm").attr("data-cilck") == "doing") {
			return
		}
		$("#OrderConfirm").attr("data-cilck","doing");
		$("#OrderConfirm").text("正在预定");
		$.ajax({
			type: "GET", 
			url: appConfig.getUserInfo, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				$("#OrderConfirm").attr("data-cilck","OK");
				if (message.result == "0") {
					window.location.href="./reserve/index.html?productId=" + productID + "&departureDate=" + $("#OrderDate").attr("data-title") + "&productNum=" + parseInt($("#packagNumber .center span").text());
				}else if (message.result == "401") {
					$("#OrderConfirm").text("预定套餐");
					log_fun.Show()
				}else {
					$("#OrderConfirm").text("预定失败，"+message.message);

				}
			}
		});
	}
	function bindEvents() {
		$("#packagNumber .sL").click(function () {
			changePrice("-")
		});
		$("#packagNumber .sR").click(function () {
			changePrice("+")
		});
		$("#OrderConfirm").click(function () {
			orderConfirm();
		});
		$("#sideConfirm").click(function () {
			// 隐藏 <nav>
			if ($("nav").attr("data-display")=="show") {
				$("nav").css("display","none");
				$("nav").attr("data-display","hide")
			}else if ($("nav").attr("data-display")=="hide") {
				$("nav").css("display","block");
				$("nav").attr("data-display","show")
			}
			if ($("#sideConfirm").attr("title") == "Confirm") {
				$("#sideConfirm").text('预定套餐')
				$(".MContent-R").css('display', 'none');
				$("#sideConfirm").attr("title","order")
			}else if ($("#sideConfirm").attr("title") == "order") {
				$(".MContent-R").css('display', 'block');
				$("#sideConfirm").attr("title","Confirm")
				$("#sideConfirm").text('隐藏')
			}
		})
	}
	bindEvents();
}
// 滚动到顶部
function scrollTop() {
	var timer = null,
		Show_top = false,
		scrollTop;
	window.onscroll=function(){
		scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if (scrollTop > 600) {
			if (Show_top == false) {
				Show_top = true;
				$("#scroll_Top").css('visibility', 'visible');
				$("#scroll_Top").animate({opacity:"1"},500)
			}
		}else if (scrollTop < 600) {
			if (Show_top == true) {
				Show_top = false;
				$("#scroll_Top").animate({opacity:"0"},500);
				setTimeout(function(){
					$("#scroll_Top").css('visibility', 'hidden');
				},500)
			}
		}
		return scrollTop;
	}
	$("#scroll_Top").click(function(){
		clearInterval(timer);
		timer=setInterval(function(){
			var now=scrollTop;
			var speed=(0-now)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(scrollTop==0){
				clearInterval(timer);
			}
			document.documentElement.scrollTop=scrollTop+speed;
			document.body.scrollTop=scrollTop+speed;
		}, 30);
	});
	// 侧边栏
	$("#Taobao_customer_service").click(function(){
		$(".Sidebar").animate({right:'0'},70);
	})
	var _clientWidth=document.body.clientWidth;
	if (_clientWidth < 500) {
		$(".Sidebar").css("right","-"+(_clientWidth+10)+"px");
		$(".Sidebar").css("width",(_clientWidth+10)+"px");
	}
	$("#closeSidebar").click(function(){
		if (_clientWidth < 500) {
			$(".Sidebar").animate({right:"-"+(_clientWidth+10)+"px"},70);
		}else{
			$(".Sidebar").animate({right:'-330px'},70);
		}
	})
	// 渲染SVG
	var _string = "<svg  class='svg_1' viewBox='0 0 1024 1024' width='32' height='32'><path d='M291.127652 378.034087c-27.781565 10.841043-40.269913 20.880696-46.881391 52.001391-8.926609 41.538783 12.354783 107.675826 48.929391 103.980522 51.600696-5.097739 59.258435-102.466783 30.586435-139.642435C316.104348 384.422957 305.39687 381.618087 291.127652 378.034087zM515.383652 378.034087c-27.38087 10.685217-40.136348 20.390957-46.881391 50.977391-9.171478 41.805913 12.221217 108.699826 48.929391 105.004522 52.513391-5.209043 62.330435-113.552696 25.510957-144.762435C535.28487 382.753391 526.870261 381.106087 515.383652 378.034087zM919.863652 313.566609c-78.358261-137.104696-214.817391-226.927304-433.241043-223.254261-15.293217 1.402435-30.586435 2.693565-45.879652 4.096-27.136 5.743304-54.405565 11.597913-81.563826 17.341217C229.086609 152.509217 130.82713 233.182609 82.921739 356.396522 56.653913 423.66887 64.556522 523.464348 90.045217 583.724522c52.379826 123.859478 158.386087 201.750261 298.696348 237.545739 58.88 15.048348 159.922087 23.062261 222.252522 4.073739 44.966957 43.453217 137.48313 83.72313 220.182261 87.663304-14.647652-27.514435-29.184-55.05113-43.831652-82.565565-7.123478-20.390957-14.269217-40.781913-21.392696-61.17287 19.745391-13.623652 39.357217-27.136 59.102609-40.781913 52.112696-40.381217 90.35687-97.480348 116.224-164.129391C971.998609 484.975304 954.145391 373.448348 919.863652 313.566609zM710.90087 741.732174c1.513739 37.197913 16.294957 70.455652 27.514435 99.906783-26.37913-8.281043-51.244522-21.414957-72.370087-35.706435-7.791304-6.099478-15.693913-12.221217-23.462957-18.342957-5.097739-5.476174-10.195478-10.818783-15.293217-16.294957-12.599652 2.671304-25.110261 5.476174-37.732174 8.147478-35.417043 7.012174-84.858435 10.818783-123.347478 4.096-96.456348-16.962783-166.177391-39.891478-229.376-87.663304-47.771826-36.196174-90.223304-89.466435-110.102261-152.909913-41.538783-132.274087 30.586435-252.193391 103.980522-308.891826 43.453217-33.52487 93.651478-59.770435 152.909913-77.467826 22.038261-4.452174 44.210087-8.815304 66.270609-13.245217 11.597913-1.024 23.062261-2.048 34.660174-3.072 187.814957-0.512 313.58887 65.469217 384.333913 181.448348 13.000348 21.147826 22.906435 46.636522 30.564174 72.370087C949.693217 562.064696 811.564522 693.693217 710.90087 741.732174z' p-id='3942' fill='#ffffff'></path></svg>";
		_string +=  "<svg  class='svg_2' viewBox='0 0 1024 1024' width='32' height='32'><path d='M291.127652 378.034087c-27.781565 10.841043-40.269913 20.880696-46.881391 52.001391-8.926609 41.538783 12.354783 107.675826 48.929391 103.980522 51.600696-5.097739 59.258435-102.466783 30.586435-139.642435C316.104348 384.422957 305.39687 381.618087 291.127652 378.034087zM515.383652 378.034087c-27.38087 10.685217-40.136348 20.390957-46.881391 50.977391-9.171478 41.805913 12.221217 108.699826 48.929391 105.004522 52.513391-5.209043 62.330435-113.552696 25.510957-144.762435C535.28487 382.753391 526.870261 381.106087 515.383652 378.034087zM919.863652 313.566609c-78.358261-137.104696-214.817391-226.927304-433.241043-223.254261-15.293217 1.402435-30.586435 2.693565-45.879652 4.096-27.136 5.743304-54.405565 11.597913-81.563826 17.341217C229.086609 152.509217 130.82713 233.182609 82.921739 356.396522 56.653913 423.66887 64.556522 523.464348 90.045217 583.724522c52.379826 123.859478 158.386087 201.750261 298.696348 237.545739 58.88 15.048348 159.922087 23.062261 222.252522 4.073739 44.966957 43.453217 137.48313 83.72313 220.182261 87.663304-14.647652-27.514435-29.184-55.05113-43.831652-82.565565-7.123478-20.390957-14.269217-40.781913-21.392696-61.17287 19.745391-13.623652 39.357217-27.136 59.102609-40.781913 52.112696-40.381217 90.35687-97.480348 116.224-164.129391C971.998609 484.975304 954.145391 373.448348 919.863652 313.566609zM710.90087 741.732174c1.513739 37.197913 16.294957 70.455652 27.514435 99.906783-26.37913-8.281043-51.244522-21.414957-72.370087-35.706435-7.791304-6.099478-15.693913-12.221217-23.462957-18.342957-5.097739-5.476174-10.195478-10.818783-15.293217-16.294957-12.599652 2.671304-25.110261 5.476174-37.732174 8.147478-35.417043 7.012174-84.858435 10.818783-123.347478 4.096-96.456348-16.962783-166.177391-39.891478-229.376-87.663304-47.771826-36.196174-90.223304-89.466435-110.102261-152.909913-41.538783-132.274087 30.586435-252.193391 103.980522-308.891826 43.453217-33.52487 93.651478-59.770435 152.909913-77.467826 22.038261-4.452174 44.210087-8.815304 66.270609-13.245217 11.597913-1.024 23.062261-2.048 34.660174-3.072 187.814957-0.512 313.58887 65.469217 384.333913 181.448348 13.000348 21.147826 22.906435 46.636522 30.564174 72.370087C949.693217 562.064696 811.564522 693.693217 710.90087 741.732174z' p-id='3942' fill='#01b969'></path></svg>";
	$("._SVG").html(_string);
}
/*
 * 轮播图响应式
 */
function imgRespond() {
	// 高是 720  px
	// 宽是 1680 px
	// 720px/1680px = 高/宽 = 求/clientWidth
	var nowHeight = document.body.clientWidth * 720 / 1680;
	$(".carousel-inner .item").css('height',nowHeight);
}
// 方法 - 时间差  timestamp -> 时间戳
function UTC2LocalTime(timestamp) {
	//将 服务器UTC时间戳 转为Date
	var d = new Date(timestamp);
	//服务器UTC时间 与 GMT时间的时间 偏移差
	var offset = d.getTimezoneOffset() * 60000;
	return new Date(timestamp - offset);
}
// 方法 - 获取时间返回201x-xx-xx
function getdate(date) {
	var newdate = new Date(UTC2LocalTime(date)),
		thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
	return thisString
}

// {已经抛弃}底部的轮播图
function BotSlide() {
	var Left = $("#BSControl-L"),
		Right = $("#BSControl-R"),
		Slide = $("#BottomSlide"),
		target = 0,
		Length = $("#BottomSlide").children().length - 4;
	setInterval(function () {
		if (target < Length) {
			target += 1;
		}else{
			target = 0;
		}
		Slide.animate({left:"-"+265 * target+"px"});
	},5000);
	Left.click(function () {
		if (target === 0) {
			return
		}else {
			target -= 1;
		}
		Slide.animate({left:"-"+265 * target+"px"});
	});
	Right.click(function () {
		if (target === Length) {
			return
		}else {
			target += 1;
		}
		Slide.animate({left:"-"+265 * target+"px"});
	});
}