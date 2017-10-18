// 我的订单
function Orders() {
	// 渲染(订单详情) data -> 订单ID
	function renderDetail(data,countDown) {
		// 获取(订单详情)
		$.ajax({
			type: "GET", 
			url: appConfig.getOrderById+data+"/getWith.do", 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					renderD(message.data);
				}
			}
		});
		// 获取(旅客信息)
		$.ajax({
			type: "GET", 
			url: appConfig.findByOrderId+"?orderId="+data, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					renderOrderUserinfo(message.data);
				}
			}
		});
		// 渲染(订单"详情")
		function renderD(data){
			// 渲染(订单状态条)
			$("#cancel_order").css('display', 'none');
			$("#request_Refund").css("display","none");
			$("#pay_Confirm").css("display","none");
			$("#pay_details").css("display","block");
			if (data.orderStatus <= 2) {
				$("#NavAfter").removeClass('NavBefore');
				$("#NavAfter").addClass('NavActive');
				if (data.orderStatus == 1) {
					$("#cancel_order").css('display', 'block');
					$("#NavAfter").text("预订中");
				}else if (data.orderStatus == 2) {
					$("#OrdersNav").css('display','none');
					document.getElementById('pay_details').setAttribute('style',"display: none;");
					document.getElementById('OrdFailure').setAttribute('style',"display: block;");
					$("#OrdRefuse").text("预定失败");
				}
			}else if (data.orderStatus > 2 && data.orderStatus <= 5) {
				$("#NavAfter").text("预订成功");
				$("#NavAfter").removeClass('NavBefore');
				$("#NavActive").removeClass('NavBefore');
				$("#NavAfter").addClass('NavAfter');
				$("#NavActive").addClass('NavActive');
				if (data.orderStatus == 3) {
					if (countDown == "null") {
					}else {
						$("#pay_Confirm").css("display","block");
						$("#NavActive").text("等待付款");
					}
				}else if (data.orderStatus == 4) {
					$("#pay_details").css("display","none");
					$("#NavActive").text("已取消");
				}else if (data.orderStatus == 5) {
					$("#NavActive").text("交易失败");
				}
			}else if (data.orderStatus > 5) {
				$("#NavAfter").text("预订成功");
				$("#NavActive").text("支付完成");
				$("#NavAfter").removeClass('NavBefore');
				$("#NavActive").removeClass('NavBefore');
				$("#NavBefore").removeClass('NavBefore');
				$("#NavAfter").addClass('NavAfter');
				$("#NavActive").addClass('NavAfter');
				$("#NavBefore").addClass('NavActive');
				if (data.orderStatus == 6) {
					$("#NavBefore").text("订单完成");
					$("#request_Refund").css("display","block");
					$("#request_Refund").attr('data-orderId',data.orderId);
					$("#request_Refund").click(function(event){refundOrders(event);})
				}else if (data.orderStatus == 7) {
					$("#NavBefore").text("申请退款");
					// 申请退款
				}else if (data.orderStatus == 8) {
					$("#OrdersNav").css('display','none');
					document.getElementById('OrdSuccess').setAttribute('style',"display: block;");
					$("#OrdComplete").text("退款成功");
				}
			}
			// 订单信息
			$("#orderSn").html("<span>订单编号:</span>"+data.orderSn);
			$("#orderSn").attr('data-orderId',data.orderId);
			$("#orderTime").html("<span>下单时间:</span>"+getsecond(data.orderTime));
			$("#productAmount").html("<span data-price='"+data.productAmount+"'>产品总额:</span>"+data.productAmount + " RMB");
			$("#orderAmount").html("<span>订单总额:</span>"+ data.orderAmount + " RMB");
			$("#discount").html("<span>折扣金额:</span>"+ data.discount + " RMB");
			// 收货人信息
			$("#consignee").html("<span>收件人:</span>"//
				+ (data.consignee==null?"":data.consignee)  );
			if (data.province==0&&data.city==0&&data.district==0) {
				$("#street").html("<span>地址:</span>");
			}else{
				$("#street").html("<span>地址:</span>"//
					+ cityTransForm(data.province,"prov") +"-"//
					+ cityTransForm(data.city,"city") +"-"//
					+ cityTransForm(data.district,"county") +"-"//
					+ data.street);
			}
			$("#mobile").html("<span>手机号码:</span>"+ (data.mobile==null?'':data.mobile));
			$("#telephone").html("<span>电话:</span>"+ ((data.telephone==null)?'':data.telephone));
			$("#departureDate").html("<span>入住日期:</span>"+ getnoUTCdate(data.departureDate));
			$("#leaveDate").html("<span>离开日期:</span>"+ getnoUTCdate(data.leaveDate));
			$("#zipcode").html("<span>邮政编码:</span>"+ ((data.zipcode==null)?'':data.zipcode));
			// 产品信息
			renderProductInfo(data.orderItemList);
			// $("#productName").html("<span>产品名称:</span>"+ data.orderItemList[0].productName);
			// $("#productBrief").html("<span>简单描述:</span>"+ data.orderItemList[0].productBrief);
			// $("#productPrice").html("<span>产品价格:</span>"+ data.orderItemList[0].productPrice);
			// $("#promotePrice").html("<span>促销价格:</span>"+ data.orderItemList[0].promotePrice);
			// $("#period").html("<span>周期长度:</span>"+ data.orderItemList[0].period + "天" + (data.orderItemList[0].period-1) + "晚" );
			// $("#apartment").html("<span>房型:</span>" + data.orderItemList[0].apartment);
			// $("#bedType").html("<span>床型:</span>"+ data.orderItemList[0].bedType);
			// $("#productNum").html("<span>公寓数量:</span>"+ data.orderItemList[0].apartmentNum + "套");
			// 支付信息
			$("#payName").html("<span>支付方式:</span>"+ (data.paymentInfo.payName == null)?"":data.paymentInfo.payName);
			$("#payStatus").html("<span>付款状态:</span>"+ (data.paymentInfo.payStatus == 0 ? "未付款":"已付款"));
			$("#payTime").html("<span>支付时间:</span>"+ ((data.paymentInfo.payTime==null)?'未支付':getdate(data.paymentInfo.payTime)));
			$("#payAmount").html("<span>已支付:</span>"+ data.paymentInfo.payAmount);
			$("#notPayAmount").html("<span>还需支付:</span>"+ data.paymentInfo.notPayAmount);
		}
		// 渲染(产品信息)
		function renderProductInfo(orderItemList) {
			var string_ProductInfo = "";
			for (var i = 0; i < orderItemList.length; i++) {
				string_ProductInfo += "<div class='detail_title'>产品信息"+(i+1)+"</div><div class='line'><div class='one'><span>产品名称:</span>"+orderItemList[i].productName+"</div></div><div class='line'><div class='one'><span>简单描述:</span>"+orderItemList[i].productBrief+"</div></div><div class='line'><div><span>产品价格:</span>"+orderItemList[i].productPrice+"</div><div><span>促销价格:</span>"+orderItemList[i].promotePrice+"</div><div><span>周期长度:</span>"+orderItemList[0].period + "天" + (orderItemList[0].period-1) + "晚"+"</div></div><div class='line'><div><span>房型:</span>"+orderItemList[i].apartment+"</div><div><span>床型:</span>"+orderItemList[i].bedType+"</div><div><span>产品数量:</span>"+orderItemList[i].apartmentNum+"</div></div>";
				orderItemList[i]
			}
			$("#ProductInfo").html(string_ProductInfo);
		}
		// 渲染(旅客信息)
		function renderOrderUserinfo(data) {
			var string_Userinfo = "";
			if (data.length == 0) {
				string_Userinfo += "<div class='detail_title'>尚未填写旅客信息</div>";
			}else{
				for (var i = 0; i < data.length; i++) {
					string_Userinfo += [
						"<div class='detail_title'>旅客"+(i+1)+"</div>",

						"<div class='line'>",
						  "<div class='one' id='productName'>",
						  "<span>护照号码:</span>"+CkNull(data[i].passportNo)+"</div>",
						"</div>",

						"<div class='line'>",
						  "<div id='apartment'>",
						    "<span>中文姓名:</span>"+CkNull(data[i].chineseName)+"</div>",
						  "<div id='bedType'>",
						    "<span>英文姓名:</span>"+CkNull(data[i].pinyinName)+"</div>",
						  "<div id='productNum'>",
						    "<span>手机号码:</span>"+CkNull(data[i].mobile)+"</div>",
						"</div>",

						"<div class='line'>",
						  "<div id='bedType'>",
						    "<span>潜水等级:</span>"+CkNull(data[i].divingRank)+"</div>",
						  "<div id='productNum'>",
						    "<span>潜水次数:</span>"+CkNull(data[i].divingCount)+"</div>",
						  "<div id='apartment'>",
						    "<span>出生日期:</span>"+dateToYYYmmDD(data[i].birthday)+"</div>",
						"</div>",

						"<div class='line'>",
						  "<div id='apartment' style='display: none;'><span>年龄:</span>"+CkNull(data[i].age)+"</div>",
						  "<div id='bedType'><span>性别:</span>"+returnGender(data[i].gender)+"</div>",
						  "<div id='productNum'><span>邮箱:</span>"+CkNull(data[i].email)+"</div>",
						"</div>"
					].join('');
				}
			}
			$("#OrderUserinfo").html(string_Userinfo);
		}
	}
	// 渲染(首屏信息)
	function renderOrders(){
		function render(data){
			var string = "";
			function chackStatus(data) {
				if (data == 0) {
					return "未付款"
				}else if (data == 1) {
					return "已付款"
				}
			}
			function orderStatus(data,countDown) {
				if (data == 1) {
					return "预定中"
				}else if (data == 2) {
					return "预定失败"
				}else if (data == 3) {
					if (countDown == null) {
						return "预定失败"
					}else {
						return "待付款"
					}
				}else if (data == 4) {
					return "退订成功"
				}else if (data == 5) {
					return "交易失败"
				}else if (data == 6) {
					return "支付成功"
				}else if (data == 7) {
					return "申请退款"
				}else if (data == 8) {
					return "退款成功"
				}else if (data == 9) {
					return "退款失败"
				}
			}
			// Pre:出发日期(时间戳)  Nex: 离开日期(时间戳)
			function dateCycle(Pre,Nex) {
				var thisString ="",
					day_Interval = (Math.round((Nex - Pre)/1000/60/60/24))+1;
				if (day_Interval == 1) {
					thisString = "1天"
				}else if (day_Interval > 1) {
					thisString = day_Interval + "天" + (day_Interval - 1) + "晚"
				}
				return thisString
			}
			// 数据 Array => 订单产品字符串
			function renderProductName(data_Array) {
				var data_String = "";
				if (data_Array.length == 1) {
					return data_Array[0].productName
				}else{
					for (var i = 0; i < data_Array.length; i++) {
						data_String += "<p>"+data_Array[i].productName+"</p>";
					}
					return data_String
				}
			}
			// 根据订单状态显示按钮
			function changAttribu(orderStatus,countDown) {
				if (orderStatus == 1) {
					// 预定中——————————————————————————————————————————————1
					return "class='_BTN BTN_Cancel'"
				}else if (orderStatus == 2) {
					// 预定失败
					return "class='_not'"
				}else if (orderStatus == 3) {
					// 待付款——————————————————————————————————————————————2
					if (countDown == null) {
						return "class='_not'"
					}else {
						return "class='_BTN BTN_Pay'"
					}
				}else if (orderStatus == 4) {
					// 退订成功
					return "class='_not'"
				}else if (orderStatus == 5) {
					// 交易失败
					return "class='_not'"
				}else if (orderStatus == 6) {
					// 支付成功————————————————————————————————————————————3
					return "class='_BTN BTN_Refund'"
				}else if (orderStatus == 7) {
					// 申请退款
					return "class='_not'"
				}else if (orderStatus == 8) {
					// 退款成功
					return "class='_not'"
				}else if (orderStatus == 9) {
					// 退款失败
					return "class='_not'"
				}
			}
			// 根据订单状态显示按钮
			function changBtn(orderStatus,countDown) {
				if (orderStatus == 1) {
					// 预定中——————————————————————————————————————————————1
					return "取消订单"
				}else if (orderStatus == 2) {
					// 预定失败
					return "预定失败"
				}else if (orderStatus == 3) {
					// 待付款——————————————————————————————————————————————2
					if (countDown == null) {
						return "预定失败"
					}else {
						return "去付款"
					}
				}else if (orderStatus == 4) {
					// 退订成功
					return "退订成功"
				}else if (orderStatus == 5) {
					// 交易失败
					return "交易失败"
				}else if (orderStatus == 6) {
					// 支付成功————————————————————————————————————————————3
					return "申请退款"
				}else if (orderStatus == 7) {
					// 申请退款
					return "正在退款"
				}else if (orderStatus == 8) {
					// 退款成功
					return "退款成功"
				}else if (orderStatus == 9) {
					// 退款失败
					return "退款失败"
				}
			}
			for (var i = 0; i < data.length; i++) {
				string +="<div class='list'><div class='_cover' data-orderid='"//
					+data[i].orderId+"' data-countDown='"//
					+data[i].countDown+"'></div><div class='line'><div class='ding_dan_hao'><span>订单号 : </span>"//
					+data[i].orderSn+"</div><div class='ding_dan_zhuang_tai'><span>订单状态 : </span>"//
					+orderStatus(data[i].orderStatus,data[i].countDown)+"</div><div class='fu_kuan_zhuan_tai'><span>付款状态 : </span>"//
					+chackStatus(data[i].paymentInfo.payStatus)+"</div><div class='can_pin_ming_cheng'>"//
					+renderProductName(data[i].orderItemList)+"</div><div class='hiden chu_fa_riq'>"//
					+getnoUTCdate(data[i].departureDate)+"</div><div class='hiden fan_hui_ri_qi'>"//
					+getnoUTCdate(data[i].leaveDate)+"</div><div class='time'><span>时间 : </span>"//
					+getnoUTCdate(data[i].departureDate)+"至"+getnoUTCdate(data[i].leaveDate)+"</div><div class='ji_tian_ji_wan'><span>周期 : </span>"//
					+dateCycle(data[i].departureDate,data[i].leaveDate)+"</div><div class='can_ping_zhong_jia'><span>总价 : </span>"//
					+data[i].orderAmount+"</div><div class='_BTNcontent'><div data-orderid='"//
					+ data[i].orderId + "' "//
					+changAttribu(data[i].orderStatus,data[i].countDown) +">"//
					+changBtn(data[i].orderStatus,data[i].countDown)+"</div></div></div></div>";
			}
			(string == "")?($("#renderOrders").html("商城订单为空")):$("#renderOrders").html(string);
			// 取消订单
			$(".BTN_Cancel").click(function(event){
				CancelOrders(event);
			})
			// 付款
			$(".BTN_Pay").click(function(event){
				if ( event.target.getAttribute("data-cilck") == "doing" ) {
					return
				}
				event.target.setAttribute("data-cilck","doing");
				var _orderid = event.target.getAttribute("data-orderid");
				payConfirm(_orderid);
			})
			// 申请退款
			$(".BTN_Refund").click(function(event){
				refundOrders(event);
			})
		}
		// 提交(首屏 请求)
		$.ajax({
			type: "GET", 
			url: appConfig.getOrder, 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					render(message.data);
					setTimeout(function(){
						renderOrders();
					},5000);
					$("._cover").click(function(event){
						showdetail(event);
					});
				}
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
	// 方法 - 点击(订单) => 渲染(订单详情)
	function showdetail(event){
		renderDetail(event.currentTarget.getAttribute("data-orderId"),event.currentTarget.getAttribute("data-countDown"));
		$("#content").css("display","none");
		$("aside").css("display","block");
	}
	// 方法 - 清空
	function hidendetail(){
		$("#content").css("display","block");
		$("aside").css("display","none");
	}
	// 方法 - 判断(是否为空)
	function CkNull(data) {
		if (data == null) {
			return "未填写"
		}else {
			return data
		}
	}
	// 方法 - 性别(0 => 保密 , 1 => 先生 , 2 => 女士)
	function returnGender(data) {
		if (data == 0) {
			return "保密"
		}else if (data == 1) {
			return "男"
		}else if (data == 2) {
			return "女"
		}
	}
	// 方法 - 时间差  timestamp -> 时间戳
	function UTC2LocalTime(timestamp) {
		//将 服务器UTC时间戳 转为Date
		var d = new Date(timestamp);
		//服务器UTC时间 与 GMT时间的时间 偏移差
		var offset = d.getTimezoneOffset() * 60000;
		return new Date(timestamp - offset);
	}
	// 方法 - 获取时间返回201x-xx-xx
	function getnoUTCdate(date) {
		var newdate = new Date(date),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	}
	// 方法 - 获取时间返回201x-xx-xx
	function getdate(date) {
		var newdate = new Date(UTC2LocalTime(date)),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	}
	// 方法 - 获取时间返回201x-xx-xx
	function dateToYYYmmDD(date) {
		var newdate = new Date(date),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	}
	function getsecond(data) {
		var newdate = new Date(UTC2LocalTime(data)),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate() + " " + newdate.getHours()+ ":" + newdate.getMinutes()+ ":"  + newdate.getSeconds();
		return thisString
	}
	// 申请退款
	function refundOrders(event) {
		var r = confirm("确认申请退款?")
		if (r == true) {
			$("#BTN_Refund").text("正在取消");
		}else{
			return
		}
		var _orderid = event.target.getAttribute("data-orderid");
		$.ajax({
			type: "GET", 
			url: URLbase + URLversion + "/order/id/"+_orderid+"/refund.do", 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				$("#BTN_Cancel").text("申请退款");
				if (message.result == "0") {
					alert("退款申请成功");
					window.location.reload();
					renderOrders();
				}
			}
		});
	}
	// 取消订单
	function CancelOrders(event) {
		var r = confirm("确认取消订单?")
		if (r == true) {
			$("#BTN_Cancel").text("正在取消");
		}else{
			return
		}
		var _orderid = event.target.getAttribute("data-orderid");
		$.ajax({
			type: "GET", 
			url: URLbase + URLversion + "/order/id/"+_orderid+"/cancelOrder.do", 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token':$.cookie('token'),
				'digest':$.cookie('digest')
			},
			success: function (message) {
				$("#BTN_Cancel").text("取消订单");
				if (message.result == "0") {
					alert("订单成功取消");
					renderOrders();
				}
			}
		});
	}
	// 付款
	function payConfirm(orderId) {
		if ( $(document).width() < 760 ) {
			$.ajax({
				type: "GET", 
				url:URLbase+URLversion+"/payment/alipayMob.do?orderId=" + orderId, 
				contentType: "application/json; charset=utf-8", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					if (message == "FAILED") {
						alert("您在30分钟内未完成付款，交易已关闭");
					}else {
						$("body").html(message);
					}
				}
			});
		}else{
			$.ajax({
				type: "GET", 
				url:URLbase+URLversion+"/payment/alipay.do?orderId=" + orderId, 
				contentType: "application/json; charset=utf-8", 
				headers: {
					'token':$.cookie('token'),
					'digest':$.cookie('digest')
				},
				success: function (message) {
					if (message == "FAILED") {
						alert("您在30分钟内未完成付款，交易已关闭");
					}else {
						$("body").html(message);
					}
				}
			});
		}
	}
	// 绑定事件
	function bindEvents(){
		$(".hidendetail").click(function(event){
			hidendetail(event);
		});
		// 付款
		$("#pay_Confirm").click(function(){
			var _orderId = $("#orderSn").attr('data-orderId');
			payConfirm(_orderId);
		})
	}
	bindEvents();
	renderOrders();
}