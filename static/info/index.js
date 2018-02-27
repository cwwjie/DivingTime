window.onload = function() {
  if ( utilities.isSupport() === false ) { return }

  VueComponent.init();

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
        // 处理数据
        Info.data = Info.dealwith(json.data);
        // 初始化页面
        Info.init();
        document.getElementById('main').setAttribute('style', 'display: block;');
        // 初始化二维码(异步)
        Info.getAdminInfo()
          .then(function(json) {
            if (json.result === '0') {
              var myadminInfo = {
                'name': json.data.name,
                'webchat': json.data.webchat || '暂无',
                'qrimg': appConfig.urlBase + json.data.qrCode
              }
              Info.part_1.$data.adminInfo = myadminInfo;
              Info.part_2.$data.adminInfo = myadminInfo;
              Info.part_3.$data.adminInfo = myadminInfo;
              Info.part_4.$data.adminInfo = myadminInfo;
              Info.part_5.$data.adminInfo = myadminInfo;
            } else {
              alert('加载二维码失败, 原因: ' + json.message);
            }
          })
        // 初始化国籍(异步)
        Info.getNationality()
          .then(function(json) {
            if (json.result === '0') {
              Info.part_3.$data.nationaOptions = json.data.codeList.map(function(val) {
                return {
                  'value': val.code,
                  'label': val.codeName
                }
              });
            } else {
              alert('加载国籍信息失败, 原因: ' + json.message);
            }
          });
      }else {
        alert('加载数据失败, 原因: ' + json.message);
      }
    })
}

var Info = {
  'data': {
    // adultNum: 1,
    // attachmentList: [{
    //   attachId: 14,
    //   attachPath: "/source/image/attach/f7f2bf05-63be-41aa-8b4c-9d1f4e791229.png",
    //   attachThumb: "/source/image/attach/thum/thum_f7f2bf05-63be-41aa-8b4c-9d1f4e791229.png",
    //   attachType: "PT1",
    //   infoId: null,
    // }],
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
    //     infoId: 122,
    //     roomId: 123,
    //     bedType: "蜜月大床",
    //     iceEmail: null,
    //     iceMobile: null,
    //     iceName: null,
    //     iceRelation: null,
    //     customerInfoList: [
    //       {
    //         roomId: 123,
    //         customerId: 145,
    //         isKid: "N",

    //         passportNo: null,
    //         nationality: "MACAU CHINA",
    //         chineseName: "曾杰",
    //         pinyinName: "Zeng Jie",
    //         birthday: "1972-01-15",
    //         age: 45,
    //         gender: 1,
    //         email: "54454@qq.com",
    //         mobile: "15976713287",
    //         isDive: "N",
    //         divingCount: null,
    //         divingNo: null,
    //         divingRank: null,
    //         lastDiveTime: null,
    //         anamnesis: "无",
    //       }
    //     ]
    //   }
    // ]
  },
  'isFirst': true,
  'part_1': null,
  'part_2': null,
  'part_3': null,
  'part_4': null,
  
  init: function () {
    this.part_1 = new Vue(VuePart_1.init(this.data, this.isFirst));
    this.part_2 = new Vue(VuePart_2.init(this.data, this.isFirst));
    this.part_3 = new Vue(VuePart_3.init(this.data, this.isFirst));
    this.part_4 = new Vue(VuePart_4.init(this.data, this.isFirst));
    this.part_5 = new Vue(VuePart_5);

    this.part_2.$data.isShow = true;
    // 废弃
    // if (this.isFirst) {
    //   this.part_1.$data.isShow = true;
    // } else {
    //   this.part_2.$data.isShow = true;
    // }
  },

  get: function () {
    var uniqueKey = localStorage.getItem('_uniqueKey'),
      token = localStorage.getItem('_token'),
      digest = localStorage.getItem('_digest');

    return fetch(appConfig.version + '/gather/link/' + uniqueKey + '/getGatherInfo.do',{
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
        'signName': basicData.signName,
        'pinyinName': basicData.pinyinName,
        'mobile': basicData.mobile,
        'email': basicData.email,
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
        'insuranceBegin': basicData.insuranceBegin,
        'insuranceEnd': basicData.insuranceEnd,
        'reservationCode': basicData.reservationCode,
        'roomInfoList': []
      }

      for (var i = 0; i < basicData.roomNum; i++) {
        ultimateData.roomInfoList.push(newRoomInfo());
      }

      var myTempData = utilities.getInforData();
      if (utilities.getInforData() && myTempData.orderDesc == basicData.orderDesc ) {
        if (confirm('你有一份数据尚未填写完毕,请问你要继续填写这份数据吗?')) {
          return myTempData;
        }else {
          return ultimateData;
        }
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
  },

  getNationality: function () {
    return fetch(appConfig.version + '/system/codetype/nationality/getWith.do',{
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(
      function(response) {
        return response.json()
      }, function(error) {
        return { 'result': '1', 'message': error }
      }
    ).catch(function(error) {
      return { 'result': '1', 'message': error }
    })
  },

  getAdminInfo: function() {
    var basicData = JSON.parse(localStorage.getItem('loginSuccessful')),
        token = localStorage.getItem('_token'),
        digest = localStorage.getItem('_digest');

    return fetch(appConfig.version + '/admin/' + basicData.belongId + '/getAdminInfo.do',{
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(
      function(response) {
        return response.json()
      }, function(error) {
        return { 'result': '1', 'message': error }
      }
    )
  }
}

var VuePart_1 = {
  'Vue': {
    'el': '#part1',

    'data': {
      'isShow': false,
      'checked': false,
      'adminInfo': { 'name': '正在加载...', 'webchat': '正在加载...', 'qrimg': ''},
    },

    'methods': {
      toNext: function (event) {
        this.isShow = false;
        Info.part_4.$data.isShow = true;
        Info.part_4.$data.checked = this.checked;
        if (this.checked) {
          Info.data.isRead = 'Y';
        }

        // if (this.checked) {
        //   Info.data.isRead = 'Y';
        //   this.isShow = false;
        //   Info.part_2.$data.isShow = true;
        // } else {
        //   alert('请同意相关条款');
        // }
      }
    }
  },

  init: function (data, isFirst) {
    if (data.isRead === 'Y') {
      this.Vue.data.checked = true;
    } else {
      this.Vue.data.checked = false;
    }
    return this.Vue;
  },
};

var VuePart_2 = {
  'Vue': {
    'el': '#part2',

    'data': {
      'isShow': false,

      'template': null,
      
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

      'flightinfor': {
        'checkIn': '正在加载...',
        'checkOut': '正在加载...',
        'cycleLength': '正在加载...'
      },
      // 国际航班号（入境）
      'landDate': null,
      'outboundNum': null,
      'landTime': null,

      // 到港航班号
      'hLandDate': null,
      'inHarbourNum': null,
      'hLandTime': null,

      // 离港航班号
      'hTakeoffDate': null,
      'outHarbourNum': null,
      'hTakeoffTime': null,

      // 国际航班号（出境）
      'takeoffDate': null,
      'inboundNum': null,
      'takeoffTime': null,

      'flightNote': '',

      'annex': {
        'attachmentList': [],
        'fileListPT1': [],
        'fileListPT2': [],
        'fileListPT3': [],
        'fileListPT4': [],
        'actionPT1': appConfig.version + '/gather/attach/PT1/add.do',
        'actionPT2': appConfig.version + '/gather/attach/PT2/add.do',
        'actionPT3': appConfig.version + '/gather/attach/PT3/add.do',
        'actionPT4': appConfig.version + '/gather/attach/PT4/add.do',
        'headers': {
          'token': localStorage.getItem('_token'),
          'digest': localStorage.getItem('_digest')
        },
      },
      'adminInfo': { 'name': '正在加载...', 'webchat': '正在加载...', 'qrimg': ''},
    },

    'computed': {
      flightName:  function () {
        if (
          this.template === 11 ||
          this.template === 12 ||
          this.template === 13 ||
          this.template === 14
        ) {
          return '马来西亚'
        } else {
          return '斗湖'
        }
      }
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
      renderTimeLeft: function() {
        if (this.template === 3 || this.template === 9) {
          return '36'
        } else {
          return '46'
        }
      },

      isBoundclassShow: function() {
        if ( loaddata.template == 1 || loaddata.template == 2 || loaddata.template == 4 || loaddata.template == 5 || loaddata.template == 6 || loaddata.template == 7 || loaddata.template == 8 || loaddata.template == 9 ) {
          return false
        }
        return true
      },

      submitUploadPT1: function() {
        var _this = this,
          myuploadFiles = this.$refs.uploadPT1.uploadFiles;

        if (this.annex.fileListPT1.length > 0) {
          return
        }

        if (myuploadFiles.length === 0) {
          alert('你尚未选择任何文件');
          return
        }

        if (
          myuploadFiles[0].raw.type != 'image/jpeg' && 
          myuploadFiles[0].raw.type != 'image/png' && 
          myuploadFiles[0].raw.type != 'image/jpg'
        ) {
          alert('请选择 jpg 或 png 格式的文件');
          return
        }

        var myloading = this.$loading(),
          uploadForm = new FormData();

        uploadForm.append('attachFile', myuploadFiles[0].raw);
        this.AnnexFileUpload('PT1', uploadForm)
          .then(function (val) {
            if (val.result == '0') {
              _this.annex.attachmentList.push(val.data);
              _this.annex.fileListPT1 = [{
                'name': '出国航班机票截图',
                'url': appConfig.urlBase + val.data.attachThumb
              }];
            } else {
              alert('上传失败, 原因:' + val.message);
            }
            myloading.close();
          })
      },

      removeUploadPT1: function(file, fileList) {
        var _this = this,
            fileListPT1 = this.annex.fileListPT1;

        if (this.annex.fileListPT1.length > 0) {
          var myfileList,
              attachId = false,
              attachmentList = _this.annex.attachmentList,
              newAttachmentList = [];

          // 寻找 PT1 的数据，并且 为删除远程服务器 获取 attachId
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].attachType === 'PT1') {
              myfileList = [{
                'name': '出国航班机票截图',
                'url': appConfig.urlBase + attachmentList[i].attachThumb
              }]
              attachId = attachmentList[i].attachId;
            } else {
              newAttachmentList.push(attachmentList[i]);
            }
          }

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            if (attachId === false) {
              alert('删除失败 原因: 图片数据有误.');
              _this.annex.fileListPT1 = myfileList;
            } else {
              var myloading = _this.$loading();

              _this.AnnexFileRemove(attachId)
                .then(function (val) {
                  if (val.result == '0') {
                    _this.annex.fileListPT1 = [];
                    _this.annex.attachmentList = newAttachmentList;
                  } else {
                    _this.annex.fileListPT1 = myfileList;
                    alert('删除失败, 原因:' + val.message);
                  }
                  myloading.close();
                })
            }
          }).catch(function () {
            _this.annex.fileListPT1 = myfileList;
          });
        }
      },

      submitUploadPT2: function() {
        var _this = this,
          myuploadFiles = this.$refs.uploadPT2.uploadFiles;

        if (this.annex.fileListPT2.length > 0) {
          return
        }

        if (myuploadFiles.length === 0) {
          alert('你尚未选择任何文件');
          return
        }

        if (
          myuploadFiles[0].raw.type != 'image/jpeg' && 
          myuploadFiles[0].raw.type != 'image/png' && 
          myuploadFiles[0].raw.type != 'image/jpg'
        ) {
          alert('请选择 jpg 或 png 格式的文件');
          return
        }

        var myloading = this.$loading(),
          uploadForm = new FormData();

        uploadForm.append('attachFile', myuploadFiles[0].raw);
        this.AnnexFileUpload('PT2', uploadForm)
          .then(function (val) {
            if (val.result == '0') {
              _this.annex.attachmentList.push(val.data);
              _this.annex.fileListPT1 = [{
                'name': '出国航班机票截图',
                'url': appConfig.urlBase + val.data.attachThumb
              }];
            } else {
              alert('上传失败, 原因:' + val.message);
            }
            myloading.close();
          })
      },

      removeUploadPT2: function(file, fileList) {
        var _this = this,
            fileListPT2 = this.annex.fileListPT2;

        if (this.annex.fileListPT2.length > 0) {
          var myfileList,
              attachId = false,
              attachmentList = _this.annex.attachmentList,
              newAttachmentList = [];

          // 寻找 PT2 的数据，并且 为删除远程服务器 获取 attachId
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].attachType === 'PT2') {
              myfileList = [{
                'name': '回国航班机票截图',
                'url': appConfig.urlBase + attachmentList[i].attachThumb
              }]
              attachId = attachmentList[i].attachId;
            } else {
              newAttachmentList.push(attachmentList[i]);
            }
          }

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            if (attachId === false) {
              alert('删除失败 原因: 图片数据有误.');
              _this.annex.fileListPT2 = myfileList;
            } else {
              var myloading = _this.$loading();

              _this.AnnexFileRemove(attachId)
                .then(function (val) {
                  if (val.result == '0') {
                    _this.annex.fileListPT2 = [];
                    _this.annex.attachmentList = newAttachmentList;
                  } else {
                    _this.annex.fileListPT2 = myfileList;
                    alert('删除失败, 原因:' + val.message);
                  }
                  myloading.close();
                })
            }
          }).catch(function () {
            _this.annex.fileListPT2 = myfileList;
          });
        }
      },

      submitUploadPT3: function() {
        var _this = this,
          myuploadFiles = this.$refs.uploadPT3.uploadFiles;

        if (this.annex.fileListPT3.length > 0) {
          return
        }

        if (myuploadFiles.length === 0) {
          alert('你尚未选择任何文件');
          return
        }

        if (
          myuploadFiles[0].raw.type != 'image/jpeg' && 
          myuploadFiles[0].raw.type != 'image/png' && 
          myuploadFiles[0].raw.type != 'image/jpg'
        ) {
          alert('请选择 jpg 或 png 格式的文件');
          return
        }

        var myloading = this.$loading(),
          uploadForm = new FormData();

        uploadForm.append('attachFile', myuploadFiles[0].raw);
        this.AnnexFileUpload('PT3', uploadForm)
          .then(function (val) {
            if (val.result == '0') {
              _this.annex.attachmentList.push(val.data);
              _this.annex.fileListPT3 = [{
                'name': '出国航班机票截图',
                'url': appConfig.urlBase + val.data.attachThumb
              }];
            } else {
              alert('上传失败, 原因:' + val.message);
            }
            myloading.close();
          })
      },

      removeUploadPT3: function(file, fileList) {
        var _this = this,
            fileListPT3 = this.annex.fileListPT3;

        if (this.annex.fileListPT3.length > 0) {
          var myfileList,
              attachId = false,
              attachmentList = _this.annex.attachmentList,
              newAttachmentList = [];

          // 寻找 PT3 的数据，并且 为删除远程服务器 获取 attachId
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].attachType === 'PT3') {
              myfileList = [{
                'name': '到达斗湖航班机票截图',
                'url': appConfig.urlBase + attachmentList[i].attachThumb
              }]
              attachId = attachmentList[i].attachId;
            } else {
              newAttachmentList.push(attachmentList[i]);
            }
          }

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            if (attachId === false) {
              alert('删除失败 原因: 图片数据有误.');
              _this.annex.fileListPT3 = myfileList;
            } else {
              var myloading = _this.$loading();

              _this.AnnexFileRemove(attachId)
                .then(function (val) {
                  if (val.result == '0') {
                    _this.annex.fileListPT3 = [];
                    _this.annex.attachmentList = newAttachmentList;
                  } else {
                    _this.annex.fileListPT3 = myfileList;
                    alert('删除失败, 原因:' + val.message);
                  }
                  myloading.close();
                })
            }
          }).catch(function () {
            _this.annex.fileListPT3 = myfileList;
          });
        }
      },

      submitUploadPT4: function() {
        var _this = this,
          myuploadFiles = this.$refs.uploadPT4.uploadFiles;

        if (this.annex.fileListPT4.length > 0) {
          return
        }

        if (myuploadFiles.length === 0) {
          alert('你尚未选择任何文件');
          return
        }

        if (
          myuploadFiles[0].raw.type != 'image/jpeg' && 
          myuploadFiles[0].raw.type != 'image/png' && 
          myuploadFiles[0].raw.type != 'image/jpg'
        ) {
          alert('请选择 jpg 或 png 格式的文件');
          return
        }

        var myloading = this.$loading(),
          uploadForm = new FormData();

        uploadForm.append('attachFile', myuploadFiles[0].raw);
        this.AnnexFileUpload('PT4', uploadForm)
          .then(function (val) {
            if (val.result == '0') {
              _this.annex.attachmentList.push(val.data);
              _this.annex.fileListPT4 = [{
                'name': '出国航班机票截图',
                'url': appConfig.urlBase + val.data.attachThumb
              }];
            } else {
              alert('上传失败, 原因:' + val.message);
            }
            myloading.close();
          })
      },

      removeUploadPT4: function(file, fileList) {
        var _this = this,
            fileListPT4 = this.annex.fileListPT4;

        if (this.annex.fileListPT4.length > 0) {
          var myfileList,
              attachId = false,
              attachmentList = _this.annex.attachmentList,
              newAttachmentList = [];

          // 寻找 PT4 的数据，并且 为删除远程服务器 获取 attachId
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].attachType === 'PT4') {
              myfileList = [{
                'name': '到达斗湖航班机票截图',
                'url': appConfig.urlBase + attachmentList[i].attachThumb
              }]
              attachId = attachmentList[i].attachId;
            } else {
              newAttachmentList.push(attachmentList[i]);
            }
          }

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            if (attachId === false) {
              alert('删除失败 原因: 图片数据有误.');
              _this.annex.fileListPT4 = myfileList;
            } else {
              var myloading = _this.$loading();

              _this.AnnexFileRemove(attachId)
                .then(function (val) {
                  if (val.result == '0') {
                    _this.annex.fileListPT4 = [];
                    _this.annex.attachmentList = newAttachmentList;
                  } else {
                    _this.annex.fileListPT4 = myfileList;
                    alert('删除失败, 原因:' + val.message);
                  }
                  myloading.close();
                })
            }
          }).catch(function () {
            _this.annex.fileListPT4 = myfileList;
          });
        }
      },
      
      AnnexFileUpload: function(type, uploadForm) {
        return fetch(appConfig.version + '/gather/attach/'+ type +'/add.do', {
          'method': 'POST',
          'headers': {
            'token': localStorage.getItem('_token'),
            'digest': localStorage.getItem('_digest')
          },
          'body': uploadForm
        }).then(function(response) {
          return response.json()
        }, function (error) {
          return {
            'result': '1',
            'message': error
          }
        })
      },
      
      AnnexFileRemove: function(attachId) {
        return fetch(appConfig.version + '/gather/attach/' + attachId + '/del.do', {
          'method': 'GET',
          'headers': {
            'token': localStorage.getItem('_token'),
            'digest': localStorage.getItem('_digest')
          }
        }).then(function(response) {
          return response.json()
        }, function (error) {
          return {
            'result': '1',
            'message': error
          }
        })
      },

      toPrev: function() {
        Info.part_1.$data.isShow = true;
        this.isShow = false;
      },

      checkErrors: function () {
        var allow = true;
        if (!this.signName) {
          this.signNameError = '预定人姓名 不能为空';
          this.isSignNameError= true;
          this.$message({
            'message': '预定人姓名 不能为空',
            'type': 'warning'
          });
          allow =  false
        }

        if (!this.pinyinName) {
          this.pinyinNameError = '预定人拼音 不能为空';
          this.isPinyinNameError = true;
          this.$message({
            'message': '预定人拼音 不能为空',
            'type': 'warning'
          });
          allow =  false
        }

        if (!this.mobile) {
          this.mobileError = '手机号码 不能为空';
          this.isMobileError = true;
          this.$message({
            'message': '手机号码 不能为空',
            'type': 'warning'
          });
          allow =  false
        }

        if (!this.email) {
          this.emailError = '邮箱 不能为空';
          this.isEmailError = true;
          this.$message({
            'message': '邮箱 不能为空',
            'type': 'warning'
          });
          allow =  false
        }

        if (allow === false) { return false }

        if (
          this.isSignNameError ||
          this.isPinyinNameError ||
          this.isMobileError ||
          this.isEmailError
        ) {
          this.$message({
            'message': '数据有误',
            'type': 'warning'
          });
          return false
        }
        return true
      },

      toNext: function() {
        if (!this.checkErrors()) { return }

        Info.data.signName = this.signName;
        Info.data.pinyinName = this.pinyinName;
        Info.data.mobile = this.mobile;
        Info.data.email = this.email;
        Info.data.payAccount = this.payAccount;

        Info.data.landDate = Date.parse(new Date(this.landDate)) || null;
        Info.data.outboundNum = this.outboundNum;
        Info.data.landTime = utilities.flighTimeToTimestamp(this.landTime);

        Info.data.hLandDate = Date.parse(new Date(this.hLandDate)) || null;
        Info.data.inHarbourNum = this.inHarbourNum;
        Info.data.hLandTime = utilities.flighTimeToTimestamp(this.hLandTime);

        Info.data.hTakeoffDate = Date.parse(new Date(this.hTakeoffDate)) || null;
        Info.data.outHarbourNum = this.outHarbourNum;
        Info.data.hTakeoffTime = utilities.flighTimeToTimestamp(this.hTakeoffTime);

        Info.data.takeoffDate = Date.parse(new Date(this.takeoffDate)) || null;
        Info.data.inboundNum = this.inboundNum;
        Info.data.takeoffTime = utilities.flighTimeToTimestamp(this.takeoffTime);

        Info.data.flightNote = this.flightNote;

        Info.data.attachmentList = this.annex.attachmentList;

        this.isShow = false;
        Info.part_3.$data.isShow = true;

        utilities.saveInforData();
        if (Info.isFirst) {
          Info.part_3.$data.dialogVisible = true;
          Info.part_3.$data.isDialogAdd = true;
          Info.part_3.$data.chineseName = this.signName;
          Info.part_3.$data.pinyinName = this.pinyinName;
          Info.part_3.$data.mobile = this.mobile;
          Info.part_3.$data.email = this.email;
          if (this.template === 3) {
            Info.part_3.$data.iceName = this.signName;
            Info.part_3.$data.iceEmail = this.email;
            Info.part_3.$data.iceMobile = this.mobile;
          }
        }
      }
    }
  },

  init: function (data, isFirst) {

    this.initOrderinfor(data);
    this.initExtra();
    this.Vue.data.template = data.template;

    var cycleLength = Math.floor((data.checkOut - data.checkIn)/86400000);
    this.Vue.data.flightinfor.checkIn = utilities.dateToYYYYMMDDFormat(new Date(data.checkIn));
    this.Vue.data.flightinfor.checkOut = utilities.dateToYYYYMMDDFormat(new Date(data.checkOut));
    this.Vue.data.flightinfor.cycleLength = '' + (cycleLength + 1) + '天' + cycleLength + '晚';

    // 下单信息
    this.Vue.data.signName = data.signName;
    this.Vue.data.pinyinName = data.pinyinName;
    this.Vue.data.mobile = data.mobile;
    this.Vue.data.email = data.email;
    this.Vue.data.payAccount = data.payAccount;
    // 航班信息
    this.Vue.data.landDate = data.landDate;
    this.Vue.data.outboundNum = data.outboundNum;
    this.Vue.data.landTime = utilities.timestampToFlighTime(data.landTime);

    this.Vue.data.hLandDate = data.hLandDate;
    this.Vue.data.inHarbourNum = data.inHarbourNum;
    this.Vue.data.hLandTime = utilities.timestampToFlighTime(data.hLandTime);
    
    this.Vue.data.hTakeoffDate = data.hTakeoffDate;
    this.Vue.data.outHarbourNum = data.outHarbourNum;
    this.Vue.data.hTakeoffTime = utilities.timestampToFlighTime(data.hTakeoffTime);

    this.Vue.data.takeoffDate = data.takeoffDate;
    this.Vue.data.inboundNum = data.inboundNum;
    this.Vue.data.takeoffTime = utilities.timestampToFlighTime(data.takeoffTime);

    this.Vue.data.flightNote = data.flightNote;

    this.initAttachmentList(data);

    return this.Vue;
  },

  initOrderinfor: function(data) {
    var cycleLength = Math.floor((data.checkOut - data.checkIn)/86400000);
    var orderinfor = {
      'orderSn': data.orderSn,
      'payStatus': '已付金额' + data.payAmount + '/未付金额' + data.notPayAmount,
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
      'notPayAmount': data.notPayAmount
    }
    
    this.Vue.data.orderinfor = orderinfor;
  },

  initExtra: function() {
    var basicData = JSON.parse(localStorage.getItem('loginSuccessful'));
    if (!basicData.present) {
      this.Vue.data.extra.isHave = false;
    } else {
      this.Vue.data.extra.isHave = true;

      if (basicData.present === '1') {
        this.Vue.data.extra.isHaveInsurance = true;
        this.Vue.data.extra.insurance = '' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceBegin)) + ' 至 ' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceEnd));
      } else if (basicData.present === '2') {
        this.Vue.data.extra.isHaveTransfers = true;
        this.Vue.data.extra.transfers = basicData.transfersInfo;
      } else if (basicData.present === '1,2') {
        this.Vue.data.extra.isHaveTransfers = true;
        this.Vue.data.extra.isHaveInsurance = true;
        this.Vue.data.extra.transfers = basicData.transfersInfo;
        this.Vue.data.extra.insurance = '' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceBegin)) + ' 至 ' + utilities.dateToYYYYMMDDFormat(new Date(basicData.insuranceEnd));
      }
      
    }
    
  },

  initAttachmentList: function(data) {
    if (data.template === 3) {
      var myattachmentList = data.attachmentList || []

      this.Vue.data.annex.attachmentList = myattachmentList;
      for (var i = 0; i < myattachmentList.length; i++) {
        if (myattachmentList[i] === 'PT1') {
          this.Vue.data.annex.fileListPT1 = [{
            'name': '出国航班机票截图',
            'url': appConfig.urlBase + myattachmentList[i].attachThumb
          }];
        } else if (myattachmentList[i] === 'PT2') {
          this.Vue.data.annex.fileListPT2 = [{
            'name': '回国航班机票截图',
            'url': appConfig.urlBase + myattachmentList[i].attachThumb
          }];
        } else if (myattachmentList[i] === 'PT3') {
          this.Vue.data.annex.fileListPT3 = [{
            'name': '到达斗湖航班机票截图',
            'url': appConfig.urlBase + myattachmentList[i].attachThumb
          }];
        } else if (myattachmentList[i] === 'PT4') {
          this.Vue.data.annex.fileListPT4 = [{
            'name': '离开斗湖航班机票截图',
            'url': appConfig.urlBase + myattachmentList[i].attachThumb
          }];
        }
      }
    }
  }
};

var VuePart_3 = {
  'Vue': {
    'el': '#part3',

    'data': {
      
      'isShow': false,
      'template': null,

      'peopleNum': 0,
      // 剩余入住人数
      'lavePeopleNum': 0,

      // 选中的房间
      'selectRoomNum': 0,

      'roomList': [],

      'bedType': null,
      'bedOptions': [
        // {
        // 'value': '蜜月大床',
        // 'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
        // }
      ],

      // 下面的都是模态框数据
      'dialogVisible': false,
      'isDialogAdd': false,
      'dialogId': null,

      'roomId': null,
      'customerId': null,
      'isKid': "N",

      'passportNo': null,
      'nationality': null,
      'nationaAddition': {
        'isError': false,
        'message': ''
      },
      'nationaOptions': [
        // {
        //   'value': 'CHINA',
        //   'label': '中国 CHINA'
        // }
      ],
      'chineseName': null,
      'chineseNameAddition': {
        'isError': false,
        'message': ''
      },
      'pinyinName': null,
      'pinyinNameAddition': {
        'isError': false,
        'message': ''
      },
      'gender': 1,
      'birthday': null,
      'birthdayAddition': {
        'isError': false,
        'message': ''
      },
      'mobile': null,
      'mobileAddition': {
        'isError': false,
        'message': ''
      },
      'email': null,
      'isDive': false,
      'divingRank': null,
      'divingNo': null,
      'lastDiveTime': null,
      'divingCount': null,
      'anamnesis': null,

      // 下面是紧急联系人信息
      'iceName': null,
      'iceNameAddition': {
        'isError': false,
        'message': ''
      },
      'iceEmail': null,
      'iceEmailAddition': {
        'isError': false,
        'message': ''
      },
      'iceMobile': null,
      'iceMobileAddition': {
        'isError': false,
        'message': ''
      },
      'iceRelation': null,
      'iceRelationAddition': {
        'isError': false,
        'message': ''
      },

      'adminInfo': { 'name': '正在加载...', 'webchat': '正在加载...', 'qrimg': ''},
    },
    
    'watch': {
      'chineseName': {
        handler: function (val, oldVal) {
          if (val === '' || val === null) {
            this.chineseNameAddition = {
              'isError': false,
              'message': ''
            };
          } else if (/^[\u4E00-\u9FA5]+$/.test(val) === false) {
            this.chineseNameAddition = {
              'isError': true,
              'message': '必须为中文'
            };
          } else if (val.length >= 15) {
            this.chineseNameAddition = {
              'isError': true,
              'message': '不能超出15个汉字!'
            };
          } else {
            this.pinyinName = ConvertPinyin(val);
            this.chineseNameAddition = {
              'isError': false,
              'message': ''
            };
          }
        }
      },

      'pinyinName': {
        handler: function (val, oldVal) {
          if (val === '' || val === null) {
            this.pinyinNameAddition = {
              'isError': false,
              'message': ''
            };
          } else if (/^[a-zA-Z]{0,10000}$/.test(val) === false) {
            this.pinyinNameAddition = {
              'isError': true,
              'message': '拼音格式有误'
            };
          } else if (val.length >= 32) {
            this.pinyinNameAddition = {
              'isError': true,
              'message': '不能超出32个英文!'
            };
          } else {
            this.pinyinNameAddition = {
              'isError': false,
              'message': ''
            };
          }
        }
      },

      'iceName': {
        handler: function (val, oldVal) { this.validatorIceName() }
      },
      
      'iceEmail': {
        handler: function (val, oldVal) { this.validatorIceEmail() }
      },

      'iceMobile': {
        handler: function (val, oldVal) { this.validatorIceMobile() }
      },

      'iceRelation': {
        handler: function (val, oldVal) { 
          if (val !== null) { this.iceRelationAddition = { 'isError': false, 'message': '' } }
        }
      }
    },

    'methods': {
      addTraveler: function (isKid) {
        if ((this.peopleNum - this.lavePeopleNum) <= 0) {
          this.$alert('已达到最大入住人数', '通知', {
            confirmButtonText: '确定',
            callback: action => {return false}
          });
          return
        }

        this.isDialogAdd = true;
        this.isKid = isKid;
        this.dialogId = null;

        this.roomId = null;
        this.customerId = null;

        this.passportNo = null;
        this.nationality = null;
        this.nationaAddition = { 'isError': false, 'message': '' };
        this.chineseName = null,
        this.chineseNameAddition = { 'isError': false, 'message': '' };
        this.pinyinName = null;
        this.pinyinNameAddition = { 'isError': false, 'message': '' };
        this.gender = 1;
        this.birthday = null;
        this.birthdayAddition = { 'isError': false, 'message': '' };
        this.mobile = null;
        this.mobileAddition = { 'isError': false, 'message': '' };
        // this.email = null;
        this.isDive = false;
        this.divingRank = null;
        this.divingNo = null;
        this.lastDiveTime = null;
        this.divingCount = null;
        this.anamnesis = null;

        this.dialogVisible = true;
      },

      editTraveler: function (data) {
        var customerInfo = this.roomList[this.selectRoomNum].customerInfoList[data.id];

        this.isDialogAdd = false;
        this.isKid = customerInfo.isKid;
        this.dialogId = customerInfo.id;

        this.roomId = customerInfo.roomId;
        this.customerId = customerInfo.customerId;

        this.passportNo = customerInfo.passportNo;
        this.nationality = customerInfo.nationality;
        this.nationaAddition = { 'isError': false, 'message': '' };
        this.chineseName = customerInfo.chineseName,
        this.chineseNameAddition = { 'isError': false, 'message': '' };
        this.pinyinName = customerInfo.pinyinName;
        this.pinyinNameAddition = { 'isError': false, 'message': '' };
        this.gender = customerInfo.gender;
        this.birthday = new Date(customerInfo.birthday);
        this.birthdayAddition = { 'isError': false, 'message': '' };
        this.mobile = customerInfo.mobile;
        this.mobileAddition = { 'isError': false, 'message': '' };
        this.email = customerInfo.email;
        this.isDive = customerInfo.isDive === 'Y' ? true : false;
        this.divingRank = customerInfo.divingRank;
        this.divingNo = customerInfo.divingNo;
        this.lastDiveTime = customerInfo.lastDiveTime ? new Date(customerInfo.lastDiveTime) : null;
        this.divingCount = customerInfo.divingCount;
        this.anamnesis = customerInfo.anamnesis;

        this.dialogVisible = true;
      },

      deleteTraveler: function (data) {
        var _this = this,
            newTravelerId = 0,
            newcustomerInfoList = [];
        var customerInfoList = this.roomList[this.selectRoomNum].customerInfoList;

        this.$confirm('此操作将删除该旅客信息, 是否继续?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          for (var i = 0; i < customerInfoList.length; i++) {
            if (data.id !== customerInfoList[i].id) {
              customerInfoList[i].id = newTravelerId;
              newcustomerInfoList.push(customerInfoList[i]);
              newTravelerId++;
            }
          }
          this.lavePeopleNum--;
          _this.roomList[_this.selectRoomNum].customerInfoList = newcustomerInfoList;
        }).catch(() => {
          this.$message({
            'type': 'info',
            'message': '已取消删除'
          });
        });
      },

      validatorIceName: function () {
        if (this.iceName === '' || this.iceName === null) {
          this.iceNameAddition = {
            'isError': true,
            'message': '姓名不能为空'
          };
          return false
        } else if (/^[\u4E00-\u9FA5]+$/.test(this.iceName) === false) {
          this.iceNameAddition = {
            'isError': true,
            'message': '中文格式有误'
          };
          return false
        } else if (this.iceName.length >= 32) {
          this.iceNameAddition = {
            'isError': true,
            'message': '不能超出15个汉字!'
          };
          return false
        } else {
          this.iceNameAddition = {
            'isError': false,
            'message': ''
          };
          return true
        }
      },

      validatorIceEmail: function () {
        if (this.iceEmail === '' || this.iceEmail === null) {
          this.iceEmailAddition = {
            'isError': true,
            'message': '邮箱不能为空'
          };
          return false
        } else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.iceEmail) === false) {
          this.iceEmailAddition = {
            'isError': true,
            'message': '邮箱格式有误'
          };
          return false
        } else {
          this.iceEmailAddition = {
            'isError': false,
            'message': ''
          };
          return true
        }
      },

      validatorIceMobile: function () {
        if (this.iceMobile === '' || this.iceMobile === null) {
          this.iceMobileAddition = {
            'isError': true,
            'message': '手机号码不能为空'
          };
          return false
        } else if (/^1[34578]\d{9}$/.test(this.iceMobile) === false) {
          this.iceMobileAddition = {
            'isError': true,
            'message': '手机号码格式有误'
          };
          return false
        } else {
          this.iceMobileAddition = {
            'isError': false,
            'message': ''
          };
          return true
        }
      },

      validatorNational: function () {
        if (this.nationality) {
          this.nationaAddition = {
            'isError': false,
            'message': ''
          };
          return true
        } else {
          this.nationaAddition = {
            'isError': true,
            'message': '国籍为必选'
          };
          return false
        }
      },

      validatorChineseName: function () {
        if (this.chineseName === '' || this.chineseName === null) {
          this.chineseNameAddition = {
            'isError': true,
            'message': '中文姓名不能为空'
          };
          return false
        } else if (/^[\u4E00-\u9FA5]+$/.test(this.chineseName) === false) {
          this.chineseNameAddition = {
            'isError': true,
            'message': '必须为中文'
          };
          return false
        } else if (this.chineseName.length >= 15) {
          this.chineseNameAddition = {
            'isError': true,
            'message': '不能超出15个汉字!'
          };
          return false
        } else {
          this.chineseNameAddition = {
            'isError': false,
            'message': ''
          };
          return true
        }
      },

      validatorPinyinName: function () {
        if (this.pinyinName === '' || this.pinyinName === null) {
          this.pinyinNameAddition = {
            'isError': true,
            'message': '拼音不能为空'
          };
          return false
        } else if (/^[a-zA-Z]{0,10000}$/.test(this.pinyinName) === false) {
          this.pinyinNameAddition = {
            'isError': true,
            'message': '拼音格式有误'
          };
          return false
        } else if (this.pinyinName.length >= 32) {
          this.pinyinNameAddition = {
            'isError': true,
            'message': '不能超出32个英文!'
          };
          return false
        } else {
          this.pinyinNameAddition = {
            'isError': false,
            'message': ''
          };
          return true
        }
      },

      validatorBirthday: function () {
        if (this.birthday === null) {
          this.birthdayAddition = {
            'isError': true,
            'message': '日期不能为空'
          };
          return false
        } else {
          this.birthdayAddition = {
            'isError': false,
            'message': ''
          };
          return true
        }
      },

      validatorMobile: function () {
        if (this.isKid === 'Y') {
          this.mobileAddition = {
            'isError': false,
            'message': ''
          };
          return true
        } else {
          if (this.mobile === null) {
            this.mobileAddition = {
              'isError': true,
              'message': '手机号码不能为空'
            };
            return false
          } else if ( /^1[34578]\d{9}$/.test(this.mobile) === false) {
            this.mobileAddition = {
              'isError': true,
              'message': '手机号码格式有误'
            };
            return false
          } else {
            this.mobileAddition = {
              'isError': false,
              'message': ''
            };
            return true
          }
        }
      },

      dialogSave: function () {
        var allow = true;

        if ( this.validatorNational() === false ) { allow = false }
        if ( this.validatorChineseName() === false ) { allow = false }
        if ( this.validatorPinyinName() === false ) { allow = false }
        if ( this.validatorBirthday() === false ) { allow = false }
        if ( this.validatorMobile() === false ) { allow = false }
        if (allow === false) { return }

        var mobile;

        if (this.isKid === 'N') {
          mobile = this.mobile;
        } else {
          mobile = Info.data.mobile;
        }

        if (this.isDialogAdd) {
          var customerInfoId = this.roomList[this.selectRoomNum].customerInfoList.length;

          this.roomList[this.selectRoomNum].customerInfoList.push({
            'id': customerInfoId,
  
            'roomId': this.roomId,
            'customerId': this.customerId,
            'isKid': this.isKid,
  
            'passportNo': this.passportNo,
            'nationality': this.nationality,
            'chineseName': this.chineseName,
            'pinyinName': this.pinyinName,
            'gender': this.gender,
            'birthday': utilities.dateToYYYYMMDDFormat(this.birthday),
            'age': utilities.dateToAge(this.birthday),
            'mobile': mobile,
            'email': Info.data.email,
            'divingCount': this.divingCount,
            'divingNo': this.divingNo,
            'divingRank': this.divingRank ? parseInt(this.divingRank) : 0,
            'isDive': this.isDive ? 'Y' : 'N',
            'lastDiveTime': this.lastDiveTime ? Date.parse(new Date(this.lastDiveTime)) : '',
            'anamnesis': this.anamnesis
          });

          this.lavePeopleNum++;
        } else {
          this.roomList[this.selectRoomNum].customerInfoList[this.dialogId] = {
            'id': this.dialogId,
  
            'roomId': this.roomId,
            'customerId': this.customerId,
            'isKid': this.isKid,
  
            'passportNo': this.passportNo,
            'nationality': this.nationality,
            'chineseName': this.chineseName,
            'pinyinName': this.pinyinName,
            'gender': this.gender,
            'birthday': utilities.dateToYYYYMMDDFormat(this.birthday),
            'age': utilities.dateToAge(this.birthday),
            'mobile': mobile,
            'email': Info.data.email,
            'divingCount': this.divingCount,
            'divingNo': this.divingNo,
            'divingRank': this.divingRank ? parseInt(this.divingRank) : 0,
            'isDive': this.isDive ? 'Y' : 'N',
            'lastDiveTime': this.lastDiveTime ? Date.parse(new Date(this.lastDiveTime)) : '',
            'anamnesis': this.anamnesis
          };
        }

        this.dialogVisible = false;
      },

      toPrev: function() {
        Info.part_2.$data.isShow = true;
        this.isShow = false;
      },

      toNext: function() {
        var allow = true,
            newRoomInfoList = [];
        if (this.template === 3) {
          if ( this.validatorIceName() === false ) { allow = false }
          // if ( this.validatorIceEmail() === false ) { allow = false }
          if ( this.validatorIceMobile() === false ) { allow = false }
          if ( this.iceRelation === null ) {
            allow = false;
            this.iceRelationAddition = { 'isError': true, 'message': '请选择紧急联系人关系' }
          } else {
            this.iceRelationAddition = { 'isError': false, 'message': '' }
          }
          if (allow === false) {
            this.$message({ 'message': '紧急联系人相关信息未完善', 'type': 'warning' });
            return
          }
        }

        for (var i = 0; i < this.roomList.length; i++) {
          if (this.roomList[i].bedType === null) {
            allow = false;
            this.$message({ 'message': '每间房间的床型是必选', 'type': 'warning' });
            return
          } else if (this.roomList[i].customerInfoList.length < 1) {
            allow = false;
            this.$message({ 'message': '每间房间必须至少有一名旅客信息', 'type': 'warning' });
            return
          }

          var newCustomerInfoList = [];
          for (var j = 0; j < this.roomList[i].customerInfoList.length; j++) {
            var customerInfoList = this.roomList[i].customerInfoList[j];
            var divingCount = parseInt(customerInfoList.divingCount);

            newCustomerInfoList.push({
              'roomId': customerInfoList.roomId,
              'customerId': customerInfoList.customerId,
              'isKid': customerInfoList.isKid,

              'passportNo': customerInfoList.passportNo,
              'nationality': customerInfoList.nationality,
              'chineseName': customerInfoList.chineseName,
              'pinyinName': customerInfoList.pinyinName,
              'birthday': customerInfoList.birthday,
              'age': customerInfoList.age,
              'gender': customerInfoList.gender,
              'email': customerInfoList.email,
              'mobile': customerInfoList.mobile,
              'isDive': customerInfoList.isDive,
              'divingCount': divingCount > 100 ? 100 : divingCount,
              'divingNo': customerInfoList.divingNo,
              'divingRank': customerInfoList.divingRank,
              'lastDiveTime': customerInfoList.lastDiveTime,
              'anamnesis': customerInfoList.anamnesis,
            })
          }

          newRoomInfoList.push({
            'infoId': this.roomList[i].infoId,
            'roomId': this.roomList[i].roomId,
            'bedType': this.roomList[i].bedType,

            'iceEmail': this.iceEmail,
            'iceMobile': this.iceMobile,
            'iceName': this.iceName,
            'iceRelation': this.iceRelation,
            'customerInfoList': newCustomerInfoList
          });
        }

        if (allow === false) { return }

        Info.data.roomInfoList = newRoomInfoList;
        utilities.saveInforData();
        this.isShow = false;
        Info.part_4.$data.isShow = true;
      },
    },
  },
  init: function(data, isFirst) {
    this.Vue.data.template = data.template;
    this.Vue.data.nationaOptions = utilities.renderNationality();

    this.initRoom(data);
    // if (isFirst) { }

    return this.Vue;
  },

  initRoom: function (data) {
    var roomInfoList = data.roomInfoList,
        lavePeopleNum = 0;
    var roomList = [
      // {
      //   'id': 0,
      //   'infoId': 122,
      //   'roomId': 123,
      //   'name': '房间1',
      //   'bedType': null,
      //   'bedOptions': [{
      //     'value': '蜜月大床',
      //     'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
      //   }],
      //   'iceEmail': null,
      //   'iceMobile': null,
      //   'iceName': null,
      //   'iceRelation': null,
      //   'customerInfoList': [{
      //     'id': 0,
      //     'roomId': 123,
      //     'isKid': "N",
      //     'customerId': 145,
      //     'passportNo': null,
      //     'nationality': "MACAU CHINA",
      //     'chineseName': "曾杰",
      //     'pinyinName': "Zeng Jie",
      //     'mobile': "15976713287",
      //     'age': 45,
      //     'email': "54454@qq.com",
      //     'gender': 1,
      //     'birthday': "1972-01-15",
      //     'divingCount': null,
      //     'divingNo': null,
      //     'divingRank': null,
      //     'isDive': "N",
      //     'lastDiveTime': null,
      //     'anamnesis': "无",
      //   }]
      // }
    ];

    if (roomInfoList.length > 0) {
      if (data.template !== 3) {
        this.Vue.data.iceName = roomInfoList[0].iceName;
        this.Vue.data.iceEmail = roomInfoList[0].iceEmail;
        this.Vue.data.iceMobile = roomInfoList[0].iceMobile;
        this.Vue.data.iceRelation = roomInfoList[0].iceRelation;
      }

      for (var i = 0; i < roomInfoList.length; i++) {
        var mycustomerInfoList = [];
  
        if (roomInfoList[i].customerInfoList.length > 0) {
          // 计算以入住的人数
          lavePeopleNum += roomInfoList[i].customerInfoList.length;
  
          for (var j = 0; j < roomInfoList[i].customerInfoList.length; j++) {
            var temCustomerInfoList = JSON.parse(JSON.stringify(roomInfoList[i].customerInfoList[j]));
  
            temCustomerInfoList.id = j;
            mycustomerInfoList.push(temCustomerInfoList);
          }
        }
  
        roomList.push({
          'id': i,
          'infoId': roomInfoList[i].infoId,
          'roomId': roomInfoList[i].roomId,
          'name': ('房间' + (i + 1)),
          'bedType': roomInfoList[i].bedType,
          'bedOptions': utilities.renderBedOptions(data.template),
          'iceEmail': roomInfoList[i].iceEmail,
          'iceMobile': roomInfoList[i].iceMobile,
          'iceName': roomInfoList[i].iceName,
          'iceRelation': roomInfoList[i].iceRelation,
          'customerInfoList': mycustomerInfoList
        })
      }
    }
    
    this.Vue.data.peopleNum = data.peopleNum;
    this.Vue.data.lavePeopleNum = lavePeopleNum;
    this.Vue.data.roomList = roomList;
  }
}  

var VuePart_4 = {
  'Vue': {
    'el': '#part4',

    'data': {
      'isShow': false,
      'template': null,
      'checked': false,
      'isFirst': null,
      'adminInfo': { 'name': '正在加载...', 'webchat': '正在加载...', 'qrimg': ''},
    },

    'methods': {
      toPrev: function () {
        this.isShow = false;
        Info.part_3.$data.isShow = true;
      },

      toNext: function () {
        if (!this.checked) {
          return alert('请同意相关条款');
        }

        var _this = this,
            loadingInstance = this.$loading({
              fullscreen: true,
              background: 'rgba(0, 0, 0, 0.74)',
              text: '正在提交...'
            });
        this.isShow = false;
        if (this.isFirst) {
          this.ajaxSubmit(Info.data)
          .then(function (val) {
            if (val.result == '0') {
              Info.part_5.$data.isSuccess = true;
              Info.part_5.$data.message = '您的信息已提交，并已邮件的形式通知客服!';
              Info.part_5.$data.reason = '请注意关注相关信息！谢谢！';
            } else if (val.result == '2') {
              Info.part_5.$data.isSuccess = false;
              Info.part_5.$data.message = '非常抱歉，该链接已经失效!';
              Info.part_5.$data.reason = val.message;
            } else if (val.result == '3') {
              Info.part_5.$data.isSuccess = false;
              Info.part_5.$data.message = '非常抱歉，无法进行数据修改!';
              Info.part_5.$data.reason = val.message;
            } else if (val.result == '100') {
              Info.part_5.$data.isSuccess = false;
              Info.part_5.$data.message = '非常抱歉，数据在提交时发生错误!';
              Info.part_5.$data.reason = '原因: ' + val.message;
            } else {
              Info.part_5.$data.isSuccess = false;
              Info.part_5.$data.message = '非常抱歉，服务器返回一个错误!';
              Info.part_5.$data.reason = '错误代码: ' + val.message;
            }
            loadingInstance.close();
            Info.part_5.$data.isShow = true;
          }).catch(function (error) { 
            Info.part_5.$data.isSuccess = false;
            Info.part_5.$data.message = '非常抱歉，数据在提交时发生错误!';
            Info.part_5.$data.reason = '原因: ' + error;
            loadingInstance.close();
            Info.part_5.$data.isShow = true;
          });
        } else {
          this.ajaxUpdate(Info.data)
            .then(function (val) {
              if (val.result == '0') {
                Info.part_5.$data.isSuccess = true;
                Info.part_5.$data.message = '恭喜你的信息提交成功!';
                Info.part_5.$data.reason = '';
              } else if (val.result == '2') {
                Info.part_5.$data.isSuccess = false;
                Info.part_5.$data.message = '非常抱歉，该链接已经失效!';
                Info.part_5.$data.reason = val.message;
              } else if (val.result == '3') {
                Info.part_5.$data.isSuccess = false;
                Info.part_5.$data.message = '非常抱歉，无法进行数据修改!';
                Info.part_5.$data.reason = val.message;
              } else if (val.result == '100') {
                Info.part_5.$data.isSuccess = false;
                Info.part_5.$data.message = '非常抱歉，数据在提交时发生错误!';
                Info.part_5.$data.reason = '原因: ' + val.message;
              } else {
                Info.part_5.$data.isSuccess = false;
                Info.part_5.$data.message = '非常抱歉，服务器返回一个错误!';
                Info.part_5.$data.reason = '错误代码: ' + val.message;
              }
              loadingInstance.close();
              Info.part_5.$data.isShow = true;
            }).catch(function (error) { 
              Info.part_5.$data.isSuccess = false;
              Info.part_5.$data.message = '非常抱歉，数据在提交时发生错误!';
              Info.part_5.$data.reason = '原因: ' + error;
              loadingInstance.close();
              Info.part_5.$data.isShow = true;
            });
        }
      },

      toTerms: function () {
        this.isShow = false;
        Info.part_1.$data.isShow = true;
        Info.part_1.$data.checked = this.checked;

        if (this.checked) {
          Info.data.isRead = 'Y';
        }
      },

      ajaxUpdate: function (data) {
        var uniqueKey = localStorage.getItem('_uniqueKey'),
            token = localStorage.getItem('_token'),
            digest = localStorage.getItem('_digest');
  
        return fetch(appConfig.version + '/gather/'+ uniqueKey +'/updateForm.do', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json; charset=utf-8',
            'token': token,
            'digest': digest
          },
          'body': JSON.stringify(data)
        }).then(
          function(response) {
            return response.json()
          }, function(error) {
            return { 'result': '100', 'message': error }
          }
        )
      },

      ajaxSubmit: function (data) {
        var uniqueKey = localStorage.getItem('_uniqueKey'),
            token = localStorage.getItem('_token'),
            digest = localStorage.getItem('_digest');
  
        return fetch(appConfig.version + '/gather/'+ uniqueKey +'/gather.do', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json; charset=utf-8',
            'token': token,
            'digest': digest
          },
          'body': JSON.stringify(data)
        }).then(
          function(response) {
            return response.json()
          }, function(error) {
            return { 'result': '100', 'message': error }
          }
        )
      }
    }

  },

  init: function (data, isFirst) {
    this.Vue.data.template = data.template;
    this.Vue.data.isFirst = isFirst;
    if (!isFirst) {
      this.Vue.data.checked = true;
      Info.data.isRead = 'Y';
    }

    return this.Vue;
  },
}

var VuePart_5 = {
  'el': '#part5',

  'data': {
    'isShow': false,
    'isSuccess': false,
    'message': '恭喜你信息提交成功!',
    'reason': '',
    'adminInfo': { 'name': '正在加载...', 'webchat': '正在加载...', 'qrimg': ''},
  },

  'methods': {
    showSuccessMessage: function () {
			location = "./view/index.html";
    },

    clipboard: function () {
      var _this = this;
      document.getElementById('clipboard').setAttribute(
        'data-clipboard-text',
        JSON.stringify(Info.data)
      );
      var clipboard = new Clipboard('#clipboard');

      clipboard.on('success', function(e) {
        _this.$message({
          message: '你已成功复制错误数据',
          type: 'success'
        });
        e.clearSelection();
      });
      
      clipboard.on('error', function(e) {
        _this.$message.error('复制错误数据失败');
      });
    },

    backtrack: function() {
      this.isShow = false;
      Info.part_2.$data.isShow = true;
    }
  }
}

var VueComponent = {
  init: function() {
    Vue.component('qr-code', qrCodeVue);
  }
}

var qrCodeVue = {
  'props': ['name', 'webchat', 'qrimg'],

  'template': [
    '<div class="QR-code">',
      '<div class="QR-person">行程负责人: {{name}}</div>',
      '<div class="QR-WeChat">',
        '{{name}}微信: {{webchat}}',
        '<div class="QR-WeChat-img">',
          '<img v-bind:src="qrimg" />',
        '</div>',
      '</div>',
    '</div>'
  ].join('')
}

// 工具类
var utilities = {
  renderBedOptions: function (template) {
    if (template === 1) { // 马达京
      return [
        {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床(仅园景房提供)'
        }, {
          'value': '蜜月大床',
          'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床，烛光晚餐)'
        }, {
          'value': '大床+单床',
          'label': '大床+单床'
        }, {
          'value': '双床+单床',
          'label': '双床+单床(仅园景房和半独立房提供)'
        },
      ]
    } else if (template === 2) { // 马布岛-----------水屋
      return [
        {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床'
        }, {
          'value': '大床+单床',
          'label': '大床+单床(联排不可选)'
        }, {
          'value': '双床+单床',
          'label': '双床+单床(联排不可选)'
        }, {
          'value': '大床+床垫',
          'label': '大床+床垫(只限联排房间)'
        }, {
          'value': '双床+床垫',
          'label': '双床+床垫(只限联排房间)'
        }, {
          'value': '蜜月大床',
          'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
        }
      ]
    } else if (template === 3) { // 卡帕莱
      return [
        {
          'value': '单床',
          'label': '单床(仅一人入住可能选)'
        }, {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床'
        }, {
          'value': '大床+单床',
          'label': '大床+单床'
        }, {
          'value': '双床+单床',
          'label': '双床+单床'
        }, {
          'value': '蜜月布置大床',
          'label': '蜜月布置大床(需要支付160马币/仅限入住当天)'
        }
      ]
    } else if (template === 4) { // 平台
      return [
        {
          'value': '单床',
          'label': '单床(仅限四人间选)'
        }, {
          'value': '双床',
          'label': '双床(二人间可选)'
        }, {
          'value': '大床',
          'label': '大床(二人间可选)'
        }
      ]
    } else if (template === 5) { // 邦邦岛------龙珠
      return [
        {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床(六角花园房不可选)'
        }, {
          'value': '蜜月大床',
          'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
        }, {
          'value': '大床+单床',
          'label': '大床+单床(六角花园房不可选)'
        }, {
          'value': '双床+单床',
          'label': '双床+单床(六角花园房不可选)'
        }
      ]
    } else if (template === 6) {// 马布岛-----------木屋
      return [
        {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床'
        }, {
          'value': '大床+单床',
          'label': '大床+单床(联排不可选)'
        }, {
          'value': '双床+单床',
          'label': '双床+单床(联排不可选)'
        }, {
          'value': '大床+床垫',
          'label': '大床+床垫(只限联排房间)'
        }, {
          'value': '双床+床垫',
          'label': '双床+床垫(只限联排房间)'
        }, {
          'value': '蜜月大床',
          'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
        }
      ]
    } else if (template === 7) { // 邦邦岛------白珍珠
      return [
        {
          'value': '双大床',
          'label': '双大床'
        }, {
          'value': '蜜月大床',
          'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
        }
      ]
    } else if (template === 8) { // 马布岛-----------婆罗
      return [
        {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床'
        }, {
          'value': '大床+单床',
          'label': '大床+单床'
        }, {
          'value': '双床+单床',
          'label': '双床+单床'
        }, {
          'value': '大床+床垫',
          'label': '大床+床垫'
        }, {
          'value': '双床+床垫',
          'label': '双床+床垫'
        }, {
          'value': '蜜月大床',
          'label': '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)'
        }
      ]
    } else if (template === 9) { // 兰卡央
      return [
        {
          'value': '单床',
          'label': '单床'
        }, {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床'
        }, {
          'value': '大床+单床',
          'label': '大床+单床'
        }, {
          'value': '双床+单床',
          'label': '双床+单床'
        }, {
          'value': '蜜月大床',
          'label': '蜜月布置大床(需要支付160马币/仅限入住当天)'
        }
      ]
    } else if (template === 11 || template === 12 || template === 13 || template === 14 ) { // 巴拉望地区度假村
      return [
        {
          'value': '随机安排',
          'label': '默认床型'
        }
      ]
    } else if (template === 15 ) { // 那本仙境棕榈度假庄园
      return [
        {
          'value': '两张大床',
          'label': '两张大床'
        }
      ]
    } else {
      return [
        {
          'value': '单床',
          'label': '单床'
        }, {
          'value': '大床',
          'label': '大床'
        }, {
          'value': '双床',
          'label': '双床'
        }
      ]
    }
  },

  getDateAccurateToDay: function () {
    var myDate = new Date();
    return Date.parse(new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()))
  },

  flighTimeToTimestamp: function (data) {
    if (!data) { return null }
    return data - this.getDateAccurateToDay() - 28800000;
  },

  timestampToFlighTime: function (data) {
    if (!data) { return null }
    return new Date(data + this.getDateAccurateToDay() + 28800000);
  },

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

  dateToAge: function (data) {
    return new Date().getFullYear() - new Date(data).getFullYear();
  },

  renderNationality: function () {
    return [
      {
        'value': 'CHINA',
        'label': '中国 CHINA'
      },
      {
        'value': 'HONGKONG-CHINA',
        'label': '中国-香港 HONGKONG-CHINA'
      },
      {
        'value': 'MACAU-CHINA',
        'label': '中国-澳门 MACAU-CHINA'
      },
      {
        'value': 'TAIWAN-CHINA',
        'label': '中国-台湾 TAIWAN-CHINA'
      },
      {
        'value': 'AMERICA',
        'label': '美国 AMERICA'
      },
      {
        'value': 'AUSTRALIA',
        'label': '澳大利亚 AUSTRALIA'
      },
      {
        'value': 'SINGAPORE',
        'label': '新加坡 SINGAPORE'
      },
      {
        'value': 'MALASIA',
        'label': '马来西亚 MALASIA'
      },
      {
        'value': 'ENGLAND',
        'label': '英国 ENGLAND'
      },
      {
        'value': 'SWEDEN',
        'label': '瑞典 SWEDEN'
      },
      {
        'value': 'PHILIPPINE',
        'label': '菲律宾 PHILIPPINE'
      },
      {
        'value': 'RUSSIA',
        'label': '俄罗斯 RUSSIA'
      },
      {
        'value': 'NETHERLANDS',
        'label': '荷兰 NETHERLANDS'
      },
      {
        'value': 'FRENCH',
        'label': '法国 FRENCH'
      }
    ]
  },

  saveInforData: function () {
    var tempData = {};
    tempData.time = Date.parse(new Date());
    tempData.data = Info.data;
    localStorage.setItem("Final_DATA", JSON.stringify(tempData));
  },

  getInforData: function () {
		var timeNow = Date.parse(new Date()),
			  mydataString = localStorage.getItem("Final_DATA");
		// 如果数据不存在
		if (!mydataString) {
			return false;
		}
		var mydata = JSON.parse(mydataString),
			dataTime = parseInt(mydata.time);
		// 如果数据超时
		if ( timeNow > (dataTime + 3600000) ) {
			this.clearInforData();
			return false;
		}else {
			return mydata.data;
		}
  },

  clearInforData: function () {
		localStorage.setItem("Final_DATA","");
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
}
