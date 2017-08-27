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
    // localStorage.setItem('_token','f8928b80-0f61-4b84-8465-c117c2e593e2');
    // localStorage.setItem('_digest','405fc83c-f9fa-4f1e-a83c-324b90b19edf');
    // localStorage.setItem('_uniqueKey','b5164e71-605a-4d3a-bf48-5d06311eaf92');

    if(process.env.NODE_ENV=="tesk") {
      localStorage.setItem('loginSuccessful',"'{'linkId':124,'uniqueKey':'9e6ccdf7-6aa8-4d2c-9476-cc3695e758dc','submitTime':null,'isLocked':'N','isComplete':'N','orderSn':'AK1232','orderName':'水上屋','orderDesc':'567890-=asdfasds','orderSrc':'TB','template':3,'roomNum':1,'adultNum':2,'childNum':0,'peopleNum':2,'checkIn':1505836800000,'checkOut':1506096000000,'productAmount':5000,'orderAmount':4500,'discount':500,'payAmount':1000,'notPayAmount':3500,'calMethod':'阿斯顿发收费的','createBy':33,'createTime':1503790739000,'updateBy':null,'updateTime':null,'infoId':null,'present':'1,2','insuranceBegin':1505836800000,'insuranceEnd':1506614400000,'userId':70,'payStatus':2,'operationStatus':0,'transfersInfo':'啊手动阀手动阀手动阀手动阀手动阀','isConfirmed':'N','confirmStatus':null,'signName':'镉污染','pinyinName':'Ge Wu Ran '}'");
      let router = "";
      let teskData = {};
      if (confirm("这是测试环境,请问你是第一次填写吗?")){
        teskData = {"adultNum":1,"calMethod":"4500","childNum":0,"orderDesc":"订单描述","payStatus":1,"productAmount":500,"flightNote":"","infoId":null,"isRead":"N","readTime":null,"orderSn":"2017082701","orderSrc":"TB","template":1,"orderName":"四人间","roomNum":1,"peopleNum":3,"checkIn":1507564800000,"checkOut":1507651200000,"orderAmount":4500,"discount":0,"payAmount":500,"notPayAmount":4000,"present":"","signName":null,"payAccount":null,"mobile":null,"email":null,"outboundNum":null,"landTime":null,"landDate":null,"inboundNum":null,"takeoffTime":null,"takeoffDate":null,"inHarbourNum":null,"hLandTime":null,"hLandDate":null,"outHarbourNum":null,"hTakeoffTime":null,"hTakeoffDate":null,"roomInfoList":[]};
        teskData.isRead = "N";
        teskData.template = 1;
        teskData.roomNum = 2;
        teskData.present = "";
        function newroomInfo() {
          let roomInfo = {"roomId":null,"iceName":null,"iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"infoId":null,"customerInfoList":[]};
          return roomInfo
        }
        for (let i = 0; i < 2; i++) {
          teskData.roomInfoList.push(newroomInfo());
        }
        _this.props.dispatch({type:'inti_infor',data:teskData});
        router = "/s1";
      }else {
        teskData = {"adultNum":1,"calMethod":"4500","childNum":0,"orderDesc":"订单描述","payStatus":1,"productAmount":500,"flightNote":"","infoId":1,"isRead":"Y","readTime":null,"orderSn":"2017082701","orderSrc":"TB","template":1,"orderName":"四人间","roomNum":2,"peopleNum":3,"checkIn":1507564800000,"checkOut":1507651200000,"orderAmount":4500,"discount":0,"payAmount":500,"notPayAmount":4000,"present":"","signName":null,"payAccount":null,"mobile":null,"email":null,"outboundNum":null,"landTime":null,"landDate":null,"inboundNum":null,"takeoffTime":null,"takeoffDate":null,"inHarbourNum":null,"hLandTime":null,"hLandDate":null,"outHarbourNum":null,"hTakeoffTime":null,"hTakeoffDate":null,"roomInfoList":[]};
        teskData.isRead = "Y";
        teskData.template = 1;
        teskData.roomNum = 2;
        teskData.present = "";
        function newroomInfo() {
          let roomInfo = {"roomId":null,"iceName":null,"iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"infoId":1,"customerInfoList":[]};
          return roomInfo
        }
        for (let i = 0; i < 2; i++) {
          teskData.roomInfoList.push(newroomInfo());
        }
        router = "/index";
      }
      _this.props.dispatch({type:'inti_infor',data:teskData});
      _this.props.router.push(router);
      return
    }
    let loginSuccessful = JSON.parse(localStorage.getItem('loginSuccessful'));
    // 获取并初始化数据
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
            "pinyinName":null,
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