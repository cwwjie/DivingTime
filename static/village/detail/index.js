/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(4);

var _index4 = _interopRequireDefault(_index3);

var _convertDate = __webpack_require__(5);

var _convertDate2 = _interopRequireDefault(_convertDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  if (utilities.isSupport() === false) {
    alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');return;
  }

  if (utilities.loadPageVar('resortCode') && utilities.loadPageVar('resortId') && utilities.loadPageVar('selectNum')) {
    product.resortCode = utilities.loadPageVar('resortCode');
    product.resortId = parseInt(utilities.loadPageVar('resortId'));
    product.selectNum = parseInt(utilities.loadPageVar('selectNum'));
  } else {
    alert('非常抱歉, 此产品失效或产品编号有误!');
    return;
  }

  _index2.default.init();
  _index4.default.init();

  carousel.init();

  // 精确到日
  var nowDate = new Date();
  product.startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  product.endDate = new Date(Date.parse(product.startDate) + 86400000);

  product.init();
});

var product = {
  'resortCode': null, // 'KPL'
  'resortId': null,
  'selectNum': null,
  'startDate': new Date(),
  'endDate': new Date(),
  'data': {
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

  init: function init() {
    var _this = this;

    this.getVillageProduct().then(function (val) {
      _this.data = val.list[_this.selectNum];

      _this.searchApartmentAjax().then(function (val) {
        myApartment.data = utilities.addSelect(val);
        myApartment.village = _this.data;
        myApartment.init();
      }, function (error) {
        return alert(error);
      });
    }, function (error) {
      return alert(error);
    });
  },
  getVillageProduct: function getVillageProduct() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: appConfig.village + '/product/resort/1/0/list.do',
        contentType: 'application/json; charset=utf-8',
        success: function success(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },


  // 查询度假村产品 (复用)
  searchApartmentAjax: function searchApartmentAjax() {
    var resortCode = this.resortCode,
        startDate = _convertDate2.default.dateToYYYYmmNumber(this.startDate),
        endDate = _convertDate2.default.dateToYYYYmmNumber(this.endDate);

    return new Promise(function (resolve, reject) {
      if (resortCode === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      if (startDate && endDate) {
        $.ajax({
          'type': "GET",
          'url': appConfig.village + '/product/apartment/1/0/searchSource.do?startDate=' + startDate + '&endDate=' + endDate + '&resortCode=' + resortCode,
          'contentType': "application/json; charset=utf-8",
          success: function success(value) {
            if (value.result === '0') {
              resolve(value.data);
            } else {
              reject('查询的房型发生错误, 原因: ' + value.message);
            }
          },
          error: function error(XMLHttpRequest, textStatus, errorThrown) {
            reject('查询的房型发生错误, 原因: ' + errorThrown);
          }
        });
      } else {
        reject('非常抱歉，你查询的房型未传入具体时间。');
      }
    });
  }
};

var carousel = {
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
  init: function init() {
    var _this = this;

    this.getCarousel().then(function (val) {
      _this.data = val;
      _this.renderCarousel();
    }, function (error) {
      return alert(error);
    });
  },

  renderCarousel: function renderCarousel() {
    var data = this.data,
        imgNum = this.data.length,
        indicators = '',
        wrappers = '';

    if (imgNum === 0) {
      indicators = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
      wrappers = ['<div class="item active">', '<img src="./../../dist/img/404.jpg">', '<div class="carousel-caption">', '</div>', '</div>'].join('');
    } else {
      for (var i = 0; i < imgNum; i++) {
        var imgUrl = data[i].gallery.imgUrl;
        var indicator = '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" ' + (i === 0 ? ' class="active"' : '') + '></li>';
        var wrapper = ['<div class="item ' + (i === 0 ? 'active' : '') + '">', '<img src="' + appConfig.urlBase + imgUrl + '">', '<div class="carousel-caption">', '</div>', '</div>'].join('');

        indicators += indicator;
        wrappers += wrapper;
      }
    }

    $('#carouselIndicators').html(indicators);
    $('#carouselInner').html(wrappers);
  },
  getCarousel: function getCarousel() {
    var resortId = product.resortId;

    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': 'GET',
        'url': appConfig.village + '/product/relResortGallery/' + resortId + '/findByResortId.do',
        'contentType': 'application/json; charset=utf-8',
        success: function success(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('轮播图接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('轮播图接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  }
};

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

  init: function init() {
    var _this = this;

    this.getvillage().then(function (value) {
      _this.village = value;
      _this.renderApartmentBrand();
      _this.renderApartmentDetail();
      myRule.init(value.refundRuleId);
      _this.initTimePicker();
      _this.renderSideApartment();
      _this.initScroll();
    }, function (error) {
      alert(error);
    });
  },

  getvillage: function getvillage() {
    var resortId = utilities.loadPageVar('resortId');

    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': 'GET',
        'url': appConfig.village + '/product/resort/' + resortId + '/get.do',
        'contentType': 'application/json; charset=utf-8',
        success: function success(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  renderApartmentBrand: function renderApartmentBrand() {
    var myVillage = this.village;

    $('#brandName').html(myVillage.resortName + '<span>' + myVillage.label + '</span>');
    // 这个反过来了
    $('#villageDesc').html(myVillage.resortDesc);
    $('#villageRecommendation').html(myVillage.recommendation);

    $('#apartmentTotalPrice').html('预定价格<span>' + myVillage.initiatePrice + ' RMB 起</span>');
    $('#apartmentTitle').html(myVillage.resortName);
  },


  initTimePicker: function initTimePicker() {
    var _this = this,
        startDate = product.startDate,
        endDate = product.endDate,
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

    startDateDOM.click(function () {
      $(this).addClass('select');
      endDateDOM.removeClass('select');

      starDatePicker.show();
      endDatePicker.hide();

      apartmentList.hide();
    });

    starDatePicker.datetimepicker({
      initialDate: _convertDate2.default.dateToFormat(new Date(startDate)),
      startDate: _convertDate2.default.dateToFormat(new Date(startDate)),
      format: "yyyy MM dd", //格式
      autoclose: true, //自动关闭
      todayBtn: true, //今天
      minuteStep: 10, //用于选择分钟
      language: 'zh-CN',
      weekStart: 1, //周一从那天开始
      todayHighlight: false, //高亮今天
      startView: 2, //日期时间选择器打开之后首先显示的视图
      minView: 2 //日期时间选择器打开之后最小的视图
    }).on('changeDate', function (ev) {
      var selectDate = new Date(ev.date),
          selectTimeStamp = Date.parse(new Date(ev.date)),
          endDateTimeStamp = Date.parse(product.endDate);

      if (selectTimeStamp >= endDateTimeStamp) {
        product.startDate = selectDate;
        product.endDate = new Date(Date.parse(new Date(selectDate)) + 86400000);
      } else {
        product.startDate = selectDate;
      }
      _this.renderTimePicker();

      endDatePicker.datetimepicker('update');

      startDateDOM.removeClass('select');
      endDateDOM.addClass('select');

      starDatePicker.hide();
      endDatePicker.show();
    });

    endDateDOM.click(function () {
      startDateDOM.removeClass('select');
      $(this).addClass('select');

      starDatePicker.hide();
      endDatePicker.show();

      apartmentList.hide();
    });

    endDatePicker.datetimepicker({
      initialDate: _convertDate2.default.dateToFormat(new Date(endDate)),
      startDate: _convertDate2.default.dateToFormat(new Date(endDate)),
      format: "yyyy MM dd", //格式
      autoclose: true, //自动关闭
      todayBtn: false, //今天
      minuteStep: 10, //用于选择分钟
      language: 'zh-CN',
      weekStart: 1, //周一从那天开始
      todayHighlight: false, //高亮今天
      startView: 2, //日期时间选择器打开之后首先显示的视图
      minView: 2 //日期时间选择器打开之后最小的视图
    }).on('changeDate', function (ev) {
      var starDateTimeStamp = Date.parse(product.startDate),
          selectDate = new Date(ev.date),
          selectTimeStamp = Date.parse(new Date(ev.date));

      if (selectTimeStamp <= starDateTimeStamp) {
        product.startDate = new Date(Date.parse(new Date(selectDate)) - 86400000);
        product.endDate = selectDate;
      } else {
        product.endDate = selectDate;
      }
      _this.renderTimePicker();

      starDatePicker.datetimepicker('update');

      startDateDOM.removeClass('select');
      endDateDOM.removeClass('select');

      starDatePicker.hide();
      endDatePicker.hide();

      apartmentList.show();
      apartmentList.html('<div class="loader--audioWave"></div>');

      product.searchApartmentAjax().then(function (val) {
        _this.data = utilities.addSelect(val);
        _this.renderSideApartment();
        _this.renderApartmentDetail();
      }, function (error) {
        alert(error);
      });
    });
  },

  renderTimePicker: function renderTimePicker() {
    var startDate = product.startDate,
        endDate = product.endDate;

    $('#startDate').html(_convertDate2.default.dateToFormat(new Date(startDate)));
    $('#endDate').html(_convertDate2.default.dateToFormat(new Date(endDate)));

    $('#starDatePicker input').val(_convertDate2.default.dateToFormat(new Date(startDate)));
    $('#endDatePicker input').val(_convertDate2.default.dateToFormat(new Date(endDate)));
  },

  // 侧边栏上面的房型
  renderSideApartment: function renderSideApartment() {
    var _this = this,
        dataList = this.data.list,
        apartmentList = $('#apartmentList');

    if (dataList.length === 0) {
      apartmentList.html(['<div class="apartmentList-infor">', '当前时间暂无可选房型<br/>可拨打 400-9688-768 咨询', '</div>', '<div class="apartmentList-submit failure">预定度假村</div>'].join(''));
    } else {
      var myDomString, allPrice, myCount;
      var i;
      var apartmenNodeDivision;
      var i;

      (function () {
        var renderAllSelectPrice = function renderAllSelectPrice() {
          var dataList = _this.data.list,
              myallPrice = 0;

          for (var i = 0; i < dataList.length; i++) {
            for (var j = 0; j < dataList[i].select.length; j++) {
              myallPrice += utilities.renderSelectPrice(dataList[i].select[j]);
            }
          }

          return myallPrice;
        };

        var renderSelectBedType = function renderSelectBedType(bedTypeList, bedType) {
          var mybedString = '';

          for (var i = 0; i < bedTypeList.length; i++) {
            if (bedTypeList[i] == bedType) {
              mybedString += '<option value="' + bedTypeList[i] + '" selected="selected" >' + bedTypeList[i] + '</option>';
            } else {
              mybedString += '<option value="' + bedTypeList[i] + '">' + bedTypeList[i] + '</option>';
            }
          }
          return mybedString;
        };

        myDomString = '';
        allPrice = 0;
        myCount = 0;


        myDomString += '<div class="apartmentList-content">';
        for (i = 0; i < dataList.length; i++) {
          (function (i) {
            var data = dataList[i];

            if (data.select.length > 0) {
              myCount += data.select.length;

              myDomString += '<div class="apartmentList-division">';
              for (var j = 0; j < data.select.length; j++) {
                (function (j) {
                  var mySelectPrice = utilities.renderSelectPrice(data.select[j]);

                  allPrice += mySelectPrice;
                  myDomString += ['<div class="apartment">', '<div class="apartment-title">', '<div>' + data.select[j].apartmentName + '</div>', '<div class="title-rigth" id="price' + i + "" + j + '">' + mySelectPrice + ' RMB</div>', '</div>', '<div class="apartment-select">', '<div class="select-name">成人</div>', '<div class="select-btn">', '<span class="adultCut">-</span>', '<div class="adult" id="adult' + i + "" + j + '">' + data.select[j].adultNum + '</div>', '<span class="adultAdd">+</span>', '</div>', '</div>', '<div class="apartment-select">', '<div class="select-name">儿童</div>', '<div class="select-btn">', '<span class="childrenCut">-</span>', '<div class="children" id="children' + i + "" + j + '">' + data.select[j].childNum + '</div>', '<span class="childrenAdd">+</span>', '</div>', '</div>', '<div class="apartment-select">', '<div class="select-name">床型</div>', '<select>', renderSelectBedType(data.select[j].bedTypeList, data.select[j].bedType), '</select>', '</div>', '<div class="apartment-delete">删除</div>', '</div>'].join('');
                })(j);
              }
              myDomString += '</div>';
            } else {
              myDomString += '<div class="apartmentList-division"></div>';
            }
          })(i);
        }
        myDomString += '</div>';

        if (myCount === 0) {
          myDomString += ['<div class="apartmentList-infor" id="showApartmentList">', '请在房型详情中选择你的房型', '</div>', '<div id="orderApartment" class="apartmentList-submit">预定度假村</div>'].join('');
        } else {
          myDomString += ['<div id="allSelectPrice" class="apartmentList-infor">', '合计: ' + allPrice + ' RMB', '</div>', '<div id="orderApartment" class="apartmentList-submit">预定度假村</div>'].join('');
        }

        apartmentList.html(myDomString);

        apartmenNodeDivision = $('#apartmentList .apartmentList-division');

        for (i = 0; i < dataList.length; i++) {
          (function (i) {
            var data = dataList[i],
                myDivisionNode = $(apartmenNodeDivision[i]);

            var apartmentSelect = myDivisionNode.find('.apartment');

            if (apartmentSelect.length > 0) {
              for (var j = 0; j < data.select.length; j++) {
                (function (j) {
                  var mySelect = data.select[j],
                      mySelectNode = $(apartmentSelect[j]);

                  mySelectNode.find('.adultCut').click(function () {
                    if (mySelect.adultNum <= 1) {
                      return;
                    }
                    _this.data.list[i].select[j].adultNum--;
                    $('#adult' + i + '' + j).html(_this.data.list[i].select[j].adultNum);
                    var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
                    _this.data.list[i].select[j].prices = myPrice;
                    $('#price' + i + '' + j).html(myPrice + ' RMB');
                    $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
                  });

                  mySelectNode.find('.adultAdd').click(function () {
                    if (mySelect.adultNum + 1 > mySelect.adultMax) {
                      return;
                    }
                    _this.data.list[i].select[j].adultNum++;
                    $('#adult' + i + '' + j).html(_this.data.list[i].select[j].adultNum);
                    var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
                    _this.data.list[i].select[j].prices = myPrice;
                    $('#price' + i + '' + j).html(myPrice + ' RMB');
                    $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
                  });

                  mySelectNode.find('.childrenCut').click(function () {
                    if (mySelect.childNum < 1) {
                      return;
                    }
                    _this.data.list[i].select[j].childNum--;
                    $('#children' + i + '' + j).html(_this.data.list[i].select[j].childNum);
                    var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
                    _this.data.list[i].select[j].prices = myPrice;
                    $('#price' + i + '' + j).html(myPrice + ' RMB');
                    $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
                  });

                  mySelectNode.find('.childrenAdd').click(function () {
                    if (mySelect.childNum + 1 > mySelect.childrenMax) {
                      return;
                    }
                    _this.data.list[i].select[j].childNum++;
                    $('#children' + i + '' + j).html(_this.data.list[i].select[j].childNum);
                    var myPrice = utilities.renderSelectPrice(_this.data.list[i].select[j]);
                    _this.data.list[i].select[j].prices = myPrice;
                    $('#price' + i + '' + j).html(myPrice + ' RMB');
                    $('#allSelectPrice').html('合计: ' + renderAllSelectPrice() + ' RMB');
                  });

                  mySelectNode.find('select').change(function () {
                    _this.data.list[i].select[j].bedType = $(this).val();
                  });

                  mySelectNode.find('.apartment-delete').click(function () {
                    if (confirm('你确认要删除吗?')) {
                      _this.data.list[i].select.splice(j, 1);
                      _this.renderSideApartment();
                      _this.renderApartmentDetail();
                    }
                  });
                })(j);
              }
            }
          })(i);
        }

        // 提示 度假村
        $('#showApartmentList').click(function () {
          $('#apartmentDetail').addClass('apartmentDetail-hover');
          $.smoothScroll({
            direction: 'top',
            offset: $('#apartmentDetail').offset().top - 120
          });
          setTimeout(function () {
            $('#apartmentDetail').removeClass('apartmentDetail-hover');
          }, 1000);
        });
        // 预定度假村
        $('#orderApartment').click(function () {
          var allApartmentNum = 0;

          for (var i = 0; i < dataList.length; i++) {
            allApartmentNum += dataList[i].select.length;
          }

          if (allApartmentNum === 0) {
            return alert('请选择房型!');
          }

          if (_index2.default.data === false) {
            return alert('你尚未登录, 请先登录您的账号');
          }

          var mydate = {
            startDate: product.startDate,
            endDate: product.endDate
          };

          localStorage.setItem('mydate', JSON.stringify(mydate));
          localStorage.setItem('apartmentList', JSON.stringify(myApartment.data.list));
          localStorage.setItem('village', JSON.stringify(myApartment.village));
          location = './../submit/index.html?effective=' + Date.parse(new Date());
        });
      })();
    }
  },

  renderReferPrice: function renderReferPrice() {
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

    apartmentTotalPrice.html('预定价格<span>' + earnest * selectNum + ' RMB');
  },

  // 主页上面的房型
  renderApartmentDetail: function renderApartmentDetail() {
    var _this = this,
        dataList = this.data.list,
        apartmentDetailDOM = $('#apartmentDetail');

    if (dataList.length === 0) {
      apartmentDetailDOM.html('<div class="message-infor">当前时间暂无可选房型<br/>可拨打 400-9688-768 咨询</div>');
    } else {
      var myDomString = '';
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];

        myDomString += ['<div class="apartment-block">', '<div class="apartment-content">', '<div class="img-content">', '<img src="' + appConfig.urlBase + data.apartmentThumb + '" />', '<div class="apartment-confirm ' + renderDisable(data.skuNum, dataList[i].select.length) + '">+</div>', '</div>', '<div class="apartment-depiction">', '<div class="apartment-apartmentName">' + data.apartmentName + '</div>', '<div class="apartment-introduction">', '<div class="apartment-suggestedNum">建议入住: ' + data.suggestedNum + '人</div>', '<div class="apartment-bedType">床型: ' + renderBedType(data.bedType) + '</div>', '<div class="apartment-skuNum">' + (data.skuNum - dataList[i].select.length > 0 ? '库存: ' + (data.skuNum - dataList[i].select.length) + '间' : '') + '</div>', '<div class="apartment-price">' + (data.initiatePrice ? data.initiatePrice + ' RMB 起' : '暂无价格') + '</div>', '</div>', '<div class="apartment-Desc">' + data.apartmentDesc + '</div>', '</div>', '<div class="apartment-line"></div>', '<div class="apartment-showDetail">查看详情</div>', '</div>', '</div>'].join('');
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

    for (var i = 0; i < dataList.length; i++) {
      (function (i) {
        var data = dataList[i],
            myDetail = $(nodeListDetail[i]),
            mySelect = $(nodeListSelect[i]);

        myDetail.click(function () {
          $('#myApartmentModal').modal('show');
          $('#myApartmentModalContent').html(['<div class="modal-header">', '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>', '<h4 class="modal-title">' + data.apartmentName + '</h4>', '</div>', '<img src="' + appConfig.urlBase + data.apartmentImg + '" />', '<div class="modal-depiction">', '<h3>房型信息</h3>', '<p>' + data.apartmentDesc + '</p>', '<h3>费用说明</h3>', '<div class="row">', '<div class="col-xs-6">成人价格: ' + (data.adultUnitPrice || '暂无') + '</div>', '<div class="col-xs-6">儿童价格: ' + (data.childUnitPrice || '暂无') + '</div>', '</div>', '<h3>入住规格</h3>', '<div class="row">', '<div class="col-xs-12">床型: ' + data.bedType + '</div>', '</div>', '<div class="row">', '<div class="col-xs-6">入住成人数: ' + data.adultMin + '-' + data.adultMax + '人</div>', '<div class="col-xs-6">入住儿童人数: ' + data.childrenMin + '-' + data.childrenMax + '人</div>', '</div>', '<div class="row">', '<div class="col-xs-6">最大入住人数: ' + data.peopleMax + '人</div>', '<div class="col-xs-6">建议入住人数: ' + data.suggestedNum + '人</div>', '</div>', '<h3>入住须知</h3>', '<p>' + data.notice + '</p>', '</div>'].join(''));
        });

        mySelect.click(function () {
          if (!dataList[i].skuNum) {
            return;
          }
          if (dataList[i].select.length >= dataList[i].skuNum) {
            $(this).addClass('disable');
            return;
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
            childPrices: parseFloat(_this.data.list[i].childPrices)
          };
          myselect.prices = utilities.renderSelectPrice(myselect);

          _this.data.list[i].select.push(myselect);
          _this.renderSideApartment();
          _this.renderApartmentDetail();
        });
      })(i);
    }

    function renderBedType(bedType) {
      var myBedList = bedType.split(',');

      if (myBedList[1]) {
        return '' + myBedList[0] + ',' + myBedList[1] + '...';
      } else {
        return '' + myBedList[0];
      }
    }

    function renderDisable(skuNum, selectNum) {
      if (skuNum - selectNum <= 0) {
        return 'disable';
      } else {
        return '';
      }
    }
  },

  initScroll: function initScroll() {
    var apartmentIsFlex = false,
        apartmentOffsetTop = $('#part1').offset().top - 50,
        apartmentDOM = $('#myApartment'),
        apartmentTitle = $('#apartmentTitle'),
        LoginDOM = $('#header-login'),
        tellHeader = $('.header-tell');

    $(window).scroll(function () {
      var distance = $(window).scrollTop();

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
};

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

  init: function init(id) {
    var _this = this;

    if (!id) {
      $('#part5').css('display', 'none');
      return;
    }

    this.getRuleData(id).then(function (val) {
      _this.data = val;
      _this.render();
    }, function (error) {
      alert(error);
    });
  },

  getRuleData: function getRuleData(id) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': 'GET',
        'url': appConfig.version + '/product/refundrule/' + id + '/item/list.do',
        'contentType': 'application/json; charset=utf-8',
        success: function success(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收的规则数据有误, 原因: ' + value.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('请求规则发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  render: function render() {
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

  judgDay: function judgDay(data) {
    return data.endDay < 0 ? data.beginDay + '天以上' : data.endDay + '天';
  }

  // 工具类
};var utilities = {
  renderSelectPrice: function renderSelectPrice(data) {
    var calMethod = data.calMethod,
        // 计算方式
    adultNum = data.adultNum,
        // 成人数
    adultPrices = data.adultPrices,
        // 成人价格
    childNum = data.childNum,
        // 儿童数
    childPrices = data.childPrices,
        // 儿童价格
    suggestedNum = data.suggestedNum,
        // 建议人数
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
      if (adultNum + childNum <= suggestedNum) {
        // 房间实际入住总人数小于等于建议入住人数时
        var myPrice = (adultNum + childNum) * adultPrices;
        return myPrice > initiatePrice ? myPrice : initiatePrice;
      } else {
        // 间实际入住总人数大于建议入住人数
        return adultPrices * adultNum + childPrices * childNum;
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
        return initiatePrice + (suggestedNum - adultNum) * initiatePrice + childPrices * childNum;
      } else {
        return initiatePrice + childPrices * childNum;
      }
    }
  },

  isSupport: function isSupport() {
    var testKey = 'test',
        storage = window.localStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },

  loadPageVar: function loadPageVar(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  },

  addSelect: function addSelect(data) {
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].select = [];
    }

    return data;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookies = __webpack_require__(2);

var _cookies2 = _interopRequireDefault(_cookies);

var _request = __webpack_require__(3);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'data': false,
  // {
  //   'bindEmailTime': 1484529221000,
  //   'birthday': "1989-06-01",
  //   'digest': "00000000-0000-0000-0000-00000000",
  //   'email': "123456798@divingtime.asia",
  //   'forgetPsState': null,
  //   'forgetPsTime': null,
  //   'gender': 1,
  //   'genderCount': null,
  //   'isDelete': "N",
  //   'isUseBind': "Y",
  //   'lastIp': "192.168.0.101",
  //   'lastLogin': 1515355000000,
  //   'mobile': "18511111111",
  //   'nickname': "18511111111",
  //   'passwd': null,
  //   'qq': null,
  //   'regTime': 1484189501000,
  //   'salt': null,
  //   'status': 1,
  //   'telephone': null,
  //   'token': "6fafefe0-0000-0000-0000-00000000",
  //   'userId': 70,
  //   'userName': "某某某",
  //   'validateCode': "bbbbb13b5c81e982dcde40c7205f0fc8",
  //   'visitCount': null,
  //   'webchat': null,
  // },
  'username': '', // 账号
  'password': '', // 密码

  'isModalShow': false, // 模态框 是否显示
  'isPasswordShow': false, // 密码 是否显示
  'isLogining': false, // 是否 正在登录
  'isRememberCookie': false, // 是否 记住密码

  'isOutDropdown': false, // 是否 离开下拉菜单
  'dropdownSetTimeout': null, // NodeJS.Timer

  init: function init(SelectedNumString) {
    var _this = this;

    this.litUpContentSelected(SelectedNumString);

    this.bindjQueryEvent();

    this.setOptionCookie();

    this.getUserInfo().then(function (val) {
      if (val.result === 1) {
        _this.data = val.data;
        $('.login-true').show();
      } else {
        if (val.result === 3) {
          console.log(val.message);
        }
        $('.login-false').show();

        $('#login-show').click(function () {
          _this.loginModalShow();
        });
      }
    }, function (error) {
      return alert(error);
    });
  },

  loginModalShow: function loginModalShow() {
    this.isModalShow = true;
    $("#Modal-login").modal('show');
  },

  loginModalHide: function loginModalHide() {
    this.isModalShow = false;
    $($('.input-username label')[0]).html('');
    $($('.input-password label')[0]).html('');
    $('#input-password').val('');
  },

  bindjQueryEvent: function bindjQueryEvent() {
    var _this = this;

    // 隐藏模态框
    $('#login-hiden').click(function () {
      $("#Modal-login").modal('hide');
    });
    $("#Modal-login").on('hidden.bs.modal', function (e) {
      _this.loginModalHide();
    });

    // 显示隐藏密码
    $('#password-eye').click(function () {
      if (_this.isPasswordShow) {
        $('#password-eye').removeClass('eye-show');
        $('#input-password').attr('type', 'password');
        _this.isPasswordShow = false;
      } else {
        $('#password-eye').addClass('eye-show');
        $('#input-password').attr('type', 'text');
        _this.isPasswordShow = true;
      }
    });

    // 输入账号
    $('#input-username').bind('input propertychange', function (event) {
      _this.username = $(this).val();
      _this.checkUserName();
    });

    // 输入密码
    $('#input-password').bind('input propertychange', function (event) {
      _this.password = $(this).val();
      _this.checkPassword();
    });

    // 记住密码
    $('#option-cookie').click(function (event) {
      if (_this.isRememberCookie) {
        $(this).attr("checked", false);
        _this.isRememberCookie = false;
      } else {
        $(this).attr("checked", true);
        _this.isRememberCookie = true;
      }
    });

    // 登录
    $('#login-subimt').click(function (event) {
      _this.optionloginsubimt();
    });

    // 退出 登出
    $('#droplist-logout').click(function (event) {
      _cookies2.default.removeItem('token', '/');
      _cookies2.default.removeItem('digest', '/');

      $('.login-false').show();
      $('.login-true').hide();
    });

    // 下拉框移入 显示
    $('.login-droplist').mouseenter(function (event) {
      _this.isOutDropdown = false;
      _this.dropdownSetTimeout = setTimeout(function () {
        if (_this.isOutDropdown === false) {
          $('.login-user').dropdown('toggle');
        }
      }, 500);
    });
    $('.login-droplist').mouseleave(function (event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
    $('#dLabel').click(function (event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
  },

  optionloginsubimt: function optionloginsubimt() {
    var _this = this;

    if (this.isLogining) {
      return false;
    }

    if (this.checkUserName().result !== 1 || this.checkPassword().result !== 1) {
      return false;
    }

    var myDom = $(this);
    myDom.text('正在提交');
    this.isLogining = true;

    this.subimtLogin().then(function (val) {
      if (val.result === 1) {
        _this.data = val.data;

        _this.SaveCookie();
        $("#Modal-login").modal('hide');

        $('.login-false').hide();
        $('.login-true').show();
      } else if (val.result == '-9') {
        $($('.input-username label')[0]).html('<div class="danger">您的账号尚未激活</div>');
      } else if (val.result == '-5') {
        $($('.input-username label')[0]).html('<div class="danger">此账号不存在</div>');
      } else if (val.result == '-6') {
        $($('.input-password label')[0]).html('<div class="danger">您输入的密码是错误, 请输入正确的密码！</div>');
      }

      myDom.text('登录');
      _this.isLogining = false;
    }, function (error) {
      myDom.text('登录');
      _this.isLogining = false;
      alert(error);
    });
  },

  setOptionCookie: function setOptionCookie() {
    var rememberCookie = localStorage.getItem('remember-cookie');

    if (rememberCookie) {
      rememberCookie = JSON.parse(rememberCookie);
      this.isRememberCookie = true;
      $('#option-cookie').attr("checked", true);

      this.username = rememberCookie.username;
      $('#input-username').val(rememberCookie.username);

      this.password = rememberCookie.password;
      $('#input-password').val(rememberCookie.password);
    }
  },

  SaveCookie: function SaveCookie() {
    var SevenDayLater = new Date(Date.parse(new Date()) + 86400000 * 7);

    _cookies2.default.setItem('token', this.data.token, SevenDayLater, '/');
    _cookies2.default.setItem('digest', this.data.digest, SevenDayLater, '/');

    if (this.isRememberCookie) {
      localStorage.setItem('remember-cookie', JSON.stringify({
        username: this.username,
        password: this.password
      }));
    } else {
      localStorage.removeItem('remember-cookie');
    }
  },

  checkUserName: function checkUserName() {
    var usernameLabel = $($('.input-username label')[0]);

    if (this.username === '') {
      usernameLabel.html('<div>请输入用户名</div>');
      return _request2.default.error('用户名为空');
    }

    // 既不是邮箱账号, 也不是手机账号
    if (/^1[34578]\d{9}$/.test(this.username) === false && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.username) === false) {
      usernameLabel.html('<div class="warning">请输入正确手机或邮箱格式的账号</div>');
      return _request2.default.error('账号格式有误');
    }

    usernameLabel.html('');
    return _request2.default.success();
  },

  checkPassword: function checkPassword() {
    var passwordLabel = $($('.input-password label')[0]);

    if (this.password === '') {
      passwordLabel.html('<div>请输入密码</div>');
      return _request2.default.error('密码为空');
    }

    // 密码小于 8 位
    if (this.password.length < 8) {
      passwordLabel.html('<div class="warning">输入的密码不能小于8位长度</div>');
      return _request2.default.error('密码格式有误');
    }

    passwordLabel.html('');
    return _request2.default.success();
  },

  subimtLogin: function subimtLogin() {
    var _this = this;
    var subimtData = void 0;

    if (/^1[34578]\d{9}$/.test(this.username)) {
      subimtData = {
        'mobile': this.username,
        'passwd': this.password
      };
    } else {
      subimtData = {
        'email': this.username,
        'passwd': this.password
      };
    }

    return new Promise(function (resolve, reject) {
      fetch(appConfig.version + '/user/login.do', {
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        body: JSON.stringify(subimtData)
      }).then(function (response) {
        return response.json();
      }, function (error) {
        return { 'result': '1', 'message': error };
      }).then(function (val) {
        if (val.result === '0') {
          resolve(_request2.default.success(val.data));
        } else if (val.result == '-9') {
          resolve(_request2.default.error('您的账号尚未激活', '-9'));
        } else if (val.result == '-5') {
          resolve(_request2.default.error('此账号不存在', '-5'));
        } else if (val.result == '-6') {
          resolve(_request2.default.error('您输入的密码是错误, 请输入正确的密码', '-6'));
        } else {
          reject('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u4F46\u662F\u7528\u6237\u767B\u5F55\u4FE1\u606F\u6709\u8BEF! \u539F\u56E0: ' + val.message);
        }
      }).catch(function (error) {
        reject('\u8BF7\u6C42\u51FA\u9519 , \u5411\u670D\u52A1\u5668\u53D1\u8D77\u8BF7\u6C42\u7528\u6237\u767B\u5F55\u5931\u8D25, \u539F\u56E0: ' + error);
      });
    });
  },

  getUserInfo: function getUserInfo() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': "GET",
        'url': appConfig.version + '/user/getUserInfo.do',
        'contentType': "application/json; charset=utf-8",
        'headers': {
          'token': _cookies2.default.getItem('token'),
          'digest': _cookies2.default.getItem('digest')
        },
        success: function success(val) {
          if (val.result === '0') {
            resolve(_request2.default.success(val.data));
          } else if (val.result === '401') {
            resolve(_request2.default.error('你尚未登录!', 2));
          } else {
            resolve(_request2.default.error('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u4F46\u662F\u7528\u6237\u4FE1\u606F\u6709\u8BEF! \u539F\u56E0: ' + val.message, 3));
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('\u8BF7\u6C42\u7528\u6237\u4FE1\u606F\u51FA\u9519, \u72B6\u6001\u7801: ' + XMLHttpRequest.status + '. \u539F\u56E0: ' + errorThrown);
        }
      });
    });
  },

  litUpContentSelected: function litUpContentSelected(SelectedNumString) {
    if (SelectedNumString) {
      $($('.header-content a')[SelectedNumString]).addClass('content-selected');
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 * docCookies.getItem(name)
 * docCookies.removeItem(name[, path], domain)
 * docCookies.hasItem(name)
 * docCookies.keys()
 */

var docCookies = {
  getItem: function getItem(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function hasItem(sKey) {
    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */function keys() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

exports.default = docCookies;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    success: function success(data, message) {
        return {
            'result': 1,
            'data': data || null,
            'message': message || 'Request to Database success'
        };
    },

    error: function error(message, result, data) {
        return {
            'result': result || 0,
            'data': data || null,
            'message': message
        };
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function init() {
    this.scrollTop();
    this.siderBar();
  },
  siderBar: function siderBar() {
    var myclientWidth = document.body.clientWidth;

    $('#showSidebar').click(function () {
      $('#side-bar').animate({
        'right': '0'
      }, 70);
    });

    $("#closeSidebar").click(function () {
      $('#side-bar').animate({ 'right': '-330px' }, 70);
    });
  },
  scrollTop: function scrollTop() {
    var scrollTopTimer = null,
        isshowScrollIcon = false,
        scrollTopNumber = void 0;

    window.onscroll = function () {
      scrollTopNumber = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTopNumber > 600) {
        if (isshowScrollIcon == false) {
          isshowScrollIcon = true;
          $('#scroll-icon-top').css('visibility', 'visible');
          $('#scroll-icon-top').animate({
            'opacity': ' 1'
          }, 500);
        }
      } else if (scrollTopNumber < 600) {
        if (isshowScrollIcon == true) {
          isshowScrollIcon = false;

          $('#scroll-icon-top').animate({
            'opacity': '0'
          }, 500);

          setTimeout(function () {
            $('#scroll-icon-top').css('visibility', 'hidden');
          }, 500);
        }
      }

      return scrollTopNumber;
    };

    $('#scroll-icon-top').click(function () {
      clearInterval(scrollTopTimer);

      scrollTopTimer = setInterval(function () {

        var nowScroll = scrollTopNumber;
        var speed = (0 - nowScroll) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (scrollTopNumber <= 10) {
          clearInterval(scrollTopTimer);
        }
        document.documentElement.scrollTop = scrollTopNumber + speed;
        document.body.scrollTop = scrollTopNumber + speed;
      }, 10);
    });
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    // Date 转换 xxxx-xx-xx 字符串
    dateToFormat: function dateToFormat(myDate) {
        var yyyy = myDate.getFullYear();

        var mm = myDate.getMonth() + 1;
        var mmstring = mm < 10 ? '0' + mm : mm;

        var dd = myDate.getDate();
        var ddstring = dd < 10 ? '0' + dd : dd;

        return yyyy + '-' + mmstring + '-' + ddstring;
    },

    // xxxx-xx-xx 字符串 转换 时间戳
    YYYYMMDDFormatToTimestamp: function YYYYMMDDFormatToTimestamp(data) {
        var myDateList = data.split("-");
        return Date.parse(new Date(myDateList[0], parseInt(myDateList[1]) - 1, myDateList[2]));
    },

    // Date 转换 20180102 字符串
    dateToYYYYmmNumber: function dateToYYYYmmNumber(myDate) {
        var yyyy = myDate.getFullYear();

        var mm = myDate.getMonth() + 1;
        var mmstring = mm < 10 ? '0' + mm : mm;

        var dd = myDate.getDate();
        var ddstring = dd < 10 ? '0' + dd : dd;

        return '' + yyyy + mmstring + ddstring;
    },

    // Date 转换 xxxx-xx-xx xx:xx:xx 字符串
    dateToYYYYmmDDhhMMss: function dateToYYYYmmDDhhMMss(myDate) {
        var yyyy = myDate.getFullYear();

        var mm = myDate.getMonth() + 1;
        var mmstring = mm < 10 ? '0' + mm : mm;

        var dd = myDate.getDate();
        var ddstring = dd < 10 ? '0' + dd : dd;

        var hh = myDate.getHours();
        var hhstring = hh < 10 ? '0' + hh : hh;

        var Min = myDate.getMinutes();
        var Minstring = Min < 10 ? '0' + Min : Min;

        var ss = myDate.getSeconds();
        var ssstring = ss < 10 ? '0' + ss : ss;

        return yyyy + '-' + mmstring + '-' + ddstring + ' ' + hhstring + ':' + Minstring + ':' + ssstring;
    }
};

/***/ })
/******/ ]);