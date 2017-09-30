var myData = {
  'data': null,
  // {
  //   adultNum: 1,
  //   attachmentList: [],
  //   calMethod: "6000-500=5500",
  //   checkIn: 1508428800000,
  //   checkOut: 1508515200000,
  //   childNum: 0,
  //   discount: 500,
  //   email: "454766952@qq.com",
  //   flightNote: "",
  //   hLandDate: null,
  //   hLandTime: null,
  //   hTakeoffDate: null,
  //   hTakeoffTime: null,
  //   inHarbourNum: null,
  //   inboundNum: null,
  //   infoId: 122,
  //   insuranceBegin: null,
  //   insuranceEnd: null,
  //   isRead: "Y",
  //   kidsAge: null,
  //   landDate: null,
  //   landTime: null,
  //   mobile: "15976713287",
  //   notPayAmount: 5000,
  //   orderAmount: 5500,
  //   orderDesc: "1间半独立沙滩木屋",
  //   orderName: "半独立沙滩木屋",
  //   orderSn: "2017082901",
  //   orderSrc: "TB",
  //   outHarbourNum: null,
  //   outboundNum: null,
  //   payAccount: null,
  //   payAmount: 500,
  //   payStatus: 2,
  //   peopleNum: 1,
  //   pinyinName: "Zeng Jie ",
  //   present: "",
  //   productAmount: 6000,
  //   readTime: 1505324846000,
  //   remark: null,
  //   reservationCode: null,
  //   resortShuttle: null,
  //   roomNum: 1,
  //   signName: "曾杰",
  //   takeoffDate: null,
  //   takeoffTime: null,
  //   template: 1,
  //   transfersInfo: "",
  //   roomInfoList: [
  //     {
  //       bedType: "蜜月大床",
  //       iceEmail: null,
  //       iceMobile: null,
  //       iceName: null,
  //       iceRelation: null,
  //       infoId: 122,
  //       roomId: 123,
  //       customerInfoList: [
  //         {
  //           age: 45,
  //           anamnesis: "无",
  //           birthday: "1972-01-15",
  //           chineseName: "曾杰",
  //           customerId: 145,
  //           divingCount: null,
  //           divingNo: null,
  //           divingRank: null,
  //           email: "54454@qq.com",
  //           gender: 1,
  //           isDive: "N",
  //           isKid: "N",
  //           lastDiveTime: null,
  //           mobile: "15976713287",
  //           nationality: "MACAU CHINA",
  //           passportNo: null,
  //           pinyinName: "Zeng Jie",
  //           roomId: 123
  //         }
  //       ]
  //     }
  //   ]
  // },
  isFirst: true,

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
      this.isFirst = false
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
      for (var i = 0; i < basicData.roomNum; i++) {
        ultimateData.roomInfoList.push(newRoomInfo());
      }
      return ultimateData;
    }
  }
}