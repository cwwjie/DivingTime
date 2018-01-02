import React from 'react';
import { connect } from 'react-redux';
import {Switch, DatePicker, InputItem, List, Picker, Toast, Modal} from 'antd-mobile';
import assign from 'lodash.assign';
import moment from 'moment';

import traveler from './../icon/traveler.png';
import dateTime from './../method/dateTime.jsx';
import pinYin from './../method/ChineseHelper.jsx';
import Autocomplete from './../method/Autocomplete.jsx';
import URL from './../method/URL.jsx';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

let minDate = new Date(-1041379200000);
minDate = dateTime.dateToFormat(minDate)+' +0800';
minDate = moment(minDate,'YYYY-MM-DD Z');

let maxDate = new Date();
maxDate = dateTime.dateToFormat(maxDate)+' +0800';
maxDate = moment(maxDate,'YYYY-MM-DD Z');


let NationaList = [
  {
    label: '中国 CHINA',
    value: 'CHINA'
  },
  {
    label: '中国-香港 HONGKONG-CHINA',
    value: 'HONGKONG CHINA'
  },
  {
    label: '中国-澳门 MACAU-CHINA',
    value: 'MACAU CHINA'
  },
  {
    label: '中国-台湾 TAIWAN-CHINA',
    value: 'TAIWAN CHINA'
  },
  {
    label: '美国 AMERICA',
    value: 'AMERICA'
  },
  {
    label: '新加坡 SINGAPORE',
    value: 'SINGAPORE'
  },
  {
    label: '马来西亚 MALASIA',
    value: 'MALASIA'
  },
  {
    label: '英国 ENGLAND',
    value: 'ENGLAND'
  },
  {
    label: '瑞典 SWEDEN',
    value: 'SWEDEN'
  },
  {
    label: '菲律宾 PHILIPPINE',
    value: 'PHILIPPINE'
  },
  {
    label: '俄罗斯 RUSSIA',
    value: 'RUSSIA'
  },
  {
    label: '荷兰 NETHERLANDS',
    value: 'NETHERLANDS'
  },
  {
    label: '法国 FRENCH',
    value: 'FRENCH'
  }
];
const diveList = [
  {
    label: '浮潜',
    value: "N"
  },
  {
    label: '深潜',
    value: "Y"
  }
];
const genderList = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
];
const divingList = [
  {
    label: 'OW',
    value: 1
  },
  {
    label: 'OW级以上',
    value: 2
  }
];

class customer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      next:false,
      "travelerType":'adult',//child adult

      "alert":"请填写相关信息",
      'NationaList': NationaList, // 国籍

      "passportNo":null,
      "nationality":null,
      "chineseName":null,
        chineseNameError:false,
        chineseNameErrorT:'中文名为必填',
      "pinyinName":null,
        pinyinNameError:false,
        pinyinNameErrorT:'中文名为必填',
      "gender":[1],
      "birthday":null,
      "mobile":null,
        mobileError:false,
        mobileErrorT:'中文名为必填',
      "email":null,
        emailError:false,
        emailErrorT:'中文名为必填',
        Autocomplete:false,
      "divePicker":["N"],
      "Dive":false, // 控制是否显示深潜列表
      "isDive":"N",// 是否深潜？ "N" "Y" 最终上传的数据
      "DiveName":'浮潜',
      "divingRank":[null],
      "divingCount":null,
      "lastDiveTime":null,
      "divingNo":null,
      "anamnesis":null,
    };
  }
  componentDidMount() {
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    if (this.props.room.roomID == null) {
      this.props.router.push('/s5');
      return
    }
    if (this.props.room.customerId == null) {
      this.props.router.push('/room');
      return
    }
    let _this = this,
      _date = assign({},this.state),
      roomId = this.props.room.roomID,
      customerId = this.props.room.customerId,
      customerInfo = this.props.infor.finaldata.roomInfoList[roomId].customerInfoList[customerId],
      allNum = 0,
      childNum = 0,
      adultNum = 0,
      allRoom = this.props.infor.finaldata.roomInfoList,
      MaxAdultNum = this.props.infor.finaldata.adultNum,
      MaxChildNum = this.props.infor.finaldata.childNum;

    for (let i = 0; i < allRoom.length; i++) {
      let thisRoomCustomerNum = allRoom[i].customerInfoList.length;
      allNum += thisRoomCustomerNum;
      for (let j = 0; j < thisRoomCustomerNum; j++) {
        let myCustomer = allRoom[i].customerInfoList[j];
        if (myCustomer.isKid == 'Y') {
          childNum++;
        }else {
          adultNum++;
        }
      }
    }
    // 如果成人与小孩都有余，就提问
    if ( childNum < MaxChildNum && adultNum < MaxAdultNum ) {
      alert('旅客类型', '请问您要添加成人还是小孩?', [
        { text: '小孩', onPress: function(){
          _this.setState({
            "travelerType":'child',
            "mobile":"",
            "email":""
          });
        } },
        { text: '成人', onPress: function(){
          _this.setState({"travelerType":'adult'});
        } },
      ]);
    // 如果小孩有余
    }else if (adultNum >= MaxAdultNum && childNum < MaxChildNum) {
      _date.travelerType = 'child';
      _date.mobile = this.props.infor.finaldata.mobile;
      _date.email = this.props.infor.finaldata.email;
    // 如果成人有余
    }else if (childNum >= MaxChildNum && adultNum < MaxAdultNum) {
      _date.travelerType = 'adult';
    // 如果都不是,默认成人
    }else {
      _date.travelerType = 'adult';
    }

    if (customerInfo == undefined) {
      // 表示是新增
    }else {
      // 否则是编辑
      _date.next = true;

      _date.passportNo = customerInfo.passportNo;
      let nationality = [];
      nationality.push(customerInfo.nationality);
      _date.nationality = nationality;
      _date.chineseName = customerInfo.chineseName;
      _date.pinyinName = customerInfo.pinyinName;
      let gender = [];
      gender.push(customerInfo.gender);
      _date.gender = gender;
      _date.birthday = stampToFormat(customerInfo.birthday);
      _date.mobile = customerInfo.mobile;
      _date.email = customerInfo.email;
       _date.isDive = customerInfo.isDive;
      if (customerInfo.isDive == "Y") {
        _date.DiveName = "深潜";
        _date.DivedivePicker = ["Y"];
        _date.Dive = true;
      }else {
        _date.DivedivePicker = ["N"];
        _date.Dive = false;
        _date.DiveName = "浮潜";
      }
      let divingRank = [];
      divingRank.push(customerInfo.divingRank);
      _date.divingRank = divingRank;
      _date.divingNo = customerInfo.divingNo;
      _date.divingCount = customerInfo.divingCount;
      if (customerInfo.lastDiveTime == null) {
        _date.lastDiveTime = customerInfo.lastDiveTime;
      }else {
        _date.lastDiveTime = stampToFormat(customerInfo.lastDiveTime);
      }
      _date.anamnesis = customerInfo.anamnesis;
    }
    this.setState(_date);

    this.getNationality().then(json => {
      if (json.result === '0') {
        _this.setState({ 'NationaList': json.data.codeList.map(val => ({
          'value': val.code,
          'label': val.codeName
        })) });
      } else {
        alert('加载国籍信息失败, 原因: ' + json.message);
      }
    })
  }

  getNationality() {
    return fetch(`${URL.base}${URL.version}/system/codetype/nationality/getWith.do`, {
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

  }


  render() {
    return (
      <div>
        <div className="NavTOP">
          <div
            onClick={function(){
              this.props.router.push('/room');
            }.bind(this)}
          >
          <div style={{
            width: '0.7rem',
            height: '0.7rem',
            background: 'url('+traveler+') center center /  0.4rem 0.4rem no-repeat' }}
          />
            <span  className="tipName">上一步</span>
          </div>
          <span>填写入住信息</span>
        </div>

        <div className="partroom">
          <List className="my-list">

            <InputItem
              type="text"
              placeholder="请输入护照号码"
              onChange={function(value){
                this.setState({
                  passportNo:value,
                });
              }.bind(this)}
              value={this.state.passportNo}
            >护照</InputItem>

            <Picker
              data={this.state.NationaList} cols={1} className="forss"
              value={this.state.nationality}
              title="请选择国籍"
              onChange={function(val){
                const _this = this;
                let _data = assign({},this.state);
                _data.nationality = val;
                this.setState(_data,()=>{verify(_this)});
              }.bind(this)}
            >
              <Item arrow="horizontal">国籍</Item>
            </Picker>

            <InputItem
              type="text"
              placeholder="请输入中文姓名"
              error={this.state.chineseNameError}
              onErrorClick={function(){
                Toast.fail(this.state.chineseNameErrorT, 1);
              }.bind(this)}
              onChange={function(value){
                const _this = this;
                let _data = assign({},this.state);
                _data.chineseName = value;
                if ( ( /^[\u4E00-\u9FA5]+$/.test( value ) ) == true ) {
                  _data.pinyinName = pinYin(value);
                }
                this.setState(_data,()=>{verify(_this)});
              }.bind(this)}
              value={this.state.chineseName}
            >姓名(中文)</InputItem>

            <InputItem
              type="text"
              placeholder="请输入姓名拼音"
              error={this.state.pinyinNameError}
              onErrorClick={function(){
                Toast.fail(this.state.pinyinNameErrorT, 1);
              }.bind(this)}
              onChange={function(value){
                const _this = this;
                let _data = assign({},this.state);
                _data.pinyinName = value;
                this.setState(_data,()=>{verify(_this)});
              }.bind(this)}
              value={this.state.pinyinName}
            >姓名(拼音)</InputItem>

            <Picker
              data={genderList} cols={1} className="forss"
              value={this.state.gender}
              title="请选择性别"
              onChange={function(val){
                console.log(val)
                const _this = this;
                let _data = assign({},this.state);
                _data.gender = val;
                this.setState(_data, ()=>{verify(_this)});
              }.bind(this)}
            >
              <Item arrow="horizontal">性别</Item>
            </Picker>

            <DatePicker
              mode="date"
              title="选择生日"
              extra="请选择"
              value={this.state.birthday}
              maxDate={maxDate}
              minDate={minDate}
              onChange={function(val){
                const _this = this;
                let _data = assign({},this.state);
                _data.birthday = val;
                this.setState(_data,()=>{verify(_this)});
              }.bind(this)}
            >
              <Item arrow="horizontal">生日</Item>
            </DatePicker>
            <div style={(function(){
              if (this.state.travelerType == 'child') {
                return {
                  'display':'none'
                }
              }else {
                return {
                  'display':'bolck'
                }
              }
            }.bind(this))()}>
              <InputItem
                type="number"
                placeholder="请输入手机/电话号码"
                error={this.state.mobileError}
                onErrorClick={function(){
                  Toast.fail(this.state.mobileErrorT, 1);
                }.bind(this)}
                onChange={function(value){
                  const _this = this;
                  let _data = assign({},this.state);
                  _data.mobile = value;
                  this.setState(_data,()=>{verify(_this)});
                }.bind(this)}
                value={this.state.mobile}
              >手机/电话</InputItem>

              <div style={{display: 'none'}}>
              <InputItem
                type="text"
                placeholder="请输入邮箱号码"
                error={this.state.emailError}
                onErrorClick={function(){
                  Toast.fail(this.state.emailErrorT, 1);
                }.bind(this)}
                onChange={function(value){
                  const _this = this;
                  let _data = assign({},this.state);
                  if (
                    !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ) ||
                    value == null ||
                    value == ""
                  ) {
                    _data.Autocomplete = true;
                  }else {
                    _data.Autocomplete = false;
                  }
                  _data.email = value;
                  this.setState(_data,()=>{verify(_this)});
                }.bind(this)}
                value={this.state.email}
              >邮箱</InputItem>

              <Autocomplete
                show={this.state.Autocomplete}
                onChange={function(val){
                  let _this = this;
                  let myEmail = this.state.email;
                  let stateDate = assign({},this.state);
                  stateDate.email = myEmail + val;
                  stateDate.Autocomplete = false;
                  if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(myEmail + val)) {
                    stateDate.emailError = false;
                    stateDate.emailErrorT = "";
                  }
                  this.setState(stateDate,()=>{
                    verify(_this);
                  });
                }.bind(this)}
              />
              </div>
            </div>

            <Picker
              data={diveList} cols={1} className="forss"
              value={this.state.divePicker}
              title="请选择套餐类型"
              onChange={function(val){
                if (val == "N") {
                  this.setState({
                    divePicker:["N"],
                    Dive:false,
                    isDive:"N"
                  });
                }else {
                  this.setState({
                    divePicker:["Y"],
                    Dive:true,
                    isDive:"Y"
                  });
                }
              }.bind(this)}
            >
              <Item arrow="horizontal">套餐类型</Item>
            </Picker>

            {(function(){
              if (this.state.Dive == true) {
                return <div>
                  <Picker
                    data={divingList} cols={1} className="forss"
                    value={this.state.divingRank}
                    title="请选择潜水级别"
                    onChange={function(val){
                      let _data = assign({},this.state);
                      _data.divingRank = val;
                      this.setState(_data)
                    }.bind(this)}
                  >
                    <Item arrow="horizontal">潜水级别</Item>
                  </Picker>

                  <InputItem
                    type="text"
                    placeholder="请输入潜水证号"
                    onChange={function(value){
                      this.setState({
                        divingNo:value,
                      });
                    }.bind(this)}
                    value={this.state.divingNo}
                  >潜水证号</InputItem>


                  <InputItem
                    type="text"
                    placeholder="请输入潜水次数"
                    onChange={function(value){
                      this.setState({
                        divingCount:value,
                      });
                    }.bind(this)}
                    value={this.state.divingCount}
                  >潜水次数</InputItem>

                  <DatePicker
                    mode="date"
                    title="选择潜水时间"
                    extra="请选择"
                    value={this.state.lastDiveTime}
                    maxDate={maxDate}
                    minDate={minDate}
                    onChange={function(val){
                      let _data = assign({},this.state);
                      _data.lastDiveTime = val;
                      this.setState(_data);
                    }.bind(this)}
                  >
                    <Item arrow="horizontal">上次潜水时间</Item>
                  </DatePicker>

                </div>
              }
            }.bind(this))()}
            <InputItem
              type="text"
              placeholder="无"
              onChange={function(value){
                this.setState({
                  anamnesis:value,
                });
              }.bind(this)}
              value={this.state.anamnesis}
            >以往病史</InputItem>
          </List>
        </div>

        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.next) {
              return <div className="NextPageActi" onClick={function(){
                let _data = assign({},_this.props.infor.finaldata);

                const roomId = _this.props.room.roomID;
                const customerId = _this.props.room.customerId;
                const roomInfor = _this.props.infor.finaldata.roomInfoList[roomId];
                let json = {};

                // 判断是否有 Id
                if (roomInfor.customerInfoList[customerId] == undefined) {
                  json.customerId = null;
                  json.roomId = null;
                }else {
                  json.customerId = _this.state.customerId;
                  json.roomId = _this.state.roomId;
                }
                if (_this.state.travelerType == 'child') {
                  json.isKid = 'Y';
                }else {
                  json.isKid = 'N';
                }

                json.passportNo = _this.state.passportNo;
                json.nationality = _this.state.nationality[0];
                json.chineseName = _this.state.chineseName;
                json.pinyinName = _this.state.pinyinName;
                json.gender = _this.state.gender[0];
                json.mobile = _this.state.mobile;
                json.email = _this.state.email;
                json.isDive = _this.state.isDive;
                json.divingRank = _this.state.divingRank[0];
                json.divingCount = _this.state.divingCount;
                json.divingNo = _this.state.divingNo;
                json.anamnesis = _this.state.anamnesis;

                json.birthday = dateTime.dateToFormat(_this.state.birthday._d);
                if (_this.state.lastDiveTime != null) {
                  json.lastDiveTime = Date.parse(_this.state.lastDiveTime._d);
                }else {
                  json.lastDiveTime = null;
                }

                if (roomInfor.customerInfoList[customerId] == undefined) {
                  _data.roomInfoList[roomId].customerInfoList.push(json);
                }else {
                  _data.roomInfoList[roomId].customerInfoList[customerId]=json;
                }

                Toast.loading('Loading...', 0.5, () => {
                  _this.props.dispatch({type:'change_infor',data:_data});
                  _this.props.dispatch({type:'ADD_livingNum',data:true}); // 入住人数 +1
                  _this.props.router.push('/room');
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                });
              }}>确认</div>
            }else {
              return <div className="NextPage" onClick={function(){
                verify(_this);
                Toast.fail(_this.state.alert, 1);
              }}
              >确认</div>
            }
          }.bind(this))()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor,
  room:state.reducer.room
});

export default customer = connect(
  mapStateToProps
)(customer);



function stampToFormat(stamp) {
  let FormatDate = dateTime.dateToMoment(new Date(stamp));
  let FormatMoment = moment(FormatDate,'YYYY-MM-DD HH:mm');
  return FormatMoment;
}

function verify(_this) {
  let _data = assign({},_this.state);
    _data.alert = "";
    _data.next = true;

    _data.chineseNameError = false;
    _data.chineseNameErrorT = "";

    _data.pinyinNameError = false;
    _data.pinyinNameErrorT = "";

    _data.mobileError = false;
    _data.mobileErrorT = "";

    _data.emailError = false;
    _data.emailErrorT = "";

  if (_this.state.nationality == null) {
    _data.alert = "国籍为必选";
    _data.next = false;
  }

  if ( ( /^[\u4E00-\u9FA5]+$/.test( _this.state.chineseName ) ) == false ) {
    _data.alert = "中文名称必须为中文输入";
    _data.chineseNameError = true;
    _data.chineseNameErrorT = "必须为中文";
    _data.next = false;
  }
  if ( _this.state.chineseName == null || _this.state.chineseName == "" ) {
    _data.alert = "中文名称不能为空";
    _data.chineseNameErrorT = "中文名称不能为空";
    _data.chineseNameError = true;
    _data.next = false;
  }

  if ( _this.state.pinyinName == null || _this.state.pinyinName == "" ) {
    _data.alert = "英文名称不能为空";
    _data.pinyinNameErrorT = "英文名称不能为空";
    _data.pinyinNameError = true;
    _data.next = false;
  }else {
    if ( _this.state.pinyinName.length >= 32 ) {
      _data.alert = "英文名称不能长于32位";
      _data.pinyinNameErrorT = "英文名称不能长于32位";
      _data.pinyinNameError = true;
      _data.next = false;
    }
  }

  if (Array.isArray(_this.state.gender)) {
    if (_this.state.gender[0] == null) {
      _data.alert = "性别不能为空";
      _data.next = false;
    }
  }

  if (_this.state.gender == null) {
    _data.alert = "性别不能为空";
    _data.next = false;
  }

  if (_this.state.birthday == null) {
    _data.alert = "生日不能为空";
    _data.next = false;
  }

  if (_this.state.travelerType == 'adult') {
    if (_this.state.mobile == null || _this.state.mobile == "" ) {
      _data.alert = "手机不能为空";
      _data.mobileError = true;
      _data.mobileErrorT = "手机不能为空";
      _data.next = false;
    }

    // if ( (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( _this.state.email ) ) == false ) {
    //   _data.alert = "邮箱格式错误";
    //   _data.emailError = true;
    //   _data.emailErrorT = "邮箱格式错误";
    //   _data.next = false;
    // }
    // if (_this.state.email == null || _this.state.email == "" ) {
    //   _data.alert = "邮箱不能为空";
    //   _data.emailError = true;
    //   _data.emailErrorT = "邮箱不能为空";
    //   _data.next = false;
    // }
  }
  _this.setState(_data);
}