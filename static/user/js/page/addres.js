// 收货地址
function addres() {
	// 显示隐藏 "添加收货地址模态框"
	function hidConfirm() {
		Cityinit.renderProv($("#city .prov"));
		$("#city .city").val("");
		$("#city .dist").val("");
		$(".containAddres").css("display","block");
		$("#confirmAddres").css("display","none");
		$('.line input[name=people]').val("");
		$('.line input[name=Addres]').val("");
		$('.line input[name=postal]').val("");
		$('.line input[name=Phone]').val("");
		$('.line input[name=tell]').val("");
		$('.line input[name=people]').next().text('')
		$('.line input[name=Addres]').next().text('')
		$('.line input[name=postal]').next().text('')
		$('.line input[name=Phone]').next().text('')
		$('.line input[name=tell]').next().text('')
		$("#modifyAddres").css("display","block");
		$("#confirm").css("display","block");
	}
	// 渲染弹出
	function renderConfirm(data,area_DOM) {
		$('.line input[name=people]').val(data[6]);
		$('.line input[name=Addres]').val(data[4]);
		$('.line input[name=postal]').val(data[1]);
		$('.line input[name=Phone]').val(data[3]);
		$('.line input[name=tell]').val(data[2]);
		Cityinit.renderProv($("#city .prov"),area_DOM.getAttribute("data-prov"));
		Cityinit.renderChil(area_DOM.getAttribute("data-prov"),$("#city .city"),area_DOM.getAttribute("data-city"));
		Cityinit.renderChil(area_DOM.getAttribute("data-city"),$("#city .dist"),area_DOM.getAttribute("data-county"));
	}
	// 显示弹出
	function showConfirm() {
		$(".containAddres").css("display","none");
		$("#confirmAddres").css("display","block");
	}
	// 判断输入
	function judge(){
		if ($('.line input[name=people]').val() == "") {
			$('.line input[name=people]').next().text('请输入收货人姓名')
			return false
		}else {
			$('.line input[name=people]').next().text('')
		}
		if ($("#city .prov").val() == null) {
			$("#city").next().text('请选择所在省')
			return false
		}else if ($("#city .city").val() == null || $("#city .city").val() == 'null') {
			$("#city").next().text('请选择所在市')
			return false
		}else if ($("#city .dist").val() == null || $("#city .dist").val() == 'null') {
			$("#city").next().text('请选择所在区')
			return false
		}else {
			$("#city").next().text('')
		}
		if ($('.line input[name=Addres]').val() == "") {
			$('.line input[name=Addres]').next().text('请输入收货人地址')
			return false
		}else {
			$('.line input[name=Addres]').next().text('')
		}
		if ($('.line input[name=postal]').val() == "") {
			$('.line input[name=postal]').next().text('请输入邮政编码')
			return false
		}else if ($('.line input[name=postal]').val().length !== 6) {
			$('.line input[name=postal]').next().text('请输入正确格式的邮政编码')
			return false
		}else {
			$('.line input[name=postal]').next().text('')
		}
		if ($('.line input[name=Phone]').val() == "") {
			$('.line input[name=Phone]').next().text('请输入手机号码')
			return false
		}else if (!(/^1[34578]\d{9}$/.test($('.line input[name=Phone]').val()))) {
			$('.line input[name=Phone]').next().text('请输入正确的手机号码')
			return false
		}else {
			$('.line input[name=Phone]').next().text('')
		}
		return true
	}
	// 渲染(首屏 收货地址)
	function renderAddres(){
		$("#renderAddres").html("正在加载..");
		$.ajax({
			type: "GET", 
			url: appConfig.version + "/user/address/findByUserId.do", 
			contentType: "application/json; charset=utf-8", 
			// data: JSON.stringify(json), 
			// dataType: "json", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					insert(message.data);
				}
			}
		});
		function insert(data){
			var string = "";
			for (var i = data.length - 1; i >= 0; i--) {
				string += "<div class='line'><div class='line-boder'><div class='title'>收货地址</div><div class='delete insert' title="//
				+data[i].addressId+">X</div><div class='content'><div class='row'><div class='left'>收货人:</div><div class='right'>"//
				+data[i].consignee+"</div></div><div class='row' data-prov='"//
				+data[i].province+"' data-city='"+data[i].city+"' data-county='"//
				+data[i].district+"'><div class='left'>所在地区:</div><div class='right'><span>"//
				+cityTransForm(data[i].province,"prov")+" </span><span>"//
				+cityTransForm(data[i].city,"city")+" </span><span>"//
				+cityTransForm(data[i].district,"county")+" </span></div></div><div class='row'><div class='left'>地址:</div><div class='right'>"//
				+data[i].street+"</div></div><div class='row'><div class='left'>手机号码:</div><div class='right'>"//
				+data[i].mobile+"</div></div><div class='row'><div class='left'>固定电话:</div><div class='right'>"//
				+((data[i].telephone==null)?'':data[i].telephone)+"</div></div><div class='row'><div class='left'>邮政编码:</div><div class='right'>"//
				+data[i].zipcode+"</div></div></div><div class='edit'>编辑</div></div></div>";
			}
			$("#renderAddres").html(string);
			$('.insert').bind('click',function (event){
				var r = confirm("确定删除");
				if (r) {
					deleteAddres(event);
				}
			})
			$('select').change(function(){
				judge();
			});
			$('input').change(function(){
				judge();
			});
			$(".edit").click(function(event) {
				showEdit(event);
			});
			$("#lengthAddres").text(data.length);
		}
	}
	// 展示编辑函数
	function showEdit(event){
		var addressId = event.target.offsetParent.childNodes[1].title,
			data = [];
		data.push(addressId);//这个并没有派上用场
		var string = event.target.offsetParent.childNodes[2].childNodes,
			area_DOM = event.target.offsetParent.childNodes[2].childNodes[1];
		for (var i = string.length - 1; i >= 0; i--) {
			data.push(string[i].childNodes[1].innerHTML);
		}
		renderConfirm(data,area_DOM);
		$("#modifyAddres").attr("title",addressId);
		$("#confirmAddres .title").text("修改收货地址")
		$("#modifyAddres").css("display","bolck");
		$("#confirm").css("display","none");
		showConfirm();
	}
	// 保存(编辑)
	function edit(){
		function pushModify(){
			$("#modifyAddres").text("正在提交");
			var json = {
				"addressId":Number($("#modifyAddres").attr("title")),
				"consignee": $('.line input[name=people]').val(),
			    "province":parseInt($("#city .prov").val()),
			    "city":parseInt($("#city .city").val()),
			    "district":parseInt($("#city .dist").val()),
			    "street": $('.line input[name=Addres]').val(),
			    "mobile": $('.line input[name=Phone]').val(),
			    "zipcode": $('.line input[name=postal]').val(),
			    "telephone": $('.line input[name=tell]').val(),
			}
			$.ajax({
				type: "POST", 
				url: appConfig.version + "/user/address/update.do", 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(json), 
				dataType: "json", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					$("#modifyAddres").text("保存")
					if (message.result == "0") {
						hidConfirm();
						renderAddres();
					}else if(message.result == "-1") {
						alert("参数错误")
					}
				}
			});
		}
		$("#modifyAddres").click(function(){
			if (judge()) {
				pushModify();
			}
		})
	}
	// 删除收货地址
	function deleteAddres(event){
		$.ajax({
			type: "GET", 
			url: appConfig.version + "/user/address/delete.do?addressId=" + event.target.title, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					renderAddres();
				}else {
					alert("未知错误，请重试")
					renderAddres();
				}
			}
		});
	}
	// 新增收货地址
	function addAddres(){
		// 提交(新增用户信息)
		function push(){
			$("#confirm").text("正在提交")
			var json = {
				"consignee": $('.line input[name=people]').val(),
			    "province":parseInt($("#city .prov").val()),
			    "city":parseInt($("#city .city").val()),
			    "district":parseInt($("#city .dist").val()),
			    "street": $('.line input[name=Addres]').val(),
			    "mobile": $('.line input[name=Phone]').val(),
			    "zipcode": $('.line input[name=postal]').val(),
			    "telephone": $('.line input[name=tell]').val(),
			}
			$.ajax({
				type: "POST", 
				url: appConfig.version + "/user/address/add.do", 
				contentType: "application/json; charset=utf-8", 
				data: JSON.stringify(json), 
				dataType: "json", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					$("#confirm").text("保存收货地址")
					if (message.result == "0") {
						hidConfirm();
						renderAddres();
					}else if(message.result == "-1") {
						alert("参数错误")
					}
				}
			});
		}
		$("#confirm").click(function(){
			if (judge()) {
				push();
			}
		});
	}
	/*
	 * 城市(id,area) => 城市(中文)
	 * @param {id}   城市的ID 唯一标示
	 * @param {area} 字符串 "prov" "city" "county"
	 */
	function cityTransForm(regionId,area) {
		if (area == "prov") {
			var prov_Array = JSON.parse(localStorage.getItem("province"));
			for (var i = 0; i < prov_Array.length; i++) {
				if (prov_Array[i].regionId == regionId) {
					return prov_Array[i].regionName
					break
				}
			}
		}else if(area == "city") {
			var prov_Array = JSON.parse(localStorage.getItem("city"));
			for (var i = 0; i < prov_Array.length; i++) {
				if (prov_Array[i].regionId == regionId) {
					return prov_Array[i].regionName
					break
				}
			}
		}else if(area == "county") {
			var prov_Array = JSON.parse(localStorage.getItem("county"));
			for (var i = 0; i < prov_Array.length; i++) {
				if (prov_Array[i].regionId == regionId) {
					return prov_Array[i].regionName
					break
				}
			}
		}
	}
	// 绑定城市
	// $("#city").citySelect({prov:"广东", city:"深圳", dist:"宝安区"});
	Cityinit.bindEvents();
	Cityinit.renderProv($("#city .prov"));
	// 绑定新增收货地址
	$("#addAddres").click(function () {
		$("#confirmAddres title").text("添加收货地址")
		$("#modifyAddres").css("display","none");
		showConfirm();
	})
	$("#confirmAddres .delete").click(function () {
		hidConfirm();
		renderAddres();
	})
	edit();
	addAddres();
	renderAddres();
}