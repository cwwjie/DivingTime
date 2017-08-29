import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Picker, InputItem, List, Card, WingBlank, WhiteSpace, Toast, ActivityIndicator } from 'antd-mobile';
import assign from 'lodash.assign';

import topicon from './../icon/order.png';
import hotel from './../icon/hotel.png';
import URL from './../method/URL.jsx';

const Item = List.Item;
const Brief = Item.Brief;
const RelationList = [{label: '兄弟姐妹',value: '兄弟姐妹'},{label: '父母',value: '父母'},{label: '夫妻',value: '夫妻'},{label: '朋友',value: '朋友'},{label: '其他',value: '其他'}];

class Stage6 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animating:false, // 提交的动画
      first:false,
      next:false,
      nextStepDesc: "",
      
      roomList:[
        {
          complete:false,
          bedType:null,
          customerNum:0,
        }
      ],
      completeRoomNum:0,
      customerRestDesc:'', // 还可入住 xx 人

      emergencyContact:"none", // 是否显示紧急联系人
      iceName:null,
        nameError: false,
        nameErrorDesc: "",
      iceRelation:null,
      iceMobile:null,
        mobileError: false,
        mobileErrorDesc: "",
      iceEmail:null,
        emailError: false,
        emailErrorDesc: "",
    };
  }
  componentDidMount() {
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    let _date = assign({},this.state);
    
    // 判断是否第一次
    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
    }

    // 初始化房间state
    let roomList = [];

    // 已完成房间的 数目
    let completeRoomNum = 0;

    // 初始化已入住人数
    let customerRestNum = 0;

    for (let i = 0; i < this.props.infor.loaddata.roomNum; i++) {

      // 判断房间是否填写?
      if (
        this.props.infor.finaldata.roomInfoList[i].bedType == null ||
        this.props.infor.finaldata.roomInfoList[i].customerInfoList.length < 1
      ) {
        roomList.push(initRoom(false,null,0));

      }else {
        completeRoomNum++;
        customerRestNum += this.props.infor.finaldata.roomInfoList[i].customerInfoList.length;
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
    this.props.dispatch({type:'init_livingNum',data:customerRestNum});
    _date.completeRoomNum = completeRoomNum;
    
    let tempRestNum = this.props.infor.loaddata.peopleNum - customerRestNum;
    if (tempRestNum > 0) {
      _date.customerRestDesc = '还可入住 0-' + ( this.props.infor.loaddata.peopleNum - customerRestNum ) + ' 人';
    }else {
      _date.customerRestDesc = '还可入住 0 人';
    }

    // 初始化紧急联系人
    if (this.props.infor.loaddata.template == 3) {
      let self = this;
      _date.emergencyContact = "block";
      _date.iceName = this.props.infor.finaldata.roomInfoList[0].iceName;
      if (this.props.infor.finaldata.roomInfoList[0].iceRelation == null) {
        _date.iceRelation = null;
      }else {
        let iceRelation = [];
        iceRelation.push(this.props.infor.finaldata.roomInfoList[0].iceRelation);
        _date.iceRelation = iceRelation;
      }
      _date.iceMobile = this.props.infor.finaldata.roomInfoList[0].iceMobile;
      _date.iceEmail = this.props.infor.finaldata.roomInfoList[0].iceEmail;
      // 上传 并且 判断是否可以下一步
      this.setState(_date,()=>{verifyData(self)});
    }else {
      // 上传 并且 判断是否可以下一步
      if (completeRoomNum == this.props.infor.loaddata.roomNum) {
        _date.next = true;
      }
      this.setState(_date);
    }
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
                            background: 'url(' + hotel + ') center center /  0.7rem 0.7rem no-repeat' }}
                          />
                        }
                        extra={<span>已完成</span>}
                      />
                      <Card.Body>
                        <div>床型: {_this.state.roomList[i].bedType}</div>
                        <div>旅客: {_this.state.roomList[i].customerNum}人</div>
                      </Card.Body>
                      <Card.Footer content={_this.state.customerRestDesc} extra={<div onClick={function(){
                        if (_this.props.infor.loaddata.template == 3) {
                          let inforData = assign({},_this.props.infor.finaldata);
                          for (let j = 0; j < inforData.roomInfoList.length; j++) {
                            inforData.roomInfoList[j].iceName = _this.state.iceName;
                            if (_this.state.iceRelation == null) {
                              inforData.roomInfoList[j].iceRelation = null;
                            }else {
                              inforData.roomInfoList[j].iceRelation = _this.state.iceRelation[0];
                            }
                            inforData.roomInfoList[j].iceMobile = _this.state.iceMobile;
                            inforData.roomInfoList[j].iceEmail = _this.state.iceEmail;
                          }
                          _this.props.dispatch({type:'change_infor',data:inforData});
                        }
                        _this.props.dispatch({type:'init_roomID',data:i});
                        _this.props.router.push('/room');
                      }} style={{'color':'#039be5'}}>点击补充信息</div>} />
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
                            background: 'url(' + hotel + ') center center /  0.7rem 0.7rem no-repeat' }}
                          />
                        }
                        extra={<span style={{'color':'#dd4a68'}}>待完成</span>}
                      />
                      <Card.Body>
                        <div>暂无信息</div>
                      </Card.Body>
                      <Card.Footer content={_this.state.customerRestDesc} extra={<div onClick={function(){
                        if (_this.props.infor.loaddata.template == 3) {
                          let inforData = assign({},_this.props.infor.finaldata);
                          for (let j = 0; j < inforData.roomInfoList.length; j++) {
                            inforData.roomInfoList[j].iceName = _this.state.iceName;
                            if (_this.state.iceRelation == null) {
                              inforData.roomInfoList[j].iceRelation = null;
                            }else {
                              inforData.roomInfoList[j].iceRelation = _this.state.iceRelation[0];
                            }
                            inforData.roomInfoList[j].iceMobile = _this.state.iceMobile;
                            inforData.roomInfoList[j].iceEmail = _this.state.iceEmail;
                          }
                          _this.props.dispatch({type:'change_infor',data:inforData});
                        }
                        _this.props.dispatch({type:'init_roomID',data:i});
                        _this.props.router.push('/room');
                      }} style={{'color':'#039be5'}}>点击补充信息</div>} />
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
                  Toast.fail(this.state.nameErrorDesc, 1);
                }.bind(this)}
                onChange={function(value){
                  let self = this;
                  this.setState(
                    {
                      iceName:value,
                    },()=>{
                      verifyData(self);
                    }
                  );
                }.bind(this)}
                value={this.state.iceName}
              >紧急联系人</InputItem>

              <Picker
                data={RelationList} cols={1} className="forss"
                value={this.state.iceRelation}
                title="请选关系"
                onChange={function(value){
                  let self = this;
                  this.setState(
                    {
                      iceRelation:value
                    },()=>{
                      verifyData(self);
                    }
                  );
                }.bind(this)}
              >
                <Item arrow="horizontal">紧急联系人关系</Item>
              </Picker>

              <InputItem
                type="number"
                placeholder="请输入紧急联系人手机/电话"
                error={this.state.mobileError}
                onErrorClick={function(){
                  Toast.fail(this.state.mobileErrorDesc, 1);
                }.bind(this)}
                onChange={function(value){
                  let self = this;
                  this.setState(
                    {
                      iceMobile:value
                    },()=>{
                      verifyData(self);
                    }
                  );
                }.bind(this)}
                value={this.state.iceMobile}
              >手机(电话)</InputItem>

              <InputItem
                type="text"
                placeholder="请输入紧急联系人邮箱"
                error={this.state.emailError}
                onErrorClick={function(){
                  Toast.fail(this.state.emailErrorDesc, 1);
                }.bind(this)}
                onChange={function(value){
                  let self = this;
                  this.setState(
                    {
                      iceEmail:value
                    },()=>{
                      verifyData(self);
                    }
                  );
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
                return <div className="submitContent">
                  <div className="subData" onClick={function(){
                    let finaldata = assign({},_this.props.infor.finaldata);
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
                  <div className="abanData" onClick={function(){
                    _this.props.router.push('/index');
                  }}>返回</div>
                </div>
            }else {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let inforData = assign({},_this.props.infor.finaldata);
                  for (let j = 0; j < inforData.roomInfoList.length; j++) {
                    inforData.roomInfoList[j].iceName = _this.state.iceName;
                    if (_this.state.iceRelation == null) {
                      inforData.roomInfoList[j].iceRelation = null;
                    }else {
                      inforData.roomInfoList[j].iceRelation = _this.state.iceRelation[0];
                    }
                    inforData.roomInfoList[j].iceMobile = _this.state.iceMobile;
                    inforData.roomInfoList[j].iceEmail = _this.state.iceEmail;
                  }
                  _this.props.dispatch({type:'change_infor',data:inforData});
                  Toast.loading('Loading...', 0.5, () => {
                    _this.props.router.push('/s7');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  });
                }}>下一步</div>
              }else {
                return <div className="NextPage" onClick={function(){
                  Toast.fail(_this.state.nextStepDesc, 1);
                }}>下一步</div>
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






function initRoom(complete,bedType,customerNum) {
  let oneRoom = {
    complete:complete,
    bedType:bedType,
    customerNum:customerNum,
  }
  return oneRoom
}

function verifyData(self) {
  let verifysuccess = true;
  let stateDate = assign({},self.state);
  if ( self.state.completeRoomNum != self.props.infor.loaddata.roomNum ) {
    verifysuccess = false;
    stateDate.nextStepDesc = "请补充房间信息"; 
  }
  if (self.state.iceName == null || self.state.iceName == "") {
    stateDate.nameError = true;
    stateDate.nameErrorDesc = "紧急联系人姓名不能为空";    
    stateDate.nextStepDesc = "紧急联系人姓名不能为空"; 
    verifysuccess = false;
  }else if (/^[\u4E00-\u9FA5]+$/.test(self.state.iceName) == false) {
    stateDate.nameError = true;
    stateDate.nameErrorDesc = "紧急联系人姓名必须为中文";    
    stateDate.nextStepDesc = "紧急联系人姓名必须为中文"; 
    verifysuccess = false;
  }else if (self.state.iceName.length >= 5 ) {
    stateDate.nameError = true;
    stateDate.nameErrorDesc = "紧急联系人姓名长度不能超过5位";    
    stateDate.nextStepDesc = "紧急联系人姓名长度不能超过5位"; 
    verifysuccess = false;
  }else {
    stateDate.nameError = false;
    stateDate.nameErrorDesc = "";   
  }

  if (self.state.iceRelation == null) {
    verifysuccess = false;
    stateDate.nextStepDesc = "紧急联系人关系为必选"; 
  }

  if (self.state.iceMobile == null || self.state.iceMobile == "") {
    stateDate.mobileError = true;
    stateDate.mobileErrorDesc = "紧急联系人手机不能为空";
    stateDate.nextStepDesc = "紧急联系人手机不能为空"; 
    verifysuccess = false;
  }else if (/^1[34578]\d{9}$/.test(self.state.iceMobile) == false) {
    stateDate.mobileError = true;
    stateDate.mobileErrorDesc = "紧急联系人手机格式不正确";
    stateDate.nextStepDesc = "紧急联系人手机格式不正确"; 
    verifysuccess = false;
  }else {
    stateDate.mobileError = false;
    stateDate.mobileErrorDesc = "";   
  }

  if (self.state.iceEmail == null || self.state.iceEmail == "") {
    stateDate.emailError = true;
    stateDate.emailErrorDesc = "紧急联系人邮箱不能为空";    
    stateDate.nextStepDesc = "紧急联系人邮箱不能为空"; 
    verifysuccess = false;
  }else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(self.state.iceEmail) == false) {
    stateDate.emailError = true;
    stateDate.emailErrorDesc = "紧急联系人邮箱格式不正确";    
    stateDate.nextStepDesc = "紧急联系人邮箱格式不正确"; 
    verifysuccess = false;
  }else {
    stateDate.emailError = false;
    stateDate.emailErrorDesc = "";   
  }

  if (verifysuccess == false) {
    stateDate.next = false;
  }else {
    stateDate.next = true;
  }
  self.setState(stateDate);
}
