$(document).ready(function() {
  if (loadPageVar('productId')) {
    myProduct.id = loadPageVar('productId');
  } else {
    alert('非常抱歉, 订单失效!');
    return
  }

  myProduct.init();
  myFloatNav.init();
});

// 产品
var myProduct = {
  'id': null,
  'detail': {
    // 'apartment': "邦邦 沙滩屋",
    // 'apartmentNum': 1,
    // 'bedType': "大床",
    // 'brandId': 25,
    // 'clickCount': null,
    // 'createBy': 23,
    // 'createTime': 1484004647000,
    // 'isDelete': "N",
    // 'isNew': "Y",
    // 'isOnsale': "Y",
    // 'period': 3,
    // 'productBrief': "未经雕琢的天然小岛--邦邦岛",
    // 'productDesc': "未经雕琢的天然小岛--邦邦岛，安静的她坐落于辽阔的斯里伯斯海域。择一岛终老，携一人至此，面朝大海，春暖花开。邦邦同时具备有水上屋和海岛风情，您可以漫步沙滩听海浪拍打的声音抑或走在水上木板上任海风拂过。另外度假村配备健身房、休息室、潜水中心和蔬菜花园等，非常适合蜜月/闺蜜行。",
    // 'productId': 64,
    // 'productImg': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    // 'productName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    // 'productPrice': 5700,
    // 'productSn': "000006",
    // 'productThumb': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    // 'productType': "package",
    // 'productView': null,
    // 'promoteEndTime': 0,
    // 'promotePrice': 0,
    // 'promoteStartTime': 0,
    // 'refundRuleId': 30,
    // 'updateBy': 23,
    // 'updateTime': 1485194651000,
  },
  'carousel': [
    // {
    //   'gallery': {
    //     'createBy': 23,
    //     'createTime': 1485047677000,
    //     'group': null,
    //     'imgDesc': null,
    //     'imgId': 200,
    //     'imgTitle': 'P5.jpg',
    //     'imgUrl': '/source/image/product/34867ce5-d61a-4576-b4fb-060365c7d638.jpg',
    //     'isDelete': 'N',
    //     'thumbUrl': '/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg',
    //     'updateBy': 23,
    //     'updateTime': 1485047677000,
    //   },
    //   'createBy': 23,
    //   'createTime': 1485047677000,
    //   'imgId': 200,
    //   'isDelete': 'N',
    //   'isFirst': 'Y',
    //   'productId': 64,
    //   'relId': 565,
    //   'sortOrder': 0,
    //   'updateBy': 23,
    //   'updateTime': 1485047677000,
    // }
  ],
  'attribute': [
    // {
    //   'costContent': '<p><span style="line-height: 1;">往返机场接送服务：</span></p><p><span style="line-height: 1;">斗湖机场--仙本那码头车程约70分钟 &nbsp; 仙本那码头--度假村船程约60分钟；</span></p><p><span style="line-height: 1;">每日三餐（自助餐）加下午茶：</span></p><p>早餐 7:00-9:00AM &nbsp; &nbsp;中餐 12:00-14:00PM &nbsp; &nbsp;晚餐 19:00-21:00PM</p><p>餐厅终日提供咖啡、茶、果汁（不包含酒精饮料或碳酸饮料），<span style="line-height: 1;">糖果、新鲜出炉的面包和甜点</span></p><p>度假村沙滩屋住宿及无限次数岸边浮潜。</p><p><br></p>',
    //   'costTitle': '包含',
    //   'createBy': 23,
    //   'createTime': 1485195023000,
    //   'includeId': 271,
    //   'isDelete': 'N',
    //   'productId': 64,
    //   'updateBy': 23,
    //   'updateTime': 1485374889000,
    // }
  ],
  'trip': [
    // {
    //   'createBy': 23,
    //   'createTime': 1485285336000,
    //   'isDelete': 'N',
    //   'productId': 64,
    //   'tripBrief': '初次遇见 天然小岛 邦邦',
    //   'tripDay': 1,
    //   'tripDesc': '<p>在斗湖机场门口，就看到邦邦的工作人员举牌并叫喊您的名字，核对信息后您就可以坐上专门负责接送的巴士。如果时间允许，您可以在机场门口购买电话卡（建议您选择celcom）和兑换马币。</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/716280e3-e6a8-4ba6-95a5-e68115504665.jpg" alt="1" style="max-width:100%;"><br></p><p>斗湖机场到仙本那码头大约70分钟，您可以休息会儿或者看看窗外有异于北半球的<span style="line-height: 1;">沿途</span>热带风景。在陆地的尽头仙本那码头换乘飞艇，驶往邦邦岛。</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/594b7ade-8a3f-45ec-bc59-c059ae6057ef.jpg" alt="邦邦岛快艇2" style="max-width:100%;"><br></p><p>一路上，船似乎一不小心进入了世外桃源，远远望去的海面上有朦胧的烟气溢出。忽然眼前一亮，视线清晰，您就会看到海中央一个安静小岛--邦邦。<span style="line-height: 1;">初次遇见的邦邦像邻家的小姑娘，有点安静有点害羞。</span></p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/cf981ea3-3a90-42b6-be82-d33c095931f5.jpg" alt="2" style="max-width:100%;"><br></p><p>邦邦龙珠度假村同时具备有海岛和水上屋风情，您可以漫步在沙滩，岛中央的蔬菜花园和果林，或者是水上木板路。女神范、文艺小清新照随时切换。</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/19f5f77c-1df5-47c3-9bce-da4618b9120a.jpg" alt="IMG_6072_副本" style="line-height: 1; max-width: 100%;" class=""></p><p>上岛后，贴心工作人员会把你的行李拿到餐厅（确认房间号码后会送到您的房间）。<span style="line-height: 1;">服务员</span>递上新鲜的橙汁，并简单<span style="line-height: 1;">介绍度假村和注意</span>办理入住手续，您就可以入住了。（有啥疑问可以咨询中文服务员）</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/726a582a-e11a-4a85-9053-19da4f9d3070.jpg" alt="5" style="max-width:100%;"><br></p><p>如果您是蜜月出行，我们还会给您免费的蜜月布置（需提供半年内的结婚证）</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/658d2294-1da9-4a8b-99df-f614cb6d6bd0.jpg" alt="水屋12" style="max-width:100%;"><br></p><p>午休后泡一杯免费的咖啡或茶，坐在阳台的躺椅上，听海浪拍打岸边的声音，感受清爽柔和的海风，细细读一本书或者到与来自世界各地的朋友一起来一场沙滩排球/足球。</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/cef06c97-6703-4906-8cf8-ac1cfed7d4dc.jpg" alt="4" style="line-height: 1; max-width: 100%;"></p><p>您还可以租借皮划艇，在海里随处漂流，然后跳进水里浮潜（请确保安全情况下）。浮潜装备、皮划艇在潜水中心租借。</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/88953139-719a-457e-8edc-5bc8410503f4.jpg" alt="潜水中心14" style="max-width:100%;"><br></p><p>晚餐的食谱每天都会更新在餐厅的小黑板上，<span style="line-height: 1;">烧烤</span><span style="line-height: 1;">、</span>中西餐、马来餐都有，而蔬菜水果自产岛上，绿色健康。与您的另一半/闺蜜一边品尝佳肴，一边诉说这些年你印象深刻的人和事，让彼此敞开心扉。</p><p><img src="http://www.divingtime.asia:8080/source/image/rteImg/9a18280b-7727-42cb-96eb-6e57525625cd.jpg" alt="6" style="max-width:100%;"><br></p>',
    //   'tripEvent': '初次遇见 天然小岛 邦邦',
    //   'tripId': 570,
    //   'tripPlace': '邦邦龙珠',
    //   'updateBy': null,
    //   'updateTime': null  ,
    // }
  ],
  'costIncludes': [
    // {
    //   'costContent': '<p><span style="line-height: 1;">往返机场接送服务：</span></p><p><span style="line-height: 1;">斗湖机场--仙本那码头车程约70分钟 &nbsp; 仙本那码头--度假村船程约60分钟；</span></p><p><span style="line-height: 1;">每日三餐（自助餐）加下午茶：</span></p><p>早餐 7:00-9:00AM &nbsp; &nbsp;中餐 12:00-14:00PM &nbsp; &nbsp;晚餐 19:00-21:00PM</p><p>餐厅终日提供咖啡、茶、果汁（不包含酒精饮料或碳酸饮料），<span style="line-height: 1;">糖果、新鲜出炉的面包和甜点</span></p><p>度假村沙滩屋住宿及无限次数岸边浮潜。</p><p><br></p>',
    //   'costTitle': "包含",
    //   'createBy': 23,
    //   'createTime': 1485195023000,
    //   'includeId': 271,
    //   'isDelete': "N",
    //   'productId': 64,
    //   'updateBy': 23,
    //   'updateTime': 1485374889000,
    // }
  ],

  init: function() {
    var _this = this;

    this.getCarousel()
      .then(function(val) {
        _this.carousel = val;
        _this.renderCarousel();
      }, function(error) { alert(error) });

    this.getDetail()
      .then(function(val) {
        _this.detail = val;
        _this.renderDetail();
        
        _this.getTrip()
          .then(function(val) {
            _this.trip = val;
            _this.renderTrip();
          }, function(error) { alert(error) });

        _this.rule.init(val.refundRuleId);
      }, function(error) { alert(error) });

    this.getAttribute()
      .then(function(val) {
        _this.attribute = val;
        _this.renderAttribute();
      }, function(error) { alert(error) });


    this.getCostIncludes()
      .then(function(val) {
        _this.costIncludes = val;
        _this.renderCostIncludes();
      }, function(error) { alert(error) });

    this.selectdays.init();
  },

  rule: (function () {
    var ruleData = {
      // 'createBy': null,
      // 'createTime': null,
      // 'isDelete': null,
      // 'refundCode': "refund2",
      // 'refundDesc': "其他度假村退订规则",
      // 'refundName': "其他度假村退订规则",
      // 'refundRuleId': 30,
      // 'ruleItemList': [
      //   {
      //     'beginDay': 46,
      //     'createBy': null,
      //     'createTime': null,
      //     'deductionRatio': "12%",
      //     'endDay': -1,
      //     'isDelete': null,
      //     'refundRuleId': null,
      //     'ruleDesc': "手续费500元/人，预定成功后不可退；余款：入住前46天需补齐余款",
      //     'ruleItemId': 39,
      //     'updateBy': null,
      //     'updateTime': null,
      //   }
      // ],
      // 'updateBy': null,
      // 'updateTime': null,
    };

    function getRuleData(id) {
      return new Promise(function(resolve, reject){
        $.ajax({
          'type': 'GET',
          'url': URLbase + URLversion + '/product/refundrule/' + id + '/item/list.do',
          'contentType': 'application/json; charset=utf-8',
          success: function(value) {
            if (value.result === '0') {
              resolve(value.data);
            } else {
              reject('接收的轮播图数据有误, 原因: ' + value.message);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            reject('请求轮播图发生错误, 原因: ' + errorThrown);
          }
        });
      });
    }
    
    function judgDay(data) {
      return data.endDay < 0 ? (data.beginDay + '天以上') : (data.endDay + '天');
    }

    function percentage(data) {
      var string = data.substring(0, data.length - 1);

      return string === '100' ? '1' : ('0.' + string);
    }

    function renderRule() {
      var data = ruleData,
          ruleItemList = ruleData.ruleItemList,
          string = '',
          string2 = '';

      for (var i = 0; i < ruleItemList.length; i++) {
        var j = 1 - i * (1 / ruleItemList.length);

        string += "<div style='width:" + j * 100 + "%;background:rgba(69, 90, 100," //
            + (i + 1) * (1 / ruleItemList.length) + ");'><span style='color:#4d5d77'>" //
            + judgDay(ruleItemList[i]) + "</span><a style='color:#fff;position:absolute;z-index:2;top:2px;left:4px;'>扣" //
            + ruleItemList[i].deductionRatio + "</a></div>";

        string2 += "<p>" + ruleItemList[i].ruleDesc + "</p>";
      }

      $("#refundDesc").text("" /*data.refundDesc*/ );
      $("#refundName").text("" /*data.refundName*/ );
      $("#ruleItemList").html(string);
      $("#ruleDesc").html(string2);
    }

    return {
      'init': function(id) {
        if (!id) { return }

        getRuleData(id)
          .then(function(val) {
            if (val) {
              ruleData = val;
              renderRule();
            } else {
              $('#NC5').css('display', 'none');
              $('#MContentTitle5').css('display', 'none');
            }
          }, function(error) { alert(error) });
      }
    };
  })(),

  selectdays: (function () {
    function getYYYYddMM() {
      var mydate = new Date();
      var str = "" + mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate();
      return str = str.replace(/\b(\w)\b/g, '0$1');

    }

    return {
      'init': function() {

        $('#datetimepicker').datetimepicker({
            format: "yyyy MM dd", //格式
            autoclose: true, //自动关闭
            todayBtn: true, //今天
            startDate: str,
            minuteStep: 10, //用于选择分钟
            language: 'zh-CN',
            weekStart: 1, //周一从那天开始
            todayHighlight: true, //高亮今天
            startView: 2, //日期时间选择器打开之后首先显示的视图
            minView: 2, //日期时间选择器打开之后最小的视图
        }).on('changeDate', function(ev) {
            var SelectDate = new Date(ev.date)
            var string = "" + SelectDate.getFullYear() + "-" + (SelectDate.getMonth() + 1) + "-" + SelectDate.getDate();
            string = string.replace(/\b(\w)\b/g, '0$1');
            $("#datetimepicker").css("display", "none");
            $("#OrderDate").text(string);
            $("#OrderDate").attr("data-title", ev.date);
            $("#packagNumber").css("display", "block");
            $("#totalPrice").css("display", "block");
            $("#OrderConfirm").text("预订套餐");
            event.preventDefault();
        });

      }
    };
  })(),

  getCarousel: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + URLversion + '/product/relProductGallery/' + this.id + '/findByProductId.do',
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的轮播图数据有误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求轮播图发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  getDetail: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + URLversion + '/product/' + this.id + '/get.do',
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的产品详情数据有误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求产品详情发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },
  
  // 套餐说明，交通信息
  getAttribute: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + URLversion + '/product/attribute/findByProductId.do?productId=' + this.id,
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的产品详情数据有误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求产品详情发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },
  
  // 套餐行程
  getTrip: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + URLversion + '/product/trip/findByProductId.do?productId=' + this.id,
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的产品详情数据有误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求产品详情发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },
  
  // 套餐包含
  getCostIncludes: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + URLversion + '/product/costIncludes/findByProductId.do?productId=' + this.id,
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的产品详情数据有误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求产品详情发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  renderCarousel: function() {
    var _this = this,
        data = this.carousel,
        inner = "",
        indicators = "";

    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            inner += "<div class='item active'><img src=" + URLbase + data[i].gallery.imgUrl + "><div class='carousel-caption'></div></div>"
            indicators += "<li data-target='#carousel-example-generic' data-slide-to=" + i + " class='active'></li>"
        } else {
            inner += "<div class='item'><img src=" + URLbase + data[i].gallery.imgUrl + "><div class='carousel-caption'></div></div>"
            indicators += "<li data-target='#carousel-example-generic' data-slide-to=" + i + "></li>"
        }
    }
    $("#carousel").html(inner);
    $(".carousel-indicators").html(indicators);

    轮播图响应式
    // 高是 720  px
    // 宽是 1680 px
    // 720px/1680px = 高/宽 = 求/clientWidth
    var nowHeight = document.body.clientWidth * 720 / 1680;
    $(".carousel-inner .item").css('height', nowHeight);
  },

  renderDetail: function () {
    var data = this.detail,
        StartTime = this.detail.promoteStartTime,
        EndTime = this.detail.promoteEndTime,
        timestamp = Date.parse(new Date());

    $("#product_Name").text(data.productName);
    $("#productPrice").html(pricePackage());

    if (data.promotePrice == null || data.promotePrice == 0) {
      // 表示不促销
      $("#promoteTime").html("暂无");
      // 计算价格
      $("#packagNumber .center").attr("data-price", data.productPrice);
      // 计算价格(废弃)
      $("#totalPrice .tright span").text(data.productPrice);
      // 响应式 价格
      $("aside .Aside-B span").text(data.productPrice);
    } else {
      if (timestamp >= StartTime && timestamp <= EndTime) {
        // 表示促销
        $("#promoteTime").html("<span>" + getdate(data.promoteStartTime) + "</span> 至 <span>" + getdate(data.promoteEndTime) + "</span>");
        // 计算价格
        $("#packagNumber .center").attr("data-price", data.promotePrice);
        // 计算价格(废弃)
        $("#totalPrice .tright span").text(data.promotePrice);
        // 响应式 价格
        $("aside .Aside-B span").text(data.promotePrice);
      } else {
        // 表示不促销
        $("#promoteTime").html("暂无");
        // 计算价格
        $("#packagNumber .center").attr("data-price", data.productPrice);
        // 计算价格(废弃)
        $("#totalPrice .tright span").text(data.productPrice);
        // 响应式 价格
        $("aside .Aside-B span").text(data.productPrice);
      }
    }
    // 标签
    $("#productName").html(data.productName + judgtype());
    // 简单描述
    $("#productDesc").html(data.productDesc);
    // 无所谓
    $("#totalPrice i").attr("title", data.promotePrice == null ? ("原价" + data.productPrice) : ("促销价" + data.promotePrice));


    // "限时促销" > "新品" > "度假套餐"
    function judgtype() {
      if (data.promotePrice == null || data.promotePrice == 0) {} else {
        if (timestamp >= StartTime && timestamp <= EndTime) {
          return "<span style='background: rgba(234,84,91,.87)'>限时促销</span>"
        }
      }
      if (data.isNew == "Y") {
        return "<span style='background: rgba(25,163,220,.87)'>新品</span>"
      } else {
        return "<span style='background: rgba(1,185,105,.87)'>度假套餐</span>"
      }
    }
    /**
     * 套餐价格
     */
    function pricePackage() {
      if (data.promotePrice == null || data.promotePrice == 0) {} else {
        if (timestamp >= StartTime && timestamp <= EndTime) {
          // 表示促销
          return "<span style='text-decoration:line-through'>" + data.productPrice + "</span> " + data.promotePrice;
        }
      }
      // 表示不促销
      return data.productPrice
    }
  },
  
  renderAttribute: function () {
    var data = this.attribute,
        string = "";

    for (var i = 0; i < data.length; i++) {
      if (i == (data.length - 1)) {
        string += "<div class='MContentContent'><div class='MCCL'>" + data[i].attrName + "</div><div class='MCCR'>" + data[i].attrValue + "</div></div>";
      } else {
        string += "<div class='MContentContent MCLine'><div class='MCCL'>" + data[i].attrName + "</div><div class='MCCR'>" + data[i].attrValue + "</div></div>";
      }
    }
    string += "</div><div class='ContactUS-R'></div>";

    $("#renderIncludes").html(string);
  },

  renderTrip: function () {
    var data = this.trip,
        title = this.detail.productName,
        myContent = [
          "<div class='MContentform-row FormTitle'>",
            "<div class='MContentform-row1'>日期</div>",
            "<div class='MContentform-row2'>项目&amp;活动</div>",
            "<div class='MContentform-row3'>入宿&amp;景点</div>",
          "</div>"
        ].join(""),
        myModal = [
          "<div class='modal-dialog'>",
            "<div class='modal-content'>",
              renderNavigator(),
              "<div class='_content'>",
                "<div class='modal-header'>",
                  "<button type='button' class='close' data-dismiss='modal'>",
                    "<span aria-hidden='true'>&times;</span>",
                    "<span class='sr-only'>Close</span>",
                  "</button>",
                  "<h4 class='modal-title' id='myModalLabel'>" + title + "</h4>",
                "</div>",
                "<div class='modal-body'>",
                  "<div class='journey'>",
        ].join("");

    for (var i = 0; i < data.length; i++) {
      myContent += [
        "<div class='MContentform-row FormLists' data-toggle='modal' data-target='#myModal'>",
          "<div class='MContentform-row1'>第"+ data[i].tripDay + "天</div>",
          "<div class='MContentform-row2'>" + splitArray(data[i].tripEvent) + "</div>",
          "<div class='MContentform-row3'>" + splitArray(data[i].tripPlace) + "</div>",
        "</div>"
      ].join("");

      myModal += "<div class='journey-title' id='_day" + (i + 1) + "'>第" + data[i].tripDay + "天 " + data[i].tripBrief + "</div>";
      myModal += "<div class='journey-content'>" + data[i].tripDesc + "</div>";
    }

    myModal += [
              "</div>",
            "</div>",
            "<div class='modal-footer'>",
              "<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button>",
            "</div>",
          "</div>",
        "</div>",
      "</div>",
    ].join("");

    $("#renderTrip .MContentform").html(myContent);
    $("#myModal").html(Modal);

    function splitArray(data) {
      var dataArray = data.split(","),
          string = "";

      for (var i = 0; i < dataArray.length; i++) {
        string += "<p>" + dataArray[i] + "</p>";
      }
      return string
    }

    function renderNavigator() {
      var _string = "<div class='_nav'>";

      for (var j = 0; j < data.length; j++) {
        _string += "<div><a href='#_day" + (j + 1) + "'>第" + (j + 1) + "天</a></div>";
      }
      _string += "</div>";
      return _string;
    }
  },

  renderCostIncludes: function() {
    var data = this.costIncludes,
        string = "<div class='MContentRow'><div class='MContentTitle'>套餐包含</div></div>";
    
    for (var i = 0; i < data.length; i++) {
      if (i == (data.length - 1)) {
        string += "<div class='MContentContent'><div class='MCCL'>" + data[i].costTitle + "</div><div class='MCCR'>" + data[i].costContent + "</div></div>";
      } else {
        string += "<div class='MContentContent MCLine'><div class='MCCL'>" + data[i].costTitle + "</div><div class='MCCR'>" + data[i].costContent + "</div></div>";
      }
    }
    string += "</div><div class='ContactUS-R'></div>";
    $("#renderDescription").html(string);
  },
}

// 顶部滚动监听
var myFloatNav = {
  init: function () {
    var _this = this,
        topLong = $("#carousel-example-generic"),
        Distance = 0,
        Alabel = $("#NC-L a"),
        part1 = $("#MContentTitle1")[0].offsetTop,
        part2 = $("#MContentTitle2")[0].offsetTop,
        part3 = $("#MContentTitle3")[0].offsetTop,
        part4 = $("#MContentTitle4")[0].offsetTop,
        part5 = $("#MContentTitle5")[0].offsetTop;

    for (var i = 0; i < Alabel.length; i++) {
      Alabel[i].onclick = function(ev) {
        var ev = ev || window.event,
            id = this.hash,
            thisId = document.querySelector(id);
        document.documentElement.scrollTop = document.body.scrollTop = thisId.offsetTop - 50;
        $(".NC-L a").css("border-bottom", "none")
        ev.preventDefault();
      }
    }

    $(window).scroll(function() {
      Distance = $(window).scrollTop();
      CarSelH = topLong[0].clientHeight;
      if (Distance > CarSelH) {
        if ($("nav").attr("data-display") == "show") {
          $("nav").css("display", "block")
          _this.anchor();
          $("#Order").addClass('NewOrder');
        } else if ($("nav").attr("data-display") == "hide") {
          $("nav").css("display", "none");
        }
      } else {
        $("nav").css("display", "none")
        $("#Order").removeClass("NewOrder");
      }
    });
  },

  anchor: function() {
    if (Distance > part1 + topLong[0].clientHeight - 50 && Distance < part2 + topLong[0].clientHeight - 50) {
        $(".NC-L a").css("border-bottom", "none")
        $("#NC1").css("border-bottom", "4px solid #00a0ea");
    } else if (Distance > part2 + topLong[0].clientHeight - 50 && Distance < part3 + topLong[0].clientHeight - 50) {
        $(".NC-L a").css("border-bottom", "none")
        $("#NC2").css("border-bottom", "4px solid #00a0ea");
    } else if (Distance > part3 + topLong[0].clientHeight - 50 && Distance < part4 + topLong[0].clientHeight - 50) {
        $(".NC-L a").css("border-bottom", "none")
        $("#NC3").css("border-bottom", "4px solid #00a0ea");
    } else if (Distance > part4 + topLong[0].clientHeight - 50 && Distance < part5 + topLong[0].clientHeight - 50) {
        $(".NC-L a").css("border-bottom", "none")
        $("#NC4").css("border-bottom", "4px solid #00a0ea");
    } else if (Distance > part5 + topLong[0].clientHeight - 50) {
        $(".NC-L a").css("border-bottom", "none")
        $("#NC5").css("border-bottom", "4px solid #00a0ea");
    }
  }
}


// 工具类
var utilities = {
  loadPageVar: function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
}