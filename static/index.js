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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {

  _index2.default.init('0');
  carousel.init();
  product.init();
  _index4.default.init();
});

var carousel = {
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
    $('#carousel').html(['<div class="carousel slide" data-ride="carousel">', '<ol class="carousel-indicators">', this.data.map(function (val, key) {
      return key === 0 ? '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' : '<li data-target="#carousel-example-generic" data-slide-to="' + key + '"></li>';
    }).join(''), '</ol>', '<div class="carousel-inner" role="listbox" id="carousel">', this.data.map(function (val, key) {
      return key === 0 ? ['<div class="item active">', '<a href="' + val.leadUrl + '">', '<img src="' + appConfig.urlBase + val.carouselUrl + '">', '<div class="carousel-caption"></div>', '</a>', '</div>'].join('') : ['<div class="item">', '<a href="' + val.leadUrl + '">', '<img src="' + appConfig.urlBase + val.carouselUrl + '">', '<div class="carousel-caption"></div>', '</a>', '</div>'].join('');
    }).join(''), '</div>', '<a id="carousel-left" class="left carousel-control" role="button" data-slide="prev">', '<span class="sr-only">Previous</span>', '<span class="glyphicon glyphicon-chevron-left"></span>', '<i class="left-btn allbtn"></i>', '</a>', '<a id="carousel-right" class="right carousel-control" role="button" data-slide="next">', '<span class="sr-only">Next</span>', '<span class="glyphicon glyphicon-chevron-right"></span>', '<i class="right-btn allbtn"></i>', '</a>', '</div>'].join(''));

    $('.carousel').carousel();
    $('#carousel-left').click(function () {
      $('.carousel').carousel('prev');
    });
    $('#carousel-right').click(function () {
      $('.carousel').carousel('next');
    });
  },
  getCarousel: function getCarousel() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': 'GET',
        'url': appConfig.version + '/system/carousel/findByElement.do',
        'contentType': 'application/json; charset=utf-8',
        success: function success(val) {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u4F46\u662F\u8F6E\u64AD\u56FE\u6570\u636E\u6709\u8BEF, \u539F\u56E0: ' + val.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('\u8BF7\u6C42\u8F6E\u64AD\u56FE\u51FA\u9519, \u72B6\u6001\u7801: ' + XMLHttpRequest.status + '. \u539F\u56E0: ' + errorThrown);
        }
      });
    });
  }
};

var product = {
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

  init: function init() {
    var _this = this;

    this.getProduct().then(function (val) {
      _this.data = val;
      _this.renderProduct();
    }, function (error) {
      return alert(error);
    });
  },
  renderProduct: function renderProduct() {
    var _this = this;
    var isinterval = false;

    $('#product').html(this.data.map(function (list, key) {
      // 交换间隔
      isinterval = isinterval ? false : true;

      var productLength = list.productList.length;

      return ['<div class="product-list' + (isinterval ? ' list-interval' : '') + '">', '<h2>' + list.catName + ' <a href="https://divet.taobao.com/?spm=a1z10.1-c.0.0.8cxl3q" target=\'_blank\'>\u66F4\u591A</a></h2>', '<div class="list-content">', list.productList.map(function (val, itemKey) {
        var isLineThree = true; // 默认 三行

        if (productLength % 3 === 0) {
          // 正好整除
          isLineThree = true;
        } else if (productLength % 3 == 2) {
          // 余 2
          itemKey < productLength - 2 ? isLineThree = true : isLineThree = false;
        } else if (productLength % 3 == 1) {
          // 余 1
          itemKey < productLength - 4 ? isLineThree = true : isLineThree = false;
        }

        return ['<div class="item' + (isLineThree ? '' : ' item-big') + '">', '<div class="item-content">', '<a href="./product/index.html?productId=' + val.productId + '">', '<div class="item-img">', '<img src="' + appConfig.urlBase + val.productThumb + '" />', '<div class="img-label">', _this.renderLabel(val), '</div>', '</div>', '</a>', '<div class="item-detail">', '<div class="detail-NameAndPrice">', '<div class="detail-productName">', '<a href="./product/index.html?productId=' + val.productId + '">' + val.productName + '</a>', '</div>', _this.renderPrice(val), '</div>', '<div class="detail-apartmentAndPromote">', '<div class="detail-apartment">' + (val.productType === "package" ? val.apartment : '') + '</div>', _this.renderPromote(val), '</div>', '</div>', '</div>', '</div>'].join("");
      }).join(''), '</div>', '</div>'].join('');
    }).join(''));
  },
  renderPromote: function renderPromote(item) {
    var nowTimestamp = Date.parse(new Date()),
        promoteEndTimestamp = item.promoteEndTime,
        promoteStartTimestamp = item.promoteStartTime,
        promotePrice = item.promotePrice,
        productPrice = item.productPrice;

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (nowTimestamp >= promoteStartTimestamp && nowTimestamp <= promoteEndTimestamp) {
        return '<div class="detail-promote">' + productPrice + '</div>';
      }
    }

    // 其他情况都不是促销
    return "";
  },
  renderPrice: function renderPrice(item) {
    var promotePrice = item.promotePrice,
        productPrice = item.productPrice,
        promoteEndTimestamp = item.promoteEndTime,
        promoteStartTimestamp = item.promoteStartTime,
        nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (nowTimestamp >= promoteStartTimestamp && nowTimestamp <= promoteEndTimestamp) {
        return '<div class="detail-price">' + promotePrice + ' RMB</div>';
      }
    }

    // 其他情况都不是促销
    return '<div class="detail-price">' + productPrice + ' RMB</div>';
  },
  renderLabel: function renderLabel(item) {
    var isNew = item.isNew,
        // 'Y' 'N'
    promotePrice = item.promotePrice,
        promoteEndTimestamp = item.promoteEndTime,
        promoteStartTimestamp = item.promoteStartTime,
        nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (nowTimestamp >= promoteStartTimestamp && nowTimestamp <= promoteEndTimestamp) {
        return '<div class="label-promote">限时促销</div>';
      }
    }

    // 如果不促销
    return isNew === 'Y' ? '<div class="label-isNew">新品</div>' : '<div class="label-product">度假套餐</div>';
  },
  getProduct: function getProduct() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': 'GET',
        'url': appConfig.version + '/product/listWithCat.do',
        'contentType': 'application/json; charset=utf-8',
        success: function success(val) {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u4F46\u662F\u4EA7\u54C1\u6570\u636E\u6709\u8BEF, \u539F\u56E0: ' + val.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('\u8BF7\u6C42\u4EA7\u54C1\u51FA\u9519, \u72B6\u6001\u7801: ' + XMLHttpRequest.status + '. \u539F\u56E0: ' + errorThrown);
        }
      });
    });
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

/***/ })
/******/ ]);