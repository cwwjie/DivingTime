$(document).ready(function() {
    // 初始化模态框
    $('.modal-trigger').leanModal({
    	dismissible: false // 点击模态框外部则关闭模态框
    });
    // 判断页面是否失效
    checkPage();
    initAll();
    console.log()
});
// 所有数据存放点;
var dataAll;
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
	$("#client_birthday").data( 'pickadate' ).clear()
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
	// 初始化 时间选择 http://amsul.ca/pickadate.js/time/
	$('.datepicker_flightTime').pickatime({
		clear: '关闭'
	});
	// 初始化 第一页
	pageFirst.init();
	pageSecond.init();
}
// 判断页面是否失效
function checkPage() {
	if (false) {
		initAll();
		dataAll = {
			"加载进数据":"ok"
		}
	}
}
/**
 * 第一页
 */
var pageFirst = (function(){
	// 是否可以下一页?
	var dataAllow = {
		BasicName:{
			allow:false
		},
		BasicAccount:{
			allow:false
		},
		BasicPhone:{
			allow:false
		},
		BasicEmail:{
			allow:false
		},
		urgentName:{
			allow:false
		},
		urgentRelation:{
			allow:false
		},
		urgentPhone:{
			allow:false
		},
		urgentEmail:{
			allow:false
		}
	};
	function init() {
		// 判断 个人姓名是否为空
		$("#BasicName").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testNull(event);
		})
		// 判断 付款账号名 是否为空
		$("#BasicAccount").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testNull(event);
		})
		// 判断 个人手机号码 是否正确
		$("#BasicPhone").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testPhone(event);
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
		$("#urgentRelation").change(function(event){
			var obj = {
				allow:true,
				data:event.target.value
			}
			dataAllow[event.target.getAttribute("data-ID")] = obj;
		})
		// 判断 紧急联系人手机号码 是否正确
		$("#urgentPhone").blur(function(event){
			dataAllow[event.target.getAttribute("data-ID")] = testPhone(event);
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
		$("#toPageSecond").css("display","none");
		$("#returnPageFirst").css({
			"visibility":"visible",
			"display":"inline-block"
		});
		$("#toPageThird").css("display","inline-block");
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
	var dataAllow = [
		{
			"infordata":{
			}
		}
	];
	function init() {
		// 选择度假潜水类型
		$(".typeDiving").click(function(event){
			showDiving(event)
		});
		// 添加客人信息
		$("#addTravelers").click(function(event){
			var _string = "<div class='card-panel _part'><div class='row delete'><i class='mdi-navigation-close right'></i></div><div class='row'><div class='input-field col s6'><input id='' type='text' class='validate'><label for=''>护照号码</label></div><div class='input-field col s6'><input id='' type='text' class='validate'><label for=''>国籍</label></div></div><div class='row'><div class='input-field col s6'><input id='' type='text' class='validate'><label for=''>姓名(中文)</label></div><div class='input-field col s6'><input id='' type='text' class='validate'><label for=''>姓名(拼音)</label></div></div><div class='row'><div class='input-field col s6'><input class='with-gap' name='client_sex' type='radio' id='client_man' checked /><label for='client_man'>男</label><input class='with-gap' name='client_sex' type='radio' id='client_girls' checked /><label for='client_girls'>女</label></div><div class='input-field col s6'><input id='client_birthday' value=''yyyy-MM-dd'' data-value='1972/01/01' type='date' class='datepicker'><label for='client_birthday'>生日(与护照一致)</label></div></div><div class='row'><div class='input-field col s12'><select class='initialized'><option value='0' disabled selected>请选择床型</option><option value='1'>大床</option><option value='2'>小床</option><option value='2'>双人床</option></select><label>床型</label></div></div><div class='row' style='padding-top: 20px;'><div class='switch col s12'>度假潜水类型<label><input class='typeDiving' type='checkbox'><span class='lever'></span><span id='diving'>非潜水</span></label></div></div><div class='row'><div class='input-field col s6'><select disabled class='initialized'><option value='0' disabled selected>请选择潜水级别</option><option value='1'>OW(初级潜水员)</option><option value='2'>AOW(开放水域进阶潜水员)</option><option value='3'>EFR(第一紧急反应)</option><option value='4'>RESCUE(救援潜水员)</option><option value='5'>MASTER SCUBA(名仕潜水员)</option><option value='6'>MASTER(潜水长)</option><option value='7'>OWSI(开放水域水肺教练)</option><option value='8'>MSDT(名仕潜水员训练官)</option><option value='9'>MASTER INSTRUCTOR(教练长)</option><option value='0'>无</option></select><label></label></div><div class='input-field col s6'><input disabled id='' type='text' class='validate'><label for=''>潜水次数</label></div></div><div class='row'><div class='input-field col s12'><input disabled id='diving_time' type='date' class='datepicker_diving'><label for='diving_time'>上次潜水时间</label></div></div><div class='row'><div class='input-field col s12'><input disabled id='' type='text' class='validate'><label for=''>以往重大病史</label></div></div><div class='row'><div class='row'><form class='col s12'><div class='row'><div class='input-field col s12'><textarea id='' class='materialize-textarea'></textarea><label for=''>备注</label></div></div></form></div></div></div>";
			$("#renderTravelers").prepend(_string);
			// 初始化 选择框
			$('select').material_select();
			// 初始化 时间框1
			$('.datepicker').pickadate({
				today: false,
				format: 'yyyy mm dd',
				formatSubmit: 'yyyy/mm/dd',
				selectMonths: true,
				selectYears: 90
			});
			$("#client_birthday").data( 'pickadate' ).clear();
			// 初始化 时间框2
			$('.datepicker_diving').pickadate({
				format: 'yyyy mm dd',
				formatSubmit: 'yyyy/mm/dd',
				selectMonths: true,
				selectYears: 15
			});
		});
		// 初始化隐藏
		$(".Divelevel")[0].getElementsByClassName("select-dropdown")[0].setAttribute("disabled","");
	}
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
		}else {
			// 如果潜水
			divingTypes.innerHTML = "非潜水";
			event.target.setAttribute("data-diving","false");
			labelDOM.getElementsByClassName("Divelevel")[0].getElementsByClassName("select-dropdown")[0].setAttribute("disabled","");
			labelDOM.getElementsByClassName("DiveNumber")[0].setAttribute("disabled","");
			labelDOM.getElementsByClassName("diving_time")[0].setAttribute("disabled","");
			labelDOM.getElementsByClassName("MajorDisease")[0].setAttribute("disabled","");
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
	function init() {

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
		data:event.target.value
	};
	if (event.target.value == "") {
		// 为空
		setTimeout(function(){
			event.target.setAttribute("class","validate invalid");
		},100);
		obj.allow = false;
	}else {
		// 不为空
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