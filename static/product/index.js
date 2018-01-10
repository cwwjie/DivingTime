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


$(document).ready(() => {

  __WEBPACK_IMPORTED_MODULE_0__Component_Navigation_Bar_index_js__["a" /* default */].init();
});

let carousel = {
  'data': [
    // {
    //   'carouselDesc': "疯狂旅拍包含宝贝，亲子，情侣三种系列",
    //   'carouselId': 20,
    //   'carouselTitle': "疯狂旅拍",
    //   'carouselUrl': "/source/image/carousel/4123b41f-aa2c-4664-ad34-43eef571c326.png",
    //   'createBy': 23,
    //   'createTime': 1492969464000,
    //   'isDelete': "N",
    //   'isShow': "Y",
    //   'leadUrl': "http':/divet.taobao.com/p/rd938859.html",
    //   'sortOrder': 0,
    //   'updateBy': 29,
    //   'updateTime': 1508118166000
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
              `<a href="${val.leadUrl}">`,
                `<img src="${appConfig.urlBase}${val.carouselUrl}">`,
                '<div class="carousel-caption"></div>',
              '</a>',
            '</div>',
          ].join('') : [
            '<div class="item">',
              `<a href="${val.leadUrl}">`,
                `<img src="${appConfig.urlBase}${val.carouselUrl}">`,
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
        'url': `${appConfig.version}/system/carousel/findByElement.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 但是轮播图数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求轮播图出错, 状态码: ${XMLHttpRequest.status}. 原因: ${textStatus}`);
        }
      });

    })
  }
}

let product = {
  'data': [
    // {
    //   'catDesc': null,
    //   'catId': 13,
    //   'catName': "潜游双人套餐",
    //   'createBy': null,
    //   'createTime': null,
    //   'isDelete': null,
    //   'isShow': null,
    //   'parentId': null,
    //   'sortOrder': null,
    //   'updateBy': null,
    //   'updateTime': null,
    //   'productList': [
    //     {
    //       'apartment': "邦邦 沙滩屋",
    //       'apartmentNum': 1,
    //       'bedType': null,
    //       'brandId': null,
    //       'clickCount': null,
    //       'createBy': null,
    //       'createTime': null,
    //       'isDelete': null,
    //       'isNew': "Y",
    //       'isOnsale': null,
    //       'period': 3,
    //       'productBrief': "未经雕琢的天然小岛--邦邦岛",
    //       'productDesc': null,
    //       'productId': 64,
    //       'productImg': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //       'productName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    //       'productPrice': 5700,
    //       'productSn': "000006",
    //       'productThumb': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //       'productType': "package",
    //       'productView': null,
    //       'promoteEndTime': 0,
    //       'promotePrice': 0,
    //       'promoteStartTime': 0,
    //       'refundRuleId': null,
    //       'updateBy': null,
    //       'updateTime': null,
    //     }
    //   ],
    // }
  ],

  init() {
    const _this = this;

    this.getProduct()
    .then(val => {
      _this.data = val;
      _this.renderProduct();
    }, error => alert(error))
  },

  renderProduct() {
    const _this = this;
    let isinterval = false;

    $('#product').html(
      this.data.map((list, key) => {
        // 交换间隔
        isinterval = isinterval ? false : true;

        let productLength = list.productList.length;

        return [
          `<div class="product-list${isinterval ? ' list-interval' : ''}">`,
            `<h2>${list.catName} <a href="https://divet.taobao.com/?spm=a1z10.1-c.0.0.8cxl3q" target='_blank'>更多</a></h2>`,

            '<div class="list-content">',
              list.productList.map((val, itemKey) => {
                let isLineThree = true; // 默认 三行

                if (productLength % 3 === 0) { // 正好整除
                  isLineThree = true;
                } else if (productLength % 3 == 2) { // 余 2
                  ( itemKey < (productLength - 2) ) ? isLineThree = true : isLineThree = false;
                } else if (productLength % 3 == 1) { // 余 1
                  ( itemKey < (productLength - 4) ) ? isLineThree = true : isLineThree = false;
                }

                return [
                  `<div class="item${isLineThree ? '' : ' item-big'}">`,
                    '<div class="item-content">',
                      `<a href="./product/index.html?productId=${val.productId}">`,
                        '<div class="item-img">',
                          `<img src="${appConfig.urlBase}${val.productThumb}" />`,
                          '<div class="img-label">',
                            _this.renderLabel(val),
                          '</div>',
                        '</div>',
                      '</a>',
                      '<div class="item-detail">',
                        '<div class="detail-NameAndPrice">',
                          '<div class="detail-productName">',
                            `<a href="./product/index.html?productId=${val.productId}">${val.productName}</a>`,
                          '</div>',
                          _this.renderPrice(val),
                        '</div>',
                        '<div class="detail-apartmentAndPromote">',
                          `<div class="detail-apartment">${
                            val.productType === "package" ? val.apartment : ''
                          }</div>`,
                          _this.renderPromote(val),
                        '</div>',
                      '</div>',
                    '</div>',
                  '</div>'
                ].join("");
              }).join(''),
            '</div>',
          '</div>'
        ].join('');
      }).join('')
    );
  },

  renderPromote(item) {
    const nowTimestamp = Date.parse(new Date()),
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      promotePrice = item.promotePrice,
      productPrice = item.productPrice;

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return `<div class="detail-promote">${productPrice}</div>`
      }
    }

    // 其他情况都不是促销
    return ""
  },

  renderPrice(item) {
    const promotePrice = item.promotePrice,
      productPrice = item.productPrice,
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return `<div class="detail-price">${promotePrice} RMB</div>`
      }
    }

    // 其他情况都不是促销
    return `<div class="detail-price">${productPrice} RMB</div>`
  },

  renderLabel(item) {
    const isNew = item.isNew, // 'Y' 'N'
      promotePrice = item.promotePrice,
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return '<div class="label-promote">限时促销</div>'
      }
    }

    // 如果不促销
    return isNew === 'Y' ? 
    '<div class="label-isNew">新品</div>' : 
    '<div class="label-product">度假套餐</div>';
  },

  getProduct() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/listWithCat.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 但是产品数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品出错, 状态码: ${XMLHttpRequest.status}. 原因: ${textStatus}`);
        }
      });

    })
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
  'data': {
    // 'bindEmailTime': 1484529221000,
    // 'birthday': "1989-06-01",
    // 'digest': "00000000-0000-0000-0000-00000000",
    // 'email': "123456798@divingtime.asia",
    // 'forgetPsState': null,
    // 'forgetPsTime': null,
    // 'gender': 1,
    // 'genderCount': null,
    // 'isDelete': "N",
    // 'isUseBind': "Y",
    // 'lastIp': "192.168.0.101",
    // 'lastLogin': 1515355000000,
    // 'mobile': "18511111111",
    // 'nickname': "18511111111",
    // 'passwd': null,
    // 'qq': null,
    // 'regTime': 1484189501000,
    // 'salt': null,
    // 'status': 1,
    // 'telephone': null,
    // 'token': "6fafefe0-0000-0000-0000-00000000",
    // 'userId': 70,
    // 'userName': "某某某",
    // 'validateCode': "bbbbb13b5c81e982dcde40c7205f0fc8",
    // 'visitCount': null,
    // 'webchat': null,
  },
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
      __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].removeItem('token');
      __WEBPACK_IMPORTED_MODULE_0__utils_cookies__["a" /* default */].removeItem('digest');

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
        reject(`请求用户信息出错, 状态码: ${XMLHttpRequest.status}. 原因: ${textStatus}`)
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


/***/ })
/******/ ]);