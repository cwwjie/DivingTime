$(document).ready(function () {
	Switch();
	Render();
	judgLogin();
})
function Switch() {
	$(".mainContain li").click(function(event){
		if (event.target.tagName == "LI") {
			event.target.style.background = "#e7e7e7";
			window.location.hash = "#" + event.target.id;
		}else if (event.target.tagName == "I") {
			event.target.parentNode.style.background = "#e7e7e7";
			window.location.hash = "#" + event.target.parentNode.id;
		}
		Render();
	})
}
// window.location.hash #Person #Orders #Accoun #Addres #Client
function Render() {
	// 背景统一清空
	$(".mainContain li").css("background",'rgba(0, 0, 0, 0)');
	if (window.location.hash == "#Person" || window.location.hash == "") {
		$("#ContainR").load("./page/Person.html",function(){
			Person();
		});
		$("#Person").css("background","#e7e7e7");
	}else if (window.location.hash == "#Orders"){
		$("#ContainR").load("./page/Orders.html",function(){
			Orders();
		});
		$("#Orders").css("background","#e7e7e7");
	}else if (window.location.hash == "#Accoun"){
		$("#ContainR").load("./page/Account.html",function(){
			bindAccoun();
		});
		$("#Accoun").css("background","#e7e7e7");
	}else if (window.location.hash == "#Addres"){
		$("#ContainR").load("./page/Addres.html",function(){
			addres();
		});
		$("#Addres").css("background","#e7e7e7");
	}else if (window.location.hash == "#Client"){
		$("#ContainR").load("./page/Client.html",function(){
			client();
		});
		$("#Client").css("background","#e7e7e7");
	}else if (window.location.hash == "#taobao"){
		$("#ContainR").load("./page/taobao.html",function(){
			taobao();
		});
		$("#taobao").css("background","#e7e7e7");
	}
}
function Logout() {
	$("#Log_out").html("<i style='background-position:-312px -185px;'></i>正在退出")
	$.ajax({
		type: "POST", 
		url: appConfig.logout, 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			if (message.result == "0" ) {
				$.cookie('token',null,{path: '/' });
				$.cookie('digest',null,{path: '/' });
				window.location.href="./login.html";
			}
		}
	});
}
function judgLogin() {
	$.ajax({
		type: "GET", 
		url: appConfig.getUserInfo, 
		contentType: "application/json; charset=utf-8", 
		headers: {
			'token':$.cookie('token'),
			'digest':$.cookie('digest')
		},
		success: function (message) {
			if (message.result == "401") {
				window.location.href="./login.html";
			}else if (message.result == "0") {
				$("#login").text(message.data.nickname)
			}
		}
	});
}
// 地区-模块
function SelectCity() {
	var that_is = this;
	// 初始化 1：省，2：市，3：区  =>  储存到 localStorage
	this.renderRegion = function (region) {
		$.ajax({
			type: "GET", 
			url:appConfig.selectProvince+region+"/list.do", 
			contentType: "application/json; charset=utf-8", 
			success: function (message) {
				if (message.result=="0") {
					if (region == 1) {
						localStorage.setItem('province',JSON.stringify(message.data.regionList));
					}else if (region == 2) {
						localStorage.setItem('city',JSON.stringify(message.data.regionList));
					}else if (region == 3) {
						localStorage.setItem('county',JSON.stringify(message.data.regionList));
					}
				}
			}
		});
	}
	// 渲染省
	this.renderProv = function (DOM,regionId) {
		var prov_Array = JSON.parse(localStorage.getItem("province")),
			prov_String = "<option selected value='null' disabled='disabled'>省</option>";;
		for (var i = 0; i < prov_Array.length; i++) {
			if (prov_Array[i].regionId == regionId) {
				prov_String += "<option selected value='"//
					+prov_Array[i].regionId+"'>"//
					+prov_Array[i].regionName+"</option>";
			}else{
				prov_String += "<option value='"//
				+prov_Array[i].regionId+"'>"//
				+prov_Array[i].regionName+"</option>";
			}
		}
		DOM.html(prov_String);
	}
	// parentId(必须) DOM(必须) => 渲染下一个所有节点  regionId => 下一个节点(默认显示)
	this.renderChil =  function (parentId,DOM,regionId) {
		if (DOM !== null) {
			DOM.removeAttr("disabled");
		}
		function renderDOM(data) {
			var region_String = "<option value='null'>请选择...</option>";
			for (var i = 0; i < data.length; i++) {
				if (data[i].regionId == regionId) {
					region_String += "<option selected value='"+data[i].regionId+"'>"+data[i].regionName+"</option>";
				}else{
					region_String += "<option value='"+data[i].regionId+"'>"+data[i].regionName+"</option>";
				}
			}
			DOM.html(region_String);
		}
		$.ajax({
			type: "GET", 
			url: URLbase + URLversion+"/system/region/parentid/"+parentId+"/list.do", 
			contentType: "application/json; charset=utf-8", 
			success: function (message) {
				renderDOM(message.data.regionList);
			}
		});
	}
	this.bindEvents = function () {
		$("#city .prov").change(function(event){
			that_is.renderChil(event.currentTarget.value,$("#city .city"));
			$("#city .dist").html("");
		})
		$("#city .city").change(function(event){
			that_is.renderChil(event.currentTarget.value,$("#city .dist"));
		})
	}
	// renderChil(19,$("#city .city"),231);
	// renderChil(231,$("#city .dist"),2128);
	// renderProv($("#city .prov"),19);
	// renderRegion(1);
	// renderRegion(2);
	// renderRegion(3);
	// bindEvents();
}
// 创建(一个全局的 地区 实例)
var Cityinit = new SelectCity();
Cityinit.renderRegion(1);
Cityinit.renderRegion(2);
Cityinit.renderRegion(3);