$(document).ready(function() {
  if (myData.isSupport() === false) { alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。'); return }

  myData.getCarouselAjax()
    .then(function(val) {
      myCarousel.data = val;
      myCarousel.init();
    }, function(error) {
      alert(error);
    });

  // 精确到日
  var nowDate = new Date();
  myData.startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  myData.endDate = new Date(Date.parse(myData.startDate) + 86400000);

  myData.searchApartmentAjax()
    .then(function(val) {
      myApartment.data = utilities.addSelect(val);
      myApartment.village = JSON.parse(localStorage.getItem('village'));
      myApartment.init();
    }, function(error) {
      alert(error);
    });
});

var myData = {
  startDate: new Date(),
  endDate: new Date(),

  isSupport: function() {
    var testKey = 'test',
      storage = window.localStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true
    } catch (error) {
      return false
    }
  },

  getCarouselAjax: function() {
    var resortId = utilities.loadPageVar('resortId');

    
    return new Promise(function (resolve, reject) {
      if (resortId === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      $.ajax({
        type: "GET",
        url: URLbase + '/Dvt-reserve/product/relResortGallery/' + resortId + '/findByResortId.do',
        contentType: "application/json; charset=utf-8",
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('轮播图接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('轮播图接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  searchApartmentAjax: function() {
    var resortCode = utilities.loadPageVar('resortCode');
      startDate = utilities.dateToYYYYMMDDString(this.startDate),
      endDate = utilities.dateToYYYYMMDDString(this.endDate);

    return new Promise(function (resolve, reject) {
      if (resortCode === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      if (startDate && endDate) {
        $.ajax({
          type: "GET",
          url: URLbase + '/Dvt-reserve/product/apartment/1/0/searchSource.do?startDate=' + startDate + '&endDate=' + endDate + '&resortCode=' + resortCode,
          contentType: "application/json; charset=utf-8",
          success: function(value) {
            if (value.result === '0') {
              resolve(value.data);
            } else {
              reject('查询的房型发生错误, 原因: ' + value.message);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            reject('查询的房型发生错误, 原因: ' + errorThrown);
          }
        });
      }else {
        reject('非常抱歉，你查询的房型未传入具体时间。');
      }
    });
  },

  checkLogin: function() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "GET", 
        url: appConfig.getUserInfo, 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token':$.cookie('token'),
          'digest':$.cookie('digest')
        },
        success: function (value) {
          if (value.result == "0" ) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          reject('查询登录发生错误, 原因: ' + errorThrown);
        }
      });
    });
  }
}

var myCarousel = {
  'data': [
    // {
    //   'gallery': {
    //     'createBy': 33,
    //     'createTime': 1503252103000,
    //     'group': null,
    //     'imgDesc': null,
    //     'imgId': 153,
    //     'imgTitle': "MA1.JPG",
    //     'imgUrl': "/source/image/product/8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    //     'isDelete': "N",
    //     'thumbUrl': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    //     'updateBy': null,
    //     'updateTime': null
    //   },
    //   'imgId': 153,
    //   'isDelete': "N",
    //   'isFirst': "Y",
    //   'relId': 1,
    //   'resortId': 1,
    //   'sortOrder': 0,
    //   'updateBy': null,
    //   'updateTime': null,
    //   'createBy': 33,
    //   'createTime': 1503252103000
    // }
  ],
  init: function() {
    var data = this.data,
      imgNum = this.data.length,
      indicators = '',
      wrappers = '';

    if (imgNum === 0) {
      indicators = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
      wrappers = [
        '<div class="item active">',
          '<img src="./../../dist/img/404.jpg">',
          '<div class="carousel-caption">',
          '</div>',
        '</div>'
      ].join('');
    } else {
      for (var i = 0; i < imgNum; i++) {
        var imgUrl = data[i].gallery.imgUrl;
        var indicator = '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" ' + (i === 0 ? ' class="active"' : '') + '></li>';
        var wrapper = [
          '<div class="item ' + (i === 0 ? 'active' : '') + '">',
            '<img src="' + URLbase + imgUrl + '">',
            '<div class="carousel-caption">',
            '</div>',
          '</div>'
        ].join('');

        indicators += indicator;
        wrappers += wrapper;
      }
    }

    $('#carouselIndicators').html(indicators);
    $('#carouselInner').html(wrappers);
  }
}

var myRule = {
  'data': {
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
  },

  init: function(id) {
    var _this = this;

    if (!id) {
      $('#part5').css('display', 'none');
      return
    }

    this.getRuleData(id)
      .then(function(val) {
        _this.data = val;
        _this.render();
      }, function(error) { alert(error) });
  },

  getRuleData: function(id) {
    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + URLversion + '/product/refundrule/' + id + '/item/list.do',
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的规则数据有误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求规则发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  render: function() {
    var data = this.data,
        ruleItemList = this.data.ruleItemList,
        rulestring = '',
        myRuleDesc = '';

    for (var i = 0; i < ruleItemList.length; i++) {
      var j = 1 - i * (1 / ruleItemList.length);

      rulestring += "<div style='width:" + j * 100 + "%;background:rgba(69, 90, 100," //
        + (i + 1) * (1 / ruleItemList.length) + ");'><span style='color:#4d5d77'>" //
        + this.judgDay(ruleItemList[i]) + "</span><a style='color:#fff;position:absolute;z-index:2;top:2px;left:4px;'>扣" //
        + ruleItemList[i].deductionRatio + "</a></div>";

      myRuleDesc += "<p>" + ruleItemList[i].ruleDesc + "</p>";
    }

    $("#ruleItemList").html(rulestring);
    $("#ruleDesc").html(myRuleDesc);
  },

  judgDay: function(data) {
    return data.endDay < 0 ? (data.beginDay + '天以上') : (data.endDay + '天');
  }
}

var myApartment = {
  'data': {
    'list': [
      // {
      //   'select': [
      //     {
      //        apartmentName: '白珍珠海景房',
      //        bedTypeList: ['大床', '双床'],
      //        bedType: '大床',

      //        calMethod: '1',
      //        initiatePrice: 1200, //起始价格

      //        peopleMax: 4,
      //        suggestedNum: 2,

      //        adultNum: 1,
      //        childNum: 0,
      //        adultMax: 2,
      //        adultPrices: 600.00,
      //        childrenMax: 2,
      //        childPrices: 600.00,

      //        prices: 1200.00,
      //     }
      //   ],
      //   'selectNum': 0, // 已选房间数 (自己加进去的  
      //   'adultMax': 2,
      //   'adultMin': 1,
      //   'adultPrices': '3000.00',
      //   'adultUnitPrice': 3000,
      //   'apartmentCode': 'KPLyjf',
      //   'apartmentDesc': '房间描述信息↵房间描述信息↵房间描述信息↵房间描述信息↵房间描述信息↵房间描述信息',
      //   'apartmentId': 1,
      //   'apartmentImg': '/source/image/product/thum/thum_17f9b08b-b21e-4638-aaec-67bd2ce913f7.jpg',
      //   'apartmentName': '园景房',
      //   'apartmentThumb': '/source/image/product/thum/thum_17f9b08b-b21e-4638-aaec-67bd2ce913f7.jpg',
      //   'bedType': '大床,双人床,单床,蜜月大床',
      //   'calMethod': null,
      //   'childPrices': '1500.00',
      //   'childUnitPrice': 1500,
      //   'childrenMax': 2,
      //   'childrenMin': 0,
      //   'codes': 'KPLyjf20170918',
      //   'createBy': 1,
      //   'createTime': 1505328965000,
      //   'facilities': '',
      //   'haveDays': 1,
      //   'ids': '5',
      //   'initiatePrice': 6000,
      //   'isAvePrice': 'N',
      //   'isDelete': 'N',
      //   'isSaleOut': 'N',
      //   'notice': '入住须知↵入住须知↵入住须知↵入住须知↵入住须知',
      //   'peopleMax': 4,
      //   'peopleMin': 0,
      //   'policy': '',
      //   'resortCode': 'KPL',
      //   'resortId': 1,
      //   'resortName': '卡帕莱',
      //   'skuNum': 2,
      //   'suggestedNum': 2,
      //   'updateBy': null,
      //   'updateTime': null
      // }
    ],
    'pageNum': 0,
    'pageSize': 0,
    'pages': 0,
    'size': 0,
    'totalCount': 0
  },
  'village': {
    // 'brandId': 25,
    // 'brandName': "潜游沙巴·仙本那",
    // 'createBy': 33,
    // 'createTime': 1503252103000,
    // 'earnest': 500,
    // 'initiatePrice': 1000,
    // 'isDelete': "N",
    // 'label': "热卖",
    // 'recommendation': "<p>2222222222222</p>",
    // 'refundRuleId': 29,
    // 'resortCode': "KPL",
    // 'resortDesc': "<p>111111111111111111</p>",
    // 'resortId': 1,
    // 'resortImg': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    // 'resortName': "卡帕莱",
    // 'resortThumb': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    // 'updateBy': null,
    // 'updateTime': null
  },

  init: function() {
    var _this = this,
      villageNum = utilities.loadPageVar('village');

    this.getvillage()
    .then(function(value) {
      _this.village = value;
      _this.renderApartmentBrand();
      _this.renderApartmentDetail();
      myRule.init(value.refundRuleId);
      _this.initTimePicker();
      _this.renderSideApartment();
      _this.initScroll();
    }, function(error) { alert(error) });

  },
  
  getvillage: function() {
    var resortId = utilities.loadPageVar('resortId');

    return new Promise(function(resolve, reject){
      $.ajax({
        'type': 'GET',
        'url': URLbase + '/Dvt-reserve/product/resort/' + resortId + '/get.do',
        'contentType': 'application/json; charset=utf-8',
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  renderApartmentBrand() {
    var myVillage = this.village;
    
    $('#brandName').html(myVillage.resortName + '<span>' + myVillage.label + '</span>');
    // 这个反过来了
    $('#villageDesc').html(myVillage.resortDesc);
    $('#villageRecommendation').html(myVillage.recommendation);

    $('#apartmentTotalPrice').html('预定价格<span>' + myVillage.initiatePrice + ' RMB 起</span>');
    $('#apartmentTitle').html(myVillage.resortName);
  },

  initTimePicker: function() {
    var _this = this,
      startDate = myData.startDate,
      endDate = myData.endDate,

      apartmentList = $('#apartmentList'),

      startDateDOM = $('#startDate'),
      starDatePicker = $('#starDatePicker'),
      starDateInput = $('#starDatePicker input'),

      endDateDOM = $('#endDate'),
      endDatePicker = $('#endDatePicker'),
      endDateInput = $('#endDatePicker input');

    starDatePicker.hide();
    endDatePicker.hide();
    
    this.renderTimePicker();

    startDateDOM.click(function() {
      $(this).addClass('select');
      endDateDOM.removeClass('select');

      starDatePicker.show();
      endDatePicker.hide();

      apartmentList.hide();
    });

    starDatePicker.datetimepicker({
      initialDate: utilities.dateToYYYYMMDDFormat(startDate),
      startDate: utilities.dateToYYYYMMDDFormat(startDate),
      format: "yyyy MM dd", //格式
      autoclose: true, //自动关闭
      todayBtn: true, //今天
      minuteStep: 10, //用于选择分钟
      language: 'zh-CN',
      weekStart: 1, //周一从那天开始
      todayHighlight: false, //高亮今天
      startView: 2, //日期时间选择器打开之后首先显示的视图
      minView: 2, //日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev) {
      var selectDate = new Date(ev.date),
        selectTimeStamp = Date.parse(new Date(ev.date)),
        endDateTimeStamp = Date.parse(myData.endDate);

      if (selectTimeStamp >= endDateTimeStamp) {
        myData.startDate = selectDate;
        myData.endDate = new Date(Date.parse(new Date(selectDate)) + 86400000);
      } else {
        myData.startDate = selectDate;
      }
      _this.renderTimePicker();

      endDatePicker.datetimepicker('update');

      startDateDOM.removeClass('select');
      endDateDOM.addClass('select');

      starDatePicker.hide();
      endDatePicker.show();
    });

    endDateDOM.click(function() {
      startDateDOM.removeClass('select');
      $(this).addClass('select');

      starDatePicker.hide();
      endDatePicker.show();

      apartmentList.hide();
    });

    endDatePicker.datetimepicker({
      initialDate: utilities.dateToYYYYMMDDFormat(endDate),
      startDate: utilities.dateToYYYYMMDDFormat(endDate),
      format: "yyyy MM dd", //格式
      autoclose: true, //自动关闭
      todayBtn: false, //今天
      minuteStep: 10, //用于选择分钟
      language: 'zh-CN',
      weekStart: 1, //周一从那天开始
      todayHighlight: false, //高亮今天
      startView: 2, //日期时间选择器打开之后首先显示的视图
      minView: 2, //日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev) {
      var starDateTimeStamp = Date.parse(myData.startDate),
        selectDate = new Date(ev.date),
        selectTimeStamp = Date.parse(new Date(ev.date));

      if (selectTimeStamp <= starDateTimeStamp) {
        myData.startDate = new Date(Date.parse(new Date(selectDate)) - 86400000);
        myData.endDate = selectDate;
      } else {
        myData.endDate = selectDate;
      }
      _this.renderTimePicker();

      starDatePicker.datetimepicker('update');

      startDateDOM.removeClass('select');
      endDateDOM.removeClass('select');

      starDatePicker.hide();
      endDatePicker.hide();

      apartmentList.show();
      apartmentList.html('<div class="loader--audioWave"></div>');

      myData.searchApartmentAjax()
        .then(function(val) {
          _this.data = utilities.addSelect(val);
          _this.renderSideApartment();
          _this.renderApartmentDetail();
        }, function(error) {
          alert(error);
        });
    });
  },

  renderTimePicker: function() {
    var startDate = myData.startDate,
      endDate = myData.endDate;

    $('#startDate').html(utilities.dateToYYYYMMDDFormat(startDate));
    $('#endDate').html(utilities.dateToYYYYMMDDFormat(endDate));

    $('#starDatePicker input').val(utilities.dateToYYYYMMDDFormat(startDate));
    $('#endDatePicker input').val(utilities.dateToYYYYMMDDFormat(endDate));
  },

  // 侧边栏上面的房型
  renderSideApartment: function() {
    var _this = this,
      dataList = this.data.list,
      apartmentList = $('#apartmentList');

    if (dataList.length === 0) {
      apartmentList.html([
        '<div class="apartmentList-infor">',
          '当前时间暂无可选房型<br/>可拨打 400-9688-768 咨询',
        '</div>',
        '<div class="apartmentList-submit failure">预定度假村</div>'
      ].join(''));
    } else {
      var myDomString = '',
          allPrice = 0,
          myCount = 0;

      myDomString += '<div class="apartmentList-content">';
      for (var i = 0; i < dataList.length; i++) {(function (i) {
        var data = dataList[i];

        if (data.select.length > 0) {
          myCount += data.select.length;

          myDomString += '<div class="apartmentList-division">';
          for (var j = 0; j < data.select.length; j++) {(function (j) {
            var mySelectPrice = utilities.renderSelectPrice(data.select[j]);

            allPrice += mySelectPrice;
            myDomString += [
            '<div class="apartment">',
              '<div class="apartment-title">',
                '<div>' + data.select[j].apartmentName + '</div>',
                '<div class="title-rigth" id="price' + i + "" + j + '">' + mySelectPrice + ' RMB</div>',
              '</div>',
              '<div class="apartment-select">',
                '<div class="select-name">成人</div>',
                '<div class="select-btn">',
                  '<span class="adultCut">-</span>',
                  '<div class="adult" id="adult' + i + "" + j + '">' + data.select[j].adultNum + '</div>',
                  '<span class="adultAdd">+</span>',
                '</div>',
              '</div>',
              '<div class="apartment-select">',
                '<div class="select-name">儿童</div>',
                '<div class="select-btn">',
                  '<span class="childrenCut">-</span>',
                  '<div class="children" id="children' + i + "" + j + '">' + data.select[j].childNum + '</div>',
                  '<span class="childrenAdd">+</span>',
                '</div>',
              '</div>',
              '<div class="apartment-select">',
                '<div class="select-name">床型</div>',
                '<select>',
                  renderSelectBedType(data.select[j].bedTypeList, data.select[j].bedType),
                '</select>',
              '</div>',
              '<div class="apartment-delete">删除</div>',
            '</div>'
            ].join('');
          })(j)}
          myDomString += '</div>';
        } else {
          myDomString += '<div class="apartmentList-division"></div>';
        }
      })(i)}
      myDomString += '</div>';
      
      if (myCount === 0) {
        myDomString += [
          '<div class="apartmentList-infor">',
            '请在房型详情中选择你的房型',
          '</div>',
          '<div id="orderApartment" class="apartmentList-submit">预定度假村</div>'
        ].join('')
      } else {
        myDomString += [
          '<div id="allSelectPrice" class="apartmentList-infor">',
            '合计: ' + allPrice + ' RMB',
          '</div>',
          '<div id="orderApartment" class="apartmentList-submit">预定度假村</div>'
        ].join('')
      }

      apartmentList.html(myDomString);

      var apartmenNodeDivision = $('#apartmentList .apartmentList-division');
      for (var i = 0; i < dataList.length; i++) {(function(i) {
        var data = dataList[i],
            myDivisionNode = $(apartmenNodeDivision[i]);

        var apartmentSelect = myDivisionNode.find('.apartment');

        if (apartmentSelect.length > 0) {
          for (var j = 0; j < data.select.length; j++) {(function(j) {
            var mySelect = data.select[j];
                mySelectNode = $(apartmentSelect[j]);

            mySelectNode.find('.adultCut').click(function() {
              if (mySelect.adultNum <= 1) { return }
              _this.data.list[i].select[j].adultNum--;
              $('#adult' + i + '' + j).html(_this.data.list[i].select[j].adultNum);
              var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
              _this.data.list[i].select[j].prices = myPrice;
              $('#price' + i + '' + j).html(myPrice + ' RMB');
              $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
            });

            mySelectNode.find('.adultAdd').click(function() {
              if ((mySelect.adultNum + 1) > mySelect.adultMax) { return }
              _this.data.list[i].select[j].adultNum++;
              $('#adult' + i + '' + j).html(_this.data.list[i].select[j].adultNum);
              var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
              _this.data.list[i].select[j].prices = myPrice;
              $('#price' + i + '' + j).html(myPrice + ' RMB');
              $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
            });
            
            mySelectNode.find('.childrenCut').click(function() {
              if (mySelect.childNum < 1) { return }
              _this.data.list[i].select[j].childNum--;
              $('#children' + i + '' + j).html(_this.data.list[i].select[j].childNum);
              var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
              _this.data.list[i].select[j].prices = myPrice;
              $('#price' + i + '' + j).html(myPrice + ' RMB');
              $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
            });

            mySelectNode.find('.childrenAdd').click(function() {
              if ((mySelect.childNum + 1) > mySelect.childrenMax) { return }
              _this.data.list[i].select[j].childNum++;
              $('#children' + i + '' + j).html(_this.data.list[i].select[j].childNum);
              var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
              _this.data.list[i].select[j].prices = myPrice;
              $('#price' + i + '' + j).html(myPrice + ' RMB');
              $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
            });

            mySelectNode.find('select').change(function() {
              _this.data.list[i].select[j].bedType = $(this).val();
            });
            
            mySelectNode.find('.apartment-delete').click(function() {
              if (confirm('你确认要删除吗?')) {
                _this.data.list[i].select.splice(j, 1);
                _this.renderSideApartment();
                _this.renderApartmentDetail();
              }
            });
          })(j)}
        }
      })(i)}

      // 预定度假村
      $('#orderApartment').click(function() {
        var allApartmentNum = 0

        for (var i = 0; i < dataList.length; i++) {
          allApartmentNum += dataList[i].select.length;
        }

        if (allApartmentNum === 0) {
          alert('请选择房型!');
          return
        }

        myData.checkLogin()
          .then(function (data) {
            if (data === true) {
              return true
            } else {
              $("#loginModal").modal('show');
              $(".input1 input").val("");
              $(".input1 span").text("");
              $(".input1 i").removeClass("mistakeicon");
              $(".input1 i").removeClass("correcticon");
              $(".input2 input").val("");
              $(".input2 span").text("");
              $(".input2 i").removeClass("mistakeicon");
              $(".input2 i").removeClass("correcticon");
              return false
            }
          }, function (error) {
            alert(error);
            return false
          })
          .then(function (next) {
            if (next) {
              var mydate = {
                startDate: myData.startDate,
                endDate: myData.endDate
              };
              
              localStorage.setItem('mydate',JSON.stringify(mydate));
              localStorage.setItem('apartmentList',JSON.stringify(myApartment.data.list));
              localStorage.setItem('village',JSON.stringify(myApartment.village));
              location = './../submit/index.html?effective=' + Date.parse(new Date());
            }
          })
      })

      function renderAllSelectPrice() {
        var dataList = _this.data.list,
            myallPrice = 0;
        
        for (var i = 0; i < dataList.length; i++) {
          for (var j = 0; j < dataList[i].select.length; j++) {
            myallPrice += utilities.renderSelectPrice(dataList[i].select[j]);
          }
        }
        
        return myallPrice;
      }

      function renderSelectBedType(bedTypeList, bedType) {
        var mybedString = '';

        for (var i = 0; i < bedTypeList.length; i++) {
          if (bedTypeList[i] == bedType) {
            mybedString += '<option value="' + bedTypeList[i] + '" selected="selected" >' + bedTypeList[i] + '</option>';
          } else {
            mybedString += '<option value="' + bedTypeList[i] + '">' + bedTypeList[i] + '</option>';
          }
        }
        return mybedString
      }
    }
  },

  renderReferPrice: function () {
    var _this = this,
      dataList = this.data.list,
      earnest = this.village.earnest,
      selectNum = 0,
      apartmentTotalPrice = $('#apartmentTotalPrice');

    for (var i = 0; i < dataList.length; i++) {
      var mySelectNum = dataList[0].select.length || 0;

      if (mySelectNum !== 0) {
        selectNum += mySelectNum;
      }
    }

    apartmentTotalPrice.html('预定价格<span>' + (earnest * selectNum) + ' RMB');
  },

  // 主页上面的房型
  renderApartmentDetail: function() {
    var _this = this,
      dataList = this.data.list,
      apartmentDetailDOM = $('#apartmentDetail');

    if (dataList.length === 0) {
      apartmentDetailDOM.html('<div class="message-infor">当前时间暂无可选房型<br/>可拨打 400-9688-768 咨询</div>');
    } else {
      var myDomString = '';
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];

        myDomString += [
        '<div class="apartment-block">',
          '<div class="apartment-content">',
            '<div class="img-content">',
              '<img src="' + URLbase + data.apartmentThumb + '" />',
              '<div class="apartment-confirm '+ renderDisable(data.skuNum, dataList[i].select.length) +'">+</div>',
            '</div>',
            '<div class="apartment-depiction">',
              '<div class="apartment-apartmentName">' + data.apartmentName + '</div>',
              '<div class="apartment-introduction">',
                '<div class="apartment-suggestedNum">建议入住: ' + data.suggestedNum + '人</div>',
                '<div class="apartment-bedType">床型: ' + renderBedType(data.bedType) + '</div>',
                '<div class="apartment-skuNum">' + ((data.skuNum - dataList[i].select.length) > 0 ? ('库存: ' + (data.skuNum - dataList[i].select.length) + '间') :'') + '</div>',
                '<div class="apartment-price">' + (data.initiatePrice ? ( data.initiatePrice + ' RMB 起' ) : '暂无价格') + '</div>',
              '</div>',
              '<div class="apartment-Desc">' + data.apartmentDesc + '</div>',
            '</div>',
            '<div class="apartment-line"></div>',
            '<div class="apartment-showDetail">查看详情</div>',
          '</div>',
        '</div>',
        ].join('');
        // myDomString += [
        // '<div class="apartment-block">',
        //   '<div class="apartment-content">',
        //     '<img src="' + URLbase + data.apartmentThumb + '" />',
        //     '<div class="apartment-depiction">',
        //       '<div class="apartment-title">' + data.apartmentName + '</div>',
        //       '<div class="apartment-introduction">' + data.apartmentDesc + '</div>',
        //       '<div class="apartment-price">预定价格: <span>' + (data.initiatePrice || '暂无' ) + '</span> &nbsp; 库存: <span>' + (data.skuNum || '0') + '</span></div>',
        //       '<div class="apartment-confirm">查看详情</div>',
        //       '<div class=' + ( dataList[i].selectNum > 0 ? "apartment-selected" : "apartment-select" ) + '>选择</div>',
        //     '</div>',
        //   '</div>',
        //   '<div class="apartment-line"></div>',
        // '</div>',
        // ].join('');
      }
      apartmentDetailDOM.html(myDomString);
    }

    var nodeListDetail = $('#apartmentDetail .apartment-showDetail'),
        nodeListSelect = $('#apartmentDetail .apartment-confirm');

    for (var i = 0; i < dataList.length; i++) {(function(i) {
      var data = dataList[i],
        myDetail = $(nodeListDetail[i]),
        mySelect = $(nodeListSelect[i]);

        myDetail.click(function() {
          $('#myApartmentModal').modal('show');
          $('#myApartmentModalContent').html([
            '<div class="modal-header">',
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
              '<h4 class="modal-title">' + data.apartmentName + '</h4>',
            '</div>',
            '<img src="' + URLbase + data.apartmentImg + '" />',
            '<div class="modal-depiction">',
              '<h3>房型信息</h3>',
              '<p>' + data.apartmentDesc + '</p>',
              '<h3>费用说明</h3>',
              '<div class="row">',
                '<div class="col-xs-6">成人价格: ' + (data.adultUnitPrice || '暂无') + '</div>',
                '<div class="col-xs-6">儿童价格: ' + (data.childUnitPrice || '暂无') + '</div>',
              '</div>',
              '<h3>入住规格</h3>',
              '<div class="row">',
                '<div class="col-xs-12">床型: ' + data.bedType + '</div>',
              '</div>',
              '<div class="row">',
                '<div class="col-xs-6">入住成人数: ' + data.adultMin + '-' + data.adultMax + '人</div>',
                '<div class="col-xs-6">入住儿童人数: ' + data.childrenMin + '-' + data.childrenMax + '人</div>',
              '</div>',
              '<div class="row">',
                '<div class="col-xs-6">最大入住人数: ' + data.peopleMax + '人</div>',
                '<div class="col-xs-6">建议入住人数: ' + data.suggestedNum + '人</div>',
              '</div>',
              '<h3>入住须知</h3>',
              '<p>' + data.notice + '</p>',
            '</div>'
          ].join(''));
        });

        mySelect.click(function() {
          if (!dataList[i].skuNum) { return }
          if (dataList[i].select.length > dataList[i].skuNum) {
            $(this).addClass('disable');
            return
          }
          $(this).removeClass('disable');
          var myselect = {
            apartmentName: _this.data.list[i].apartmentName,
            bedTypeList: _this.data.list[i].bedType.split(','),
            bedType: _this.data.list[i].bedType.split(',')[0],

            calMethod: _this.data.list[i].calMethod,
            initiatePrice: _this.data.list[i].initiatePrice, //起始价格

            peopleMax: _this.data.list[i].peopleMax,
            suggestedNum: _this.data.list[i].suggestedNum,

            adultNum: _this.data.list[i].suggestedNum,
            childNum: 0,
            adultMax: _this.data.list[i].adultMax,
            adultPrices: parseFloat(_this.data.list[i].adultPrices),
            childrenMax: _this.data.list[i].childrenMax,
            childPrices: parseFloat(_this.data.list[i].childPrices),
          }
          myselect.prices = utilities.renderSelectPrice(myselect);

          _this.data.list[i].select.push(myselect);
          _this.renderSideApartment();
          _this.renderApartmentDetail();
        })
    })(i)}

    function renderBedType(bedType) {
      var myBedList = bedType.split(',');

      if (myBedList[1]) {
        return '' + myBedList[0] + ',' + myBedList[1] + '...';
      } else {
        return '' + myBedList[0];
      }
    }

    function renderDisable(skuNum, selectNum) {
      if ((skuNum - selectNum) <= 0) {
        return 'disable';
      } else {
        return '';
      }

    }
  },

  initScroll: function() {
    var apartmentIsFlex = false,
      apartmentOffsetTop = $('#part1').offset().top - 50,
      apartmentDOM = $('#myApartment'),
      apartmentTitle = $('#apartmentTitle'),
      LoginDOM = $('#login'),
      tellHeader = $('.tell-header');

    $(window).scroll(function() {
      var distance = $(window).scrollTop()

      if (distance > apartmentOffsetTop) {
        if (apartmentIsFlex === false) {
          apartmentDOM.addClass('scrollFlex');
          apartmentTitle.show();
          LoginDOM.hide();
          tellHeader.hide();
          apartmentIsFlex = true;
        }
      } else {
        if (apartmentIsFlex) {
          apartmentDOM.removeClass('scrollFlex');
          apartmentTitle.hide();
          LoginDOM.show();
          tellHeader.show();
          apartmentIsFlex = false;
        }          
      }
    });
  }
}

// 工具类
var utilities = {
  dateToYYYYMMDDString: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + mm + dd;
  },

  renderSelectPrice: function (data) {
    var calMethod = data.calMethod, // 计算方式
      adultNum = data.adultNum, // 成人数
      adultPrices = data.adultPrices, // 成人价格
      childNum = data.childNum, // 儿童数
      childPrices = data.childPrices, // 儿童价格
      suggestedNum = data.suggestedNum, // 建议人数
      initiatePrice = data.initiatePrice; // 起始价格
    // 订房价格算法一：
    // 1、一个房间至少入住1成人；
    // 2、成人入住人数不得大于最多成人入住人数；
    // 3、儿童入住人数不得大于最多儿童入住人数；
    // 4、实际入住人数不得大于最多入住人数；
    // 5、房间实际入住总人数小于等于建议入住人数时，一律按房间起始价格计算；
    // （即订房价格=房间起始价格=成人单价*建议入住人数*晚数）
    // 6、房间实际入住总人数大于建议入住人数，但计算金额小于房间起始价格时，则订房价格按房间起始价格计算；
    // 7、在以上规则的基础上，房间实际入住总人数大于建议入住人数时，订房价格按实际入住情况计算。
    // （即订房价格=成人单价*成人人数*晚数+儿童单价*儿童人数*晚数）
    if (calMethod === '1') {
      if ((adultNum + childNum) <= suggestedNum) { // 房间实际入住总人数小于等于建议入住人数时
        var myPrice = (adultNum + childNum) * adultPrices;
        return (myPrice > initiatePrice ? myPrice : initiatePrice);
      } else { // 间实际入住总人数大于建议入住人数
        return ( (adultPrices * adultNum) + (childPrices * childNum) );
      }
    // 订房价格算法二：
    // 1、一个房间至少入住1成人；
    // 2、成人入住人数不得大于最多成人入住人数；
    // 3、儿童入住人数不得大于最多儿童入住人数；
    // 4、实际入住人数不得大于最多入住人数；
    // 5、房间起始价格作为基数（成人单价*建议入住人数*晚数）；
    // 6、成人超出价格=成年单价*超出成人人数(入住成人人数超出建议入住人数)*晚数；
    // 7、儿童价格=入住儿童单价*儿童人数*晚数；
    // 8、订房价格=基数+成人超出价格+儿童价格。
    } else {
      if (adultNum > suggestedNum) {
        return (initiatePrice + ((suggestedNum - adultNum) * initiatePrice) + (childPrices * childNum));
      } else {
        return (initiatePrice + (childPrices * childNum));
      }
    }
  },

  dateToYYYYMMDDFormat: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + '-' + mm + '-' + dd;
  },

  loadPageVar: function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  },

  addSelect: function(data) {
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].select = [];
    }

    return data
  } 
}

