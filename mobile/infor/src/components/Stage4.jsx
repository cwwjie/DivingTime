import React from 'react';
import { connect } from 'react-redux';
import assign from 'lodash.assign';
import {List, InputItem, Toast, ActivityIndicator} from 'antd-mobile';

import topicon from './../icon/order.png';
import URL from './../method/URL.jsx';

const Item = List.Item;
const Brief = Item.Brief;

class Stage4 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nameError: false,
      nameErrorT: "",

      phoneError: false,
      phoneErrorT: "",

      emailError: false,
      emailErrorT: "",


      signName:'',
      payAccount:'',
      mobile:'',
      email:'',

      animating:false,
      first:true,
      next:false,
    };
  }
  componentDidMount() {
    let _date = assign({},this.state);
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    // 第一次填写
    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
      // 第一次填写，但是有回退情况
      if (
        this.props.infor.finaldata.signName != null ||
        this.props.infor.finaldata.payAccount != null ||
        this.props.infor.finaldata.mobile != null ||
        this.props.infor.finaldata.email != null
      ) {
        _date.signName = this.props.infor.finaldata.signName;
        _date.payAccount = this.props.infor.finaldata.payAccount;
        _date.mobile = this.props.infor.finaldata.mobile;
        _date.email = this.props.infor.finaldata.email;
        _date.next = true;
      }
    // 不是第一次填写
    }else {
      _date.first = false;
      _date.signName = this.props.infor.finaldata.signName;
      _date.payAccount = this.props.infor.finaldata.payAccount;
      _date.mobile = this.props.infor.finaldata.mobile;
      _date.email = this.props.infor.finaldata.email;
      _date.next = true;
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
                // 说明没有特别赠送
                if (!this.props.infor.loaddata.present) {
                  this.props.router.push('/s2');
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }else {
                  this.props.router.push('/s3');
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
              }
            }.bind(this)}
          />
          <span>填写下单信息</span>
        </div>
        <div className="part4">
          <List renderHeader={() => '预订人姓名'}>
            <InputItem
              type="text"
              placeholder="请输入预定人的姓名"
              error={this.state.nameError}
              onErrorClick={function(){
                Toast.fail(this.state.nameErrorT, 1);
              }.bind(this)}
              onChange={function(value){
                let _this = this;
                let _date = assign({},this.state);
                if (value == "") {
                  _date.nameError = true;
                  _date.nameErrorT = "姓名为必填";
                }else {
                  _date.nameError = false;
                  _date.nameErrorT = "";
                }
                _date.signName = value;
                this.setState(_date,()=>{
                  verifyAll(_this);
                });
              }.bind(this)}
              value={this.state.signName}
            >姓名</InputItem>
          </List>
          <List renderHeader={() => '付款人账号'}>
            <InputItem
              type="text"
              placeholder="淘宝/支付宝/微信"
              onChange={function(value){
                this.setState({
                  payAccount:value,
                });
              }.bind(this)}
              value={this.state.payAccount}
            >账号</InputItem>
          </List>
          <List renderHeader={() => '预定人手机号码/电话'}>
            <InputItem
              type="number"
              placeholder="请输入预定人的手机号码/电话"
              error={this.state.phoneError}
              onErrorClick={function(){
                Toast.fail(this.state.phoneErrorT, 1);
              }.bind(this)}
              onChange={function(value){
                let _this = this;
                let _date = assign({},this.state);
                if (value == "") {
                  _date.phoneError = true;
                  _date.phoneErrorT = "电话为必填";
                }else if (/^[0-9]*$/.test(value) == false) {
                  _date.phoneError = true;
                  _date.phoneErrorT = "必须纯数字";
                }else {
                  _date.phoneError = false;
                  _date.phoneErrorT = "";
                }
                _date.mobile = value;
                this.setState(_date,()=>{
                  verifyAll(_this);
                });
              }.bind(this)}
              value={this.state.mobile}
            >手机电话</InputItem>
          </List>
          <List renderHeader={() => '预定人邮箱'}>
            <InputItem
              type="text"
              placeholder="请输入预定人的邮箱"
              error={this.state.emailError}
              onErrorClick={function(){
                Toast.fail(this.state.emailErrorT, 1);
              }.bind(this)}
              onChange={function(value){
                let _this = this;
                let _date = assign({},this.state);
                if (value == "") {
                  _date.emailError = true;
                  _date.emailErrorT = "邮箱为必填";
                }else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value) == false) {
                  _date.emailError = true;
                  _date.emailErrorT = "必须纯数字";
                }else {
                  _date.emailError = false;
                  _date.emailErrorT = "";
                }
                _date.email = value;
                this.setState(_date,()=>{
                  verifyAll(_this);
                });
              }.bind(this)}
              value={this.state.email}
            >邮箱</InputItem>
          </List>
        </div>
        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.first == true) {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let _data = assign({},_this.props.infor.finaldata);
                  _data.signName = _this.state.signName;
                  _data.payAccount = _this.state.payAccount;
                  _data.mobile = _this.state.mobile;
                  _data.email = _this.state.email;
                  _this.props.dispatch({type:'change_infor',data:_data});
                  Toast.loading('Loading...', 0.5, () => {
                    _this.props.router.push('/s5');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  });
                }}>下一步</div>
              }else {
                return <div className="NextPage" onClick={function(){
                  let _date = assign({},_this.state);
                  if( _this.state.nameError == false && _this.state.signName == "" ) {
                    _date.nameError = true;
                    _date.nameErrorT = '姓名为必填';
                  }
                  if( _this.state.phoneError == false && _this.state.mobile == "" ) {
                    _date.phoneError = true;
                    _date.phoneErrorT = '姓名为必填';
                  }
                  if( _this.state.emailError == false && _this.state.email == "" ) {
                    _date.emailError = true;
                    _date.emailErrorT = '姓名为必填';
                  }
                  _this.setState(_date);
                }}>下一步</div>
              }
            }else {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let inforDate = assign({},_this.props.infor.finaldata);
                  inforDate.signName = _this.state.signName;
                  inforDate.payAccount = _this.state.payAccount;
                  inforDate.mobile = _this.state.mobile;
                  inforDate.email = _this.state.email;

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
                      body:JSON.stringify(inforDate)
                     }).then(function(response) {
                      return response.json()
                     }).then(function(json) {
                      let _date = assign({},_this.state);
                      if (json.result == "0") {
                        _this.props.dispatch({type:'change_infor',data:inforDate});
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
                return <div className="NextPage" onClick={function(){
                  let _date = assign({},_this.state);
                  if( _this.state.nameError == false && _this.state.signName == "" ) {
                    _date.nameError = true;
                    _date.nameErrorT = '姓名为必填';
                  }
                  if( _this.state.phoneError == false && _this.state.mobile == "" ) {
                    _date.phoneError = true;
                    _date.phoneErrorT = '姓名为必填';
                  }
                  if( _this.state.emailError == false && _this.state.email == "" ) {
                    _date.emailError = true;
                    _date.emailErrorT = '姓名为必填';
                  }
                  _this.setState(_date);
                }}>保存</div>
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

export default Stage4 = connect(
  mapStateToProps
)(Stage4);








function verifyAll(_this) {
  if (
    _this.state.signName != "" &&
    _this.state.mobile != "" &&
    _this.state.email != "" &&
    _this.state.nameError == false &&
    _this.state.phoneError == false &&
    _this.state.emailError == false
  ) {
    _this.setState({next:true});
  }else {
    _this.setState({next:false});
  }
}

