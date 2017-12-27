function Orders() {
  myOrder.init();
}

var orderDetail = {
  'orderId': null,
  'countDown': null,
  'itemType': null,

  show: function (orderId, countDown, itemType) {
    this.orderId = orderId;
    this.countDown = countDown || null;
    this.itemType = itemType;
    this.getOrderById();
    this.findByOrderId();
  },
    
  // 获取(订单详情)
  getOrderById: function () {
    var _this = this;

    $.ajax({
			type: "GET", 
			url: appConfig.getOrderById + this.orderId + "/getWith.do", 
			contentType: "application/json; charset=utf-8", 
			headers: {
				'token': $.cookie('token'),
				'digest': $.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					_this.renderOrder(message.data);
				}
			}
		});
  },

  renderOrder: function (data) {
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
        if (this.countDown === null) {
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
    }else if (data.orderStatus > 5 && data.orderStatus < 5) {
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
    }else if (data.orderStatus == 10) {
      $("#NavAfter").removeClass('NavBefore');
      $("#NavActive").removeClass('NavBefore');
      $("#NavAfter").addClass('NavAfter');
      $("#NavActive").addClass('NavAfter');
      $('#NavBefore').html('付余款');
      $('#pay_rest').css('display','block');

      $("#pay_rest").attr('data-orderId', data.orderId);
      $("#pay_rest").attr('data-orderType', data.orderType);
      $("#pay_rest").attr('data-orderSn', data.orderSn);
    }


    // 订单信息
    $("#orderSn").html("<span>订单编号:</span>"+data.orderSn);
    $("#orderSn").attr('data-orderId',data.orderId);
    $("#orderSn").attr('data-orderType',data.orderType);
    $("#orderSn").attr('data-orderSn',data.orderSn);
    $("#orderTime").html("<span>下单时间:</span>"+OrderUtilities.getYYYYmmDDhhMMss(data.orderTime));
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
        + this.cityTransForm(data.province,"prov") +"-"//
        + this.cityTransForm(data.city,"city") +"-"//
        + this.cityTransForm(data.district,"county") +"-"//
        + data.street);
    }
    $("#mobile").html("<span>手机号码:</span>"+ (data.mobile==null?'':data.mobile));
    $("#telephone").html("<span>电话:</span>"+ ((data.telephone==null)?'':data.telephone));
    if (this.itemType === 'equipment') {
      $("#departureDate").html("<span>租借日期:</span>"+ OrderUtilities.getnoUTCdate(data.departureDate));
      $("#leaveDate").html("<span>归还日期:</span>"+ OrderUtilities.getnoUTCdate(data.leaveDate));
    } else {
      $("#departureDate").html("<span>入住日期:</span>"+ OrderUtilities.getnoUTCdate(data.departureDate));
      $("#leaveDate").html("<span>离开日期:</span>"+ OrderUtilities.getnoUTCdate(data.leaveDate));
    }
    $("#zipcode").html("<span>邮政编码:</span>"+ ((data.zipcode==null)?'':data.zipcode));


    // 产品信息
    this.renderProductInfo(data.orderItemList);
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
    $("#payTime").html("<span>支付时间:</span>"+ ((data.paymentInfo.payTime==null)?'未支付':this.getdate(data.paymentInfo.payTime)));
    $("#payAmount").html("<span>已支付:</span>"+ data.paymentInfo.payAmount);
    $("#notPayAmount").html("<span>还需支付:</span>"+ data.paymentInfo.notPayAmount);
  },

  renderProductInfo: function(orderItemList) {
    var string_ProductInfo = "";
    for (var i = 0; i < orderItemList.length; i++) {
      string_ProductInfo += "<div class='detail_title'>产品信息"+(i+1)+"</div><div class='line'><div class='one'><span>产品名称:</span>"+orderItemList[i].productName+"</div></div><div class='line'><div class='one'><span>简单描述:</span>"+orderItemList[i].productBrief+"</div></div><div class='line'><div><span>产品价格:</span>"+orderItemList[i].productPrice+"</div><div><span>促销价格:</span>"+orderItemList[i].promotePrice+"</div><div><span>周期长度:</span>"+orderItemList[0].period + "天" + (orderItemList[0].period-1) + "晚"+"</div></div><div class='line'><div><span>房型:</span>"+orderItemList[i].apartment+"</div><div><span>床型:</span>"+orderItemList[i].bedType+"</div><div><span>产品数量:</span>"+orderItemList[i].apartmentNum+"</div></div>";
      orderItemList[i]
    }
    $("#ProductInfo").html(string_ProductInfo);
  },

  // 获取(旅客信息)
  findByOrderId: function () {
    var _this = this;

    $.ajax({
			'type': "GET", 
			'url': appConfig.findByOrderId+"?orderId="+this.orderId, 
			'contentType': "application/json; charset=utf-8", 
			'headers': {
				'token': $.cookie('token'),
				'digest': $.cookie('digest')
			},
			success: function (message) {
				if (message.result == "0") {
					_this.renderOrderUserinfo(message.data);
				}
			}
		});
  },
  // 渲染(旅客信息)
  renderOrderUserinfo: function (data) {
    var string_Userinfo = "";
    if (data.length == 0) {
      string_Userinfo += "<div class='detail_title'>尚未填写旅客信息</div>";
    }else{
      for (var i = 0; i < data.length; i++) {
        string_Userinfo += [
          "<div class='detail_title'>旅客"+(i+1)+"</div>",

          "<div class='line'>",
            "<div class='one' id='productName'>",
            "<span>护照号码:</span>"+this.CkNull(data[i].passportNo)+"</div>",
          "</div>",

          "<div class='line'>",
            "<div id='apartment'>",
              "<span>中文姓名:</span>"+this.CkNull(data[i].chineseName)+"</div>",
            "<div id='bedType'>",
              "<span>英文姓名:</span>"+this.CkNull(data[i].pinyinName)+"</div>",
            "<div id='productNum'>",
              "<span>手机号码:</span>"+this.CkNull(data[i].mobile)+"</div>",
          "</div>",

          "<div class='line'>",
            "<div id='bedType'>",
              "<span>潜水等级:</span>"+this.CkNull(data[i].divingRank)+"</div>",
            "<div id='productNum'>",
              "<span>潜水次数:</span>"+this.CkNull(data[i].divingCount)+"</div>",
            "<div id='apartment'>",
              "<span>出生日期:</span>"+this.dateToYYYmmDD(data[i].birthday)+"</div>",
          "</div>",

          "<div class='line'>",
            "<div id='apartment' style='display: none;'><span>年龄:</span>"+this.CkNull(data[i].age)+"</div>",
            "<div id='bedType'><span>性别:</span>"+this.returnGender(data[i].gender)+"</div>",
            "<div id='productNum'><span>邮箱:</span>"+this.CkNull(data[i].email)+"</div>",
          "</div>"
        ].join('');
      }
    }
    $("#OrderUserinfo").html(string_Userinfo);
  },

	// 方法 - 获取时间返回201x-xx-xx
	getdate: function (date) {
		var newdate = new Date(date),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	},

	// 方法 - 获取时间返回201x-xx-xx
	dateToYYYmmDD: function (date) {
		var newdate = new Date(date),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	},
  
	// 方法 - 判断(是否为空)
	CkNull: function (data) {
    return data === null ? "未填写" : data;
	},

  // 方法 - 性别(0 => 保密 , 1 => 先生 , 2 => 女士)
	returnGender: function (data) {
		if (data === 0) {
			return "保密"
		}else if (data === 1) {
			return "男"
		}else if (data === 2) {
			return "女"
		}
  },
  
  
	getsecond: function (data) {
		var newdate = new Date(data),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate() + " " + newdate.getHours()+ ":" + newdate.getMinutes()+ ":"  + newdate.getSeconds();
		return thisString
	},

	/*
	 * 城市(id,area) => 城市(中文)
	 * @param {id}   城市的ID 唯一标示
	 * @param {area} 字符串 "prov" "city" "county"
	 */
	cityTransForm: function (regionId,area) {
		if (area === 'prov') {
			var prov_Array = JSON.parse(localStorage.getItem('province'));
			for (var i = 0; i < prov_Array.length; i++) {
				if (prov_Array[i].regionId === regionId) {
					return prov_Array[i].regionName
					break
				}
			}
		}else if(area === 'city') {
			var prov_Array = JSON.parse(localStorage.getItem('city'));
			for (var i = 0; i < prov_Array.length; i++) {
				if (prov_Array[i].regionId === regionId) {
					return prov_Array[i].regionName
					break
				}
			}
		}else if(area === 'county') {
			var prov_Array = JSON.parse(localStorage.getItem('county'));
			for (var i = 0; i < prov_Array.length; i++) {
				if (prov_Array[i].regionId === regionId) {
					return prov_Array[i].regionName
					break
				}
			}
		}
	},

}

var myOrder = {
  'list': {
    // 'cancelTime': null,
    // 'city': 0,
    // 'consignee': null,
    // 'countDown': null,
    // 'departureDate': 1509379200000,
    // 'discount': 0,
    // 'discountRate': 1,
    // 'district': 0,
    // 'earnest': null,
    // 'haveDays': 2,
    // 'isDelete': "N",
    // 'leaveDate': 1509552000000,
    // 'mobile': null,
    // 'orderAmount': 5700,
    // 'orderDesc': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    // 'orderId': 3275,
    // 'orderName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    // 'orderSn': "DVT20171031093356041000",
    // 'orderStatus': 1,
    // 'orderTime': 1509384835000,
    // 'orderType': "P",
    // 'payInfoId': 121,
    // 'productAmount': 5700,
    // 'province': 0,
    // 'refundTime': null,
    // 'reserveTime': null,
    // 'street': null,
    // 'telephone': null,
    // 'userId': 106,
    // 'zipcode': null,
    // 'paymentInfo': {
    //   'notPayAmount': 5700,
    //   'payAmount': 0,
    //   'payInfoId': 121,
    //   'payName': null,
    //   'payStatus': 0,
    //   'payTime': null,
    // },
    // 'orderItemList': [
    //   {
    //     'adultNum': null,
    //     'adultUnitPrice': null,
    //     'apartment': "邦邦 沙滩屋",
    //     'apartmentNum': 1,
    //     'bedType': "大床",
    //     'childNum': null,
    //     'childUnitPrice': null,
    //     'isAvePrice': null,
    //     'itemType': "package",
    //     'orderId': 3275,
    //     'orderItemId': 119,
    //     'peopleNum': null,
    //     'period': 3,
    //     'productBrief': "未经雕琢的天然小岛--邦邦岛",
    //     'productId': 64,
    //     'productImg': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //     'productName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    //     'productNum': 1,
    //     'productPrice': 5700,
    //     'productSn': "000006",
    //     'productThumb': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //     'promotePrice': 0,
    //   }
    // ],
  },

  'pageNum': 1,
  'pageSize': 5, // 5
  'pages': null,
  'totalCount': null,

  init: function () {
    var _this = this;
    this.getOrderList();

    $(".hidendetail").click(function(event){
			_this.hidendetail(event);
		});
		// 付款
		$("#pay_Confirm").click(function () {
      if ( event.target.getAttribute('data-cilck') === 'doing' ) { return }
      event.target.setAttribute('data-cilck', 'doing');

      _this.payConfirm(
        event.target.getAttribute('data-orderid'),
        event.target.getAttribute('data-orderType'),
        event.target.getAttribute('data-orderSn')
      );
		})
		// 付尾款
		$("#pay_rest").click(function () {
      if ( event.target.getAttribute('data-cilck') === 'doing' ) { return }
      event.target.setAttribute('data-cilck', 'doing');

      _this.payleftConfirm(
        event.target.getAttribute('data-orderid'),
        event.target.getAttribute('data-orderType'),
        event.target.getAttribute('data-orderSn')
      );
		})
  },
  
  render: function () {
    var _this = this,
        string = '',
        data = this.list;

    for (var i = 0; i < data.length; i++) {
      string += [
        '<div class="orders-item">',
          '<div class="item-navigation">',
            '<span>订单号: ' + data[i].orderSn + '</span>',
            '<span>订单状态: ' + this.orderStatus(data[i].orderStatus, data[i].countDown) + '</span>',
          '</div>',
          '<div class="item-content">',
            '<div class="item-img">',
              '<img src=' + URLbase + data[i].orderItemList[0].productThumb + '>',
            '</div>',
            '<div class="item-description row">',
              '<div class="col-xs-8">',
                  '<div class="item-orderName">产品名称: ' + data[i].orderName + '</div>',
                  renderItemCycle(data[i]),
                  '<div class="item-time">下单时间: ' + OrderUtilities.getYYYYmmDDhhMMss(data[i].orderTime) + '</div>',
              '</div>',
              '<div class="item-operational col-xs-4">',
                '<div class="item-productPrice">￥' + data[i].productAmount.toFixed(2) + ' RMB</div>',
                '<div class="item-btn">',
                  renderBtn(data[i]),
                '</div>',
              '</div>',
            '</div>',
          '</div>',
          '<div class="orders-masking" ',
            'data-orderid="' + data[i].orderId + '" ',
            'data-itemType="' + data[i].orderItemList[0].itemType + '" ',
            'data-countDown="' + (data[i].countDown ? data[i].countDown : '' ) + '" ',
            '></div>',
        '</div>'
      ].join('');
      // string += [
      //   "<div class='list'>",
      //     "<div class='_cover' data-orderid='" + data[i].orderId + "' data-countDown='" + data[i].countDown + "' data-orderType='" + data[i].orderType  + "' data-orderSn='" + data[i].orderSn  + "'></div>",
      //     "<div class='line'>",
      //       "<div class='ding_dan_hao'><span>订单号 : </span>" + data[i].orderSn + "</div>",
      //       "<div class='ding_dan_zhuang_tai'><span>订单状态 : </span>" + this.orderStatus(data[i].orderStatus,data[i].countDown) + "</div>",
      //       "<div class='fu_kuan_zhuan_tai'><span>付款状态 : </span>" + this.chackStatus(data[i].paymentInfo.payStatus) + "</div>",
      //       "<div class='can_pin_ming_cheng'>" + data[i].orderName + "</div>",
      //       "<div class='hiden chu_fa_riq'>" + OrderUtilities.getnoUTCdate(data[i].departureDate) + "</div>",
      //       "<div class='hiden fan_hui_ri_qi'>" + OrderUtilities.getnoUTCdate(data[i].leaveDate) + "</div>",
      //       "<div class='time'><span>时间 : </span>" + OrderUtilities.getnoUTCdate(data[i].departureDate) + "至" + OrderUtilities.getnoUTCdate(data[i].leaveDate) + "</div>",
      //       "<div class='ji_tian_ji_wan'><span>周期 : </span>" + this.dateCycle(data[i].departureDate,data[i].leaveDate) + "</div>",
      //       "<div class='can_ping_zhong_jia'><span>总价 : </span>" + data[i].orderAmount + "</div>",
      //       "<div class='_BTNcontent'>",
      //         "<div data-orderType='" + data[i].orderType + "' data-orderid='" + data[i].orderId + "' data-orderSn='" + data[i].orderSn + "' " + this.changAttribu(data[i].orderStatus, data[i].countDown) + ">" + this.changBtn(data[i].orderStatus, data[i].countDown) + "</div>",
      //       "</div>",
      //     "</div>",
      //   "</div>"
      // ].join("");
    }
    if (string === '') {
      $('#renderOrders').html('商城订单为空');
    } else {
      $('#renderOrders').html(string);
      this.renderpageNavigation();
    }

    // 查看详情
    $(".orders-masking").click(function(event){
      orderDetail.show(
        $(this).attr('data-orderId'),
        $(this).attr('data-countDown'),
        $(this).attr('data-itemType')
      );
      $("#content").css("display","none");
      $("aside").css("display","block");
    });
    $('.btn-show-orders').click(function(event){
      orderDetail.show(
        $(this).attr('data-orderId'),
        $(this).attr('data-countDown')
      );
      $("#content").css("display","none");
      $("aside").css("display","block");
    });

    // 取消订单
    $(".btn-cancel-orders").click(function(event){
      if ($(this).attr('data-isSubmit') == 'true') { return }

      if (confirm("确认取消订单?")) {
        $(this).attr('data-isSubmit', 'true');
        _this.cancelOrders($(this).attr('data-orderid'));
      } else {
        $(this).attr('data-isSubmit', 'false');
      }
    })

    // 付款
    $(".btn-pay-orders").click(function(event){
      if ($(this).attr('data-isSubmit') == 'true') { return }
      $(this).attr('data-isSubmit', 'true');

      _this.payConfirm(
        $(this).attr('data-orderid'),
        $(this).attr('data-orderType'),
        $(this).attr('data-orderSn')
      );
    });

    // 付余款
    $(".btn-payleft-orders").click(function(event){
      if ($(this).attr('data-isSubmit') == 'true') { return }
      $(this).attr('data-isSubmit', 'true');

      _this.payleftConfirm(
        $(this).attr('data-orderid'),
        $(this).attr('data-orderType'),
        $(this).attr('data-orderSn')
      );
    });

    // 申请退款
    $(".btn-refund-orders").click(function(event){
      if ($(this).attr('data-isSubmit') == 'true') { return }

      if (confirm("确认申请退款?")) {
        $(this).attr('data-isSubmit', 'true');
        _this.refundOrders($(this).attr('data-orderid'));
      } else {
        $(this).attr('data-isSubmit', 'false');
      }
    });
    
    function renderBtn(item) {
      if (item.orderStatus === 1) {
        return ('<div class="btn-cancel-orders" data-orderid="' + item.orderId + '">取消预订</div>');
      } else if ( item.orderStatus === 3 && item.countDown != null ) {
        if (item.orderType === 'C') {
          return ('<div ' + 
            'class="btn-pay-orders" ' +
            'data-orderid="' + item.orderId + '" ' +
            'data-orderType="' + item.orderType + '" ' +
            'data-orderSn="' + item.orderSn + '" ' + 
          '>立即付款</div>'+
          '<div class="btn-cancel-orders" data-orderid="' + item.orderId + '">取消预订</div>');

        } else {
          return ('<div ' + 
            'class="btn-pay-orders" ' +
            'data-orderid="' + item.orderId + '" ' +
            'data-orderType="' + item.orderType + '" ' +
            'data-orderSn="' + item.orderSn + '" ' + 
          '>立即付款</div>');
        }
      } else if (item.orderStatus === 6) {
        return ('<div class="btn-refund-orders" data-orderid="' + item.orderId + '">申请退款</div>');
      } else if (item.orderStatus === 10) {
          return ('<div ' + 
            'class="btn-payleft-orders" ' +
            'data-orderid="' + item.orderId + '" ' +
            'data-orderType="' + item.orderType + '" ' +
            'data-orderSn="' + item.orderSn + '" ' + 
          '>付尾款</div>');
        return ('<div class="btn-refund-orders" data-orderid="' + item.orderId + '">付尾款</div>');
      } else {
        return ('<div ' + 
          'class="btn-show-orders" ' +
          'data-orderid="' + item.orderId + '" ' +
          'data-countDown="' + (item.countDown ? item.countDown : '') + '" ' +
        '>查看详情</div>');
      }
    }

    function renderItemCycle(item) {
      if (item.orderItemList[0].itemType === 'equipment') {
        return (
          '<div class="item-cycle">租借日期: ' + OrderUtilities.getnoUTCdate(item.departureDate) + '</div>'+
          '<div class="item-cycle">归还日期: ' + OrderUtilities.getnoUTCdate(item.leaveDate) + '</div>'
        );
      } else {
        return (
          '<div class="item-cycle">入住日期: ' + OrderUtilities.getnoUTCdate(item.departureDate) + '</div>'+
          '<div class="item-cycle">退房日期: ' + OrderUtilities.getnoUTCdate(item.leaveDate) + '</div>'
        );
      }
    }
  },

  renderpageNavigation: function() {
    var _this = this,
        myPageNum = this.pageNum,
        mypages = this.pages,
        mytotalCount = this.totalCount;

    if (mypages === 1) { return }
    var pageNavigation = [
      "<nav aria-label='Page navigation'>",
        "<ul class='pagination'>",
          "<li id='PreviousPage'>",
            "<a aria-label='Previous'>",
              "<span aria-hidden='true'>&laquo;</span>",
            "</a>",
          "</li>",

          renderLi(),

          "<li id='NextPage'>",
            "<a aria-label='Next'>",
              "<span aria-hidden='true'>&raquo;</span>",
            "</a>",
          "</li>",
        "</ul>",
      "</nav>",
    ].join("");
    
    $('#pageNavigation').html(pageNavigation);

    for (var i = 1; i < ($('.pagination li').length - 1); i++) {(function (i) {
      $($('.pagination li')[i]).click(function (event) {
        if (i === _this.pageNum) { return }
        $('#renderOrders').html('正在加载...');
        _this.pageNum = i;
        _this.getOrderList();
      })
    })(i)}

    // 返回上一页
    $('#PreviousPage').click(function () {
      if (_this.pageNum === 1) { return }
      $('#renderOrders').html('正在加载...');
      _this.pageNum--
      _this.getOrderList();
    });
    // 跳转下一页
    $('#NextPage').click(function () {
      if (_this.pageNum >= _this.pages) { return }
      $('#renderOrders').html('正在加载...');
      _this.pageNum++
      _this.getOrderList();
    });

    function renderLi() {
      var myString = '';

      for (var i = 0; i < mypages; i++) {
        var page = i + 1;

        if (page === myPageNum) {
          myString += "<li class='active'><a>" + page + "</a></li>";
        } else {
          myString += "<li><a>" + page + "</a></li>";
        }
      }

      return myString;
    }
  },

  getOrderList: function (pageNum, pageSize) {
    var _this = this,
        myPageNum = pageNum || this.pageNum;
        myPageSize = pageSize || this.pageSize;

		$.ajax({
			'type': 'GET', 
			'url': URLbase + URLversion + '/order/' + myPageNum + '/' + myPageSize + '/list.do', 
			'contentType': 'application/json; charset=utf-8', 
			'headers': {
				'token': $.cookie('token'),
				'digest': $.cookie('digest')
			},
			success: function (json) {  
				if (json.result == '0') {
					_this.list = json.data.list;
					_this.pages = json.data.pages;
          _this.totalCount = json.data.totalCount;
          _this.render();
				} else {
          alert('数据有错误, 原因:' + json.message);
        }
			},
      error: function(e) {
        alert('加载数据发生错误, 原因:' + e);
      }
		});
  },
  
	// 方法 - 清空
	hidendetail:function (){
		$("#content").css("display","block");
		$("aside").css("display","none");
	},

	// 申请退款
	refundOrders: function (orderid) {
		if (confirm("确认申请退款?")) {
      $.ajax({
        type: "GET", 
        url: URLbase + URLversion + "/order/id/" + orderid + "/refund.do", 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token': $.cookie('token'),
          'digest': $.cookie('digest')
        },
        success: function (json) {
          if ( json.result == '0' ) {
            alert('退款申请成功');
            _this.getOrderList();
          } else {
            alert('退款申请失败, 原因:' + json.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('退款申请失败, 原因: ' + errorThrown);
        }
      });
		}
	},

  // 付尾款
  payleftConfirm: function (orderId, orderType, orderSn) {
    if ( $(document).width() < 760 ) {
      $.ajax({
        type: "GET", 
        url:URLbase + URLversion + "/payment/" + orderSn + "/R/alipay4Custom.do?dev=Mobile", 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token':$.cookie('token'),
          'digest':$.cookie('digest')
        },
        success: function (message) {
          if (message.indexOf("FAILED") !== -1) {
            alert('支付失败, 原因'+ message.slice(message.indexOf(':')));
              window.location.reload();
          }else {
            $("body").html(message);
          }
        }
      });
    } else {
      $.ajax({
        type: "GET", 
        url:URLbase + URLversion + "/payment/" + orderSn + "/R/alipay4Custom.do?dev=PC", 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token':$.cookie('token'),
          'digest':$.cookie('digest')
        },
        success: function (message) {
          if (message.indexOf("FAILED") !== -1) {
            alert('支付失败, 原因'+ message.slice(message.indexOf(':')));
              window.location.reload();
          }else {
            $("body").html(message);
          }
        }
      });
    }
  },

  // 全款 R

	// 付款
	payConfirm: function (orderId, orderType, orderSn) {
		if (orderType === 'C') {
      if ( $(document).width() < 760 ) {
        $.ajax({
          type: "GET", 
          url:URLbase + URLversion + "/payment/" + orderSn + "/E/alipay4Custom.do?dev=Mobile", 
          contentType: "application/json; charset=utf-8", 
          headers: {
            'token':$.cookie('token'),
            'digest':$.cookie('digest')
          },
          success: function (message) {
            if (message.indexOf("FAILED") !== -1) {
              alert('支付失败, 原因'+ message.slice(message.indexOf(':')));
              window.location.reload();
            } else {
              $("body").html(message);
            }
          }
        });
      } else {
        $.ajax({
          type: "GET", 
          url:URLbase + URLversion + "/payment/" + orderSn + "/E/alipay4Custom.do?dev=PC", 
          contentType: "application/json; charset=utf-8", 
          headers: {
            'token':$.cookie('token'),
            'digest':$.cookie('digest')
          },
          success: function (message) {
            if (message.indexOf("FAILED") !== -1) {
              alert('支付失败, 原因'+ message.slice(message.indexOf(':')));
              window.location.reload();
            }else {
              $("body").html(message);
            }
          }
        });
      }
		} else {
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
						if (message.indexOf("FAILED") !== -1) {
              alert('支付失败, 原因'+ message.slice(message.indexOf(':')));
              window.location.reload();
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
						if (message.indexOf("FAILED") !== -1) {
              alert('支付失败, 原因'+ message.slice(message.indexOf(':')));
              window.location.reload();
						}else {
							$("body").html(message);
						}
					}
				});
			}
		}
	},

	// 取消订单
	cancelOrders: function (orderid) {
    var _this = this;

    $.ajax({
      'type': 'GET', 
      'url': URLbase + URLversion + '/order/id/' + orderid + '/cancelOrder.do', 
      'contentType': 'application/json; charset=utf-8', 
      'headers': {
        'token': $.cookie('token'),
        'digest': $.cookie('digest')
      },
      success: function (json) {
        if ( json.result == '0' ) {
          alert('订单成功取消');
          _this.getOrderList();
        } else {
          alert('订单取消失败, 原因:' + json.message);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('订单取消失败, 原因: ' + errorThrown);
      }
    });
	},

  chackStatus: function (Status) {
    return Status === 0 ? '未付款' : '已付款';
  },

  orderStatus: function (Status, countDown) {
    if (Status === 1) {
      return "预定中"
    }else if (Status === 2) {
      return "预定失败"
    }else if (Status === 3) {
      if (countDown === null) {
        return "预定失败"
      }else {
        return "待付款"
      }
    }else if (Status === 4) {
      return "退订成功"
    }else if (Status === 5) {
      return "交易失败"
    }else if (Status === 6) {
      return "支付成功"
    }else if (Status === 7) {
      return "申请退款"
    }else if (Status === 8) {
      return "退款成功"
    }else if (Status === 9) {
      return "退款失败"
    }else if (Status === 10) {
      return "已付定金，待付尾款"
    }
  },

  // Pre:出发日期(时间戳)  Nex: 离开日期(时间戳)
  dateCycle: function (Pre, Nex) {
    var thisString = '',
        day_Interval = ( Math.round( (Nex - Pre) / 1000 / 60 / 60 / 24) ) + 1;
    if (day_Interval === 1) {
      thisString = '1天'
    }else if (day_Interval > 1) {
      thisString = day_Interval + '天' + (day_Interval - 1) + '晚'
    }
    return thisString;
  },

  // 数据 Array => 订单产品字符串
  renderProductName: function (ArrayList) {
    var data_String = '';
    if (ArrayList.length === 1) {
      return ArrayList[0].productName
    } else {
      for (var i = 0; i < ArrayList.length; i++) {
        data_String += '<p>' + ArrayList[i].productName + '</p>';
      }
      return data_String
    }
  },

  // 根据订单状态显示按钮
  changAttribu: function (orderStatus, countDown) {
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
  },

}

var OrderUtilities = {
	// 方法 - 获取时间返回201x-xx-xx
	getnoUTCdate: function (date) {
		var newdate = new Date(date),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	},

  getYYYYmmDDhhMMss: function (data) {
		var newdate = new Date(data),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate() + " " + newdate.getHours()+ ":" + newdate.getMinutes()+ ":"  + newdate.getSeconds();
		return thisString
	},
  
}

