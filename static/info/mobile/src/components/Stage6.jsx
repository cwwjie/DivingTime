import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Picker, InputItem, List, Card, WingBlank, WhiteSpace, Toast, ActivityIndicator } from 'antd-mobile';
import assign from 'lodash.assign';

import topicon from './../icon/order.png';
import hotel from './../icon/hotel.png';
import URL from './../method/URL.jsx';

const Item = List.Item;
const Brief = Item.Brief;
const RelationList = [
  {
    label: '兄弟姐妹',
    value: '兄弟姐妹'
  },
  {
    label: '父母',
    value: '父母'
  },
  {
    label: '夫妻',
    value: '夫妻'
  },
  {
    label: '朋友',
    value: '朋友'
  },
  {
    label: '其他',
    value: '其他'
  }
];

class Stage6 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animating:false,
      first:false,
      next:false,

      roomList:[
        {
          complete:false,
          bedType:null,
          customerNum:0,
        }
      ],
      customerRest:'',


      emergencyContact:"none",

      iceName:null,
        nameError:false,
        nameErrorT:'',
      iceRelation:null,
      iceMobile:null,
        mobileError:false,
        mobileErrorT:'',
      iceEmail:null,
        emailError:false,
        emailErrorT:'',

    };
  }
  componentDidMount() {
    let _date = assign({},this.state);
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }

    // 判断是否第一次
    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
    }

    // 初始化房间state
    let roomList = [];
    // 已完成数目
    let roomComplete = 0;
    // 初始化已入住人数
    let customerRest = 0;
    for (let i = 0; i < this.props.infor.loaddata.roomNum; i++) {

      if ( // 如果 room(未完成)
        this.props.infor.finaldata.roomInfoList[i].bedType == null ||
        this.props.infor.finaldata.roomInfoList[i].customerInfoList.length < 1
      ) {
        // 初始化 state
        roomList.push(initRoom(false,null,0));

      }else { // 如果 room(已完成)
        roomComplete++;
        customerRest += this.props.infor.finaldata.roomInfoList[i].customerInfoList.length;
        // 初始化 state
        roomList.push(
          initRoom(
            true,
            this.props.infor.finaldata.roomInfoList[i].bedType,
            this.props.infor.finaldata.roomInfoList[i].customerInfoList.length
          )
        );
      }
    }
    _date.roomList = roomList;

    // 上传已入住人数
    this.props.dispatch({type:'init_livingNum',data:customerRest});

    let customerRestNum = this.props.infor.loaddata.peopleNum - customerRest;
    if (customerRestNum > 0) {
      _date.customerRest = '还可入住 0-' + ( this.props.infor.loaddata.peopleNum - customerRest ) + ' 人';
    }else {
      _date.customerRest = '还可入住 0 人';
    }

    let iceName = this.props.infor.finaldata.roomInfoList[0].iceName;
    let iceRelation = this.props.infor.finaldata.roomInfoList[0].iceRelation;
    let iceMobile = this.props.infor.finaldata.roomInfoList[0].iceMobile;
    let iceEmail = this.props.infor.finaldata.roomInfoList[0].iceEmail;

    // 初始化紧急联系人

    _date.iceName = iceName;
    _date.iceRelation = iceRelation;
    _date.iceMobile = iceMobile;
    _date.iceEmail = iceEmail;

    if (this.props.infor.loaddata.template == 3) {
      _date.emergencyContact = "block";
      if (
        // 判断房间
        roomComplete == this.props.infor.loaddata.roomNum &&
        // 紧急联系人
        iceName != null &&
        iceName != "" &&
        /^[\u4E00-\u9FA5]+$/.test(iceName) == true &&
        iceName.length < 5 &&
        iceRelation != null &&
        iceMobile != null &&
        iceMobile != "" &&
        iceEmail != null &&
        iceEmail != "" &&
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(iceEmail) == true
      ) {
        _date.next = true;
      }
    }else {

      // 判断是否可以下一步
      if (roomComplete == this.props.infor.loaddata.roomNum) {
        _date.next = true;
      }

    }



    this.setState(_date);
  }
  render() {
    return (
      <div>
        <div className="NavTOP">
          <div style={{
            width: '0.7rem',
            height: '0.7rem',
            background: 'url('+topicon+') center center /  0.7rem 0.7rem no-repeat' }}
            onClick={function(){
              if (this.state.first == false) {
                this.props.router.push('/index');
              }else {
                this.props.router.push('/s5');
              }
            }.bind(this)}
          />
          <span>填写入住信息</span>
        </div>

        <div className="part6">

          {(function(){
            let _this = this;
            let roomLists = [];
            for (let i = 0; i < _this.state.roomList.length; i++) {
              if (_this.state.roomList[i].complete == true) {
                roomLists.push(
                  <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                      <Card.Header
                        title={<div style={{'paddingLeft':'5px'}}>房间{i}</div>}
                        thumb={
                          <div style={{
                            width: '0.7rem',
                            height: '0.7rem',
                            background: 'url('+hotel+') center center /  0.7rem 0.7rem no-repeat' }}
                          />
                        }
                        extra={<span>已完成</span>}
                      />
                      <Card.Body>
                        <div>床型: {_this.state.roomList[i].bedType}</div>
                        <div>旅客: {_this.state.roomList[i].customerNum}人</div>
                      </Card.Body>
                      <Card.Footer content={_this.state.customerRest} extra={<div onClick={function(){
                        let finaldata = assign({},_this.props.infor.finaldata);
                        for (let j = 0; j < _this.props.infor.finaldata.roomInfoList.length; j++) {
                          if (_this.state.nameError == false) {
                            finaldata.roomInfoList[j].iceName = _this.state.iceName;
                          }
                          finaldata.roomInfoList[j].iceRelation = _this.state.iceRelation;
                          if (_this.state.mobileError == false) {
                            finaldata.roomInfoList[j].iceMobile = _this.state.iceMobile;
                          }
                          if (_this.state.emailError == false) {
                            finaldata.roomInfoList[j].iceEmail = _this.state.iceEmail;
                          }
                        }
                        _this.props.dispatch({type:'change_infor',data:finaldata});
                        _this.props.dispatch({type:'init_roomID',data:i});
                        _this.props.router.push('/room');
                      }} style={{'color':'#039be5'}}>信息详情</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                  </WingBlank>
                );
              }else {
                roomLists.push(
                  <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                      <Card.Header
                        title={<div style={{'paddingLeft':'5px'}}>房间{i}</div>}
                        thumb={
                          <div style={{
                            width: '0.7rem',
                            height: '0.7rem',
                            background: 'url('+hotel+') center center /  0.7rem 0.7rem no-repeat' }}
                          />
                        }
                        extra={<span style={{'color':'#dd4a68'}}>待完成</span>}
                      />
                      <Card.Body>
                        <div>暂无信息</div>
                      </Card.Body>
                      <Card.Footer content={_this.state.customerRest} extra={<div onClick={function(){
                        let finaldata = assign({},_this.props.infor.finaldata);
                        for (let j = 0; j < _this.props.infor.finaldata.roomInfoList.length; j++) {
                          if (_this.state.nameError == false) {
                            finaldata.roomInfoList[j].iceName = _this.state.iceName;
                          }
                          finaldata.roomInfoList[j].iceRelation = _this.state.iceRelation;
                          if (_this.state.mobileError == false) {
                            finaldata.roomInfoList[j].iceMobile = _this.state.iceMobile;
                          }
                          if (_this.state.emailError == false) {
                            finaldata.roomInfoList[j].iceEmail = _this.state.iceEmail;
                          }
                        }
                        _this.props.dispatch({type:'change_infor',data:finaldata});
                        _this.props.dispatch({type:'init_roomID',data:i});
                        _this.props.router.push('/room');
                      }} style={{'color':'#039be5'}}>补充信息</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                  </WingBlank>
                );
              }
            }
            return roomLists
          }.bind(this))()}

          <div style={{"display":this.state.emergencyContact}}>
            <List renderHeader={() => '紧急联系人信息'} className="my-list">
              <InputItem
                type="text"
                placeholder="请输入紧急联系人姓名"
                error={this.state.nameError}
                onErrorClick={function(){
                  Toast.fail(this.state.nameErrorT, 1);
                }.bind(this)}
                onChange={function(value){
                  let _this = this;
                  let _data = assign({},_this.state);
                  _data.iceName = value;
                  _data.nameError = false;
                  _data.nameErrorT = '';
                  if (value == '' || value == null) {
                    _data.nameError = true;
                    _data.nameErrorT = '不能为空';
                  }else if (/^[\u4E00-\u9FA5]+$/.test(value) == false) {
                    _data.nameError = true;
                    _data.nameErrorT = '必须为中文';
                  }else if (value >= 5) {
                    _data.nameError = true;
                    _data.nameErrorT = '不能超出5个汉字';
                  }
                  _this.setState(_data,()=>{
                    verifyAll(_this);
                  });
                }.bind(this)}
                value={this.state.iceName}
              >紧急联系人</InputItem>

              <Picker
                data={RelationList} cols={1} className="forss"
                value={this.state.iceRelation}
                title="请选关系"
                onChange={function(val){
                  let _this = this;
                  let _data = assign({},_this.state);
                  _data.iceRelation = val;
                  _this.setState(_data,()=>{
                    verifyAll(_this);
                  })
                }.bind(this)}
              >
                <Item arrow="horizontal">紧急联系人关系</Item>
              </Picker>

              <InputItem
                type="number"
                placeholder="请输入紧急联系人手机/电话"
                error={this.state.mobileError}
                onErrorClick={function(){
                  Toast.fail(this.state.mobileErrorT, 1);
                }.bind(this)}
                onChange={function(value){
                  let _this = this;
                  let _data = assign({},_this.state);
                  _data.iceMobile = value;
                  _data.mobileError = false;
                  _data.mobileErrorT = '';
                  if (value == '' || value == null) {
                    _data.mobileError = true;
                    _data.mobileErrorT = '不能为空';
                  }
                  _this.setState(_data,()=>{
                    verifyAll(_this);
                  });
                }.bind(this)}
                value={this.state.iceMobile}
              >手机(电话)</InputItem>

              <InputItem
                type="text"
                placeholder="请输入紧急联系人邮箱"
                error={this.state.emailError}
                onErrorClick={function(){
                  Toast.fail(this.state.emailErrorT, 1);
                }.bind(this)}
                onChange={function(value){
                  let _this = this;
                  let _data = assign({},_this.state);
                  _data.iceEmail = value;
                  _data.emailError = false;
                  _data.emailErrorT = '';
                  if (value == '' || value == null) {
                    _data.emailError = true;
                    _data.emailErrorT = '不能为空';
                  }else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value) == false) {
                    _data.emailError = true;
                    _data.emailErrorT = '邮箱格式有误';
                  }
                  _this.setState(_data,()=>{
                    verifyAll(_this);
                  });
                }.bind(this)}
                value={this.state.iceEmail}
              >邮箱</InputItem>
            </List>
          </div>

        </div>

        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.first == false) {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let finaldata = assign({},_this.props.infor.finaldata);

                  // 紧急联系人
                  for (let j = 0; j < _this.props.infor.finaldata.roomInfoList.length; j++) {
                    if (_this.state.nameError == false) {
                      finaldata.roomInfoList[j].iceName = _this.state.iceName;
                    }
                    finaldata.roomInfoList[j].iceRelation = _this.state.iceRelation;
                    if (_this.state.mobileError == false) {
                      finaldata.roomInfoList[j].iceMobile = _this.state.iceMobile;
                    }
                    if (_this.state.emailError == false) {
                      finaldata.roomInfoList[j].iceEmail = _this.state.iceEmail;
                    }
                  }
                  // 提交信息
                  _this.setState({animating:true});
                  // 如果信息有改变则提交
                  if (true) {
                    fetch(
                      URL.base + URL.version + "/gather/"+localStorage.getItem('_uniqueKey')+"/updateForm.do",{
                      method: "POST",
                      headers:{
                        "Content-Type": "application/json; charset=utf-8",
                        'token':localStorage.getItem('_token'),
                        'digest':localStorage.getItem('_digest')
                      },
                      body:JSON.stringify(finaldata)
                     }).then(function(response) {
                      return response.json()
                     }).then(function(json) {
                      let _date = assign({},_this.state);
                      if (json.result == "0") {
                        _date.animating = false;
                      }else if (json.result == "2") {
                        _date.animating = false;
                        alert("非常抱歉，该链接已经失效");
                      }else if (json.result == "3") {
                        _date.animating = false;
                        alert("非常抱歉，无法进行数据修改");
                      }else {
                        _date.animating = false;
                        alert("发生未知错误:" + json.message);
                      }
                      _this.setState(_date);
                      _this.props.router.push('/index');
                      document.body.scrollTop = document.documentElement.scrollTop = 0;
                    });
                  }
                }}>保存</div>
              }else {
                return <div className="NextPage">保存</div>
              }
            }else {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let finaldata = assign({},_this.props.infor.finaldata);
                  for (let j = 0; j < _this.props.infor.finaldata.roomInfoList.length; j++) {
                    if (_this.state.nameError == false) {
                      finaldata.roomInfoList[j].iceName = _this.state.iceName;
                    }
                    finaldata.roomInfoList[j].iceRelation = _this.state.iceRelation;
                    if (_this.state.mobileError == false) {
                      finaldata.roomInfoList[j].iceMobile = _this.state.iceMobile;
                    }
                    if (_this.state.emailError == false) {
                      finaldata.roomInfoList[j].iceEmail = _this.state.iceEmail;
                    }
                  }
                  _this.props.dispatch({type:'change_infor',data:finaldata});
                  _this.props.router.push('/s7');
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }}>下一步</div>
              }else {
                return <div className="NextPage">下一步</div>
              }
            }
          }.bind(this))()}
        </div>
        <div className="toast-container">
          <div className="toast-example">
            <ActivityIndicator
              toast
              text="正在提交信息"
              animating={this.state.animating}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor
});

export default Stage6 = connect(
  mapStateToProps
)(Stage6);


function verifyAll(_this) {
  if (
    _this.state.iceName != null &&
    _this.state.iceName != "" &&
    /^[\u4E00-\u9FA5]+$/.test(_this.state.iceName) == true &&
    _this.state.iceName.length < 5 &&
    _this.state.iceRelation != null &&
    _this.state.iceMobile != null &&
    _this.state.iceMobile != "" &&
    _this.state.iceEmail != null &&
    _this.state.iceEmail != "" &&
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(_this.state.iceEmail) == true
  ) {
    _this.setState({next:true});
  }else {
    _this.setState({next:false});
  }
}



function initRoom(complete,bedType,customerNum) {
  let oneRoom = {
    complete:complete,
    bedType:bedType,
    customerNum:customerNum,
  }
  return oneRoom
}