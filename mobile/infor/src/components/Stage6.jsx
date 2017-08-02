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
      iceRelation:null,
      iceMobile:null,
      iceEmail:null,

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

    // 初始化紧急联系人
    if (this.props.infor.loaddata.template == 3) {
      _date.emergencyContact = "block";
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
                        _this.props.dispatch({type:'init_roomID',data:i});
                        _this.props.router.push('/room');
                      }} style={{'color':'#039be5'}}>补充信息</div>} />
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
                onChange={function(value){
                  this.setState({
                    iceName:value,
                  });
                }.bind(this)}
                value={this.state.iceName}
              >紧急联系人</InputItem>

              <Picker
                data={RelationList} cols={1} className="forss"
                value={this.state.iceRelation}
                title="请选关系"
                onChange={function(val){
                  let _data = assign({},this.state);
                  _data.iceRelation = val;
                  this.setState(_data)
                }.bind(this)}
              >
                <Item arrow="horizontal">紧急联系人关系</Item>
              </Picker>

              <InputItem
                type="text"
                placeholder="请输入紧急联系人手机/电话"
                onChange={function(value){
                  this.setState({
                    iceMobile:value,
                  });
                }.bind(this)}
                value={this.state.iceMobile}
              >手机(电话)</InputItem>

              <InputItem
                type="text"
                placeholder="请输入紧急联系人邮箱"
                onChange={function(value){
                  this.setState({
                    iceEmail:value,
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
                return <div className="NextPageActi" onClick={function(){
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
            }else {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
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






function initRoom(complete,bedType,customerNum) {
  let oneRoom = {
    complete:complete,
    bedType:bedType,
    customerNum:customerNum,
  }
  return oneRoom
}