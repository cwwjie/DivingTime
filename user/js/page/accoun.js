// 账号中心
function bindAccoun() {
	// 隐藏 首屏
	function hideAccount() {
		$("#Account").css('display','none');
	}
	// 所有的输入 清空
	function hideChange() {
		$(".changeAccoun").css('display','none');
		$("#Account").css('display','block');
		$(".changeAccoun input").val("")
		$(".changeAccoun input").attr('title',"allow");
		$(".input1 i").removeClass("correcticon");
		$(".input1 i").removeClass("mistakeicon");
		$(".input1 span").text("");
		$(".input2 i").removeClass("correcticon");
		$(".input2 i").removeClass("mistakeicon");
		$(".input2 span").text("");
		$(".input3 i").removeClass("correcticon");
		$(".input3 i").removeClass("mistakeicon");
		$(".input3 span").text("");
		// 眼睛初始化方法
		$(".ShowPassword").removeClass('Show');
		$(".ShowPassword").addClass('hiden');
		$("#phone_Password").attr('type','password');
		$("#newPassword").attr('type','password');
		$("#userEmail").attr('type','password');
	}
	// 密码的没有达到复用的效果
	function check(first,second,type) {
		if (type == "password") {
			if (first.val() .length < 8) {
				$(".input1 i").removeClass("correcticon");
				$(".input1 i").addClass("mistakeicon");
				$(".input1 span").text("密码不能小于8位数");
				return false
			}else if (second.val() .length < 8) {
				$(".input2 i").removeClass("correcticon");
				$(".input2 i").addClass("mistakeicon");
				$(".input2 span").text("密码不能小于8位数");
				return false
			}
		}
		$(".input2 i").removeClass("correcticon");
		$(".input2 i").removeClass("mistakeicon");
		$(".input2 span").text("");
		$(".input1 i").removeClass("correcticon");
		$(".input1 i").removeClass("mistakeicon");
		$(".input1 span").text("");
		return true
	}
	// 密码复用 fir输入框.val() sec对错的ICON thr对错的文字
	function checkpassword(fir,sec,thr) {
		if (fir.length < 8) {
			sec.removeClass("correcticon");
			sec.addClass("mistakeicon");
			thr.text("密码不能小于8位数");
			return false
		}else {
			sec.removeClass("correcticon");
			sec.removeClass("mistakeicon");
			thr.text("");
			return true
		}
	}
	// 邮箱复用 fir输入框.val() sec对错的ICON thr对错的文字
	function checkEmail(fir,sec,thr) {
		if ((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(fir))) {
			sec.removeClass("correcticon");
			sec.removeClass("mistakeicon");
			thr.text("");
			$.ajax({
				type: "GET", 
				url: appConfig.checkEmail + "?email=" + fir, 
				contentType: "application/json; charset=utf-8", 
				success: function (message) {
					if (message.result == "0") {
						sec.addClass("correcticon");
						thr.text("邮箱可用");
					}else {
						sec.addClass("mistakeicon");
						thr.text(message.message);
					}
				}
			});
			return true
		}else {
			sec.removeClass("correcticon");
			sec.addClass("mistakeicon");
			thr.text("输入正确格式的邮箱");
			return false
		}
	}
	// 手机复用 fir输入框.val() sec对错的ICON thr对错的文字
	function checkPhone(fir,sec,thr) {
		if ((/^1[34578]\d{9}$/.test(fir))) {
			sec.removeClass("correcticon");
			sec.removeClass("mistakeicon");
			thr.text("");
			$.ajax({
				type: "GET", 
				url: appConfig.checkMobile + "?mobile=" + fir, 
				contentType: "application/json; charset=utf-8", 
				success: function (message) {
					if (message.result == "0") {
						sec.addClass("correcticon");
						thr.text("手机号码可用");
						$("#phonePush").attr("data-allow","allow")
					}else {
						sec.addClass("mistakeicon");
						thr.text(message.message);
						$("#phonePush").attr("data-allow","not-allow")
					}
				}
			});
			return true
		}else {
			sec.removeClass("correcticon");
			sec.addClass("mistakeicon");
			thr.text("输入正确格式的手机");
			return false
		}
	}
	// 验证码复用 fir输入框.val().length sec对错的ICON thr对错的文字
	function checkCode(fir,sec,thr) {
		if (fir !== 6) {
			sec.removeClass("correcticon");
			sec.addClass("mistakeicon");
			thr.text("输入正确格式验证码");
			return true
		}else {
			sec.removeClass("correcticon");
			sec.removeClass("mistakeicon");
			thr.text("");
			return false
		}
	}
	// 复用(正在提交)
	function Onsubmit(dom) {
		dom.attr('title','forbid');
		dom.text('正在提交');
		dom.css('cursor','not-allowed');
	};
	// 修改密码    (第一次尝试抽出)
	$("#passwordPush").click(function(event) {
		var domclick = $("#passwordPush"),
			val1 = $("#userPassword"),
			type = "password",
			val2 = $("#newPassword");
		if (!check(val1,val2,type)) {
			return
		}
		if (domclick.attr('title') == "allow") {
			json = {
				"oldPw":$("#userPassword").val(),
				"newPw":$("#newPassword").val()
			}
			Onsubmit(domclick);
			$.ajax({
				type: "POST", 
				url: appConfig.changePw, 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(json), 
				dataType: "json", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					if (message.result == "0") {
						alert("密码修改成功");
						$.cookie('token',null,{path:'/'});
						$.cookie('digest',null,{path:'/'});
						window.location.href="./login.html";
						hideChange();
					}else {
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").addClass("mistakeicon");
						$(".input1 span").text("请输入正确的密码");
					}
					domclick.attr('title',"allow");
					domclick.text('修改');
					domclick.css('cursor','pointer');
				}
			});
		}
	})
	// 修改邮箱
	function changeEmail() {
		$("#userEmail").change(function(){
			checkpassword($("#userEmail").val(),$(".input1 i"),$(".input1 span"))
		});
		$("#newEmail").change(function(){
			checkEmail($("#newEmail").val(),$(".input3 i"),$(".input3 span"));
		});
		$("#emailPush").click(function(){
			if (!(checkpassword($("#userEmail").val(),$(".input1 i"),$(".input1 span")))) {
				return
			}
			if (!(checkEmail($("#newEmail").val(),$(".input3 i"),$(".input3 span")))) {
				return
			}
			if ($("#emailPush").attr("title") == "not-allow") {
				return
			}
			Onsubmit($("#emailPush"));
			var json = {
				"passwd":$("#userEmail").val(),
    			"email":$("#newEmail").val(),
			}
			$.ajax({
				type: "POST", 
				url: appConfig.updateEmail, 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(json), 
				dataType: "json", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					if (message.result == "0") {
						alert("恭喜更换邮箱成功，赶紧到您的邮箱激活吧");
						$("#Account").css('display','block');
						hideChange();
						loadInfr();
					}else if (message.result == "10002") {
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").addClass("mistakeicon");
						$(".input1 span").text("密码错误");
					}else {
						alert("更换失败，原因:" + message.message);
					}
					$("#emailPush").text('修改');
					$("#emailPush").css('cursor','pointer');
					$("#emailPush").attr("title","allow");
				}
			});
		})
	}
	// 修改手机
	function changePhone() {
		$("#phone_Password").change(function(){
			checkpassword($("#phone_Password").val(),$(".input1 i"),$(".input1 span"))
		});
		$("#newPhone").change(function(){
			checkPhone($("#newPhone").val(),$(".input2 i"),$(".input2 span"))
		});
		$("#PhoneCode").change(function(){
			checkCode($("#PhoneCode").val().length,$(".input3 i"),$(".input3 span"))
		});
		// 获取验证码
		$("#getMobileCode").click(function(){
			if (!(checkPhone($("#newPhone").val(),$(".input2 i"),$(".input2 span")))) {
				return
			}
			var datajson = {"mobile":$("#newPhone").val(),"authAction":"updateMob"};
			if ($("#getMobileCode").attr("title") !== "OK") {
				return
			}
			if ($("#phonePush").attr("data-allow") !== "allow") {
				return
			}
			$(".input3 span").text("正在发送");
			$("#getMobileCode").attr("title","not-allow")
			$.ajax({
				type: "POST", 
				url: appConfig.getMobileCode, 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(datajson), 
				dataType: "json", 
				success: function (message) {
					$(".input3 i").removeClass("mistakeicon");
					$(".input3 i").addClass("correcticon");
					$(".input3 span").text("验证码短信已经发送到您的手机");
					var Time = document.getElementById("getMobileCode");
					for(var i = 0; i < 60; i++ ){
						(function(x){
							setTimeout(function(){
								$(".getMobileCode").text(60-x+"s 后再次发送");
								if (x === 59) {
									$("#getMobileCode").attr('title','OK');
									$(".getMobileCode").text("点击获取");
									$(".getMobileCode").css("cursor","pointer")
									$(".input3 i").addClass("correcticon");
									$(".input3 i").removeClass("mistakeicon");
									$(".input3 span").text("你可以再次获取验证码");
								}
							},x*1000)
						})(i)
					}
				}
			});
		});
		$("#phonePush").click(function(){
			if (!(checkpassword($("#phone_Password").val(),$(".input1 i"),$(".input1 span")))) {
				return
			}
			if (!(checkPhone($("#newPhone").val(),$(".input2 i"),$(".input2 span")))) {
				return
			}
			if ((checkCode($("#PhoneCode").val().length,$(".input3 i"),$(".input3 span")))) {
				return
			}
			if ($("#phonePush").attr("data-allow") !== "allow") {
				return
			}
			$("#phonePush").attr("data-allow","not-allow");
			Onsubmit($("#phonePush"))
			var json = {
				"authAction": "updateMob",
				"passwd": $("#phone_Password").val(),
				"mobile": $("#newPhone").val(),
				"messageContent": $("#PhoneCode").val()
			}
			$.ajax({
				type: "POST", 
				url: appConfig.updateMobile, 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(json), 
				dataType: "json", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					if (message.result == "0") {
						alert("恭喜你绑定成功");
						$("#phonePush").attr("data-allow","allow");
						$("#phonePush").text('修改');
						$("#phonePush").css('cursor','pointer');
						$("#Account").css('display','block');
						hideChange();
						loadInfr();
						window.location.href="./account.html#Accoun";
					}else if (message.result == "0") {
						alert("修改失败,验证码错误");
						$("#phonePush").attr("data-allow","allow");
						$("#phonePush").text('修改');
						$("#phonePush").css('cursor','pointer');
					}else if (message.result == "10002") {
						$(".input1 i").removeClass("correcticon");
						$(".input1 i").addClass("mistakeicon");
						$(".input1 span").text("密码错误");
						$("#phonePush").attr("data-allow","allow");
						$("#phonePush").text('修改');
						$("#phonePush").css('cursor','pointer');
					}else {
						alert("修改失败,"+message.message);
						$("#phonePush").attr("data-allow","allow");
						$("#phonePush").text('修改');
						$("#phonePush").css('cursor','pointer');
					}
				}
			});
		});
	}
	// 眼睛显示
	$(function (){
		function show(Icon,Input){
			if (Input.attr('type') == "password") {
				Input.attr('type','text');
				Icon.addClass("Show");
				Icon.removeClass("hiden");
			}else if (Input.attr('type') == "text") {
				Input.attr('type','password');
				Icon.addClass("hiden");
				Icon.removeClass("Show");
			}
		}
		$("#ShowPassword").click(function(){
			var Icon = $(".ShowPassword"),
				Input = $("#newPassword");
			show(Icon,Input);
		})
		$("#ShowPassword2").click(function(){
			var Icon = $(".ShowPassword"),
				Input = $("#userEmail");
			show(Icon,Input);
		})
		$("#ShowPassword3").click(function(){
			var Icon = $(".ShowPassword"),
				Input = $("#phone_Password");
			show(Icon,Input);
		})
	});
	// 加载首屏信息
	function loadInfr() {
		function render(data) {
			$("#renderPassword").text("********")
			if (data.mobile !== null && data.mobile !== "") {
				$("#renderPhone").text(data.mobile);
				$("#modifyPhone").text("修改");
			}
			if (data.email !== null && data.email !== "") {
				$("#renderEmail").text(data.email);
				$("#modifyEmail").text("修改");
			}
		}
		$.ajax({
			type: "GET", 
			url: appConfig.getUserInfo, 
			contentType: "application/json; charset=utf-8", 
			// data: JSON.stringify(json), 
			// dataType: "json", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0" ) {
					render(message.data);
				}
			}
		});
	}
	// 统一绑定事件
	function Bindevents() {
		$(".returnBack").click(function(event) {
			hideChange();
		});
		$("#modifyPassword").click(function(event) {
			$("#changePassword").css('display','block');
			hideAccount();
		});
		$("#modifyEmail").click(function(event) {
			$("#changeEmail").css('display','block');
			hideAccount();
		});
		$("#modifyPhone").click(function(event) {
			$("#changePhone").css('display','block');
			hideAccount();
		});
	}
	Bindevents();
	loadInfr();
	changeEmail();
	changePhone();
}