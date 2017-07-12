$(document).ready(function(){
	if (window.ActiveXObject || "ActiveXObject" in window) {
		if (confirm("检测到您的浏览器为IE内核，请问你需要继续浏览吗？(建议更换浏览器，否则可能会发生不可预知的错误)")) {
		}else {
			return
		}
	}
	Check();
	log();
	showPassword()
});
function Check() {
	$("#User").change(function(){
		if(!(/^1[34578]\d{9}$/.test($("#User").val())) && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))){
			$(".input1 i").removeClass("correcticon");
			$(".input1 i").addClass("mistakeicon");
			$(".input1 span").text("请输入正确格式邮箱或手机");
			return
		}else{
			$(".input1 i").removeClass("mistakeicon");
			$(".input1 i").addClass("correcticon");
			$(".input1 span").text("输入正确");
			return
		}
	})
	$("#password").change(function(){
		if ($("#password").val().length < 8) {
			$(".input2 i").removeClass("correcticon");
			$(".input2 i").addClass("mistakeicon");
			$(".input2 span").text("密码必须大于8位数字");
			return
		}else if(/\s/.test($("#password").val())){
			$(".input2 i").removeClass("correcticon");
			$(".input2 i").addClass("mistakeicon");
			$(".input2 span").text("密码不能有空格");
			return
		}else{
			$(".input3").css("display","block")
			$(".input2 i").removeClass("mistakeicon");
			$(".input2 i").removeClass("correcticon");
			$(".input2 span").text("");
			return
		}
	})
}
function showPassword(){
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
	})
}
function log() {
	function ready(){
		$("#Btn").attr("title","ready");
		$("#Btn").css("cursor","pointer");
	}
	$("#Btn").click(function(event) {
		var LoginType,
			RememberCookie,
			json,
			date = new Date();
		if ($("#Btn").attr("title") == "loading") {
			return
		}else if ($("#Btn").attr("title") == "ready") {
			$("#Btn").attr("title","loading");
			$("#Btn").css("cursor","not-allowed");
		}
		if((/^1[34578]\d{9}$/.test($("#User").val())) || (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))){
			if ($("#password").val().length == 0) {
				alert("密码不能为控");
				return
			}else {
				Confirm();
			}
		}else {
			alert("请输入正确格式邮箱或手机");
			return
		}
		function Confirm() {
			if ((/^1[34578]\d{9}$/.test($("#User").val()))) {
				json = {"mobile" : $("#User").val(),"passwd" : $("#password").val()};
				LoginType = "mobile";
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
					ready();
					if(message.result == "0"){
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
						window.location.href="./../../user/account.html#taobao";
					}else if (message.result == -9) {
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").addClass("mistakeicon");
						$(".input1 span").text("账户未激活");
						$(".input2 i").removeClass("mistakeicon");
						$(".input2 i").removeClass("correcticon");
						$(".input2 span").text("");
						return
					}else if (message.result == -7) {
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").addClass("mistakeicon");
						$(".input1 span").text("账号已被占用");
						$(".input2 i").removeClass("mistakeicon");
						$(".input2 i").removeClass("correcticon");
						$(".input2 span").text("");
						return
					}else if (message.result == -5) {
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").addClass("mistakeicon");
						$(".input1 span").text("账号不存在");
						$(".input2 i").removeClass("mistakeicon");
						$(".input2 i").removeClass("correcticon");
						$(".input2 span").text("");
						return
					}else if (message.result == -6) {
						$(".input1 i").removeClass("mistakeicon");
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").removeClass("correcticon");
						$(".input1 span").text("密码错误");
						$(".input2 i").removeClass("correcticon");
						$(".input2 i").addClass("mistakeicon");
						$(".input2 span").text("");
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
	}); 
}