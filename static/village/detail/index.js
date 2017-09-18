$(document).ready(function() {
  if (myData.isSupport() === false) {
    alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');
    return
  }

  myData.getCarouselAjax()
    .then(function(val) {
      myCarousel.data = val;
      myCarousel.init();
    }, function(error) {
      alert(error);
    });

  myData.startDate = new Date();
  myData.endDate = new Date(Date.parse(new Date()) + 86400000);

  myData.searchApartmentAjax()
    .then(function(val) {
      myApartment.data = val;
      myApartment.village = JSON.parse(localStorage.getItem('village'));
      myApartment.init();
    }, function(error) {
      alert(error);
    });
});

var myData = {
  startDate: '',
  endDate: '',

  isSupport: function() {
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

  getCarouselAjax: function() {
    var resortId = localStorage.getItem('resortId');


    return new Promise(function (resolve, reject) {
      if (resortId === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      $.ajax({
        type: "GET",
        url: URLbase + '/Dvt-reserve/product/relResortGallery/' + resortId + '/findByResortId.do',
        contentType: "application/json; charset=utf-8",
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('轮播图接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('轮播图接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  searchApartmentAjax: function() {
    var resortCode = localStorage.getItem('resortCode');
      startDate = utilities.dateToYYYYMMDDString(this.startDate),
      endDate = utilities.dateToYYYYMMDDString(this.endDate);

    return new Promise(function (resolve, reject) {
      if (resortCode === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      if (startDate && endDate) {
        $.ajax({
          type: "GET",
          url: URLbase + '/Dvt-reserve/product/apartment/1/0/searchSource.do?startDate=' + startDate + '&endDate=' + endDate + '&resortCode=' + resortCode,
          contentType: "application/json; charset=utf-8",
          success: function(value) {
            if (value.result === '0') {
              resolve(value.data);
            } else {
              reject('查询的房型发生错误, 原因: ' + value.message);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            reject('查询的房型发生错误, 原因: ' + errorThrown);
          }
        });
      }else {
        reject('非常抱歉，你查询的房型未传入具体时间。');
      }
    });
  }


}

var myCarousel = {
  'data': [
    // {
    //   'gallery': {
    //     'createBy': 33,
    //     'createTime': 1503252103000,
    //     'group': null,
    //     'imgDesc': null,
    //     'imgId': 153,
    //     'imgTitle': "MA1.JPG",
    //     'imgUrl': "/source/image/product/8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    //     'isDelete': "N",
    //     'thumbUrl': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    //     'updateBy': null,
    //     'updateTime': null
    //   },
    //   'imgId': 153,
    //   'isDelete': "N",
    //   'isFirst': "Y",
    //   'relId': 1,
    //   'resortId': 1,
    //   'sortOrder': 0,
    //   'updateBy': null,
    //   'updateTime': null,
    //   'createBy': 33,
    //   'createTime': 1503252103000
    // }
  ],
  init: function() {
    var data = this.data,
      imgNum = this.data.length,
      indicators = '',
      wrappers = '';

    if (imgNum === 0) {
      indicators = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
      wrappers = [
        '<div class="item active">',
          '<img src="./../../dist/img/404.jpg">',
          '<div class="carousel-caption">',
          '</div>',
        '</div>'
      ].join('');
    } else {
      for (var i = 0; i < imgNum; i++) {
        var imgUrl = data[i].gallery.imgUrl;
        var indicator = '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" ' + (i === 0 ? ' class="active"' : '') + '></li>';
        var wrapper = [
          '<div class="item ' + (i === 0 ? 'active' : '') + '">',
            '<img src="' + URLbase + imgUrl + '">',
            '<div class="carousel-caption">',
            '</div>',
          '</div>'
        ].join('');

        indicators += indicator;
        wrappers += wrapper;
      }
    }

    $('#carouselIndicators').html(indicators);
    $('#carouselInner').html(wrappers);
  }
}

var myApartment = {
  'data': {
    'list': [
      // {
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
    'pageNum': 0,
    'pageSize': 0,
    'pages': 0,
    'size': 0,
    'totalCount': 0
  },
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
    var data = this.data,
      startDate = myData.startDate,
      endDate = myData.endDate,
      myVillage = this.village;

    $('#brandName').html(myVillage.brandName + '<span>' + myVillage.label + '</span>');
    $('#villageDesc').html(myVillage.resortDesc + myVillage.recommendation);

    $('#apartmentTotalPrice').html('预定价格<span>' + myVillage.earnest + ' RMB');

    $('#startDate').html(utilities.dateToYYYYMMDDFormat(startDate));
    $('#endDate').html(utilities.dateToYYYYMMDDFormat(endDate));
  }
}

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

