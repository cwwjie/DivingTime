// 个人中心
function Person() {
	// 绑定生日
	$(function () {
		$.ms_DatePicker({
	            YearSelector: ".sel_year",
	            MonthSelector: ".sel_month",
	            DaySelector: ".sel_day"
	    });
		$.ms_DatePicker();
	});
	// 加载信息
	function loadInfo(go){
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
					go(message);
				}
			}
		});
	}
	// 信息加载进来之后，渲染
	function WritePerson(message){
		$("#name").attr("value",message.data.nickname);
		$("#name").attr("placeholder","输入您的名字");
		$("#realName").attr("value",message.data.userName);
		$("#realName").attr("placeholder","输入您的名字");
		if (message.data.gender == 0) {
			$('#secret').prop('checked',true);
		}else if (message.data.gender == 1) {
			$('#male').prop('checked',true);
		}else if (message.data.gender == 2) {
			$('#female').prop('checked',true);
		}
		// 绑定时间
		var date = new Date(message.data.birthday);
		$(".sel_year").val(date.getFullYear());
		$(".sel_month").val(date.getMonth()+1);
		$(".sel_day").val(date.getDate());

		if (!message.data.email) {
			$("#yourEmail").text("未绑定");
		}else {
			$("#yourEmail").text(message.data.email);
			$("#Email").text("修改");
		}
		if (!message.data.mobile) {
			$("#yourPhone").text("未绑定");
		}else {
			$("#yourPhone").text(message.data.mobile);
			$("#PhoneNumber").text("修改");
		}
		$("#Phone").attr("placeholder","输入您的电话");
		if (message.data.telephone) {
			$("#Phone").attr("value",message.data.telephone);
		}
		$("#weixin").attr("placeholder","输入您的微信");
		if (message.data.webchat) {
			$("#weixin").attr("value",message.data.webchat);
		}
		$("#qq").attr("placeholder","输入您的qq");
		if (message.data.qq) {
			$("#qq").attr("value",message.data.qq);
		}
	}
	// 这个是跳转
	$(".change").click(function(){
		window.location.hash = "#Accoun";
		$("#Person").css("background","rgba(0, 0, 0, 0)")
		Render();
	});
	loadInfo(WritePerson);

	function dateToYYYYMMDDFormat(data) {
		var yyyy = data.getFullYear();

		var mm = data.getMonth() + 1;
		mm = mm < 10 ? '0' + mm : mm;

		var dd = data.getDate();
		dd = dd < 10 ? '0' + dd : dd;

		return '' + yyyy + '-' + mm + '-' + dd;
	}

	//修改信息
	function userUpdate(){
		$(".Save").click(function(event) {
			$(".Save").text("正在提交");
			userPush();
		});
		function userPush(){
			var gender,
				birthday;
			if ($('#secret').prop('checked')) {
				gender = 0;
			}else if ($('#male').prop('checked')) {
				gender = 1;
			}else if ($('#female').prop('checked')) {
				gender = 2;
			}
			function chacknull(chack){
				if (chack == "") {
					return null
				}else{
					return chack
				}
			}

			var json = {
				"userName": chacknull($("#realName").val()),
				"nickname":  chacknull($("#name").val()),
				"gender": gender,
				"birthday": dateToYYYYMMDDFormat( new Date(parseInt($("select[class=sel_year]").val()), (parseInt($("select[class=sel_month]").val())-1), parseInt($("select[class=sel_day]").val())) ),
				"telephone": chacknull($("#Phone").val()),
				"qq": chacknull($("#qq").val()),
				"webchat": chacknull($("#weixin").val())
			};

			$.ajax({
				type: "POST", 
				url: appConfig.updateUser, 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(json), 
				dataType: "json", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (val) {
					if (val.result === '0') {
						alert('恭喜你，保存成功');
					}
					$(".Save").text("保存");
					Render();
				}
			});
		}
	}
	userUpdate();
}


