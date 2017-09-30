// 旅客信息
function client() {
	var clientData = [];
	// 渲染(所有用户信息)
	function renderClient() {
		function render(data) {
			var string = "";
			$("#lengthClient").text(data.length);
			for (var i = 0; i < data.length; i++) {
				string += [
				"<div class='line'>",
					"<div class='line-boder'>",
						"<div class='title'>用户信息</div>",
						"<div class='delete' title='" + data[i].userinfoId + "'>X</div>",
						"<div class='content'>",
							"<div class='row'>",
								"<div class='left'>姓名(中文):</div>",
								"<div class='right'>"+ data[i].chineseName+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>姓名(拼音):</div>",
								"<div class='right'>"+ data[i].pinyinName+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>性别:</div>",
								"<div class='right'>"+ returnGender(data[i].gender)+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>出生日期:</div>",
								"<div class='right' title='"+ data[i].birthday + "'>"+getTimestamp(data[i].birthday)+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>年龄:</div>",
								"<div class='right'>"+ data[i].age+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>手机号码:</div>",
								"<div class='right'>"+ data[i].mobile+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>邮箱:</div>",
								"<div class='right'>"+ data[i].email+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>护照号:</div>",
								"<div class='right'>"+ ((data[i].passportNo==null)?"":data[i].passportNo)+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>潜水等级:</div>",
								"<div class='right'>"+ ChangeDiving(data[i].divingRank)+"</div>",
							"</div>",
							"<div class='row'>",
								"<div class='left'>潜水次数:</div>",
								"<div class='right'>"+ ((data[i].divingCount==null)?"":data[i].divingCount)+"</div>",
							"</div>",
						"</div>",
						"<div class='edit' title='"+ data[i].userinfoId + "' data-ID='"+i+"'>编辑</div>",
					"</div>",
				"</div>"
				].join('');
			}
			$("#renderAddres").html(string);
			$("#renderAddres .delete").click(function(event){
				deleteClient(event.target.title);
			});
			$("#renderAddres .edit").click(function(event){
				var myDataId = $(this).attr('data-ID')
				editClient(event,myDataId);
			});
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
				if (message.result == "0" ) {
					clientData = message.data;
					render(message.data);
				}
			}
		});
	}
	// 新增(用户信息)
	function addClient() {
		if (!(judge())) {
			return
		}
		if (!(/^[0-9]*$/.test($('.line input[name=DiveTimes]').val()))) {
			$('.line input[name=DiveTimes]').next().text('请输入纯数字');
			return false
		}
		$("#confirm").text("正在提交")
		var json = {
			"chineseName":$('.line input[name=ChineseName]').val(),
			"pinyinName":$('.line input[name=EnglishName]').val(),
			"gender": gender(),
			"birthday": changeTime(),
			"age":$('.line input[name=Age]').val(),
			"mobile":$('.line input[name=PhoneNumber]').val(),
			"email":$('.line input[name=Mailbox]').val(),
			"passportNo":($('.line input[name=Passport]').val() == null) ? null : $('.line input[name=Passport]').val(),
			"divingRank":($('.line select[name=Divelevel]').val() == "null") ? null : $('.line select[name=Divelevel]').val(),
			"divingCount":($('.line input[name=DiveTimes]').val() == null) ? null : $('.line input[name=DiveTimes]').val()
		}
		$.ajax({
			type: "POST", 
			url: appConfig.userinfoAdd, 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(json), 
			dataType: "json", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					hideModal();
					$("#confirm").text("保存");
					renderClient();
				}else {
					alert("未知错误，可能是输入参数有误，请重试")
					$("#confirm").text("保存");
					hideModal();
				}
			}
		});
	}
	// 验证(输入内容) => true or false
	function judge() {
		var _chack = true;
		if ($('.line input[name=ChineseName]').val() == "") {
			$('.line input[name=ChineseName]').next().text('请输入姓名(中文)');
			_chack = false
		}else if (!(/^[\u2E80-\u9FFF]+$/.test($('.line input[name=ChineseName]').val()))) {
			$('.line input[name=ChineseName]').next().text('只限输入中文');
			_chack = false
		}else {
			$('.line input[name=ChineseName]').next().text('');
		}
		if ($('.line input[name=EnglishName]').val() == "") {
			$('.line input[name=EnglishName]').next().text('请输入姓名(拼音)');
			_chack = false
		}else if (!(/^[a-zA-Z]{0,100}$/.test($('.line input[name=EnglishName]').val()))) {
			$('.line input[name=EnglishName]').next().text('请输入正确的姓名(不能带空格)');
			_chack = false
		}else {
			$('.line input[name=EnglishName]').next().text('');
		}
		// 因私普通护照号码格式有:14/15+7位数,G+8位数；因公普通的是:P.+7位数；公务的是：S.+7位数 或者 S+8位数,以D开头的是外交护照
		// if ($('.line input[name=Passport]').val() == "") {
		// 	$('.line input[name=Passport]').next().text('请输入护照号码')
		// 	_chack = false
		// }else if (!(/^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/.test($('.line input[name=Passport]').val()))) {
		// 	$('.line input[name=Phone]').next().text('请输入正确的护照号码')
		// 	_chack = false
		// }else {
		// 	$('.line input[name=Passport]').next().text('')
		// }
		if ($("select[class=sel_year]").val()=="0"||$("select[class=sel_month]").val()=="0"||$("select[class=sel_day]").val()=="0") {
			$("#sel_time").text('请选择年龄')
			_chack = false;
		}else {
			$("#sel_time").text('')
		}
		if ($('.line input[name=Age]').val() == "") {
			// 这个不验证了
			// $('.line input[name=Age]').next().text('请输入年龄');
			// _chack = false
		}else if (parseInt($('.line input[name=Age]').val()) >= 0 && parseInt($('.line input[name=Age]').val()) < 120 ) {
			$('.line input[name=Age]').next().text('');
		}else {
			$('.line input[name=Age]').next().text('年龄输入不正确');
			_chack = false
		}
		if ($('.line input[name=PhoneNumber]').val() == "") {
			$('.line input[name=PhoneNumber]').next().text('请输入手机号码')
			_chack = false
		}else if (!(/^1[34578]\d{9}$/.test($('.line input[name=PhoneNumber]').val()))) {
			$('.line input[name=PhoneNumber]').next().text('请输入正确的手机号码');
			_chack = false
		}else {
			$('.line input[name=PhoneNumber]').next().text('');
		}
		if ($('.line input[name=Mailbox]').val() == "") {
			$('.line input[name=Mailbox]').next().text('请输入邮箱');
			_chack = false
		}else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($('.line input[name=Mailbox]').val()))) {
			$('.line input[name=Mailbox]').next().text('请输入正确的邮箱');
			_chack = false
		}else {
			$('.line input[name=Mailbox]').next().text('');
		}
		if ($('.line input[name=DiveTimes]').val() == "") {

		}else {
			if (!(/^[0-9]*$/.test($('.line input[name=DiveTimes]').val()))) {
				$('.line input[name=DiveTimes]').next().text('请输入纯数字');
				_chack = false
			}else{
				$('.line input[name=DiveTimes]').next().text('');
			}
		}
		return _chack
	}
	// 删除(data:userinfoId)
	function deleteClient(data) {
		var r = confirm("确定删除");
		if (r) {
		}else {
			return
		}
		$.ajax({
			type: "GET", 
			url: appConfig.userinfoId + data, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0" ) {
					renderClient();
				}
			}
		});
	}
	// 点击(编辑) (data:event) => 渲染(模态框)
	function editClient(data,ID) {
		var myModalData = clientData[ID];
		popModal();
		$("#confirm").css("display","none");
		$("#modifyAddres").attr("title",data.target.title);
		$("#confirmClient .title").text("修改用户信息");
		$('.line input[name=ChineseName]').val(myModalData.chineseName);
		$('.line input[name=EnglishName]').val(myModalData.pinyinName);
		judgeGender(myModalData.gender);
		$('.line input[name=Age]').val(myModalData.age);
		$('.line input[name=PhoneNumber]').val(myModalData.mobile);
		$('.line input[name=Mailbox]').val(myModalData.email);
		$('.line input[name=Passport]').val(myModalData.passportNo);
		// 渲染潜水等级
		$('.line select[name=Divelevel]').val(myModalData.divingRank);
		$('.line input[name=DiveTimes]').val(myModalData.divingCount);
		var datetime = new Date(myModalData.birthday);
		$(".sel_year").val(datetime.getFullYear());
		$(".sel_year").trigger('change');
		$(".sel_month").val(datetime.getMonth()+1);
		$(".sel_month").trigger('change');
		$(".sel_day").val(datetime.getDate());
		$(".sel_day").trigger('change');
	}
	// 提交(编辑)
	function editPush() {
		if (!(judge())) {
			return
		}
		if (!(/^[0-9]*$/.test($('.line input[name=DiveTimes]').val()))) {
			$('.line input[name=DiveTimes]').next().text('请输入纯数字');
			return false
		}
		$("#modifyAddres").text("正在提交")
		var json = {
			"userinfoId":$("#modifyAddres").attr("title"),
			"chineseName":$('.line input[name=ChineseName]').val(),
			"pinyinName":$('.line input[name=EnglishName]').val(),
			"gender": gender(),
			"birthday": changeTime(),
			"age":$('.line input[name=Age]').val(),
			"mobile":$('.line input[name=PhoneNumber]').val(),
			"email":$('.line input[name=Mailbox]').val(),
			"passportNo":($('.line input[name=Passport]').val() == null) ? null : $('.line input[name=Passport]').val(),
			"divingRank":($('.line select[name=Divelevel]').val() == "null") ? null : $('.line select[name=Divelevel]').val(),
			"divingCount":($('.line input[name=DiveTimes]').val() == null) ? null : $('.line input[name=DiveTimes]').val()
		}
		$.ajax({
			type: "POST", 
			url: appConfig.userupdate, 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(json), 
			dataType: "json", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					hideModal()
					$("#modifyAddres").text("保存");
					renderClient();
				}else {
					alert("未知错误，可能是输入参数有误，请重试")
				}
			}
		});
	}


	// 绑定事件
		function bindEvents() {
			$("#addClient").click(function(){
				popModal();
				$("#modifyAddres").css("display","none");
				$("#confirmClient .title").text("新增用户信息");
			});
			$("#confirmClient .delete").click(function(){
				hideModal();
			});
			$("#confirm").click(function(){
				addClient();
			});
			$("#modifyAddres").click(function () {
				editPush();
			});
			$("input").change(function() {
				judge();
			});
			$("#ChineseName").blur(function(event) {
				$("#EnglishName").val(ConvertPinyin($(this).val()));
				$("#EnglishName").trigger("blur");
				judge();
			});
			$("#time select").change(function(event) {
				if ($("select[class=sel_year]").val()!="0"&&$("select[class=sel_month]").val()!="0"&&$("select[class=sel_day]").val()!="0") {
					var nawDate = Date.parse(new Date());
					var selectDate = Date.parse(new Date(changeTime()));
					var outputDate = Math.ceil((nawDate - selectDate)/31536000000);
					$("#Age").val(outputDate);
				}
				judge();
			});
		}
		// 绑定生日 插件
		$(function () {
			$.ms_DatePicker({
				YearSelector: ".sel_year",
				MonthSelector: ".sel_month",
				DaySelector: ".sel_day"
		    });
			$.ms_DatePicker();
		});
		// 时间戳 => 201x-xx-xx
		function getTimestamp(date){
			var newdate = new Date(date),
				thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
			return thisString
		}
		// 201x-xx-xx => yyyyMMdd
		function changeTime() {
			var myDate = new Date(parseInt($("select[class=sel_year]").val()), (parseInt($("select[class=sel_month]").val())-1), parseInt($("select[class=sel_day]").val()));

		    var yyyy = myDate.getFullYear();

		    var mm = myDate.getMonth() + 1;
		    mm = mm < 10 ? '0' + mm : mm;

		    var dd = myDate.getDate();
		    dd = dd < 10 ? '0' + dd : dd;

		    return '' + yyyy + '-' + mm + '-' + dd;
		}
		// 性别(保密 => 0 , 先生 => 1 , 女士 => 2)
		function gender() {
			if ($('#secret').prop('checked')) {
				return 0
			}else if ($('#male').prop('checked')) {
				return 1
			}else if ($('#female').prop('checked')) {
				return 2
			}
		}
		// 性别(0 => 保密 , 1 => 先生 , 2 => 女士)
		function returnGender(data) {
			if (data == 0) {
				return "保密"
			}else if (data == 1) {
				return "先生"
			}else if (data == 2) {
				return "女士"
			}
		}
		// 性别(保密 => input , 先生 => input , 女士 => input)
		function judgeGender(data) {
			if (data == "保密") {
				$('#secret').prop('checked',true);
			}else if (data == "先生") {
				$('#male').prop('checked',true);
			}else if (data == "女士") {
				$('#female').prop('checked',true);
			}
		}
		// 弹出(模态框)
		function popModal() {
			$("#confirmClient").css("display","block");
			$("#containClient").css("display","none");
		}
		// 清空(模态框) & 隐藏(模态框)
		function hideModal() {
			$("input").val("")
			$("#confirmClient").css("display","none");
			$("#containClient").css("display","block");
			$("#confirm").css("display","block");
			$("#modifyAddres").css("display","block");
			$('.line input[name=ChineseName]').next().text('');
			$('.line input[name=EnglishName]').next().text('');
			$('.line input[name=Age]').next().text('');
			$('.line input[name=PhoneNumber]').next().text('');
			$('.line input[name=Mailbox]').next().text('');
		}
	bindEvents();
	renderClient();
}
function ChangeDiving(Rank) {
	if ( Rank == "1" ) {
		return 'OW(初级潜水员)'
	}else if ( Rank == "2" ) {
		return 'AO以上(初级潜水员以上)'
	}/*else if ( Rank == "3" ) {
		return 'EFR(第一紧急反应)'
	}else if ( Rank == "4" ) {
		return 'RESCUE(救援潜水员)'
	}else if ( Rank == "5" ) {
		return 'MASTER SCUBA(名仕潜水员)'
	}else if ( Rank == "6" ) {
		return 'MASTER(潜水长)'
	}else if ( Rank == "7" ) {
		return 'OWSI(开放水域水肺教练)'
	}else if ( Rank == "8" ) {
		return 'MSDT(名仕潜水员训练官)'
	}else if ( Rank == "9" ) {
		return 'MASTER INSTRUCTOR(教练长)'
	}*/else {
		return ''
	}
}