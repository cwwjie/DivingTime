var loaddata = {},
  isFirst = true;

window.onload = function() {
  if ( versionSupport.checkAll() === false ) { return }

  // myData.get()
  //   .then(
  //     function(response) {
  //       return response.json()
  //     },function(error) {
  //       alert('加载数据错误, 错误代码: ' + error)
  //     }
  //   )
  //   .then(function(json) {
  //     if (json.result === '0') {
  //       loaddata = myData.dealwith(json.data)
  //     }else {
  //       alert('加载数据失败, 原因: ' + json.message)
  //     }
  //   })
  
}

// 判断浏览器是否支持方法
var versionSupport = {
  checkIEversion:function() {
    function isIE(ver) {
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    }
    if (isIE(6) || isIE(7) || isIE(8)) {
      return false
    }else {
      return true
    }
  },
  checkLocalStorage:function() {
    var testKey = 'test',
      storage = window.localStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true
    } catch (error) {
      return false
    }
  },
  checkAll:function() {
    if (this.checkIEversion() === false) {
      alert('因为IE8（及以下）由于存在安全风险，已被本站禁止，请升级到IE11或使用Chrome浏览器。')
      return false
    }
    if ( !this.checkLocalStorage() ) {
      alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');
      return false
    }
    return true
  }
}

var myData = {
  get: function () {
    var uniqueKey = localStorage.getItem('_uniqueKey')
    // return fetch(URLbase + URLversion + '/gather/link/' + uniqueKey + '/getGatherInfo.do',{
    //   method: 'POST',
    //   headers: {
    //     token: localStorage.getItem('_token'),
    //     digest: localStorage.getItem('_digest')
    //   },
    //   body: uploadForm
    // })
  },
  dealwith: function (data) {
    if (data) {
      isFirst = false
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
    }
  }
}


