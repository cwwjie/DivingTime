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
  __WEBPACK_IMPORTED_MODULE_0__Component_Navigation_Bar_index_js__["a" /* default */].init();
  __WEBPACK_IMPORTED_MODULE_1__Component_ScrollTop_index_js__["a" /* default */].init();

  myData.getAjax()
    .then(function(json) {
      myVillage.data = json;
      myVillage.init();
    }, function(error) {
      alert(error);
    }
  );
});

var myData = {
  getAjax: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        type: 'GET',
        url: `${appConfig.village}/product/resort/1/0/list.do`,
        contentType: 'application/json; charset=utf-8',
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
  }
}

var myVillage = {
  'data': {
    'list': [
      // {
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
      // }
    ],
    'pageNum': 0,
    'pageSize': 0,
    'pages': 0,
    'size': 0,
    'totalCount': 0
  },
  
  init: function() {
    var dataList = this.data.list,
      domString = '';

    if (dataList.length === 0) {
      domString = '暂无数据';
    } else {
      for (var i = 0; i < dataList.length; i++) {
        domString += this.template(dataList[i]);
      }
    }

    $('#village').html(domString);
    this.bindEvent();
  },

  template: function(data) {
    return [
      '<div class="village-block">',
        '<div class="village-content">',
        '<div class="img-content">',
          '<img src="' + appConfig.urlBase + data.resortImg + '" />',
          '<div class="village-label">' + data.label + '</div>',
        '</div>',
        '<div class="village-depiction">',
            '<div class="village-title">' + data.resortName + '</div>',
            '<div class="village-price">' + data.initiatePrice + 'RMB 起</div>',
        '</div>',
        '</div>',
      '</div>'
    ].join('');
  },

  bindEvent: function() {
    var dataList = this.data.list,
      myDomList = $('#village').find('.village-block');

    for (var i = 0; i < myDomList.length; i++) {(function(i) {
      var myData = dataList[i];

      $(myDomList[i]).click(function(event) {
        var myUrl = 'resortCode=' + myData.resortCode + '&resortId=' + myData.resortId;
        localStorage.setItem('village',JSON.stringify(myData));
        localStorage.setItem('resortCode',myData.resortCode);
        localStorage.setItem('resortId',myData.resortId);
        location = './detail/index.html?' + myUrl;
      });
    })(i)}
  }
}

// 工具类
var utilities = {
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
/* unused harmony default export */ var _unused_webpack_default_export = ({
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