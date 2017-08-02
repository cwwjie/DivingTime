import { connect } from 'react-redux'
import React from 'react';
import {} from 'antd-mobile';
import assign from 'lodash.assign'

import URL from './../method/URL.jsx';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:false
    };
  }
  componentWillMount(){
    let _this = this;
    // 检测浏览器
    if (examCheck() == false ) {
      _this.setState({
        error:true
      });
      return
    }

    /* 正式环境 */
    // let loginSuccessful = JSON.parse(localStorage.getItem('loginSuccessful'));

    /* 第一次 */
    // localStorage.setItem('_token','f8928b80-0f61-4b84-8465-c117c2e593e2');
    // localStorage.setItem('_digest','405fc83c-f9fa-4f1e-a83c-324b90b19edf');
    // localStorage.setItem('_uniqueKey','b5164e71-605a-4d3a-bf48-5d06311eaf92');
    // let loginSuccessful = {"linkId": 95,"uniqueKey": "b5164e71-605a-4d3a-bf48-5d06311eaf92","submitTime": null,"isLocked": "Y","isComplete": "N","orderSn": "201706291","orderName": "扫扫地","orderDesc": "撒旦法撒","orderSrc": "TB","template": 2,"roomNum": 1,"adultNum": 2,"childNum": 0,"peopleNum": 2,"checkIn": 1500652800000,"checkOut": 1500739200000,"productAmount": 12000,"orderAmount": 11800,"discount": 200,"payAmount": 500,"notPayAmount": 11300,"calMethod": "6000*2-200=11800元","createBy": 29,"createTime": 1498674860000,"updateBy": null,"updateTime": null,"infoId": null,"present": "","insuranceBegin": null,"insuranceEnd": null,"userId": 69,"payStatus": 2,"transfersInfo": "","isConfirmed": "N","confirmStatus": null};

    /* 第二次 */
    localStorage.setItem('_token',"f8928b80-0f61-4b84-8465-c117c2e593e2");
    localStorage.setItem('_digest',"405fc83c-f9fa-4f1e-a83c-324b90b19edf");
    localStorage.setItem('_uniqueKey',"32fb5446-c86a-4dee-b100-10ae40f8e36b");
    let loginSuccessful = {"linkId": 95,"uniqueKey": "b5164e71-605a-4d3a-bf48-5d06311eaf92","submitTime": null,"isLocked": "Y","isComplete": "N","orderSn": "201706291","orderName": "扫扫地","orderDesc": "撒旦法撒","orderSrc": "TB","template": 2,"roomNum": 1,"adultNum": 2,"childNum": 0,"peopleNum": 2,"checkIn": 1500652800000,"checkOut": 1500739200000,"productAmount": 12000,"orderAmount": 11800,"discount": 200,"payAmount": 500,"notPayAmount": 11300,"calMethod": "6000*2-200=11800元","createBy": 29,"createTime": 1498674860000,"updateBy": null,"updateTime": null,"infoId": null,"present": "","insuranceBegin": null,"insuranceEnd": null,"userId": 69,"payStatus": 2,"transfersInfo": "","isConfirmed": "N","confirmStatus": null};


    // 查询所有度假村图片
    fetch(
      URL.base + URL.version + "/gather/link/"+localStorage.getItem('_uniqueKey')+"/getGatherInfo.do",{
      method: 'GET',
      contentType: "application/json; charset=utf-8",
      headers:{
        token:localStorage.getItem('_token'),
        digest:localStorage.getItem('_digest')
      }
     }).then(function(response) {
      return response.json()
     }).then(function(json) {
      if (json.result=="0") {
        // 表示第一次填写
        if (!json.data) {
          // 初始化数据
          let _obj = {
            "adultNum":loginSuccessful.adultNum,
            "calMethod":loginSuccessful.calMethod,
            "childNum":loginSuccessful.childNum,
            "orderDesc":loginSuccessful.orderDesc,
            "payStatus":loginSuccessful.payStatus,
            "productAmount":loginSuccessful.productAmount,
            "flightNote":"",
            "infoId":loginSuccessful.infoId,
            "isRead":"N",
            "readTime":null,
            "orderSn":loginSuccessful.orderSn,
            "orderSrc":loginSuccessful.orderSrc,
            "template":loginSuccessful.template,
            "orderName":loginSuccessful.orderName,
            "roomNum":loginSuccessful.roomNum,
            "peopleNum":loginSuccessful.peopleNum,
            "checkIn":loginSuccessful.checkIn,
            "checkOut":loginSuccessful.checkOut,
            "orderAmount":loginSuccessful.orderAmount,
            "discount":loginSuccessful.discount,
            "payAmount":loginSuccessful.payAmount,
            "notPayAmount":loginSuccessful.notPayAmount,
            "present":loginSuccessful.present,
            "signName":null,
            "payAccount":null,
            "mobile":null,
            "email":null,
            "outboundNum":null,
            "landTime":null,
            "landDate":null,
            "inboundNum":null,
            "takeoffTime":null,
            "takeoffDate":null,
            "inHarbourNum":null,
            "hLandTime":null,
            "hLandDate":null,
            "outHarbourNum":null,
            "hTakeoffTime":null,
            "hTakeoffDate":null,
            "roomInfoList":[]
          };
          function newroomInfo() {
            let roomInfo = {"roomId":null,"iceName":null,"iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"infoId":null,"customerInfoList":[]};
            return roomInfo
          }
          for (let i = 0; i < loginSuccessful.roomNum; i++) {
            _obj.roomInfoList.push(newroomInfo());
          }
          _this.props.dispatch({type:'inti_infor',data:_obj});
          _this.props.router.push('/s1');

        // 表示已填写多次
        }else {
          _this.props.dispatch({type:'inti_infor',data:json.data});
          _this.props.router.push('/index');
        }

      // 表示加载失败
      }else {
        _this.setState({
          error:true
        });
        alert("信息收集初页面始化失败，原因:"+json.message);
      }
    })

  }
  render() {
    return (


      <div className="Toplayer">
        {(function(){
          if (this.state.error == true) {
            return "有误"
          }else {
            return this.props.children
          }
        }.bind(this))()}
      </div>


    );
  }
}



const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor
});

export default App = connect(
  mapStateToProps
)(App);



















function examCheck() {
  // 检测是否 safari 无痕模式
  function isLocalStorageSupported() {
      var testKey = 'test',
          storage = window.sessionStorage;
      try {
          storage.setItem(testKey, 'testValue');
          storage.removeItem(testKey);
          return true;
      } catch (error) {
          return false;
      }
  }
  if (isLocalStorageSupported() == false) {
    // 是 safari 无痕模式
    alert("非常抱歉，暂不支持此浏览器，我们将尽快解决此问题，请联系客服或更换您的浏览器。");
    return false
  }
  // 判断是否支持方法
  sessionStorage.setItem('sessionStorageStandby','1');
  if ( sessionStorage.getItem('sessionStorageStandby') == '1' ) {
    // 说明支持
  }else {
    // 说明不支持
    alert("非常抱歉，暂不支持此浏览器，我们将尽快解决此问题，请联系客服或更换您的浏览器。");
    return false
  }
  if (window.ActiveXObject || "ActiveXObject" in window) {
    if (confirm("检测到您的浏览器为IE内核，请问你需要继续浏览吗？(建议更换浏览器，否则可能会发生不可预知的错误)")) {
    }else {
      return false
    }
  }
}