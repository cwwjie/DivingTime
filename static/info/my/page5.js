/**
 * 第四页
 */
var pageFourth = (function(){
	function init() {
		// 表示第一次提交
		if (loaddata.isRead == "Y") {
			$.ajax({ 
				type: "POST", 
				url: URLbase + URLversion + "/gather/"+THERUL+"/updateForm.do", 
				contentType:"application/json; charset=utf-8",  
				headers: {
					'token':localStorage.getItem('_token'),
					'digest':localStorage.getItem('_digest')
				},
				data: JSON.stringify(finaldata),
				dataType: "json",
				success: function (message) {
					if (message.result == "0") {
						$("#_END").text('您的信息已提交，并已邮件的形式通知客服!');
						$("#_ENDiconOk").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDBTN").css('display', 'block');
						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "2") {

						$("#_END").text('非常抱歉，该链接已经失效');
						$("#_ENDiconError").css('display', 'block');

						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "3") {

						$("#_END").text('非常抱歉，无法进行数据修改');
						$("#_ENDiconError").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDADD").text('如需修改请联系后台客服人员');

						$("#_ENDiconNo").css('display', 'none');
					}else {

						$("#_END").text("发生未知错误，"+message.message);
						$("#_ENDiconError").css('display', 'block');

						$("#errorMessage").css('display', 'block');


						$("#_ENDiconNo").css('display', 'none');
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					$("#_END").text("发生未知错误，"+ errorThrown);
					$("#_ENDiconError").css('display', 'block');

					$("#errorMessage").css('display', 'block');
					$("#_ENDiconNo").css('display', 'none');
				}
			});
		}else {
			$.ajax({ 
				type: "POST", 
				url: URLbase + URLversion + "/gather/"+THERUL+"/gather.do",
				contentType:"application/json; charset=utf-8",  
				headers: {
					'token':localStorage.getItem('_token'),
					'digest':localStorage.getItem('_digest')
				}, 
				data: JSON.stringify(finaldata),
				dataType: "json",
				success: function (message) {
					if (message.result == "0") {
						$("#_END").text('恭喜你的信息提交成功');
						$("#_ENDiconOk").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDBTN").css('display', 'block');
						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "2") {

						$("#_END").text('非常抱歉，该链接已经失效');
						$("#_ENDiconError").css('display', 'block');

						$("#_ENDiconNo").css('display', 'none');
					}else if (message.result == "3") {

						$("#_END").text('非常抱歉，无法进行数据修改');
						$("#_ENDiconError").css('display', 'block');
						$("#_ENDADD").css('display', 'block');
						$("#_ENDADD").text('如需修改请联系后台客服人员');

						$("#_ENDiconNo").css('display', 'none');
					}else {

						$("#_END").text("发生未知错误，"+message.message);
						$("#_ENDiconError").css('display', 'block');

						$("#errorMessage").css('display', 'block');
						$("#_ENDiconNo").css('display', 'none');
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					$("#_END").text("发生未知错误，"+ errorThrown);
					$("#_ENDiconError").css('display', 'block');

					$("#errorMessage").css('display', 'block');
					$("#_ENDiconNo").css('display', 'none');
				}
			});
		}
		$("#errorMessage").click(function(){
			location = "./../user/account.html#taobao";
		});
		$("#_ENDBTN").click(function(event) {
			location = "./view/index.html";
			// window.location = sessionStorage.getItem('AllUrl');
		});
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();