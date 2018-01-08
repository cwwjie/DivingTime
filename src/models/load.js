let gatherInfo = {
  newRoomInfo: function() {
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
  },

  init: function() {
    // localStorage 手机端 是 100% 支持
    let loginSuccessful = localStorage.getItem('loginSuccessful') || false;

    // loginSuccessful 是 100% 会传值过来
    if (loginSuccessful) {
      var basicData = JSON.parse(loginSuccessful);
  
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
        ultimateData.roomInfoList.push(this.newRoomInfo());
      }

      return ultimateData;
    } else {
      return false;
    }
  },
}

export default {

  'namespace': 'load',

  'state': {
    'isFirst': null,
    'value': gatherInfo.init()
  },

  'reducers': {
    setFirst(state, data) {
      return data.isFirst === false ? {
        isFirst: false,
        value: data.value
      } : {
        ...state,
        isFirst: true
      }
    }
  },

  'effects': {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  }
};
