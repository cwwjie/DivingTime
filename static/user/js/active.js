$(document).ready(function(){
	Analysis();
});
function Analysis(){
	function loadPageVar (sVar) {
	  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	}
	$.get(appConfig.active + '?email=' + loadPageVar("email") + '&validateCode=' + loadPageVar("validateCode"), function(data) {
		if (data.result == "10004") {
			$(".loding").css("display","none");
			$(".icon1").css("display","block");
			$("#title").text("恭喜你"+data.message);
		}else{
			$(".loding").css("display","none");
			$(".icon2").css("display","block");
			$("#title").text("非常抱歉"+data.message);
		}
	});
}
