$(document).ready(function(){
	initi();
	emailGetBack();
	switchMethod();
});
/*
 * 所有事件初始化
 */
function initi() {
	// 验证(邮箱)
	$("#User").change(checkInput.checkEmail);
	// 验证(手机号)
	$("#phone_number").change(checkInput.checkPhoneNumber);
	// 验证(手机密码)
	$("#phone_new_Password").change(checkInput.checkPhonePassword);
	// 获取(手机验证码)
	$("#getMobileCode").click(getMobileCode);
	// 隐藏显示(密码)
	$("#ShowPhonePassword").click(function(){
		if ($("#phone_new_Password").attr('type') == "password") {
			$("#phone_new_Password").attr('type','text');
			$("#ShowPhonePassword").addClass("Show");
			$("#ShowPhonePassword").removeClass("hiden");
		}else if ($("#phone_new_Password").attr('type') == "text") {
			$("#phone_new_Password").attr('type','password');
			$("#ShowPhonePassword").addClass("hiden");
			$("#ShowPhonePassword").removeClass("Show");
		}
	});
	// 提交(手机密码找回)
	$("#submit_Phone").click(phoneGetBack);
}
/*
 * 方法(验证输入)
 */
var checkInput = function(){};
checkInput.checkEmail = function () {
	if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))){
		$(".input_1 i").removeClass("correcticon");
		$(".input_1 i").addClass("mistakeicon");
		$(".input_1 span").text("请输入正确的邮箱格式");
		return false
	}else{
		$(".input_1 i").removeClass("mistakeicon");
		$(".input_1 i").addClass("correcticon");
		$(".input_1 span").text("输入正确");
		return true
	}
}
checkInput.checkPhoneNumber = function () {
	if(!(/^1[34578]\d{9}$/.test($("#phone_number").val()))){
		$(".phone_number i").removeClass("correcticon");
		$(".phone_number i").addClass("mistakeicon");
		$(".phone_number span").text("请输入正确的手机号码");
		return false
	}else{
		$(".phone_number i").removeClass("mistakeicon");
		$(".phone_number i").addClass("correcticon");
		$(".phone_number span").text("输入正确");
		return true
	}
}
checkInput.checkPhonePassword = function () {
	if ($("#phone_new_Password").val().length < 8) {
		$(".phone_new_Password i").removeClass("correcticon");
		$(".phone_new_Password i").addClass("mistakeicon");
		$(".phone_new_Password span").text("密码必须大于8位数字");
		return false
	}else if(/\s/.test($("#phone_new_Password").val())){
		$(".phone_new_Password i").removeClass("correcticon");
		$(".phone_new_Password i").addClass("mistakeicon");
		$(".phone_new_Password span").text("密码不能有空格");
		return false
	}else{
		$(".phone_new_Password i").removeClass("mistakeicon");
		$(".phone_new_Password i").removeClass("correcticon");
		$(".phone_new_Password span").text("");
		return true
	}
}
checkInput.checkPhoneCode = function () {
	if($("#phone_Code").val().length !== 6){
		$(".phone_Code i").removeClass("correcticon");
		$(".phone_Code i").addClass("mistakeicon");
		$(".phone_Code span").text("请输入正确格式验证码");
		return false
	}else{
		$(".phone_Code i").removeClass("mistakeicon");
		$(".phone_Code i").removeClass("correcticon");
		$(".phone_Code span").text("");
		return true
	}
}
/*
 * 方法(获取手机验证码)
 */
function getMobileCode() {
	var data_json;
	if ($("#getMobileCode").attr("data-allow") == "permit") {
		if(checkInput.checkPhoneNumber()) {
			$("#getMobileCode").attr("data-allow","Not_Allowed")
			$("#getMobileCode").text("正在获取");
			data_json = {"mobile":$("#phone_number").val(),"authAction":"forgetPw"};
			pushData()
		}
	}
	function pushData() {
		$.ajax({
			type: "POST", 
			url: appConfig.version + "/user/getMobileCode.do", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(data_json), 
			dataType: "json", 
			success: function (message) {
				if (message.result == "0") {
					$(".phone_Code i").removeClass("mistakeicon");
					$(".phone_Code i").addClass("correcticon");
					$(".phone_Code span").text("验证码短信已经发送到您的手机");
					var Time = document.getElementById("getMobileCode");
					for(var i = 0; i < 60; i++ ){
						(function(x){
							setTimeout(function(){
								$("#getMobileCode").text(60-x+"s 后再次发送");
								if (x === 59) {
								$("#getMobileCode").attr('data-allow','permit');
								$("#getMobileCode").text("点击获取");
								$("#getMobileCode").css("cursor","pointer")
								$(".phone_Code i").addClass("correcticon");
								$(".phone_Code i").removeClass("mistakeicon");
								$(".phone_Code span").text("你可以再次获取验证码");
								}
							},x*1000)
						})(i)
					}
				}else {
					$(".phone_Code i").addClass("mistakeicon");
					$(".phone_Code i").removeClass("correcticon");
					$(".phone_Code span").text("验证码短信发生失败，原因:"+message.message);
					$("#getMobileCode").text("获取失败");
					$("#getMobileCode").attr('data-allow','permit');
				}
			}
		});
	}
}
/*
 * 提交(邮箱找回密码)
 */
function emailGetBack() {
	var hash = {
	    'qq.com': 'http://mail.qq.com',
	    'gmail.com': 'http://mail.google.com',
	    'sina.com': 'http://mail.sina.com.cn',
	    '163.com': 'http://mail.163.com',
	    '126.com': 'http://mail.126.com',
	    'yeah.net': 'http://www.yeah.net/',
	    'sohu.com': 'http://mail.sohu.com/',
	    'tom.com': 'http://mail.tom.com/',
	    'sogou.com': 'http://mail.sogou.com/',
	    '139.com': 'http://mail.10086.cn/',
	    'hotmail.com': 'http://www.hotmail.com',
	    'live.com': 'http://login.live.com/',
	    'live.cn': 'http://login.live.cn/',
	    'live.com.cn': 'http://login.live.com.cn',
	    '189.com': 'http://webmail16.189.cn/webmail/',
	    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
	    'yahoo.cn': 'http://mail.cn.yahoo.com/',
	    'eyou.com': 'http://www.eyou.com/',
	    '21cn.com': 'http://mail.21cn.com/',
	    '188.com': 'http://www.188.com/',
	    'foxmail.com': 'http://www.foxmail.com',
	    'outlook.com': 'http://www.outlook.com'
	}
	$("#Btn").click(function() {
		if((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))){
			if ($("#Btn").attr("id")=="BTN-Forbid") {
				return
			}
			Get();
		}else {
			$(".input_1 i").removeClass("correcticon");
			$(".input_1 i").addClass("mistakeicon");
			$(".input_1 span").text("请输入正确的邮箱格式");
		}
	});
	function Get() {
		$("#Btn").css("cursor","not-allowed");
		$("#Btn").attr("id","BTN-Forbid");
		$.get(appConfig.forgeturl,"email="+ $("#User").val() ,function(message){
			if (message.result === "10007") {
				$(".input_1 i").removeClass("correcticon");
				$(".input_1 i").addClass("mistakeicon");
				$("#BTN-Forbid").css("cursor","pointer");
				$("#BTN-Forbid").attr("id","Btn");
				$(".input_1 span").text(message.message);
				return
			}else if(message.result === "0"){
				$("#aside").css("display","block");
				$("#detail span").text($("#User").val());
				var _mail = $("#User").val().split('@')[1];
				for (var j in hash){
					if(j == _mail){
				        $("#BTN-A").attr("href", hash[_mail]);
						$(".BTNcenter").text("登录修改");
				    }
				}
			}else if(message.result === "10032"){
				$(".input_1 i").removeClass("correcticon");
				$(".input_1 i").addClass("mistakeicon");
				$("#BTN-Forbid").css("cursor","pointer");
				$("#BTN-Forbid").attr("id","Btn");
				$(".input_1 span").text(message.message);
			}else{
				$("#BTN-Forbid").css("cursor","pointer");
				$("#BTN-Forbid").attr("id","Btn");
				$(".input_1 i").removeClass("correcticon");
				$(".input_1 i").addClass("mistakeicon");
				$("#BTN-Forbid").css("cursor","pointer");
				$("#BTN-Forbid").attr("id","Btn");
				$(".input_1 span").text(message.message);
			}
			$("#Btn").css("cursor","pointer");
			$("#Btn").attr("id","allowed");
		});
	}
}
/*
 * 提交(手机找回密码)
 */
function phoneGetBack() {
	if (checkInput.checkPhoneNumber() && checkInput.checkPhoneCode() && checkInput.checkPhonePassword()) {
		$("#submit_Phone").text("正在重置")
	}else {
		return
	}
	var json = {"passwd":$("#phone_new_Password").val(),"authAction":"forgetPw","messageContent":$("#phone_Code").val(),"mobile":$("#phone_number").val()}
	$.ajax({ 
		type: "POST", 
		url: appConfig.version + "/user/forgetPwtToMob.do", 
		contentType: "application/json; charset=utf-8", 
		data: JSON.stringify(json), 
		dataType: "json", 
		success: function (message) {
			if (message.result === "0") {
				$("#aside").css("display","block");
				$("#aside .title").text("恭喜你密码重置成功");
				$("#aside #detail").css("display","none");
			}else if (message.result === "-1") {
				$(".phone_Code i").removeClass("correcticon");
				$(".phone_Code i").addClass("mistakeicon");
				$(".phone_Code span").text("验证码错误");
				$("#submit_Phone").text("重置")
			}
		}
	});
}
/*
 * 切换(手机找回 邮箱找回)
 */
function switchMethod() {
	function clearAll() {
		$("input").val("");
		$("i").removeClass("correcticon");
		$("i").removeClass("mistakeicon");
		$("span").text("");
	}
	function showEmail() {
		$(".input_2").css('display', 'none');
		$(".input_1").css('display', 'block');
		$("#Btn").css('display', 'block');
		$("#submit_Phone").css('display', 'none');
		$("#emailreg").addClass('active');
		$("#phonereg").removeClass('active');
		$("#Description").text('输入与您账号关联的邮箱，稍后我们将把重置链接发至您的邮箱。');
	}
	function showPhone() {
		$(".input_1").css('display', 'none');
		$(".input_2").css('display', 'block');
		$("#Btn").css('display', 'none');
		$("#submit_Phone").css('display', 'block');
		$("#phonereg").addClass('active');
		$("#emailreg").removeClass('active');
		$("#Description").text('输入与您账号关联的手机，点击获取验证码。');
	}
	$("#emailreg").click(function(){
		showEmail();
		clearAll();
	});
	$("#phonereg").click(function(){
		showPhone();
		clearAll();
	});
}