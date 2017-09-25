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

  checkLogin: function () {
    var token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');
    
    return fetch(appConfig.getUserInfo, {
      method: "GET",
      headers: {
        'token': token,
        'digest': digest
      }
    });
  },

  submitData: function () {
    var mySubmitData = this.submitData,
      token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');

    // return fetch(URLbase + URLversion + "/order/", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'token': token,
    //     'digest': digest
    //   },
    //   body: JSON.stringify(mySubmitData)
    // })

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
      method: 'GET',
      headers: {
        'token': token,
        'digest': digest
      }
    });
  },

  updateCustomerData: function (data, type) {
    var _this = this,
      url = '',
      token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');

    if (type === 'add') {
      url = appConfig.userinfoAdd;
    } else {
      url = appConfig.userupdate;
    }

    return new Promise(function(resolve, reject){
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'token': token,
          'digest': digest
        },
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json()
      },function (error) {
        reject('数据提交发生错误, 原因:' + error);
      }).then(function(val) {
        if (val.result === '0') {
          _this.fetchCustomerData()
            .then(function (response) {
              return response.json();
            }, function (error) {
              reject('数据提交成功, 但获取顾客信息出错！原因:' + error);
              return false;
            })
            .then(function (fetchValue) {
              if (fetchValue === false) { return }

              if (fetchValue.result === '0') {
                _this.data = fetchValue.data;
                resolve(fetchValue.data);
              } else {
                reject('数据提交成功, 但获取顾客信息出错！原因:' + fetchValue.message);
              }
            });
        } else {
          reject('数据提交发生错误, 原因:' + val.message);
        }
      });
    });
  },

  dataToVueList: function (data) {
    var myData = data || this.data,
      vueList = [];

    for (var i = 0; i < myData.length; i++) {
      var vueListitem = {
        id: i,
        isSelect: false,
        name: myData[i].chineseName,
        age: myData[i].age,
        gender: (myData[i].gender === 1 ? '男' : '女'),
        mobile: myData[i].mobile
      };
      vueList.push(vueListitem);
    }

    return vueList;
  },

  createVueItem: function () {
    return {
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
    };
  },

  initVue: function () {
    var _this = this,
      defaultInspect = true,
      isSubmit = false,
      selectID = 0;


    return new Vue({
      'el': '#customerInfo',

      'data': {
        listModalIsShow: false,
        list: _this.dataToVueList(),

        itemModalIsShow: false,
        itemType: 'add', // update
        itemBTN: '保存',
        item: _this.createVueItem(),

        renderList: [
          // {
          //   'id': 0,
          //   'listId': 0,
          //   'passportNo': '',
          //   'chineseName': '曾杰杰',
          //   'pinyinName': 'Rejiejay',
          //   'gender': 1,
          //   'birthday': 1485964800000,
          //   'age': 24,
          //   'mobile': 159767132587,
          //   'email': '454766952@qq.com',
          //   'divingRank': 1,
          //   'divingCount': 0
          // }
        ]
      },

      watch: {
        item: {
          handler: function (val, oldVal) {
            var data = oldVal;

            // 如果 默认的检测 是 不检测.
            if (defaultInspect === false) {
              // 则终止此次的检测.
              defaultInspect = true;
              return
            }

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
  
            if (data.divingRank !== '' && data.divingRank !== null) {
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
        showAddItem: function() {
          this.itemModalIsShow = true;
          this.itemType = 'add';
          defaultInspect = false;
          this.item = _this.createVueItem();
        },

        showModifyItem: function (id) {
          var data = _this.data[id];

          selectID = id;
          this.itemModalIsShow = true;
          this.itemType = 'update';
          this.item = {
            'chineseName': data.chineseName,
            'chineseNameError': '',
      
            'pinyinName': data.pinyinName,
            'pinyinNameError': '',
      
            'passportNo': data.passportNo,
      
            'gender': data.gender,
      
            'birthday': utilities.dateToYYYYMMDDFormat(new Date(data.birthday)),
            'birthdayError': '',
      
            'age': data.age,
      
            'mobile': data.mobile,
            'mobileError': '',
      
            'email': data.email,
            'emailError': '',
            
            'divingCount': data.divingCount,
      
            'divingRank': data.divingRank,
            'divingRankError': ''
          };
        },

        saveItem: function (type) {
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

          this.itemBTN = '正在提交...';

          var submitData = {
            'chineseName': data.chineseName,
            'pinyinName': data.pinyinName,
            'passportNo': data.passportNo,
            'gender': data.gender,
            'birthday': utilities.YYYYMMDDFormatToTimestamp(data.birthday),
            'age': data.age,
            'mobile': data.mobile,
            'email': data.email,
            'divingRank': data.divingRank,
            'divingCount': data.divingCount,
          }

          if (type === 'update') {
            submitData.userinfoId = _this.data[selectID].userinfoId;
          }

          var thisVue = this;

          _this.updateCustomerData(submitData, type)
            .then(function (data) {
              thisVue.list = _this.dataToVueList(data);
              thisVue.item = _this.createVueItem();
              thisVue.itemBTN = '保存';
              thisVue.listModalIsShow = true;
              thisVue.itemModalIsShow = false;
            }, function (error) {
              thisVue.itemBTN = '保存';
              alert(error);
            });
        },

        addRenderList: function () {
          var selectCount = 0;
            mySelectList = this.list,
            myRenderList = [];

          for (var i = 0; i < mySelectList.length; i++) {
            if (mySelectList[i].isSelect) {
              var myId = myRenderList.length;
                mySelectItemData = _this.data[mySelectList[i].id],
              divingRank = '';

              selectCount++;
              if (mySelectItemData.divingRank === 1) {
                divingRank = 'OW(初级潜水员)';
              } else if (mySelectItemData.divingRank === 2) {
                divingRank = 'OW以上';
              }
              myRenderList.push({
                'id': myId,
                'listId': mySelectList[i].id,
                'passportNo': mySelectItemData.passportNo,
                'chineseName': mySelectItemData.chineseName,
                'pinyinName': mySelectItemData.pinyinName,
                'gender': mySelectItemData.gender,
                'birthday': utilities.dateToYYYYMMDDFormat(new Date(mySelectItemData.birthday)),
                'age': mySelectItemData.age,
                'mobile': mySelectItemData.mobile,
                'email': mySelectItemData.email,
                'divingRank': divingRank,
                'divingCount': mySelectItemData.divingCount
              });
            }
          }

          if (selectCount === 0) {
            alert('至少选择一人信息!');
            return
          }

          this.renderList = myRenderList;
          this.listModalIsShow = false;
        },

        removeRenderitem: function (id) {
          var _this = this;
  
          if(window.confirm('你确定要删除吗?')){
            _this.renderList.splice(id, 1);
          }
        },

        submit: function () {
          var userInfoList = [];

          if (isSubmit) { return }

          if (this.renderList.length === 0) {
            alert('至少提供一旅客信息!');
            return
          }


          for (var i = 0; i < this.renderList.length; i++) {
            var myUserInfoItem = _this.data[this.renderList[i].listId];
            userInfoList.push({
              'relId': null,
              'orderId': null,
              'chineseName': myUserInfoItem.chineseName,
              'pinyinName': myUserInfoItem.pinyinName,
              'gender': myUserInfoItem.gender,
              'passportNo': myUserInfoItem.passportNo,
              'email': myUserInfoItem.email,
              'divingCount': myUserInfoItem.divingCount,
              'divingRank': myUserInfoItem.divingRank,
              'birthday': myUserInfoItem.birthday,
              'age': myUserInfoItem.age,
              'mobile': myUserInfoItem.mobile
            });

            myData.userInfoList = userInfoList;

            isSubmit = true;
            myData.submitData();
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
