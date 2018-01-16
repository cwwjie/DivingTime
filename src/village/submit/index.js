window.onload = function () {
  if (utilities.isSupport() === false) { return }

  myData.init()
    .then(function () {
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
    }, function (error) {
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
      //   adultNum: 1,
      //   childNum: 0,
      //   itemCode: "KPLyjf",
      //   itemId: null,
      //   itemName: "园景房",
      //   itemNum: null,
      //   itemSize: "大床"
      // }
    ],
    'userInfoList': [
      // {
      //   relId: null,
      //   orderId: null,
      //   chineseName: '曾杰杰',
      //   pinyinName: 'Rejiejay',
      //   gender: 0, // 0 男 1 女
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
    //   'select': [
    //     {
    //        apartmentName: '白珍珠海景房',
    //        bedTypeList: ['大床', '双床'],
    //        bedType: '大床',
    //
    //        calMethod: '1',
    //        initiatePrice: 1200, //起始价格
    //
    //        peopleMax: 4,
    //        suggestedNum: 2,
    //
    //        adultNum: 1,
    //        childNum: 0,
    //        adultMax: 2,
    //        adultPrices: 600.00,
    //        childrenMax: 2,
    //        childPrices: 600.00,
    //
    //        prices: 1200.00,
    //     }
    //   ],
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
  'myVue': {},
  
  init: function() {
    var _this = this,
      mydate = localStorage.getItem('mydate'),
      myEffective = utilities.loadPageVar('effective'),
      myApartmentList = localStorage.getItem('apartmentList'),
      myVillage = localStorage.getItem('village');

    return new Promise(function (resolve, reject) {
      if (mydate && myApartmentList && myVillage && myEffective) {
        // if ( Date.parse(new Date()) > ( parseInt(myEffective) + 300000 ) ) { reject('订单已失效，请重新选择。') }
        var jsonDate = JSON.parse(mydate);

        _this.date = {
          startDate: new Date(jsonDate.startDate),
          endDate: new Date(jsonDate.endDate)
        };
        _this.apartmentList = JSON.parse(myApartmentList);
        _this.village = JSON.parse(myVillage);
        _this.initOrdersDetailVue();
        // localStorage.removeItem('apartmentList');
        // localStorage.removeItem('village');
        resolve();
      } else {
        reject('订单已失效，请重新选择。');
      }
    });
  },

  initOrdersDetailVue: function () {
    var ordersList = [
        // {
        //   name: '',
        //   roomCount: 0,
        //   personCount: 0,
        //   price: 0
        // }
      ],
      myapartmentList = [
        // {
        //   'id': 0,
        //   'ordersListId': 0,
        //   'itemCode': 'KPLyjf',
        //   'apartmentName': '园景房',
        //   'bedTypeList': ['大床','双人床','单床','蜜月大床'],
        //   'bedType': '大床',
        //   'adult': 1,
        //   'adultMax': 2,
        //   'adultUnitPrice': 1200,
        //   'children': 0,
        //   'childrenMax': 2,
        //   'childUnitPrice': 1200,
        //   'suggestedNum': 2,
        // }
      ],
      ordersRoomCount = 0,
      ordersPersonCount = 0,
      ordersprice = 0,
      ordersTitle = this.village.resortName,
      startDate = utilities.dateToYYYYMMDDFormat(this.date.startDate),
      endDate = utilities.dateToYYYYMMDDFormat(this.date.endDate);

    for (var i = 0; i < this.apartmentList.length; i++) {
      var apartment = this.apartmentList[i],
          myPersonCount = 0,
          myPrice = 0;

      for (var j = 0; j < this.apartmentList[i].select.length; j++) {
        var apartmentItem = {
          'itemCode': this.apartmentList[i].apartmentCode,
          'prices': this.apartmentList[i].select[j].prices,

          'apartmentName': this.apartmentList[i].select[j].apartmentName,

          'bedType': this.apartmentList[i].select[j].bedType,
          'adultNum': this.apartmentList[i].select[j].adultNum,
          'childNum': this.apartmentList[i].select[j].childNum,
 
          'adultMax': this.apartmentList[i].select[j].adultMax,
          'childrenMax': this.apartmentList[i].select[j].childrenMax,
          'suggestedNum': this.apartmentList[i].select[j].suggestedNum,
        };
        // var apartmentItem = {
        //   'id': ordersRoomCount,
        //   'ordersListId': i,
        //   'itemCode': this.apartmentList[i].apartmentCode,
        //   'apartmentName': this.apartmentList[i].apartmentName,
        //   'bedTypeList': this.apartmentList[i].bedType.split(','),
        //   'bedType': this.apartmentList[i].bedType.split(',')[0],
        //   'adult': 1,
        //   'adultMax': this.apartmentList[i].adultMax,
        //   'adultUnitPrice': this.apartmentList[i].adultUnitPrice,
        //   'children': 0,
        //   'childrenMax': this.apartmentList[i].childrenMax,
        //   'childUnitPrice': this.apartmentList[i].childUnitPrice,
        //   'suggestedNum': this.apartmentList[i].suggestedNum,
        // };

        myapartmentList.push(apartmentItem);

        ordersRoomCount++;

        var peopleNum = (this.apartmentList[i].select[j].adultNum + this.apartmentList[i].select[j].childNum);
        myPersonCount += peopleNum;
        ordersPersonCount += peopleNum;

        myPrice += this.apartmentList[i].select[j].prices;
        ordersprice += this.apartmentList[i].select[j].prices;
      }
        
      var ordersItem = {
        'id': i,
        'isShow': (apartment.select.length > 0 ? true : false),
        'name': apartment.apartmentName,
        'roomCount': apartment.select.length,
        'personCount': myPersonCount,
        'ordersprice': myPrice
      };

      ordersList.push(ordersItem);
    }

    this.myVue = new Vue({
      'el': '#ordersDetail',

      'data': {
        'ordersTitle': ordersTitle,
        'startDate': startDate,
        'endDate': endDate,

        'apartmentList': myapartmentList,

        'ordersList': ordersList,
        'ordersRoomCount': ordersRoomCount,
        'ordersPersonCount': ordersPersonCount,
        'ordersprice': ordersprice
      },
      
      'watch': {
        ordersList: {
          handler: function (val, oldVal) {
            var myOrdersList = oldVal,
              myCount = 0;

            for (var i = 0; i < myOrdersList.length; i++) {
              myCount += myOrdersList[i].personCount;
            }

            this.ordersPersonCount = myCount;
          },
          deep: true
        }
      },

      'methods': {
        reduceAdult: function(id) {
          var dataNum = this.apartmentList[id].adult,
            ordersItemPersonNum = this.ordersList[this.apartmentList[id].ordersListId].personCount;
        
          if (dataNum <= 1) { return }

          this.apartmentList[id].adult = dataNum - 1;
          this.apartmentList[id].personCount = dataNum - 1;
          this.ordersList[this.apartmentList[id].ordersListId].personCount = ordersItemPersonNum - 1;
        },

        addAdult: function(id) {
          var dataNum = this.apartmentList[id].adult,
            maxNum = this.apartmentList[id].adultMax,
            ordersItemPersonNum = this.ordersList[this.apartmentList[id].ordersListId].personCount;

          if (dataNum >= maxNum) { return }
          this.apartmentList[id].adult = dataNum + 1;
          this.ordersList[this.apartmentList[id].ordersListId].personCount = ordersItemPersonNum + 1;
        },

        reducechildren: function(id) {
          var dataNum = this.apartmentList[id].children,
          ordersItemPersonNum = this.ordersList[this.apartmentList[id].ordersListId].personCount;

          if (dataNum <= 0) { return }

          this.apartmentList[id].children = dataNum - 1,
          ordersItemPersonNum = this.ordersList[this.apartmentList[id].ordersListId].personCount;
          this.ordersList[this.apartmentList[id].ordersListId].personCount = ordersItemPersonNum - 1;
        },

        addchildren: function(id) {
          var dataNum = this.apartmentList[id].children,
            maxNum = this.apartmentList[id].childrenMax,
            ordersItemPersonNum = this.ordersList[this.apartmentList[id].ordersListId].personCount;
         
          if (dataNum >= maxNum) { return }

          this.apartmentList[id].children = dataNum + 1;
          this.ordersList[this.apartmentList[id].ordersListId].personCount = ordersItemPersonNum + 1;
        },
      }
    });
  },

  initBillItemList: function () {
    var billItemList = [],
      apartmentListNum = this.myVue.$data.apartmentList.length,
      apartmentList = this.myVue.$data.apartmentList;

    for (var i = 0; i < apartmentListNum; i++) {
      var apartment = apartmentList[i];

      billItemList.push({
        'itemId': null,
        'itemNum': null,
        'itemCode': apartment.itemCode,
        'itemName': apartment.apartmentName,
        'itemSize': apartment.bedType,
        'adultNum': apartment.adultNum,
        'childNum': apartment.childNum,
      });
    }

    this.submitData.billItemList = billItemList;
  },

  checkLogin: function () {
    var token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');
    
    return fetch(`${appConfig.version}/user/getUserInfo.do`, {
      method: "GET",
      headers: {
        'token': token,
        'digest': digest
      }
    });
  },

  submit: function () {
    var _this = this,
      mySubmitData = this.submitData,
      resortCode = this.village.resortCode,
      checkInDate = utilities.dateToYYYYMMDDString(this.date.startDate),
      leaveDate = utilities.dateToYYYYMMDDString(this.date.endDate),
      token = utilities.getCookie('token'),
      digest = utilities.getCookie('digest');

    this.initBillItemList();
    
    return fetch(`${appConfig.version}/order/${resortCode}/${checkInDate}/${leaveDate}/custom.do`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': token,
        'digest': digest
      },
      body: JSON.stringify(mySubmitData)
    })
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

    return fetch(`${appConfig.version}/user/userinfo/findByUserId.do`, {
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
      url = `${appConfig.version}/user/userinfo/add.do`;
    } else {
      url = `${appConfig.version}/user/userinfo/update.do`;
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
        gender: (myData[i].gender === 1 ? '女' : '男'),
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

        chineseName: '',
        chineseNameError: '',
        pinyinName: '',
        pinyinNameError: '',

        submitBTN: '确认订单',
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
        chineseName: function (val, oldVal) {
          // 如果 默认的检测 是 不检测.
          if (defaultInspect === false) {
            // 则终止此次的检测.
            defaultInspect = true;
            return
          }
          if (val === '') {
            this.chineseNameError = '姓名不能为空';
          } else if (/^[\u2E80-\u9FFF]+$/.test(val) === false) {
            this.chineseNameError = '姓名只能为中文';
          } else {
            // this.pinyinName = ConvertPinyin(val);
            this.pinyinName = ConvertPinyin(val);
            this.chineseNameError = '';
          }
        },
        pinyinName: function (val, oldVal) {
          // 如果 默认的检测 是 不检测.
          if (defaultInspect === false) {
            // 则终止此次的检测.
            defaultInspect = true;
            return
          }
          if (val === '') {
            this.pinyinNameError = '拼音不能为空';
          } else if (/^[a-zA-Z]{0,10000}$/.test(val) === false) {
            this.pinyinNameError = '拼音格式错误';
          } else {
            this.pinyinNameError = '';
          }
        },

        item: {
          handler: function (val, oldVal) {
            var data = oldVal;

            // 如果 默认的检测 是 不检测.
            if (defaultInspect === false) {
              // 则终止此次的检测.
              defaultInspect = true;
              return
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
          this.chineseName = data.chineseName;
          this.chineseNameError = '';
          this.pinyinName = data.pinyinName;
          this.pinyinNameError = '';
          this.item = {
            // 'chineseName': data.chineseName,
            // 'chineseNameError': '',
      
            // 'pinyinName': data.pinyinName,
            // 'pinyinNameError': '',
      
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
          
          if (this.chineseName === '') {
            this.chineseNameError = '姓名不能为空';
            return
          } else if (/^[\u2E80-\u9FFF]+$/.test(this.chineseName) === false) {
            this.chineseNameError = '姓名只能为中文';
            return
          } else {
            this.chineseNameError = '';
          }

          if (this.pinyinName === '') {
            this.pinyinNameError = '拼音不能为空';
            return
          } else if (/^[a-zA-Z]{0,10000}$/.test(this.pinyinName) === false) {
            this.pinyinNameError = '拼音格式错误';
            return
          } else {
            this.pinyinNameError = '';
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

          if (data.divingRank !== '' && data.divingRank !== null) {
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
            'chineseName': this.chineseName,
            'pinyinName': this.pinyinName,
            'passportNo': data.passportNo,
            'gender': data.gender,
            'birthday': data.birthday,
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
          var selectCount = 0,
            mySelectList = this.list,
            myRenderList = [];

          for (var i = 0; i < mySelectList.length; i++) {
            if (mySelectList[i].isSelect) {
              var myId = myRenderList.length,
                mySelectItemData = _this.data[mySelectList[i].id],
              divingRank = '';

              selectCount++;
              if (mySelectItemData.divingRank === 1) {
                divingRank = 'OW(初级潜水员)';
              } else if (mySelectItemData.divingRank === 2) {
                divingRank = 'AOW及以上';
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
          var Vuethis = this,
            userInfoList = [];

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

            myData.submitData.userInfoList = userInfoList;

            isSubmit = true;
            this.submitBTN = '正在提交...';

            myData.submit()
              .then(function (response) {
                return response.json();
              }, function (error) {
                return {'result': '1', 'message': error};
              })
              .then(function (val) {
                if (val.result === '0') {
                  isSubmit = false;
                  Vuethis.submitBTN = '确认订单';
                  window.location = './../../user/account.html#Orders';
                } else if (val.result === '-11') {
                  isSubmit = false;
                  Vuethis.submitBTN = '确认订单';
                  
                  var notEnoughTermName = '',
                      notEnoughTermList = val.data.split(',');
                  for (var i = 0; i < myData.apartmentList.length; i++) {
                    for (var j = 0; j < notEnoughTermList.length; j++) {
                      if (myData.apartmentList[i].apartmentCode ==  notEnoughTermList[j]) {
                        notEnoughTermName += myData.apartmentList[i].apartmentName;
                        notEnoughTermName += '、 ';
                      }
                    }
                  }
                  
                  alert('非常抱歉，提交信息出错！原因: ' + notEnoughTermName + '库存不足');
                } else {
                  isSubmit = false;
                  Vuethis.submitBTN = '确认订单';
                  alert('非常抱歉，提交信息出错！原因: ' + val.message);
                }
              });
          }
        }
      },

      components: { datepicker }
    });
  }
}

var utilities = {
  dateToYYYYMMDDString: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + mm + dd;
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
