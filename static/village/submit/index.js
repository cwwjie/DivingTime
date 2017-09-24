window.onload = function () {
  if (utilities.isSupport() === false) { return }

  myData.checkLogin()
    .then(function (response) {
      return response.json();
    }, function (error) {
      alert('非常抱歉，查询登录信息出错！原因: ' + error);
      return false;
    })
    .then(function (val) {
      if (val === false) { return }
      if (val.result === '0') {
        customerInfo.init();
      } else {
        alert('检测到您尚未登录！原因: ' + val.message);
        window.location = './../index.html';
      }
    });

  myData.init()
    .then({}, function (error) {
      alert(error);
      window.location = './../index.html';
    });
}

var myData = {
  'date': {
    // startDate: new Date(),
    // endDate: new Date()
  },
  'submitData': {
    'billItemList': [
      // {
      //   'itemId': null,
      //   'itemNum': null,
      //   'itemCode': '',
      //   'itemName': ''
      // }
    ],
    'userInfoList': [
      // {
      //   relId: null,
      //   orderId: null,
      //   chineseName: '曾杰杰',
      //   pinyinName: 'Rejiejay',
      //   gender: 1, // 1 男 2 女
      //   passportNo: '',
      //   email: '',
      //   divingCount: '',
      //   divingRank: '',
      //   birthday: '',
      //   age: 0,
      //   mobile: 0
      // }
    ],
    'address': {}
  },
  'apartmentList': [
    // {
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
      mydate = localStorage.getItem('mydate'),
      myApartmentList = localStorage.getItem('apartmentList'),
      myVillage = localStorage.getItem('village');

    return new Promise(function (resolve, reject) {
      if (mydate && myApartmentList && myVillage) {
        var jsonDate = JSON.parse(mydate);

        _this.date = {
          startDate: new Date(jsonDate.startDate),
          endDate: new Date(jsonDate.endDate)
        }
        _this.apartmentList = JSON.parse(myApartmentList);
        _this.village = JSON.parse(myVillage);
        _this.initSubmitData();
        _this.initOrdersDetail();
        // localStorage.removeItem('apartmentList');
        // localStorage.removeItem('village');
        resolve();
      } else {
        reject('订单已失效，请重新选择。');
      }
    });
  },

  initOrdersDetail: function () {
    var ordersList = [
        // {
        //   name: '',
        //   count: 0,
        //   price: 0
        // }
      ],
      orderscount = 0,
      ordersprice = 0,
      ordersTitle = this.village.brandName,
      startDate = utilities.dateToYYYYMMDDFormat(this.date.startDate),
      endDate = utilities.dateToYYYYMMDDFormat(this.date.endDate);

    for (var i = 0; i < this.apartmentList.length; i++) {
      var apartment = this.apartmentList[i];

      var ordersItem = {
        name: apartment.apartmentName,
        count: apartment.selectNum,
        price: (apartment.selectNum * apartment.initiatePrice)
      };

      ordersList.push(ordersItem);
      orderscount += apartment.selectNum;
      ordersprice += (apartment.selectNum * apartment.initiatePrice);
    }

    new Vue({
      'el': '#ordersDetail',
      'data': {
        'ordersTitle': ordersTitle,
        'startDate': startDate,
        'endDate': endDate,
        'ordersList': ordersList,
        'orderscount': orderscount,
        'ordersprice': ordersprice
      }
    });
  },

  initSubmitData: function () {
    var billItemList = [],
      apartmentListNum = this.apartmentList.length,
      apartmentList = this.apartmentList;

    for (var i = 0; i < apartmentListNum; i++) {
      var apartment = apartmentList[i],
        apartmentNum = apartmentList[i].selectNum;

      for (var j = 0; j < apartmentNum; j++) {
        billItemList.push(createbillItem());
      }

      function createbillItem() {
        return {
          'itemId': null,
          'itemNum': null,
          'itemCode': apartment.resortCode,
          'itemName': apartment.resortName
        };
      }
    }

    this.submitData.billItemList = billItemList;
  },

  checkLogin: function() {
    var token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');
    
    return fetch(appConfig.getUserInfo, {
      method: "GET",
      headers: {
        'token': token,
        'digest': digest
      }
    });
  }
}

var customerInfo = {
  data: [
    // {
    //   age: 1,
    //   birthday: 1485964800000,
    //   chineseName: "阿萨啊啊",
    //   divingCount: 1,
    //   divingRank: 1,
    //   email: "445445@qq.com",
    //   gender: 1,
    //   isDelete: "N",
    //   mobile: "15976713287",
    //   passportNo: "12312321",
    //   pinyinName: "ASaAA",
    //   userId: null,
    //   userinfoId: 3
    // }
  ],
  myVue: {},

  init: function () {
    var _this = this;

    this.fetchCustomerData()
      .then(function (response) {
        return response.json();
      }, function (error) {
        alert('非常抱歉，获取顾客信息出错！原因: ' + error);
        return false;
      })
      .then(function (val) {
        if (val === false) { return }
        if (val.result === '0') {
          _this.data = val.data;
          _this.myVue = _this.initVue();
        } else {
          alert('非常抱歉，获取顾客信息出错！原因: ' + val.message);
        }
      });
  },

  fetchCustomerData: function () {
    var token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');

    return fetch(appConfig.userinfoFindByUserId, {
      method: "GET",
      headers: {
        'token': token,
        'digest': digest
      }
    });
  },

  dataToVueList: function () {
    var data = this.data,
      vueList = [];

    for (var i = 0; i < data.length; i++) {
      var vueListitem = {
        isSelect: false,
        name: data[i].chineseName,
        age: data[i].age,
        gender: (data[i].gender === 1 ? '男' : '女'),
        mobile: data[i].mobile
      };
      vueList.push(vueListitem);
    }

    return vueList;
  },

  initVue: function () {
    var _this = this,
      data = this.data;

    return new Vue({
      'el': '#customerInfo',

      'data': {
        listModalIsShow: false,
        list: _this.dataToVueList(),

        itemModalIsShow: true,
        itemTitle: '新增旅客信息',
        itemBTN: '添加',
        item: {
          chineseName: '',
          chineseNameError: '',

          pinyinName: '',
          pinyinNameError: '',

          passportNo: '',

          gender: 1,

          birthday: '',
          birthdayError: '',

          age: '',

          mobile: '',
          mobileError: '',

          email: '',
          emailError: '',
          
          divingCount: '',

          divingRank: '',
          divingRankError: ''
        },
      },

      watch: {
        item: {
          handler: function (val, oldVal) {
            var data = oldVal;

            if (data.chineseName === '') {
              this.item.chineseNameError = '姓名不能为空';
            } else if (/^[\u2E80-\u9FFF]+$/.test(data.chineseName) === false) {
              this.item.chineseNameError = '姓名只能为中文';
            } else {
              this.item.pinyinName = ConvertPinyin(data.chineseName);
              this.item.chineseNameError = '';
            }
  
            if (data.pinyinName === '') {
              this.item.pinyinNameError = '拼音不能为空';
            } else if (/^[a-zA-Z]{0,10000}$/.test(data.pinyinName) === false) {
              this.item.pinyinNameError = '拼音格式错误';
            } else {
              this.item.pinyinNameError = '';
            }
  
            if (data.birthday === null || data.birthday === '') {
              this.item.birthdayError = '请选择出生日期';
            }else {
              var nowDate = Date.parse(new Date());
              var selectTimestamp = utilities.YYYYMMDDFormatToTimestamp(data.birthday);
              this.item.age = Math.ceil((nowDate - selectTimestamp) / 31536000000);
              this.item.birthdayError = '';
            }
  
            if (data.mobile === '') {
              this.item.mobileError = '手机号码不能为空';
            } else if (/^1[34578]\d{9}$/.test(data.mobile) === false) {
              this.item.mobileError = '手机号码格式不正确';
            } else {
              this.item.mobileError = '';
            }
  
            if (data.email === '') {
              this.item.emailError = '邮箱不能为空';
            } else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data.email) === false) {
              this.item.emailError = '邮箱格式不正确';
            } else {
              this.item.emailError = '';
            }
  
            if (data.divingRank !== '') {
              if (/^[0-9]*$/.test(data.divingRank) === false) {
                this.item.divingRankError = '请输入数字';
              } else if ( parseInt(data.divingRank) >= 100) {
                this.item.divingRankError = '请填写100一下的次数';
              } else {
                this.item.divingRankError = '';
              }
            }

          },
          deep: true
        }
      },

      methods: {
        saveItem: function () {
          var data = this.item;
          
          if (data.chineseName === '') {
            data.chineseNameError = '姓名不能为空';
            return
          } else if (/^[\u2E80-\u9FFF]+$/.test(data.chineseName) === false) {
            data.chineseNameError = '姓名只能为中文';
            return
          } else {
            data.chineseNameError = '';
          }

          if (data.pinyinName === '') {
            data.pinyinNameError = '拼音不能为空';
            return
          } else if (/^[a-zA-Z]{0,10000}$/.test(data.pinyinName) === false) {
            data.pinyinNameError = '拼音格式错误';
            return
          } else {
            data.pinyinNameError = '';
          }
          
          if (data.birthday === null || data.birthday === '') {
            data.birthdayError = '请选择出生日期';
            return
          }else {
            data.birthdayError = '';
          }

          if (data.mobile === '') {
            data.mobileError = '手机号码不能为空';
            return
          } else if (/^1[34578]\d{9}$/.test(data.mobile) === false) {
            data.mobileError = '手机号码格式不正确';
            return
          } else {
            data.mobileError = '';
          }

          if (data.email === '') {
            data.emailError = '邮箱不能为空';
            return
          } else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data.email) === false) {
            data.emailError = '邮箱格式不正确';
            return
          } else {
            data.emailError = '';
          }

          if (data.divingRank !== '') {
            if (/^[0-9]*$/.test(data.divingRank) === false) {
              data.divingRankError = '请输入数字';
              return
            } else if ( parseInt(data.divingRank) >= 100) {
              data.divingRankError = '请填写100一下的次数';
              return
            } else {
              data.divingRankError = '';
            }
          }



        }
      },

      components: { datepicker }
    });
  }
}

var utilities = {
  dateToYYYYMMDDFormat: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + '-' + mm + '-' + dd;
  },

  YYYYMMDDFormatToTimestamp(data) {
    var myDateList = data.split("-");
    return Date.parse(new Date(myDateList[0], (parseInt(myDateList[1]) - 1), myDateList[2]));
  },

  isSupport: function() {
    if (isIE(6) || isIE(7) || isIE(8)) {
      alert('因为IE8（及以下）由于存在安全风险，已被本站禁止，请升级到IE11或使用Chrome浏览器。')
      return false
    }

    var storage = window.localStorage;
    try {
      storage.setItem('test', 'testValue');
      storage.removeItem('test');
    } catch (error) {
      alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');
      return false
    }
    return true

    function isIE(ver) {
      var b = document.createElement('b');
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
      return b.getElementsByTagName('i').length === 1;
    }
  },

  getCookie: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }
}
