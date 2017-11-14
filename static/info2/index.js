window.onload = function() {
  if ( versionSupport.check() === false ) { return }


  Info.get()
    .then(
      function(response) {
        return response.json()
      }, function(error) {
        return { 'result': '1', 'message': error }
      }
    )
    .then(function(json) {
      if (json.result === '0') {
        Info.data = Info.dealwith(json.data);
        Info.init();
      }else {
        alert('加载数据失败, 原因: ' + json.message);
      }
    })
}

var Info = {
  'data': {
    // adultNum: 1,
    // attachmentList: [],
    // calMethod: "6000-500=5500",
    // checkIn: 1508428800000,
    // checkOut: 1508515200000,
    // childNum: 0,
    // discount: 500,
    // email: "454766952@qq.com",
    // flightNote: "",
    // hLandDate: null,
    // hLandTime: null,
    // hTakeoffDate: null,
    // hTakeoffTime: null,
    // inHarbourNum: null,
    // inboundNum: null,
    // infoId: 122,
    // insuranceBegin: null,
    // insuranceEnd: null,
    // isRead: "Y",
    // kidsAge: null,
    // landDate: null,
    // landTime: null,
    // mobile: "15976713287",
    // notPayAmount: 5000,
    // orderAmount: 5500,
    // orderDesc: "1间半独立沙滩木屋",
    // orderName: "半独立沙滩木屋",
    // orderSn: "2017082901",
    // orderSrc: "TB",
    // outHarbourNum: null,
    // outboundNum: null,
    // payAccount: null,
    // payAmount: 500,
    // payStatus: 2,
    // peopleNum: 1,
    // pinyinName: "Zeng Jie ",
    // present: "",
    // productAmount: 6000,
    // readTime: 1505324846000,
    // remark: null,
    // reservationCode: null,
    // resortShuttle: null,
    // roomNum: 1,
    // signName: "曾杰",
    // takeoffDate: null,
    // takeoffTime: null,
    // template: 1,
    // transfersInfo: "",
    // roomInfoList: [
    //   {
    //     bedType: "蜜月大床",
    //     iceEmail: null,
    //     iceMobile: null,
    //     iceName: null,
    //     iceRelation: null,
    //     infoId: 122,
    //     roomId: 123,
    //     customerInfoList: [
    //       {
    //         age: 45,
    //         anamnesis: "无",
    //         birthday: "1972-01-15",
    //         chineseName: "曾杰",
    //         customerId: 145,
    //         divingCount: null,
    //         divingNo: null,
    //         divingRank: null,
    //         email: "54454@qq.com",
    //         gender: 1,
    //         isDive: "N",
    //         isKid: "N",
    //         lastDiveTime: null,
    //         mobile: "15976713287",
    //         nationality: "MACAU CHINA",
    //         passportNo: null,
    //         pinyinName: "Zeng Jie",
    //         roomId: 123
    //       }
    //     ]
    //   }
    // ]
  },
  'isFirst': true,
  'part_1': null,
  'part_2': null,
  
  init: function () {
    this.part_1 = new Vue(VuePart_1.inti(this.isFirst));
    this.part_2 = new Vue(VuePart_2.inti(this.data, this.isFirst));
  },

  get: function () {
    var uniqueKey = localStorage.getItem('_uniqueKey'),
      token = localStorage.getItem('_token'),
      digest = localStorage.getItem('_digest');

    return fetch(URLbase + URLversion + '/gather/link/' + uniqueKey + '/getGatherInfo.do',{
      method: 'GET',
      headers: {
        token: token,
        digest: digest
      }
    })
  },

  dealwith: function (data) {

    if (data) {
      this.isFirst = false;
      return data
    } else {
      var basicData = JSON.parse(localStorage.getItem('loginSuccessful'));

      var ultimateData = {
        'adultNum': basicData.adultNum,
        'calMethod': basicData.calMethod,
        'childNum': basicData.childNum,
        'orderDesc': basicData.orderDesc,
        'payStatus': basicData.payStatus,
        'productAmount': basicData.productAmount,
        'flightNote': '',
        'infoId': basicData.infoId,
        'isRead': 'N',
        'readTime': null,
        'orderSn': basicData.orderSn,
        'orderSrc': basicData.orderSrc,
        'template': basicData.template,
        'orderName': basicData.orderName,
        'roomNum': basicData.roomNum,
        'peopleNum': basicData.peopleNum,
        'checkIn': basicData.checkIn,
        'checkOut': basicData.checkOut,
        'orderAmount': basicData.orderAmount,
        'discount': basicData.discount,
        'payAmount': basicData.payAmount,
        'notPayAmount': basicData.notPayAmount,
        'present': basicData.present,
        'remark': basicData.remark,
        'kidsAge': basicData.kidsAge,
        'payAccount': null,
        'signName': null,
        'pinyinName': null,
        'mobile': null,
        'email': null,
        'outboundNum': null,
        'landTime': null,
        'landDate': null,
        'inboundNum': null,
        'takeoffTime': null,
        'takeoffDate': null,
        'inHarbourNum': null,
        'hLandTime': null,
        'hLandDate': null,
        'outHarbourNum': null,
        'hTakeoffTime': null,
        'hTakeoffDate': null,
        'roomInfoList': []
      }

      for (var i = 0; i < basicData.roomNum; i++) {
        ultimateData.roomInfoList.push(newRoomInfo());
      }

      return ultimateData;
    }

    function newRoomInfo() {
      return {
        'roomId': null,
        'iceName': null,
        'iceRelation': null,
        'iceMobile': null,
        'iceEmail': null,
        'bedType': null,
        'infoId': null,
        'customerInfoList': []
      }
    }
  }
}

var VuePart_1 = {
  'Vue': {
    'el': '#part1',

    'data': {
      'isShow': true,
      'checked': false
    },

    'methods': {
      toNext: function (event) {
        if (this.checked) {
          this.isShow = false;
        } else {
          alert('请同意相关条款');
        }
      }
    }

  },

  inti: function (isFirst) {
    if (isFirst) {
      this.Vue.data.isShow = true;
      this.Vue.data.checked = false;
      return this.Vue;
    }

    this.Vue.data.isShow = false;
    this.Vue.data.checked = true;
    return this.Vue;
  },
};

var VuePart_2 = {
  'Vue': {
    'el': '#part2',

    'data': {
      'orderinfor': {
        'orderSn': '正在加载...',
        'payStatus': '正在加载...',
        'cycleLength': '正在加载...',
        'roomNum': '正在加载...',
        'peopleNum': '正在加载...',
        'childNum': '正在加载...',
        'adultNum': '正在加载...',
        'checkIn': '正在加载...',
        'checkOut': '正在加载...',
        'productAmount': '正在加载...',
        'discount': '正在加载...',
        'orderAmount': '正在加载...',
        'calMethod': '正在加载...',
        'payAmount': '正在加载...',
        'notPayAmount': '正在加载...',
      },
      'extra': {
        'isHave': false,
        'isHaveInsurance': false,
        'insurance': '暂无保险日期信息...',
        'isHaveTransfers': false,
        'transfers': '暂无接送信息...',
      },
      'signName': '',
      'signNameError': '',
      'isSignNameError': false,

      'pinyinName': '',
      'pinyinNameError': '',
      'isPinyinNameError': false,

      'mobile': '',
      'mobileError': '',
      'isMobileError': false,

      'email': '',
      'emailError': '',
      'isEmailError': false,
      
      'payAccount': '',
      'payAccountError': '',
      'isPayAccountError': false,
    },
    
    'watch': {
      'signName': {
        handler: function (val, oldVal) {
          if (val === '') {
            this.signNameError = '预定人姓名 不能为空';
            this.isSignNameError = true;
            return
          } else if (/^[\u2E80-\u9FFF]+$/.test(val) === false) {
            this.signNameError = '姓名只能为中文';
            this.isSignNameError = true;
            return
          }

          this.signNameError = '';
          this.isSignNameError = false;
          this.pinyinName = ConvertPinyin(val);
        }
      },
      
      'pinyinName': {
        handler: function (val, oldVal) {
          if (val === '') {
            this.pinyinNameError = '拼音不能为空';
            this.isPinyinNameError = true;
            return
          } else if (/^[a-zA-Z]{0,10000}$/.test(val) === false) {
            this.pinyinNameError = '拼音格式错误';
            this.isPinyinNameError = true;
            return
          }

          this.pinyinNameError = '';
          this.isPinyinNameError = false;
        }
      },
      
      'mobile': {
        handler: function (val, oldVal) {
          if (val === '') {
            this.mobileError = '手机号码不能为空';
            this.isMobileError = true;
            return
          } else if (/^1[34578]\d{9}$/.test(val) === false) {
            this.mobileError = '手机号码格式不正确';
            this.isMobileError = true;
            return
          }

          this.mobileError = '';
          this.isMobileError = false;
        }
      },
      
      'email': {
        handler: function (val, oldVal) {
          if (val === '') {
            this.emailError = '邮箱不能为空';
            this.isEmailError = true;
            return
          } else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val) === false) {
            this.emailError = '邮箱格式不正确';
            this.isEmailError = true;
            return
          }

          this.emailError = '';
          this.isEmailError = false;
        }
      }
    },

    'methods': {
    }
  },

  inti: function (data, isFirst) {

    this.initOrderinfor(data);
    this.initExtra();

    if (isFirst) {

    }
    this.Vue.data.signName = data.signName;
    this.Vue.data.pinyinName = data.pinyinName;
    this.Vue.data.mobile = data.mobile;
    this.Vue.data.email = data.email;
    this.Vue.data.payAccount = data.payAccount;
    return this.Vue;
  },

  initOrderinfor: function(data) {
    var cycleLength = Math.floor((data.checkOut - data.checkIn)/86400000);

    this.Vue.data.orderinfor = {
      'orderSn': data.orderSn,
      'payStatus': data.payStatus === 1 ? '已付全款' : '已付定金',
      'orderName': data.orderName,
      'cycleLength': '' + ( cycleLength + 1 ) + '天' + cycleLength + '晚',
      'roomNum': data.roomNum,
      'peopleNum': data.peopleNum,
      'childNum': data.childNum,
      'adultNum': data.adultNum,
      'checkIn': utilities.dateToYYYYMMDDFormat(new Date(data.checkIn)),
      'checkOut': utilities.dateToYYYYMMDDFormat(new Date(data.checkOut)),
      'productAmount': data.productAmount,
      'discount': data.discount,
      'orderAmount': data.orderAmount,
      'calMethod': data.calMethod,
      'payAmount': data.payAmount,
      'notPayAmount': data.notPayAmount,
    }
  },

  initExtra: function() {
    var basicData = JSON.parse(localStorage.getItem('loginSuccessful'));
    if (!basicData.present) {
      this.Vue.data.extra.isHave = false;
    } else if (basicData.present === '1') {
      this.Vue.data.extra.isHave = true;
      this.Vue.data.extra.isHaveInsurance = true;
      this.Vue.data.extra.insurance = '' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceBegin)) + ' 至 ' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceEnd));
    } else if (basicData.present === '2') {
      this.Vue.data.extra.isHave = true;
      this.Vue.data.extra.isHaveTransfers = true;
      this.Vue.data.extra.isHaveTransfers = basicData.transfersInfo;
    } else if (basicData.present === '1,2') {
      this.Vue.data.extra.isHave = true;
      this.Vue.data.extra.isHaveTransfers = true;
      this.Vue.data.extra.isHaveInsurance = true;
      this.Vue.data.extra.isHaveTransfers = basicData.transfersInfo;
      this.Vue.data.extra.insurance = '' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceBegin)) + ' 至 ' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceEnd));
    }
  }
};


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

  dateToYYYYMMDDFormat: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + '-' + mm + '-' + dd;
  }
}