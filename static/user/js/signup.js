$(document).ready(function(){
	Switch();
	Check();
	Signup();
});
function Switch() {
	$("#phonereg").click(function(){
		$(".email").css("display","none");
		$(".phone").css("display","block");
		$("#phonereg").addClass('active');
		$("#emailreg").removeClass('active');
		$("input").val("")
		$("label span").text("");
		$("label i").removeClass("mistakeicon");
		$("label i").removeClass("correcticon");
	});
	$("#emailreg").click(function(){
		$(".email").css("display","block");
		$(".phone").css("display","none");
		$("#phonereg").removeClass('active');
		$("#emailreg").addClass('active');
		$("input").val("");
		$("label span").text("");
		$("label i").removeClass("mistakeicon");
		$("label i").removeClass("correcticon");
	});
}
function Check() {
	$("#ShowemailPassword").click(function(){
		if ($("#emailPassword").attr('type') == "password") {
			$("#emailPassword").attr('type','text');
			$("#ShowemailPassword").addClass("Show");
			$("#ShowemailPassword").removeClass("hiden");
		}else if ($("#emailPassword").attr('type') == "text") {
			$("#emailPassword").attr('type','password');
			$("#ShowemailPassword").addClass("hiden");
			$("#ShowemailPassword").removeClass("Show");
		}
	});
	$("#ShowPhonePassword").click(function(){
		if ($("#PhonePassword").attr('type') == "password") {
			$("#PhonePassword").attr('type','text');
			$("#ShowPhonePassword").addClass("Show");
			$("#ShowPhonePassword").removeClass("hiden");
		}else if ($("#PhonePassword").attr('type') == "text") {
			$("#PhonePassword").attr('type','password');
			$("#ShowPhonePassword").addClass("hiden");
			$("#ShowPhonePassword").removeClass("Show");
		}
	});
	$("#PhoneUser").change(function(){
		if(!(/^1[34578]\d{9}$/.test($("#PhoneUser").val()))){
			$(".input1 i").removeClass("correcticon");
			$(".input1 i").addClass("mistakeicon");
			$(".input1 span").text("请输入正确的手机号码");
			return
		}else{
			judgPhone();
			$(".input1 i").removeClass("mistakeicon");
			$(".input1 i").addClass("correcticon");
			$(".input1 span").text("输入正确");
			return
		}
	});
	$("#PhoneCode").change(function(){
		if($("#PhoneCode").val().length !== 6){
			$(".input2 i").removeClass("correcticon");
			$(".input2 i").addClass("mistakeicon");
			$(".input2 span").text("请输入正确格式验证码");
			return
		}else{
			$(".input2 i").removeClass("mistakeicon");
			$(".input2 i").addClass("correcticon");
			$(".input2 span").text("格式正确");
			return
		}
	});
	$("#PhonePassword").change(function(){
		if ($("#PhonePassword").val().length < 8) {
			$(".input3 i").removeClass("correcticon");
			$(".input3 i").addClass("mistakeicon");
			$(".input3 span").text("密码必须大于8位数字");
			return
		}else if(/\s/.test($("#PhonePassword").val())){
			$(".input3 i").removeClass("correcticon");
			$(".input3 i").addClass("mistakeicon");
			$(".input3 span").text("密码不能有空格");
			return
		}else{
			$(".input3 i").removeClass("mistakeicon");
			$(".input3 i").removeClass("correcticon");
			// $(".input3").removeClass("inputbot");
			$(".input3 span").text("");
			// $(".input6").css('display','block');
			// $(".input6").addClass("inputbot");
			return
		}
	});
	$("#emailUser").change(function(){
		if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#emailUser").val()))){
			$(".input4 i").removeClass("correcticon");
			$(".input4 i").addClass("mistakeicon");
			$(".input4 span").text("请输入正确格式的邮箱");
			return
		}else{
			judgEmail();
			$(".input4 i").removeClass("mistakeicon");
			$(".input4 i").addClass("correcticon");
			$(".input4 span").text("邮箱正确");
			return
		}
	});
	$("#emailPassword").change(function(){
		if ($("#emailPassword").val().length < 8) {
			$(".input5 i").removeClass("correcticon");
			$(".input5 i").addClass("mistakeicon");
			$(".input5 span").text("密码必须大于8位数字");
			return
		}else if(/\s/.test($("#emailPassword").val())){
			$(".input5 i").removeClass("correcticon");
			$(".input5 i").addClass("mistakeicon");
			$(".input5 span").text("密码不能有空格");
			return
		}else{
			$(".input5 i").removeClass("mistakeicon");
			// $(".input5").removeClass("inputbot");
			$(".input5 i").removeClass("correcticon");
			$(".input5 span").text("");
			// $(".input7").css('display','block');
			// $(".input7").addClass("inputbot");
			return
		}
	});
	// $("#AgainEmailPassword").change(function(){
	// 	if ($("#emailPassword").val() !== $("#AgainEmailPassword").val()) {
	// 		$(".input7 i").removeClass("correcticon");
	// 		$(".input7 i").addClass("mistakeicon");
	// 		$(".input7 span").text("两次密码不一致");
	// 	}else {
	// 		$(".input7 i").removeClass("mistakeicon");
	// 		$(".input7 i").addClass("correcticon");
	// 		$(".input7 span").text("密码一致");
	// 	}
	// });
	// $("#AgainPhonePassword").change(function(){
	// 	if ($("#AgainPhonePassword").val() !== $("#PhonePassword").val()) {
	// 		$(".input6 i").removeClass("correcticon");
	// 		$(".input6 i").addClass("mistakeicon");
	// 		$(".input6 span").text("两次密码不一致");
	// 	}else {
	// 		$(".input6 i").removeClass("mistakeicon");
	// 		$(".input6 i").addClass("correcticon");
	// 		$(".input6 span").text("密码一致");
	// 	}
	// });
}
function Signup(){
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
	$("#Btn").click(function (){
		if ($(".email").css("display")=="block" && $(".phone").css("display")=="none") {
			if ($("#emailUser").val().length === 0 ) {
				alert("账号不能为空");
				return
			}else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#emailUser").val()))){
				alert("请输入正确格式的邮箱");
				return
			}else if($("#emailPassword").val().length === 0 ){
				alert("密码不能为空");
				return
			}else if($("#emailPassword").val().length < 8 ){
				alert("密码必须大于8位数字");
				return
			}else {
				EmailSignup();
			}
		}else if ($(".phone").css("display")=="block" && $(".email").css("display")=="none") {
			if ($("#PhoneUser").val().length === 0 ) {
				alert("账号不能为空");
				return
			}else if(!(/^1[34578]\d{9}$/.test($("#PhoneUser").val()))){
				alert("请输入正确格式的手机号码");
				return
			}else if($("#PhoneCode").val().length === 0 ){
				alert("验证码不能为空");
				return
			}else if($("#PhoneCode").val().length !== 6 ){
				alert("请输入正确格式验证码");
				return
			}else if($("#PhonePassword").val().length === 0 ){
				alert("密码不能为空");
				return
			}else if($("#PhonePassword").val().length < 8 ){
				alert("密码必须大于8位数字");
				return
			}else {
				PhoneSignup();
			}
		}
	})
	$("#getMobileCode").click(function(){
		if(!(/^1[34578]\d{9}$/.test($("#PhoneUser").val()))){
			$(".input2 i").removeClass("correcticon");
			$(".input2 i").addClass("mistakeicon");
			$(".input2 span").text("请输入正确的手机号码");
			return
		}else if ($("#getMobileCode").attr('title') == "OK"){
			$("#getMobileCode").css("cursor","not-allowed");
			$("#getMobileCode").attr('title','value');
			$(".getMobileCode").text("正在获取");
			var datajson = {"mobile":$("#PhoneUser").val(),"authAction":"register"};
			$.ajax({
				type: "POST", 
				url: appConfig.version + "/user/getMobileCode.do", 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(datajson), 
				dataType: "json", 
				success: function (message) {
					$(".input2 i").removeClass("mistakeicon");
					$(".input2 i").addClass("correcticon");
					$(".input2 span").text("验证码短信已经发送到您的手机");
					var Time = document.getElementById("getMobileCode");
					for(var i = 0; i < 60; i++ ){
						(function(x){
							setTimeout(function(){
								$(".getMobileCode").text(60-x+"s 后再次发送");
								if (x === 59) {
								$("#getMobileCode").attr('title','OK');
								$(".getMobileCode").attr('id','getMobileCode');
								$(".getMobileCode").text("点击获取");
								$(".getMobileCode").css("cursor","pointer")
								$(".input2 i").addClass("correcticon");
								$(".input2 i").removeClass("mistakeicon");
								$(".input2 span").text("你可以再次获取验证码");
								}
							},x*1000)
						})(i)
					}
				}
			});
			return
		}
	})
	function EmailSignup() {
		$("#Btn").css("cursor","not-allowed");
		$("#Btn").attr("id","BTN-Forbid");
		var json = {passwd:$("#emailPassword").val(),email:$("#emailUser").val()}
		$.ajax({ 
		type: "POST", 
		url: appConfig.version +"/user/register.do", 
		contentType: "application/json; charset=utf-8", 
		data: JSON.stringify(json), 
		dataType: "json", 
		success: function (message) {
			if (message.result === "0") {
				$("#aside").css("display","block");
				$("#detail span").text($("#emailUser").val());
				var _mail = $("#emailUser").val().split('@')[1];
				for (var j in hash){
					if(j == _mail){
				        $("#BTN-A").attr("href", hash[_mail]);
						$(".BTNcenter").text("马上激活");
				    }
				}
				return
			}else {
				$("#BTN-Forbid").css("cursor","pointer");
				$("#BTN-Forbid").attr("id","Btn");
				$(".input4 i").removeClass("correcticon");
				$(".input4 i").addClass("mistakeicon");
				$(".input4 span").text("注册失败");
			}
		}});
	}
	function PhoneSignup() {
		$("#Btn").css("cursor","not-allowed");
		$("#Btn").attr("id","BTN-Forbid");
		var json = {"passwd":$("#PhonePassword").val(),"authAction":"register","messageContent":$("#PhoneCode").val(),"mobile":$("#PhoneUser").val()}
		$.ajax({ 
			type: "POST", 
			url: appConfig.version + "/user/registerMobile.do", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(json), 
			dataType: "json", 
			success: function (message) {
				if (message.result === "0") {
					$("#aside").css("display","block");
					$("#detail").css('display','none');
					$("#BTN-A").attr("href","./../index.html");
				}else if (message.result == "-1"){
					$(".input2 i").removeClass("correcticon");
					$(".input2 i").addClass("mistakeicon");
					$(".input2 span").text("验证码错误");
				}else if (message.result == "100022"){
					$(".input1 i").removeClass("correcticon");
					$(".input1 i").addClass("mistakeicon");
					$(".input1 span").text("手机号已被占用");
				}
			}
		});
	}
}

/*
 * 邮箱判断(是否注册)
 */
function judgEmail() {
  var email = $("#emailUser").val();
  $.get(appConfig.checkEmail+"?email="+email, function(result){
  	if (result.result == "0") {
		$(".input4 i").removeClass("mistakeicon");
		$(".input4 i").addClass("correcticon");
		$(".input4 span").text("邮箱可用");
  	}else {
		$(".input4 i").removeClass("correcticon");
		$(".input4 i").addClass("mistakeicon");
		$(".input4 span").text("邮箱已被注册");
  	}
  });
}
/*
 * 手机判断(是否注册)
 */
function judgPhone() {
  var phone = $("#PhoneUser").val();
  $.get(appConfig.checkMobile+"?mobile="+phone, function(result){
  	if (result.result == "0") {
		$(".input1 i").removeClass("mistakeicon");
		$(".input1 i").addClass("correcticon");
		$(".input1 span").text("手机号可用");
  	}else {
		$(".input1 i").removeClass("correcticon");
		$(".input1 i").addClass("mistakeicon");
		$(".input1 span").text("手机号已被占用");
  	}
  });
}