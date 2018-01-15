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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component_Navigation_Bar_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Component_ScrollTop_index_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_convertDate_js__ = __webpack_require__(5);



 
$(document).ready(() => {
  if (utilities.loadPageVar('productId')) {
    product.id = utilities.loadPageVar('productId');
  } else {
    alert('非常抱歉, 此产品失效或产品编号有误!');
    return
  }

  __WEBPACK_IMPORTED_MODULE_0__Component_Navigation_Bar_index_js__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_1__Component_ScrollTop_index_js__["a" /* default */].init();
  scrollPin.init();
  carousel.init();

  product.init()
  .then(val => {
    val.productType === 'package' ? trip.init() : '';
    val.refundRuleId ? refundrule.init() : '';
  });

  attribute.init();
  costIncludes.init();
});

let product = {
  'id': null,
  'data': {
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
    // 'updateTime': 1485194651000
  },
  'isPromote': null,
  'selectdays': null, // 格式 时间戳
  'packageCount': 1,

  init() {
    const _this = this;

    this.bindjQueryEvent();

    return new Promise((resolve, reject) => {
      this.getProduct()
      .then(val => {
        _this.data = val;
        _this.renderProduct(val);
        resolve(val);
      }, error => reject(alert(error)))
    });
  },

  bindjQueryEvent() {
    const _this = this;

    $('#starDatePicker').datetimepicker({
        format: "yyyy MM dd", //格式
        autoclose: true, //自动关闭
        todayBtn: true, //今天
        startDate: __WEBPACK_IMPORTED_MODULE_2__utils_convertDate_js__["a" /* default */].dateToFormat(new Date()),
        minuteStep: 10, //用于选择分钟
        language: 'zh-CN',
        weekStart: 1, //周一从那天开始
        todayHighlight: true, //高亮今天
        startView: 2, //日期时间选择器打开之后首先显示的视图
        minView: 2, //日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev) {
        _this.selectdays = Date.parse(new Date(ev.date));
        _this.packageCount = 1;
        // 隐藏 时间区域
        $("#starDatePicker").hide();
        // 渲染 选择的时间
        $("#selectdays").text( __WEBPACK_IMPORTED_MODULE_2__utils_convertDate_js__["a" /* default */].dateToFormat(new Date(ev.date)) );
        // 显示选择套餐数量
        $('#selectPackageCount').show();
    });

    // 选择时间
    $('#selectdays').click(function(event) {
      $('#selectPackageCount').hide();
      $("#starDatePicker").show();
    });

    // 增加数量
    $('#countPicker .add').click(function(event) {
      _this.packageCount++
      _this.renderpackagecount();
    });

    // 减少套餐数量
    $('#countPicker .cut').click(function(event) {
      if (_this.packageCount <= 1) { return }
      _this.packageCount--
      _this.renderpackagecount();
    });

    // 确认提交
    $('#confirm-sumbit').click(function(event) {
      if (__WEBPACK_IMPORTED_MODULE_0__Component_Navigation_Bar_index_js__["a" /* default */].data === false) {
        return alert('你尚未登录, 请先登录您的账号');
      }

      window.location.href = `./submit/index.html?productId=${_this.id}&departureDate=${_this.selectdays}&productNum=${_this.packageCount}`;
    });
  },

  renderpackagecount() {
    let currentPrice = this.isPromote === true ? this.data.promotePrice : this.data.productPrice;
    let totalPrice = this.packageCount * currentPrice;

    $('#countPicker .main').text(`套餐数量 ${this.packageCount} 份`);
    $('#totalPrice').text(`合计 ${totalPrice} RMB`);
  },

  renderProduct() {
    const _this = this;

    this.chackIsPromote();

    // 标签
    $("#productName").html(this.data.productName);
    $("#apartmentTitle").html(this.data.productName);

    // 简单描述
    $("#productDesc").html(this.data.productDesc);

    // 套餐价格
    $("#productPrice").html(this.renderProductPrice());

    // 价格优惠期
    $("#promoteTime").html(this.renderPromoteTime());

    // 价格优惠期
    $("#totalPrice").html(`合计 ${this.isPromote === true ? this.data.promotePrice : this.data.productPrice} RMB`);
  },

  chackIsPromote() {
    const nowTimestamp = Date.parse(new Date()),
      promotePrice = this.data.promotePrice,
      promoteEndTimestamp = this.data.promoteEndTime,
      promoteStartTimestamp = this.data.promoteStartTime;

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return this.isPromote = true;
      }
    }

    return this.isPromote = false;
  },

  renderProductPrice() {
    return this.isPromote === true ? 
      `<span style='text-decoration:line-through'>${this.data.productPrice}</span> ${this.data.promotePrice}` :
      this.data.productPrice;
  },

  renderPromoteTime() {
    return this.isPromote === true ? 
      `<span>${__WEBPACK_IMPORTED_MODULE_2__utils_convertDate_js__["a" /* default */].dateToFormat(new Date(this.data.promoteStartTime))} 至 ${__WEBPACK_IMPORTED_MODULE_2__utils_convertDate_js__["a" /* default */].dateToFormat(new Date(this.data.promoteEndTime))}</span>` :
      '暂无';
  },

  getProduct() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/${this.id}/get.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 接收的产品信息数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品信息发生错误, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}

let carousel = {
  'data': [
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

  init() {
    const _this = this;

    this.getCarousel()
    .then(val => {
      _this.data = val;
      _this.renderCarousel();
    }, error => alert(error))
  },

  renderCarousel() {
    $('#carousel').html([
      '<div class="carousel slide" data-ride="carousel">',
        '<ol class="carousel-indicators">',
        this.data.map((val, key) => {
          return key === 0 ?
          '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' :
          `<li data-target="#carousel-example-generic" data-slide-to="${key}"></li>`;
        }).join(''),
        '</ol>',
        '<div class="carousel-inner" role="listbox" id="carousel">',
        this.data.map((val, key) => {
          return key === 0 ? [
            '<div class="item active">',
              `<a>`,
                `<img src="${appConfig.urlBase}${val.gallery.imgUrl}">`,
                '<div class="carousel-caption"></div>',
              '</a>',
            '</div>',
          ].join('') : [
            '<div class="item">',
              `<a>`,
                `<img src="${appConfig.urlBase}${val.gallery.imgUrl}">`,
                '<div class="carousel-caption"></div>',
              '</a>',
            '</div>',
          ].join('');
        }).join(''),
        '</div>',
        '<a id="carousel-left" class="left carousel-control" role="button" data-slide="prev">',
          '<span class="sr-only">Previous</span>',
          '<span class="glyphicon glyphicon-chevron-left"></span>',
          '<i class="left-btn allbtn"></i>',
        '</a>',
        '<a id="carousel-right" class="right carousel-control" role="button" data-slide="next">',
          '<span class="sr-only">Next</span>',
          '<span class="glyphicon glyphicon-chevron-right"></span>',
          '<i class="right-btn allbtn"></i>',
        '</a>',
      '</div>',
    ].join(''));

    $('.carousel').carousel();
    $('#carousel-left').click(() => {
      $('.carousel').carousel('prev')
    });
    $('#carousel-right').click(() => {
      $('.carousel').carousel('next')
    });
  },

  getCarousel() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/relProductGallery/${product.id}/findByProductId.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 但是轮播图数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求轮播图出错, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });
    })
  }
}

let attribute = {
  'data': [
    // {
    //   'attrId': 184,
    //   'attrName': '交通信息',
    //   'attrValue': '<p>哥打基那巴鲁）机场--斗湖机场</p><p>斗湖机场--仙本那码头<br></p><p>当天上岛的客人按到达的时间接送至仙本那0PM</p><p>POM POM度假村--仙本那码头--斗湖机场&nb</p>',
    //   'createBy': '2,3',
    //   'createTime': 1486150327000,
    //   'isDelete': 'N',
    //   'productId': 64,
    //   'sortOrder': 0,
    //   'updateBy': null,
    //   'updateTime': null,
    // }
  ],

  init() {
    const _this = this;

    this.getAttribute()
    .then(val => {
      _this.data = val;
      _this.renderAttribute();
    }, error => alert(error))
  },

  renderAttribute() {
    const _this = this;
    let lastData = this.data.length - 1;

    $('#part-attribute').html(this.data.map((val, key) => {
      return [
        `<div class="main-content${key !== lastData ? ' main-bottom-line' : ''}">`,
          `<div class="main-content-name">${val.attrName}</div>`,
          `<div class="main-content-value">${val.attrValue}</div>`,
        '</div>'
      ].join('')
    }).join(''));
  },

  getAttribute() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/attribute/findByProductId.do?productId=${product.id}`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 接收的产品详情数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品详情发生错误, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}

let trip = {
  'data': [
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

  init() {
    const _this = this;
    $('.part-trip').show();

    this.getTrip()
    .then(val => {
      _this.data = val;
      _this.renderTripFrom();
      _this.renderTripModal();
    }, error => alert(error))
  },

  renderTripFrom() {
    const _this = this;
    
    $('#part-trip').html([
      '<div class="trip-from">',
        '<div class="trip-from-tlitle">',
          '<div class="from-tripDay">日期</div>',
          '<div class="from-tripEvent">项目&amp;活动</div>',
          '<div class="from-tripPlace">入宿&amp;景点</div>',
        '</div>',
        this.data.map((val, key) => {
          return [
            '<div class="trip-from-main" data-toggle="modal" data-target="#trip-modal">',
              `<div class="from-tripDay">第${val.tripDay}天</div>`,
              `<div class="from-tripEvent">${val.tripEvent}</div>`,
              `<div class="from-tripPlace">${val.tripPlace}</div>`,
            '</div>'
          ].join('');
        }).join(''),
      '</div>',
    ].join(''));
  },

  renderTripModal() {
    const _this = this;

    $('#trip-modal').html([
      '<div class="modal-content">',
        '<div class="trip-modal-nav">',
          this.data.map((val, key) => {
            return `<div><a href="#modal-trip-day${key + 1}">第${key + 1}天</a></div>`
          }).join(''),
        '</div>',
        '<div class="trip-modal-main">',
          '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>',
            `<h4 class="modal-title" id="myModalLabel">${product.data.productName}</h4>`,
          '</div>',
          
          '<div class="modal-body">',
            '<div class="journey">',
              this.data.map((val, key) => {
                return [
                  `<div class="journey-title" id="modal-trip-day${key + 1}">第${key + 1}天</div>`,
                  `<div class="journey-content">${val.tripDesc}</div>`,
                ].join('');
              }).join(''),
            
            '</div>',
          '</div>',
          
          '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join(''));

  },

  getTrip() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/trip/findByProductId.do?productId=${product.id}`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 接收的产品旅途详情数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品旅途详情发生错误, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}

let costIncludes = {
  'data': [
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

  init() {
    const _this = this;

    this.getcostIncludes()
    .then(val => {
      _this.data = val;
      _this.rendercostIncludes();
    }, error => alert(error))
  },

  rendercostIncludes() {
    const _this = this;
    let lastData = this.data.length - 1;

    $('#part-costIncludes').html(this.data.map((val, key) => {
      return [
        `<div class="main-content${key !== lastData ? ' main-bottom-line' : ''}">`,
          `<div class="main-content-name">${val.costTitle}</div>`,
          `<div class="main-content-value">${val.costContent}</div>`,
        '</div>'
      ].join('')
    }).join(''));
  },

  getcostIncludes() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/costIncludes/findByProductId.do?productId=${product.id}`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 接收的产品包含详情数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品包含详情发生错误, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}

let refundrule = {
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

  init() {
    const _this = this;
    $('.part-refundrule').show();

    this.getRefundrule()
    .then(val => {
      _this.data = val;
      _this.renderRefundrule();
    }, error => alert(error))
  },

  renderRefundrule() {
    const _this = this;
    let ruleLength = this.data.ruleItemList.length;

    $('#part-refundrule').html([
      '<div class="part-content">',
        '<div class="content-tlitle">退款说明</div>',
        '<div class="part-main">',

          '<div class="refundrule-strip">',
            this.data.ruleItemList.map((val, key) => {
              let ruleItemWidth = ( 1 - key * ( 1 / ruleLength ) ) * 100;
              return [
                `<div style="width: ${ruleItemWidth}%; ${_this.renderRuleItemBackground(key)}">`,
                  `<span>${_this.renderRuleDate(val)}</span>`,
                  `<a>扣${val.deductionRatio}</a>`,
                '</div>'
              ].join('');
            }).join(''),
          '</div>',

          '<div class="refundrule-detail">',
            this.data.ruleItemList.map(val => 
              `<p>${val.ruleDesc}</p>`
            ).join(''),
          '</div>',
        '</div>',
      '</div>'
    ].join(''));
  },

  renderRuleDate(data) {
    return data.endDay < 0 ? 
      `${data.beginDay}天以上` :
      `${data.beginDay}天`;
  },

  renderRuleItemBackground(num) {
    let percentage = (num + 1) * (1 / this.data.ruleItemList.length);
    return `background:rgba(69, 90, 100, ${percentage});`;
  },

  getRefundrule() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/refundrule/${product.data.refundRuleId}/item/list.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 接收的产品包含详情数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品包含详情发生错误, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });
    })
  }
}

let scrollPin = {
  init() {
    let isPin = false;

    $(window).scroll(function() {
      let scrollTop = $(window).scrollTop();
      let carouselClientHeight = $('#carousel')[0].clientHeight;
      if (scrollTop > carouselClientHeight) {
        if (isPin === false) {
          $('.part-content-right').addClass('isPin');
          $('.header-login').hide();
          $('.header-tell').hide();
          isPin = true;
        }
      } else {
        if (isPin === true) {
          $('.part-content-right').removeClass('isPin');
          $('.header-login').show();
          $('.header-tell').show();
          isPin = false;
        }
      }
    });
  }
}

// 工具类
var utilities = {
  loadPageVar: function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_cookies__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_request__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_request__);



/* harmony default export */ __webpack_exports__["a"] = ({
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

  init: function(SelectedNumString) {
    const _this = this;

    this.litUpContentSelected(SelectedNumString);

    this.bindjQueryEvent();

    this.setOptionCookie();

    this.getUserInfo()
    .then(val => {
      if (val.result === 1) {
        _this.data = val.data;
        $('.login-true').show();
      } else {
        if (val.result === 3) {
          console.log(val.message);
        }
        $('.login-false').show();
  
        $('#login-show').click(() => {
          _this.loginModalShow();
        });
      }
    }, error => alert(error));
  },

  loginModalShow: function() {
    this.isModalShow = true;
    $("#Modal-login").modal('show');
  },

  loginModalHide: function() {
    this.isModalShow = false;
    $($('.input-username label')[0]).html('');
    $($('.input-password label')[0]).html('');
    $('#input-password').val('');
  },

  bindjQueryEvent: function() {
    const _this = this;

    // 隐藏模态框
    $('#login-hiden').click(() => {
      $("#Modal-login").modal('hide');
    });
    $("#Modal-login").on('hidden.bs.modal', e => {
      _this.loginModalHide();
    });

    // 显示隐藏密码
    $('#password-eye').click(() => {
      if (_this.isPasswordShow) {
        $('#password-eye').removeClass('eye-show');
        $('#input-password').attr('type','password');
        _this.isPasswordShow = false;
      } else {
        $('#password-eye').addClass('eye-show');
        $('#input-password').attr('type','text');
        _this.isPasswordShow = true;
      }
    });

    // 输入账号
    $('#input-username').bind('input propertychange', function(event) {
      _this.username = $(this).val();
      _this.checkUserName();
    });

    // 输入密码
    $('#input-password').bind('input propertychange', function(event) {
      _this.password = $(this).val();
      _this.checkPassword();
    });

    // 记住密码
    $('#option-cookie').click(function(event) {
      if (_this.isRememberCookie) {
        $(this).attr("checked", false);
        _this.isRememberCookie = false;
      } else {
        $(this).attr("checked", true);
        _this.isRememberCookie = true;
      }
    });

    // 登录
    $('#login-subimt').click(function(event) {
      _this.optionloginsubimt();
    });

    // 退出 登出
    $('#droplist-logout').click(function(event) {
      __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].removeItem('token', '/');
      __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].removeItem('digest', '/');

      $('.login-false').show();
      $('.login-true').hide();
    });

    // 下拉框移入 显示
    $('.login-droplist').mouseenter(function(event) {
      _this.isOutDropdown = false;
      _this.dropdownSetTimeout = setTimeout(function() {
        if (_this.isOutDropdown === false) {
          $('.login-user').dropdown('toggle');
        }
      }, 500);
    });
    $('.login-droplist').mouseleave(function(event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
    $('#dLabel').click(function(event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
  },

  optionloginsubimt: function () {
    const _this = this;

    if (this.isLogining) { return false }

    if (
      this.checkUserName().result !== 1 ||
      this.checkPassword().result !== 1
    ) {
      return false
    }
    
    let myDom = $(this);
    myDom.text('正在提交');
    this.isLogining = true;

    this.subimtLogin()
    .then(val => {
      if (val.result === 1) {
        _this.data = val.data;

        _this.SaveCookie();
        $("#Modal-login").modal('hide');

        $('.login-false').hide();
        $('.login-true').show();
      } else if (val.result == '-9') {
        $($('.input-username label')[0]).html(
          '<div class="danger">您的账号尚未激活</div>'
        );
      } else if (val.result == '-5') {
        $($('.input-username label')[0]).html(
          '<div class="danger">此账号不存在</div>'
        );
      } else if (val.result == '-6') {
        $($('.input-password label')[0]).html(
          '<div class="danger">您输入的密码是错误, 请输入正确的密码！</div>'
        );
      }

      myDom.text('登录');
      _this.isLogining = false;
    }, error => {
      myDom.text('登录');
      _this.isLogining = false;
      alert(error);
    });
  },

  setOptionCookie: function() {
    let rememberCookie = localStorage.getItem('remember-cookie');

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

  SaveCookie: function() {
    let SevenDayLater = new Date( Date.parse(new Date()) + (86400000 * 7) );
    
    __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].setItem('token', this.data.token, SevenDayLater, '/');
    __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].setItem('digest', this.data.digest, SevenDayLater, '/');

    if (this.isRememberCookie) {
      localStorage.setItem('remember-cookie', JSON.stringify({
        username: this.username,
        password: this.password,
      }))
    } else {
      localStorage.removeItem('remember-cookie');
    }
  },

  checkUserName: function () {
    let usernameLabel = $($('.input-username label')[0]);

    if (this.username === '') {
      usernameLabel.html('<div>请输入用户名</div>');
      return __WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('用户名为空');
    }

    // 既不是邮箱账号, 也不是手机账号
    if (
      /^1[34578]\d{9}$/.test(this.username) === false &&
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.username) === false
    ) {
      usernameLabel.html('<div class="warning">请输入正确手机或邮箱格式的账号</div>');
      return __WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('账号格式有误');
    }

    usernameLabel.html('');
    return __WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.success();
  },

  checkPassword: function () {
    let passwordLabel = $($('.input-password label')[0]);

    if (this.password === '') {
      passwordLabel.html('<div>请输入密码</div>');
      return __WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('密码为空');
    }

    // 密码小于 8 位
    if (this.password.length < 8) {
      passwordLabel.html('<div class="warning">输入的密码不能小于8位长度</div>');
      return __WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('密码格式有误');
    }

    passwordLabel.html('');
    return __WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.success();
  },

  subimtLogin: function () {
    const _this = this;
    let subimtData;

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

    return new Promise((resolve, reject) => {
      fetch(`${appConfig.version}/user/login.do`,{
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        body: JSON.stringify(subimtData)
      }).then(
        response => response.json(),
        error => ({'result':'1', 'message': error})
      ).then(val => {
        if (val.result === '0') {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.success(val.data));
        } else if (val.result == '-9') {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('您的账号尚未激活', '-9'));
        } else if (val.result == '-5') {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('此账号不存在', '-5'));
        } else if (val.result == '-6') {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('您输入的密码是错误, 请输入正确的密码', '-6'));
        } else {
          reject(`请求服务器成功, 但是用户登录信息有误! 原因: ${val.message}`);
        }
      }).catch(error => {
        reject(`请求出错 , 向服务器发起请求用户登录失败, 原因: ${error}`);
      })
    });
  },

  getUserInfo: () => new Promise((resolve, reject) => {
    $.ajax({
      'type': "GET", 
      'url': `${appConfig.version}/user/getUserInfo.do`, 
      'contentType': "application/json; charset=utf-8", 
      'headers': {
        'token': __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].getItem('token'),
        'digest': __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].getItem('digest')
      },
      success: val => {
        if (val.result === '0') {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.success(val.data));
        } else if (val.result === '401') {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error('你尚未登录!', 2));
        } else {
          resolve(__WEBPACK_IMPORTED_MODULE_1__utils_request___default.a.error(`请求服务器成功, 但是用户信息有误! 原因: ${val.message}`, 3));
        }
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        reject(`请求用户信息出错, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`)
      }
    });
  }),

  litUpContentSelected(SelectedNumString) {
    if (SelectedNumString) {
      $($('.header-content a')[SelectedNumString]).addClass('content-selected');
    }
  }
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 * docCookies.getItem(name)
 * docCookies.removeItem(name[, path], domain)
 * docCookies.hasItem(name)
 * docCookies.keys()
 */

let docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    let sExpires = "";
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
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (docCookies);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
    success: (data, message) => ({
        'result': 1,
        'data': data || null,
        'message': message || 'Request to Database success'
    }),

    error: (message, result, data) => ({
        'result': result || 0,
        'data': data || null,
        'message': message
    })
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init() {
    this.scrollTop();
    this.siderBar();
  },

  siderBar() {
    let myclientWidth = document.body.clientWidth;

    $('#showSidebar').click(function(){
      $('#side-bar').animate({
        'right': '0'
      }, 70);
    });

    $("#closeSidebar").click(function(){
      $('#side-bar').animate({'right': '-330px'}, 70);
    });
  },

  scrollTop() {
    let scrollTopTimer = null,
        isshowScrollIcon = false,
        scrollTopNumber;
    
    window.onscroll= () => {
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

          setTimeout(() => {
            $('#scroll-icon-top').css('visibility', 'hidden');
          }, 500);
        }
      }

      return scrollTopNumber;
    }

    $('#scroll-icon-top').click(() => {
      clearInterval(scrollTopTimer);

      scrollTopTimer = setInterval(() => {

        let nowScroll = scrollTopNumber;
        let speed= ( 0 - nowScroll ) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(scrollTopNumber <= 10){
          clearInterval(scrollTopTimer);
        }
        document.documentElement.scrollTop = scrollTopNumber + speed;
        document.body.scrollTop = scrollTopNumber + speed;
      }, 10);

    });
  }
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  // Date 转换 xxxx-xx-xx 字符串
  dateToFormat: (myDate) => {
    let yyyy = myDate.getFullYear();

    let mm = myDate.getMonth() + 1;
    let mmstring = mm < 10 ? '0' + mm : mm;

    let dd = myDate.getDate();
    let ddstring = dd < 10 ? '0' + dd : dd;

    return `${yyyy}-${mmstring}-${ddstring}`;
  },

  // xxxx-xx-xx 字符串 转换 时间戳
  YYYYMMDDFormatToTimestamp: (data) => {
    let myDateList = data.split("-");
    return Date.parse(new Date(myDateList[0], (parseInt(myDateList[1]) - 1), myDateList[2]));
  },
  
  // Date 转换 20180102 字符串
  dateToYYYYmmNumber: (myDate) => {
    let yyyy = myDate.getFullYear();

    let mm = myDate.getMonth() + 1;
    let mmstring = mm < 10 ? '0' + mm : mm;

    let dd = myDate.getDate();
    let ddstring = dd < 10 ? '0' + dd : dd;
    
    return `${yyyy}${mmstring}${ddstring}`;
  },
  
  // Date 转换 xxxx-xx-xx xx:xx:xx 字符串
  dateToYYYYmmDDhhMMss: (myDate) => {
    let yyyy = myDate.getFullYear();

    let mm = myDate.getMonth() + 1;
    let mmstring = mm < 10 ? '0' + mm : mm;

    let dd = myDate.getDate();
    let ddstring = dd < 10 ? '0' + dd : dd;

    let hh = myDate.getHours();
    let hhstring = hh < 10 ? '0' + hh : hh;

    let Min = myDate.getMinutes();
    let Minstring = Min < 10 ? '0' + Min : Min;

    let ss = myDate.getSeconds();
    let ssstring = ss < 10 ? '0' + ss : ss;
    
    return `${yyyy}-${mmstring}-${ddstring} ${hhstring}:${Minstring}:${ssstring}`;
  }
});

/***/ })
/******/ ]);