function Orders() {
  myOrder.init();
}

var orderDetail = {
  'orderId': null,
  'countDown': null,

  show: function (orderId, countDown) {
    this.orderId = orderId;
    this.countDown = countDown;
    this.getOrderById();
    this.findByOrderId();
  },
    
  // 获取(订单详情)
  getOrderById: function () {
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
					renderOrder(message.data);
				}
			}
		});
  },

  renderOrder: function () {

  },

  findByOrderId: function () {
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
  'pageSize': 10,
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
  },
  
  render: function () {
    var string = '',
        data = this.list;

    for (var i = 0; i < data.length; i++) {
      string += [
        "<div class='list'>",
          "<div class='_cover' data-orderid='" + data[i].orderId + "' data-countDown='" + data[i].countDown + "' data-orderType='" + data[i].orderType  + "' data-orderSn='" + data[i].orderSn  + "'></div>",
          "<div class='line'>",
            "<div class='ding_dan_hao'><span>订单号 : </span>" + data[i].orderSn + "</div>",
            "<div class='ding_dan_zhuang_tai'><span>订单状态 : </span>" + this.orderStatus(data[i].orderStatus,data[i].countDown) + "</div>",
            "<div class='fu_kuan_zhuan_tai'><span>付款状态 : </span>" + this.chackStatus(data[i].paymentInfo.payStatus) + "</div>",
            "<div class='can_pin_ming_cheng'>" + data[i].orderName + "</div>",
            "<div class='hiden chu_fa_riq'>" + OrderUtilities.getnoUTCdate(data[i].departureDate) + "</div>",
            "<div class='hiden fan_hui_ri_qi'>" + OrderUtilities.getnoUTCdate(data[i].leaveDate) + "</div>",
            "<div class='time'><span>时间 : </span>" + OrderUtilities.getnoUTCdate(data[i].departureDate) + "至" + OrderUtilities.getnoUTCdate(data[i].leaveDate) + "</div>",
            "<div class='ji_tian_ji_wan'><span>周期 : </span>" + this.dateCycle(data[i].departureDate,data[i].leaveDate) + "</div>",
            "<div class='can_ping_zhong_jia'><span>总价 : </span>" + data[i].orderAmount + "</div>",
            "<div class='_BTNcontent'>",
              "<div data-orderType='" + data[i].orderType + "' data-orderid='" + data[i].orderId + "' data-orderSn='" + data[i].orderSn + "' " + this.changAttribu(data[i].orderStatus, data[i].countDown) + ">" + this.changBtn(data[i].orderStatus, data[i].countDown) + "</div>",
            "</div>",
          "</div>",
        "</div>"
      ].join("");
    }
    string === '' ? $('#renderOrders').html('商城订单为空') : $('#renderOrders').html(string);

    // 取消订单
    $(".BTN_Cancel").click(function(event){
      _this.CancelOrders(event);
    })
    // 付款
    $(".BTN_Pay").click(function(event){
      if ( event.target.getAttribute('data-cilck') == 'doing' ) { return }
      event.target.setAttribute('data-cilck', 'doing');

      _this.payConfirm(
        event.target.getAttribute('data-orderid'),
        event.target.getAttribute('data-orderType'),
        event.target.getAttribute('data-orderSn')
      );
    });

    // 申请退款
    $(".BTN_Refund").click(function(event){
      _this.refundOrders(event);
    });
    
    // 查看详情
    $("._cover").click(function(event){
      orderDetail.show(
        event.currentTarget.getAttribute("data-orderId"),
        event.currentTarget.getAttribute("data-countDown")
      );
      $("#content").css("display","none");
      $("aside").css("display","block");
    });
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
	refundOrders: function (event) {
		if (confirm("确认申请退款?")) {
			$("#BTN_Refund").text("正在取消");
      $.ajax({
        type: "GET", 
        url: URLbase + URLversion + "/order/id/" + event.target.getAttribute("data-orderid") + "/refund.do", 
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
            _this.getOrderList();
          }
        }
      });
		}
	},

	// 付款
	payConfirm: function (orderId, orderType, orderSn) {
		if (orderType === 'C') {
			$.ajax({
				type: "GET", 
				url:URLbase + URLversion + "/payment/" + orderSn + "/E/alipay4Custom.do", 
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
	},

	// 取消订单
	CancelOrders: function (event) {
    var _this = this;

		if (confirm("确认取消订单?")) {
			$("#BTN_Cancel").text("正在取消");
      var _orderid = event.target.getAttribute("data-orderid");

      $.ajax({
        'type': 'GET', 
        'url': URLbase + URLversion + '/order/id/' + _orderid + '/cancelOrder.do', 
        'contentType': 'application/json; charset=utf-8', 
        'headers': {
          'token': $.cookie('token'),
          'digest': $.cookie('digest')
        },
        success: function (json) {
          $('#BTN_Cancel').text('取消订单');
          if ( json.result == '0' ) {
            alert('订单成功取消');
            _this.getOrderList();
          }
        }
      });
		}
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

	// 根据订单状态显示按钮
  changBtn: function (orderStatus, countDown) {
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
  },    
}

var OrderUtilities = {
	// 方法 - 获取时间返回201x-xx-xx
	getnoUTCdate: function (date) {
		var newdate = new Date(date),
			thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
		return thisString
	},
  
}

