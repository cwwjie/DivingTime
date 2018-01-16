$(document).ready(function(){
	init();
	Check();
});
function loadPageVar (sVar) {
  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
function init(){
	$("#Btn").click(function(){
		if ($("#password").val().length < 8) {
			$(".input1 i").removeClass("correcticon");
			$(".input1 i").addClass("mistakeicon");
			$(".input1 span").text("密码必须大于8位数字");
			return
		}else if(/\s/.test($("#password").val())){
			$(".input1 i").removeClass("correcticon");
			$(".input1 i").addClass("mistakeicon");
			$(".input1 span").text("密码不能有空格");
			return
		}else{
			$(".input1 i").removeClass("mistakeicon");
			$(".input1 i").removeClass("correcticon");
			$(".input1").removeClass("inputbot");
			$(".input1 span").text("");
			if(loadPageVar("email") !== "" && loadPageVar("validateCode") !== "" ){
				var password = $('#password').val()
				Post(password);
			}
			return
		}
	});
}
function Post(passwd){
	var json = {"passwd":passwd,"email":loadPageVar("email"),"validateCode":loadPageVar("validateCode")}
	$.ajax({
		type: "POST",
		url: appConfig.version + "/user/forgetPwSubmit.do",
		contentType: "application/json; charset=utf-8", 
		data: JSON.stringify(json),
		dataType: "json", 
		success: function (date){
			if (date.result == "0") {
				$("aside").css("display","block");
			}else {
				alert("修改失败，原因是"+date.message+" 请重试");
			}
		}
	})
}
function Check(){
	$.get(appConfig.forgetPwCheck,"email="+loadPageVar("email")+"&validateCode=" + loadPageVar("validateCode"), function(data) {
		if(data.result == "-1") {
			alert("链接已失效");
			window.location.href="./../index.html"
		}
	});
}