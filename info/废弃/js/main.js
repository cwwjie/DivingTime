/**
 * 本地环境 http://192.168.2.100:8080
 * 生产环境 www.divingtime.asia
 * 生产环境 http://112.74.92.97:8080
 */
var URLbase = "http://192.168.2.100:8080";
/**
 * 本地 /Dvt-web
 * 生产 /dvtweb
 */
var URLversion = "/Dvt-web"
/*———————————————————————————————————————————暂时———————————————————————————————————————————*/



$(document).ready(function() {


    // 初始化模态框
    $('.modal-trigger').leanModal({
    	dismissible: false // 点击模态框外部则关闭模态框
    });
    // 判断页面是否失效
    checkPage();
});
// 所有数据存放点;
var dataAll = {
		"mainInfo":{
	        "infoId": null,
	        "orderSn": null,
	        "orderSrc": null,
	        "peopleNum": null,
	        "customerInfoList": null
    	},
		"customerInfoList":[]
	},
	// 暂时的假数据
	dataInit = {
        "linkId": 2,
        "link": "http://www.divingtime.asia/info/gather.html?uk=ff64a73f-4fbf-4610-9e1b-2680512e3d28",
        "uniqueKey": "ff64a73f-4fbf-4610-9e1b-2680512e3d28",
        "isValid": "Y",
        "orderSn": "24110336****0688",
        "orderSrc": "TB",
        "peopleNum": 3,
        "createBy": 1,
        "createTime": 1486880468000,
        "updateBy": null,
        "updateTime": null
    };
// 初始化所有
function initAll() {
	// 初始化工具提示
    $('.tooltipped').tooltip({delay: 50});
	// 初始化 选择框
    $('select').material_select();
    // 初始化 日期选择 http://www.jqueryscript.net/demo/Lightweight-jQuery-Date-Input-Picker/docs.htm
	$('.datepicker').pickadate({
		today: false,
		format: 'yyyy mm dd',
		formatSubmit: 'yyyy/mm/dd',
		selectMonths: true,
		selectYears: 90
	});
	$("#liveBirthday").data('pickadate').clear()
	$('.datepicker_diving').pickadate({
		format: 'yyyy mm dd',
		formatSubmit: 'yyyy/mm/dd',
		selectMonths: true,
		selectYears: 15
	});
	$('.datepicker_flightDate').pickadate({
		format: 'yyyy mm dd',
		formatSubmit: 'yyyy/mm/dd',
		selectMonths: true,
		selectYears: 3
	});
    $('ul.tabs').tabs();
	// 初始化 第一页
	pageFirst.init();
	// 初始化 第二页
	pageSecond.init();
	// 初始化 第三页
	pageThird.init();
}
// 判断页面是否失效
function checkPage() {
	$('#modal1').openModal({
   		dismissible: false // 点击模态框外部则关闭模态框
	});
					$('#modal1').closeModal();
					initAll();
	// $.ajax({
	// 	type:"GET",
	// 	url: URLbase + URLversion + "/gather/link/" + loadPageVar("uk") + "/get.do",
	// 	contentType:"application/json; charset=utf-8", 
	// 	async:false,
	// 	success: function (message) {
	// 		console.log(message)
	// 		if (message.result == "0" ) {
	// 			if (message.data.isValid == "Y") {
	// 				$('#modal1').closeModal();
	// 				dataInit = message.data;
	// 				initAll();
	// 			}
	// 		}
	// 	}
	// })
}
/**
 * 第一页
 */
var pageFirst = (function(){
	// 初始化 是否可以下一页?
	var dataAllow = {
		BasicName:{
			// allow:false 表示必填 allow:true 表示不用填都可以通过
			allow:false,
			data:null
		},
		BasicAccount:{
			allow:true,
			data:null
		},
		BasicPhone:{
			allow:false,
			data:null
		},
		BasicEmail:{
			allow:false,
			data:null
		},
		urgentName:{
			allow:false,
			data:null
		},
		urgentRelation:{
			allow:false,
			data:null
		},
		urgentPhone:{
			allow:false,
			data:null
		},
		urgentEmail:{
			allow:false,
			data:null
		}
	};
	function init() {
		$("#nav_1").css("color","#ee6e73");
		var orderInfor = "订单号: " + dataInit.orderSn + "， 人数: " + dataInit.peopleNum + "，  来源" + (dataInit.orderSrc=="TB"?"淘宝":"潜游时光");
		document.getElementById("orderInfor").value = orderInfor ;
		// 判断 个人姓名是否为空
		$("#BasicName").blur(function(event){
			dataAllow.BasicName = testNull(event);
			dataAllow.BasicName.data = event.target.value;
		})
		// 判断 付款账号名 是否为空
		$("#BasicAccount").blur(function(event){
			dataAllow.BasicAccount.data = event.target.value;
		})
		// 判断 个人手机号码 是否正确
		$("#BasicPhone").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testNull(event);
		})
		// 判断 个人邮箱 是否正确
		$("#BasicEmail").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testEmail(event);
		})

		// 判断 紧急联系人信息 是否为空
		$("#urgentName").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testNull(event);
		})
		// 判断 紧急联系人关系 是否选择
		$("#urgentRelation").blur(function(event){
			dataAllow.urgentRelation = testNull(event);
		})
		// 判断 紧急联系人手机号码 是否正确
		$("#urgentPhone").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testNull(event);
		})
		// 判断 紧急联系人邮箱 是否正确
		$("#urgentEmail").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testEmail(event);
		})

		// 点击下一步
		$("#toPageSecond").click(function(){
			nextPage();
		})
	}
	// 点击下一步
	function nextPage() {
		for(var _name in dataAllow){
			if (dataAllow[_name].allow == false) {
				Materialize.toast('个人信息尚未完成', 4000)
				return
			}
		}
		dataAll.mainInfo.signName = dataAllow.BasicName.data;
		dataAll.mainInfo.payAccount = dataAllow.BasicAccount.data;
		dataAll.mainInfo.mobile = dataAllow.BasicPhone.data;
		dataAll.mainInfo.email = dataAllow.BasicEmail.data;
		dataAll.mainInfo.iceName = dataAllow.urgentName.data;
		dataAll.mainInfo.iceRelation = dataAllow.urgentRelation.data;
		dataAll.mainInfo.iceMobile = dataAllow.urgentPhone.data;
		dataAll.mainInfo.iceEmail = dataAllow.urgentEmail.data;
		// 初始化转换过来的
		$("#livePhone").val(dataAllow.BasicPhone.data);
		$("#liveEmail").val(dataAllow.BasicEmail.data);

		$("#toPageSecond").css("display","none");
		$("#returnPageFirst").css({
			"visibility":"visible",
			"display":"inline-block"
		});
		$("#toPageThird").css("display","inline-block");
		$("#nav_1").css("color","#000000");
		$("#nav_2").css("color","#ee6e73");
    	$('ul.tabs').tabs('select_tab', 'test2');
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();
/**
 * 第二页
 */
var pageSecond = (function(){
	// 初始化 设置 所有数据
	var cardperson = {
		PassportNumber:{
			// false 表示必填 才可以通过 true 表示不填 都可以通过
			allow:true,
			// data 表示数据
			data:null
		},
		liveCountry:{
			allow:false,
			data:null
		},
		liveName:{
			allow:false,
			data:null
		},
		livePinyin:{
			allow:false,
			data:null
		},
		sex:{
			allow:true,
			data:1
		},
		liveBirthday:{
			allow:true,
			data:null
		},
		livebed:{
			allow:true,
			data:null
		},
		DivingType:{
			allow:true,
			// exist 表示是否开启潜水
			isDive:"N",
			data:{
				Divelevel:null,
				DiveAmount:null,
				divingTime:null,
				MajorDisease:null
			}
		},
		Remarks:{
			allow:true,
			data:null
		}
	}
	// 有多少个客人信息，就多少个数组,注意：唯一标示ID就是数组长度
	var dataAllow = [
		{
			delete:false,
			data:cardperson
		}
	];
	function init() {
		// 初始化选择度假潜水类型
		$("#DivingType").click(function(event){
			dataAllow[0].data.DivingType.isDive = showDiving(event);
		});
		// 初始化 隐藏
		$(".Divelevel")[0].getElementsByClassName("select-dropdown")[0].setAttribute("disabled","");
		// 初始化 删除客人信息
		$("#delete").click(function(event){
			var num = 0;
			for (var i = 0; i < dataAllow.length; i++) {
				// 如果有没有删除的标签 num 就加一个
				if (dataAllow[i].delete == false) {
					num++
				}
			}
			if (num <= 1) {// 如果没有删除的标签少于等于一个 不能删除第一个
				Materialize.toast('至少填写一名旅客信息', 4000);
			}else{// 如果没有删除的标签大于一个 可以删除第一个 并且初始化 客人信息
				dataAllow[0] = {
					delete:true,
					data:null
				}
				$("#card-panel").remove();
			}
		});
		// 初始化 客人信息 根据加载进来的数据
		for (var i = 1; i < dataInit.peopleNum; i++) {
			RenderCard();
		}
		// 初始化 添加客人信息
		$("#addTravelers").click(function(event){
			RenderCard();
		});
		// 初始化 返回上一页
		$("#returnPageFirst").click(function(){
			$("#nav_2").css("color","#000000");
			$("#nav_1").css("color","#ee6e73");
    		$('ul.tabs').tabs('select_tab', 'test1');
    		$("#returnPageFirst").css("visibility","hidden");
    		$("#toPageSecond").css("display","block");
    		$("#toPageThird").css("display","none");
		})
		// 初始化 进入下一页
		$("#toPageThird").click(function(){
			nextPage();
		})

		// 护照号码
		$("#PassportNumber").change(function(event){
			dataAllow[0].data.PassportNumber.data = event.target.value;
		});
		// 国籍
		$("#liveCountry").change(function(event){
			dataAllow[0].data.liveCountry = testNull(event);
		});
		// 姓名(中文)
		$("#liveName").blur(function(event){
			dataAllow[0].data.liveName = testNull(event);
		});
		// 姓名(拼音)
		$("#livePinyin").blur(function(event){
			dataAllow[0].data.livePinyin = testPinyin(event);
		});
		// 性别
		$("#client_man").click(function(){
			dataAllow[0].data.sex.allow = true;
			dataAllow[0].data.sex.data = 1;
		})
		$("#client_girls").click(function(){
			dataAllow[0].data.sex.allow = true;
			dataAllow[0].data.sex.data = 2;
		})
		// 生日
		$("#liveBirthday").change(function(event){
			dataAllow[0].data.liveBirthday = testNull(event);
			dataAllow[0].data.liveBirthday.data = returnDatestamp(event.target.value);
		});
		// 请选择潜水级别
		$("#Divelevel").change(function(event){
			if (event.target.value == "null") {
				dataAllow[0].data.DivingType.Divelevel = null;
			}else{
				dataAllow[0].data.DivingType.Divelevel = event.target.value;
			}
		});
		// 潜水次数
		$("#DiveAmount").change(function(event){
			dataAllow[0].data.DivingType.DiveAmount = event.target.value;
		});
		// 上次潜水时间
		$("#diving_time").change(function(event){
			dataAllow[0].data.DivingType.divingTime = returnDatestamp(event.target.value);
		});
		// 以往重大病史
		$("#MajorDisease").change(function(event){
			dataAllow[0].data.DivingType.MajorDisease = event.target.value;
		});
		// 以往重大病史
		$("#Remarks").change(function(event){
			dataAllow[0].data.Remarks = event.target.value;
		});
	}
	// 进入下一页
	function nextPage() {
		for (var i = 0; i < dataAllow.length; i++) {
			for(var _cardperson in dataAllow[i].data){
				if (dataAllow[i].data[_cardperson].allow == false) {
					Materialize.toast('入住信息尚未完成', 4000)
					return
				}
			}
		}
		var _Array = [];
		for (var j = 0; j < dataAllow.length; j++) {
			var obj = {
	            "customerId": null,
	            "passportNo":  dataAllow[j].data.PassportNumber.data,
	            "nationality": dataAllow[j].data.liveCountry.data,
	            "chineseName": dataAllow[j].data.liveName.data,
	            "pinyinName": dataAllow[j].data.livePinyin.data,
	            "gender": dataAllow[j].data.sex.data,
	            "birthday": dataAllow[j].data.liveBirthday.data,
	            "bedType": dataAllow[j].data.livebed.data,
	            "isDive": dataAllow[j].data.DivingType.isDive,
	            "divingRank": dataAllow[j].data.DivingType.data.Divelevel,
	            "divingCount": dataAllow[j].data.DivingType.data.DiveAmount,
	            "lastDiveTime": dataAllow[j].data.DivingType.data.divingTime,
	            "anamnesis": dataAllow[j].data.DivingType.data.MajorDisease,
	            "notes": dataAllow[j].data.Remarks.data,
	            "infoId": null
			}
			_Array.push(obj);
		}
		dataAll.customerInfoList = _Array;
		$("#nav_2").css("color","#000000");
		$("#nav_3").css("color","#ee6e73");
    	$('ul.tabs').tabs('select_tab', 'test3');
		$("#returnPageSecond").css("display","inline-block");
		$("#returnPageFirst").css("display","none");
		$("#toPageFourth").css("display","block");
		$("#toPageThird").css("display","none");
	}
	// 渲染新的 客人信息
	function RenderCard() {	// 唯一标示ID就是数组长度
		var _ID = dataAllow.length;
		var _tem = dataAllow.length;
		var _push = false;
		// 遍历整个数组，查看是否有删除
		for (var i = 0; i < _tem; i++) {
			// 如果有删除     不是新数组
			// 那么将ID定位到 删除那个ID
			if (dataAllow[i].delete == true) {
				dataAllow[i] = {
					delete:false,
					data:cardperson
				}
				_ID = (i + 1);
				_push = false;
				break;
			}else{
				_push = true;
			}
		}
		// 如果是新数组 则 新增
		if (_push == true) {
			dataAllow.push({
				delete:false,
				data:cardperson
			});
			_ID++
		}
		var _string = "<div id='card-panel"//
			+_ID+"' class='card-panel _part'><div class='row delete'><a class='title'>"//
			+_ID+"</a><i id='delete"//
			+_ID+"' class='mdi-navigation-close right' data-delete="//
			+( _ID - 1 )+" style='display: none;'></i></div><div class='row'><div class='input-field col s6'><input id='PassportNumber"//
			+_ID+"' type='text' class='validate' data-ID='PassportNumber'><label for='PassportNumber"//
			+_ID+"'>护照号码</label></div><div class='input-field col s6'><select id='liveCountry"//
			+_ID+"'  class='initialized'><option value='' selected>请选择国籍</option><option value='中国 CHINA'>中国/CHINA</option><option value='中国-香港/HONGKONG CHINA'>中国-香港 HONGKONG-CHINA</option><option value='中国-澳门/MACAO CHINA'>中国-澳门 MACAO-CHINA</option><option value='中国-台湾/TAIWAN CHINA'>中国-台湾 TAIWAN-CHINA</option></select></div></div><div class='row'><div class='input-field col s6'><input id='liveName"//
			+_ID+"' type='text' class='validate' data-ID='liveName'><label for='liveName"//
			+_ID+"'>姓名(中文)</label></div><div class='input-field col s6'><input id='livePinyin"//
			+_ID+"' type='text' class='validate' data-ID='livePinyin'><label for='livePinyin"//
			+_ID+"'>姓名(拼音)</label></div></div><div class='row'><div class='input-field col s6'><form action='#'><input class='with-gap' name='client_sex' type='radio' id='client_man"//
			+_ID+"' checked /><label for='client_man"//
			+_ID+"'>男</label><input class='with-gap' name='client_sex' type='radio' id='client_girls"//
			+_ID+"' /><label for='client_girls"//
			+_ID+"'>女</label></form></div><div class='input-field col s6'><input id='liveBirthday"//
			+_ID+"' value='yyyy-MM-dd' data-value='1972/01/01' type='date' class='datepicker validate' data-ID='liveBirthday' placeholder='生日(与护照一致)'><label for='liveBirthday"//
			+_ID+"'>生日(与护照一致)</label></div></div><div class='row'><div class='input-field col s6'><input id='livePhone"//
			+_ID+"' type='tel'><label for='livePhone'>手机号码(电话)</label></div><div class='input-field col s6'><input id='liveEmail"//
			+_ID+"' type='email' class='validate' data-ID='liveEmail'><label for='liveEmail'>邮箱</label></div></div><div class='row'><div class='input-field col s12'><select id='livebed"//
			+_ID+"' class='initialized' data-ID='livebed'><option value='0' disabled selected>请选择床型</option><option value='大床'>大床</option><option value='双床'>双床</option><option value='蜜月大床'>蜜月大床</option><option value='大床+单床'>大床+单床</option><option value='双床+单床'>双床+单床</option></select><label>床型</label></div></div><div class='row' style='padding-top: 20px;'><div class='switch col s12'>度假潜水类型<label><input id='DivingType"//
			+_ID+"' class='typeDiving' type='checkbox' data-diving='false'><span class='lever'></span><span id='diving"//
			+_ID+"'>非潜水</span></label></div></div><div class='row'><div class='input-field col s6' id='Dive_level"//
			+_ID+"'><select id='Divelevel"//
			+_ID+"' class='initialized Divelevel' data-ID='Divelevel'><option value='0' selected>请选择潜水级别</option><option value='1'>OW(初级潜水员)</option><option value='2'>AOW(开放水域进阶潜水员)</option><option value='3'>EFR(第一紧急反应)</option><option value='4'>RESCUE(救援潜水员)</option><option value='5'>MASTER SCUBA(名仕潜水员)</option><option value='6'>MASTER(潜水长)</option><option value='7'>OWSI(开放水域水肺教练)</option><option value='8'>MSDT(名仕潜水员训练官)</option><option value='9'>MASTER INSTRUCTOR(教练长)</option><option value='0'>无</option></select><label></label></div><div class='input-field col s6'><input disabled id='DiveAmount"//
			+_ID+"' type='text' class='validate DiveNumber' data-ID='DiveAmount'><label for='DiveAmount"//
			+_ID+"'>潜水次数</label></div></div><div class='row'><div class='input-field col s12'><input disabled id='diving_time"//
			+_ID+"' type='date' class='datepicker_diving diving_time' data-ID='divingTime'><label for='diving_time"//
			+_ID+"'>上次潜水时间</label></div></div><div class='row'><div class='input-field col s12'><input disabled id='MajorDisease"//
			+_ID+"' type='text' class='validate MajorDisease' data-ID='MajorDisease'><label for='MajorDisease"//
			+_ID+"'>以往重大病史</label></div></div><div class='row'><div class='row'><form class='col s12'><div class='row'><div class='input-field col s12'><textarea id='Remarks"//
			+_ID+"' class='materialize-textarea' data-ID='Remarks'></textarea><label for='Remarks"//
			+_ID+"'>备注</label></div></div></form></div></div></div>";
		// 渲染进去
		$("#renderTravelers").append(_string);
		// 初始化 选择框
		$('#liveCountry'+_ID).material_select();
		$('#Divelevel'+_ID).material_select();
		$('#livebed'+_ID).material_select();
		// 初始化 时间框1
		$('.datepicker').pickadate({
			today: false,
			format: 'yyyy mm dd',
			formatSubmit: 'yyyy/mm/dd',
			selectMonths: true,
			selectYears: 90
		});
		$("#liveBirthday"+_ID).data( 'pickadate' ).clear();
		// 初始化 时间框2
		$('.datepicker_diving').pickadate({
			format: 'yyyy mm dd',
			formatSubmit: 'yyyy/mm/dd',
			selectMonths: true,
			selectYears: 15
		});
		// 选择度假潜水类型
		$("#DivingType"+_ID).click(function(event){
			dataAllow[(_ID-1)].data.DivingType.isDive = showDiving(event);
		});
		// 初始化 删除客人信息
		$("#delete"+_ID).click(function(event){
			var num = 0;
			for (var i = 0; i < dataAllow.length; i++) {
				// 如果有没有删除的标签 num 就加一个
				if (dataAllow[i].delete == false) {
					num++
				}
			}
			if (num <= 1) {
				// 如果没有删除的标签少于等于一个 不能删除
				Materialize.toast('至少填写一名旅客信息', 4000);
			}else{
				// 如果没有删除的标签打于一个 可以删除并且初始化个人信息
				dataAllow[(_ID - 1)] = {
					delete:true,
					data:null
				}
				$("#card-panel"+_ID).remove();
			}
		});
		// 初始化隐藏
		$("#Dive_level"+_ID)[0].getElementsByClassName("select-dropdown")[0].setAttribute("disabled","");

		// 护照号码
		$("#PassportNumber"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.PassportNumber.data = event.target.value;
		});
		// 国籍
		$("#liveCountry"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.liveCountry = testNull(event);
		});
		// 姓名(中文)
		$("#liveName"+_ID).blur(function(event){
			dataAllow[(_ID-1)].data.liveName = testNull(event);
		});
		// 姓名(拼音)
		$("#livePinyin"+_ID).blur(function(event){
			dataAllow[(_ID-1)].data.livePinyin = testPinyin(event);
		});
		// 性别
		$("#client_man"+_ID).click(function(){
			dataAllow[(_ID-1)].data.sex.allow = true;
			dataAllow[(_ID-1)].data.sex.data = 1;
		})
		$("#client_girls"+_ID).click(function(){
			dataAllow[(_ID-1)].data.sex.allow = true;
			dataAllow[(_ID-1)].data.sex.data = 2;
		})
		// 生日
		$("#liveBirthday"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.liveBirthday = testNull(event);
			dataAllow[(_ID-1)].data.liveBirthday.data = returnDatestamp(event.target.value);
		});
		// 请选择潜水级别
		$("#Divelevel"+_ID).change(function(event){
			if (event.target.value == "0") {
				dataAllow[(_ID-1)].data.DivingType.Divelevel = null;
			}else{
				dataAllow[(_ID-1)].data.DivingType.Divelevel = event.target.value;
			}
		});
		// 潜水次数
		$("#DiveAmount"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.DivingType.DiveAmount = event.target.value;
		});
		// 上次潜水时间
		$("#diving_time"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.DivingType.divingTime = returnDatestamp(event.target.value);
		});
		// 以往重大病史
		$("#MajorDisease"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.DivingType.MajorDisease = event.target.value;
		});
		// 以往重大病史
		$("#Remarks"+_ID).change(function(event){
			dataAllow[(_ID-1)].data.Remarks = event.target.value;
		});
	}
	// 选择度假潜水类型
	function showDiving(event) {
		// 潜水类型
		var divingTypes = event.target.nextElementSibling.nextElementSibling,
		// 整个标签元素
		labelDOM = event.target.parentElement.parentElement.parentElement.parentElement;
		if (event.target.getAttribute("data-diving") == "false") {
			// 如果不潜水
			divingTypes.innerHTML = "潜水";
			event.target.setAttribute("data-diving","true");
			labelDOM.getElementsByClassName("Divelevel")[0].getElementsByClassName("select-dropdown")[0].removeAttribute("disabled");
			labelDOM.getElementsByClassName("DiveNumber")[0].removeAttribute("disabled");
			labelDOM.getElementsByClassName("diving_time")[0].removeAttribute("disabled");
			labelDOM.getElementsByClassName("MajorDisease")[0].removeAttribute("disabled");
			return "N"
		}else {
			// 如果潜水
			divingTypes.innerHTML = "非潜水";
			event.target.setAttribute("data-diving","false");
			labelDOM.getElementsByClassName("Divelevel")[0].getElementsByClassName("select-dropdown")[0].setAttribute("disabled","");
			labelDOM.getElementsByClassName("DiveNumber")[0].setAttribute("disabled","");
			labelDOM.getElementsByClassName("diving_time")[0].setAttribute("disabled","");
			labelDOM.getElementsByClassName("MajorDisease")[0].setAttribute("disabled","");
			return "Y"
		}
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();
/**
 * 第三页
 */
var pageThird = (function(){
	// 初始化 是否可以下一页?
	var dataAllow = {
		checkIn:{
			// allow:false 表示必填 allow:true 表示不用填都可以通过
			allow:false,
			data:null
		},
		checkOut:{
			allow:false,
			data:null
		},
		// 国际航班号
		outboundNum:{
			allow:true,
			data:null
		},
		landTime:{
			allow:true,
			data:null
		},
		landDate:{
			allow:true,
			data:null
		},
		// 到港航班号
		inboundNum:{
			allow:true,
			data:null
		},
		takeoffTime:{
			allow:true,
			data:null
		},
		takeoffDate:{
			allow:true,
			data:null
		},
		// 国际航班号
		inHarbourNum:{
			allow:true,
			data:null
		},
		hLandTime:{
			allow:true,
			data:null
		},
		hLandDate:{
			allow:true,
			data:null
		},
		// 离港航班号
		outHarbourNum:{
			allow:true,
			data:null
		},
		hTakeoffTime:{
			allow:true,
			data:null
		},
		hTakeoffDate:{
			allow:true,
			data:null
		}
	};
	function init() {
		// 初始化 time 选择器
		$('#landTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#takeoffTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#hLandTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#hTakeoffTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});

		// 初始化返回上一页
		$("#returnPageSecond").click(function(){
			$("#nav_3").css("color","#000000");
			$("#nav_2").css("color","#ee6e73");
			$("#returnPageSecond").css("display","none");
			$("#toPageFourth").css("display","none");
			$("#returnPageFirst").css("display","inline-block");
			$("#toPageThird").css("display","block");
	    	$('ul.tabs').tabs('select_tab', 'test2');
		});
		// 初始化下一页
		$("#toPageFourth").click(function(){
			nextPage();
		});

		// 入住日期
		$("#checkIn").change(function(event){
			dataAllow.checkIn = testNull(event);
			dataAllow.checkIn.data = returnDatestamp(dataAllow.checkIn.data);
		});
		// 退房日期
		$("#checkOut").change(function(event){
			dataAllow.checkOut = testNull(event);
			dataAllow.checkOut.data = returnDatestamp(dataAllow.checkOut.data);
		});

		// 国际航班号--------------------------------------------------
		$("#outboundNum").change(function(event){
			dataAllow.outboundNum.data = event.target.value
		});
		// 抵达日期
		$("#landDate").change(function(event){
			$("#_landDate").css('display', 'none');
			dataAllow.landDate.data = returnDatestamp(event.target.value);
		});
		// 抵达时间
		$("#landTime").change(function(event){
			if (event.target.value == "") {
				return
			}
			dataAllow.landTime.data = returnTimestamp(event.target.value);
		});

		// 到港航班号--------------------------------------------------
		$("#inboundNum").change(function(event){
			dataAllow.inboundNum.data = event.target.value
		});
		// 抵达日期
		$("#takeoffDate").change(function(event){
			$("#_takeoffDate").css('display', 'none');
			dataAllow.takeoffDate.data = returnDatestamp(event.target.value);
		});
		// 抵达时间
		$("#takeoffTime").change(function(event){
			if (event.target.value == "") {
				return
			}
			dataAllow.takeoffTime.data = returnTimestamp(event.target.value);
		});

		// 国际航班号--------------------------------------------------
		$("#inHarbourNum").change(function(event){
			dataAllow.inHarbourNum.data = event.target.value
		});
		// 起飞日期
		$("#hLandDate").change(function(event){
			$("#_hLandDate").css('display', 'none');
			dataAllow.hLandDate.data = returnDatestamp(event.target.value);
		});
		// 抵达时间
		$("#hLandTime").change(function(event){
			if (event.target.value == "") {
				return
			}
			dataAllow.hLandTime.data = returnTimestamp(event.target.value);
		});

		// 国际航班号--------------------------------------------------
		$("#outHarbourNum").change(function(event){
			dataAllow.outHarbourNum.data = event.target.value
		});
		// 起飞日期
		$("#hTakeoffDate").change(function(event){
			$("#_hTakeoffDate").css('display', 'none');
			dataAllow.hTakeoffDate.data = returnDatestamp(event.target.value);
		});
		// 抵达时间
		$("#hTakeoffTime").change(function(event){
			if (event.target.value == "") {
				return
			}
			dataAllow.hTakeoffTime.data = returnTimestamp(event.target.value);
		});
	}
	function nextPage() {
		for(var _name in dataAllow){
			if (dataAllow[_name].allow == false) {
				Materialize.toast('航班信息尚未完成', 4000)
				return
			}
		}
		dataAll.mainInfo.checkIn = dataAllow.checkIn.data;
		dataAll.mainInfo.checkOut = dataAllow.checkOut.data;

		dataAll.mainInfo.outboundNum = dataAllow.outboundNum.data;
		dataAll.mainInfo.landTime = dataAllow.landTime.data;
		dataAll.mainInfo.landDate = dataAllow.landDate.data;

		dataAll.mainInfo.inboundNum = dataAllow.inboundNum.data;
		dataAll.mainInfo.takeoffTime = dataAllow.takeoffTime.data;
		dataAll.mainInfo.takeoffDate = dataAllow.takeoffDate.data;

		dataAll.mainInfo.inHarbourNum = dataAllow.inHarbourNum.data;
		dataAll.mainInfo.hLandTime = dataAllow.hLandTime.data;
		dataAll.mainInfo.hLandDate = dataAllow.hLandDate.data;

		dataAll.mainInfo.outHarbourNum = dataAllow.outHarbourNum.data;
		dataAll.mainInfo.hTakeoffTime = dataAllow.hTakeoffTime.data;
		dataAll.mainInfo.hTakeoffDate = dataAllow.hTakeoffDate.data;
		$("#nav_3").css("color","#000000");
		$("#nav_4").css("color","#ee6e73");
		$("#toPageFourth").css("display","none");
		$("#returnPageSecond").css("display","none");
    	$('ul.tabs').tabs('select_tab', 'test4');
		pageFourth.init();
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();
/**
 * 第四页
 */
var pageFourth = (function(){
	function init() {
		console.log(dataAll)
		$.ajax({ 
			type: "POST", 
			url: URLbase + URLversion + "/gather/" + dataInit.uniqueKey + "/gather.do", 
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(dataAll),
			dataType: "json",
			success: function (message) {
				console.log(message)
				if (message.result == "0" ) {
					$("#_END").html("您的信息已经成功提交,并以邮件的形式通知后台客服人员");
					$("#_ENDiconNo").css("display","none");
					$("#_ENDiconOk").css("display","block");
				}
			}
		});
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();

/**
 * 测试手机
 */
function testPhone(event) {
	var obj = {
		data:event.target.value
	};
	if (!(/^1[34578]\d{9}$/.test(event.target.value))) {
		// 号码错误
		setTimeout(function(){
			event.target.setAttribute("class","validate invalid");
		},100);
		obj.allow = false;
	}else {
		// 号码正确
		event.target.setAttribute("class","validate valid");
		obj.allow = true;
	}
	return obj
}
/**
 * 测试为空
 */
function testNull(event) {
	var obj = {
		data:event.target.value.trim()
	};
	if (event.target.value.trim() == "") {
		// 为空
		setTimeout(function(){
			event.target.setAttribute("class","validate invalid");
		},100);
		obj.allow = false;
	}else {
		// 不为空
		setTimeout(function(){
			event.target.setAttribute("class","validate valid");
		},100);
		obj.allow = true;
	}
	return obj
}
/**
 * 测试拼音
 */
function testPinyin(event) {
	var obj = {
		data:event.target.value
	};
	if (event.target.value == "") {
		// 为空
		setTimeout(function(){
			event.target.setAttribute("class","validate invalid");
		},100);
		obj.allow = false;
	}else if (!(/^[a-zA-Z]{0,10000}$/.test(event.target.value))) {
		// 拼音错误
		setTimeout(function(){
			event.target.setAttribute("class","validate invalid");
		},100);
		obj.allow = false;
	}else {
		// 拼音正确
		event.target.setAttribute("class","validate valid");
		obj.allow = true;
	}
	return obj
}
/**
 * 测试邮箱
 */
function testEmail(event) {
	var obj = {
		data:event.target.value
	};
	if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value))) {
		// 邮箱不正确
		setTimeout(function(){
			event.target.setAttribute("class","validate invalid");
		},100);
		obj.allow = false;
	}else {
		// 邮箱正确
		event.target.setAttribute("class","validate valid");
		obj.allow = true;
	}
	return obj
}
// 获取一个 window.location.search 键值（key value）
function loadPageVar(sVar) {
  return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// 方法 - 获取时间返回201x-xx-xx
function returnDate(date) {
	var newdate = new Date(date),
		thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
	return thisString
}
// 方法 - "201x xx xx" 转换字符串
function returnDatestamp(data) {
	var _Array = data.split(' ');
	var Timestamp = Date.parse(new Date(_Array[0],(parseInt(_Array[1]) - 1),_Array[2]));
	return Timestamp;
}
// 方法 - "xx:xx AM/PM" 转换字符串
function returnTimestamp(data) {
	var Timestamp = 0;
	var _Array = data.split(':');
	Timestamp += _Array[0]  * 1000 * 60 * 60;
	Timestamp += _Array[1]  * 1000 * 60;
	return Timestamp;
}