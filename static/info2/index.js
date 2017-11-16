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
        document.getElementById('main').setAttribute('style', 'display: block;');
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
  'part_3': null,
  
  init: function () {
    this.part_1 = new Vue(VuePart_1.inti(this.isFirst));
    this.part_2 = new Vue(VuePart_2.inti(this.data, this.isFirst));
    this.part_3 = new Vue(VuePart_3.inti(this.data, this.isFirst));
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
          Info.part_2.$data.isShow = true;
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
      'isShow': true,

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
        'actionPT1': URLbase + URLversion + '/gather/attach/PT1/add.do',
        'actionPT2': URLbase + URLversion + '/gather/attach/PT2/add.do',
        'actionPT3': URLbase + URLversion + '/gather/attach/PT3/add.do',
        'actionPT4': URLbase + URLversion + '/gather/attach/PT4/add.do',
        'headers': {
          'token': localStorage.getItem('_token'),
          'digest': localStorage.getItem('_digest')
        },
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
                'url': URLbase + val.data.attachThumb
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
                'url': URLbase + attachmentList[i].attachThumb
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
                'url': URLbase + val.data.attachThumb
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
                'url': URLbase + attachmentList[i].attachThumb
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
                'url': URLbase + val.data.attachThumb
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
                'url': URLbase + attachmentList[i].attachThumb
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
                'url': URLbase + val.data.attachThumb
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
                'url': URLbase + attachmentList[i].attachThumb
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
        return fetch(URLbase + URLversion + '/gather/attach/'+ type +'/add.do', {
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
        return fetch(URLbase + URLversion + '/gather/attach/' + attachId + '/del.do', {
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
        if (!this.signName) {
          this.signNameError = '预定人姓名 不能为空';
          this.isSignNameError= true;
          this.$message({
            'message': '预定人姓名 不能为空',
            'type': 'warning'
          });
          return false
        }

        if (!this.pinyinName) {
          this.isPinyinNameError = '预定人拼音 不能为空';
          this.pinyinNameError= true;
          this.$message({
            'message': '预定人拼音 不能为空',
            'type': 'warning'
          });
          return false
        }

        if (!this.mobile) {
          this.mobileError = '手机号码 不能为空';
          this.isMobileError= true;
          this.$message({
            'message': '手机号码 不能为空',
            'type': 'warning'
          });
          return false
        }

        if (!this.email) {
          this.emailError = '手机号码 不能为空';
          this.isEmailError = true;
          this.$message({
            'message': '手机号码 不能为空',
            'type': 'warning'
          });
          return false
        }

        if (
          !this.isSignNameError ||
          !this.isPinyinNameError ||
          !this.isMobileError ||
          !this.isEmailError
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
        if (!this.checkErrors) { return }

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
      }
    }
  },

  inti: function (data, isFirst) {

    this.initOrderinfor(data);
    this.initExtra();
    this.Vue.data.template = data.template;

    var cycleLength = Math.floor((data.checkOut - data.checkIn)/86400000);
    this.Vue.data.flightinfor.checkIn = utilities.dateToYYYYMMDDFormat(new Date(data.checkIn));
    this.Vue.data.flightinfor.checkOut = utilities.dateToYYYYMMDDFormat(new Date(data.checkOut));
    this.Vue.data.flightinfor.cycleLength = '' + (cycleLength + 1) + '天' + cycleLength + '晚';

    if (isFirst) {

    } else {
      // 下单信息
      this.Vue.data.signName = data.signName;
      this.Vue.data.pinyinName = data.pinyinName;
      this.Vue.data.mobile = data.mobile;
      this.Vue.data.email = data.email;
      this.Vue.data.payAccount = data.payAccount;
      // 航班信息
      this.Vue.data.landDate = data.landDate;
      this.Vue.data.outboundNum = data.outboundNum;
      this.Vue.data.landTime = data.landTime;

      this.Vue.data.hLandDate = data.hLandDate;
      this.Vue.data.inHarbourNum = data.inHarbourNum;
      this.Vue.data.hLandTime = data.hLandTime;
      
      this.Vue.data.hTakeoffDate = data.hTakeoffDate;
      this.Vue.data.outHarbourNum = data.outHarbourNum;
      this.Vue.data.hTakeoffTime = data.hTakeoffTime;

      this.Vue.data.takeoffDate = data.takeoffDate;
      this.Vue.data.inboundNum = data.inboundNum;
      this.Vue.data.takeoffTime = data.takeoffTime;

      this.Vue.data.flightNote = data.flightNote;

      this.initAttachmentList(data);
    }
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
  },

  initAttachmentList: function(data) {
    if (data.template === 3) {
      this.Vue.data.annex.attachmentList = data.attachmentList;
      for (var i = 0; i < data.attachmentList.length; i++) {
        if (data.attachmentList[i] === 'PT1') {
          this.Vue.data.annex.fileListPT1 = [{
            'name': '出国航班机票截图',
            'url': URLbase + data.attachmentList[i].attachThumb
          }];
        } else if (data.attachmentList[i] === 'PT2') {
          this.Vue.data.annex.fileListPT2 = [{
            'name': '回国航班机票截图',
            'url': URLbase + data.attachmentList[i].attachThumb
          }];
        } else if (data.attachmentList[i] === 'PT3') {
          this.Vue.data.annex.fileListPT3 = [{
            'name': '到达斗湖航班机票截图',
            'url': URLbase + data.attachmentList[i].attachThumb
          }];
        } else if (data.attachmentList[i] === 'PT4') {
          this.Vue.data.annex.fileListPT4 = [{
            'name': '离开斗湖航班机票截图',
            'url': URLbase + data.attachmentList[i].attachThumb
          }];
        }
      }
    }
  }
};

var VuePart_3 = {
  inti: function() {

  }
}  

// 工具类
var utilities = {
  getDateAccurateToDay: function () {
    var myDate = new Date();
    return Date.parse(new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()))
  },

  flighTimeToTimestamp: function (data) {
    if (!data) { return null }
    return data - this.getDateAccurateToDay();
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
  }
}