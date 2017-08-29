import React from 'react';
import { connect } from 'react-redux';
import { Button, Accordion, Switch, DatePicker, InputItem, List, Picker, Toast} from 'antd-mobile';
import assign from 'lodash.assign';
import Immutable from 'immutable';
import moment from 'moment';

import traveler from './../icon/traveler.png';
import dateTime from './../method/dateTime.jsx';

const Item = List.Item;
const Brief = Item.Brief;

const bedTypeList = [{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '蜜月大床',value: '蜜月大床'}];
let bedTypeList1 = [{label: '大床',value: '大床'},{label: '双床(仅园景房提供)',value: '双床'},{label: '蜜月大床(需半年内结婚证申请/含免费花瓣铺床，烛光晚餐)',value: '蜜月大床'},{label: '大床+单床',value: '大床+单床'},{label: '大床+单床(仅园景房和半独立房提供)',value: '大床+单床'}];
let bedTypeList2 = [{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '大床+单床(联排不可选)',value: '大床+单床'},{label: '双床+单床(联排不可选',value: '双床+单床'},{label: '大床+床垫(只限联排房间)',value: '大床+床垫'},{label: '双床+床垫(只限联排房间)',value: '双床+床垫'},{label: '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)',value: '蜜月大床'}];
let bedTypeList3 = [{label: '单床(一人入住只能选)',value: '单床'},{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '大床+单床',value: '大床+单床'},{label: '双床+单床',value: '双床+单床'},{label: '布置大床(需要支付160马币/仅限入住当天)',value: '蜜月大床'}];
let bedTypeList4 = [{label: '单床(仅限四人间选)',value: '单床'},{label: '双床(二人间可选)',value: '双床'},{label: '大床(二人间可选)',value: '大床'}]
let bedTypeList5 = [{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)',value: '蜜月大床'},{label: '大床+单床',value: '大床+单床'},{label: '双床+单床',value: '双床+单床'}]
let bedTypeList6 = [{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)',value: '蜜月大床'},{label: '大床+单床',value: '大床+单床'},{label: '双床+单床',value: '双床+单床'}]
let bedTypeList7 = [{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)',value: '蜜月大床'},{label: '大床+单床',value: '大床+单床'},{label: '双床+单床',value: '双床+单床'}]
let bedTypeList8 = [{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '大床+单床',value: '大床+单床'},{label: '双床+单床',value: '双床+单床'},{label: '大床+床垫',value: '大床+床垫'},{label: '双床+床垫',value: '双床+床垫'},{label: '蜜月大床(需半年内结婚证申请/含免费花瓣铺床)',value: '蜜月大床'}]
let bedTypeList9 = [{label: '单床',value: '单床'},{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '大床+单床',value: '大床+单床'},{label: '双床+单床',value: '双床+单床'},{label: '蜜月布置大床(需要支付160马币/仅限入住当天)',value: '蜜月大床'}]
class room extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      next:false,
      allert:"",

      bedTypeList:[{label: '大床',value: '大床'},{label: '双床',value: '双床'},{label: '蜜月大床',value: '蜜月大床'}],
      bedType:null,

      customerRestNum:[null],

      customerInfoList:[
        {
          passportNo:null,
          nationality:"正在加载...",
          chineseName:"正在加载...",
          pinyinName:"正在加载...",
          gender:"正在加载...",
          mobile:"正在加载...",
          email:"正在加载...",
          isDive:"正在加载...",
          divingRank:null,
          divingCount:null,
          divingNo:null,
          lastDiveTime:0,
          birthday:0,
          anamnesis:null,
        },
      ]
    };
  }
  componentDidMount() {
    let _this = this;
    let _date = assign({},this.state);
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    if (this.props.room.roomID == null) {
      this.props.router.push('/s6');
      return
    }
    const roomId = this.props.room.roomID;
    let roomInfor = this.props.infor.finaldata.roomInfoList[roomId];

    // 初始化剩余人数
    // 剩余人数 = 所有人数 - 已入住人数;
    // PS: 每间房间至少入住1人 (除开自己房间
    let customerRestNum = [];
    if ( this.props.room.livingNum > (this.props.infor.finaldata.roomInfoList.length - 1)) {
      customerRestNum.push((this.props.infor.loaddata.peopleNum - this.props.room.livingNum));
    }else {
      customerRestNum.push((this.props.infor.loaddata.peopleNum - this.props.infor.finaldata.roomInfoList.length + 1));
    }
    _date.customerRestNum = customerRestNum;

    // 初始化床型
    if (this.props.infor.loaddata.template == 1) {
      _date.bedTypeList = bedTypeList1;
    }else if (this.props.infor.loaddata.template == 2) {
      _date.bedTypeList = bedTypeList2;
    }else if (this.props.infor.loaddata.template == 3) {
      _date.bedTypeList = bedTypeList3;
    }else if (this.props.infor.loaddata.template == 4) {
      _date.bedTypeList = bedTypeList4;
    }else if (this.props.infor.loaddata.template == 5) {
      _date.bedTypeList = bedTypeList5;
    }else if (this.props.infor.loaddata.template == 6) {
      _date.bedTypeList = bedTypeList6;
    }else if (this.props.infor.loaddata.template == 7) {
      _date.bedTypeList = bedTypeList7;
    }else if (this.props.infor.loaddata.template == 8) {
      _date.bedTypeList = bedTypeList8;
    }else if (this.props.infor.loaddata.template == 9) {
      _date.bedTypeList = bedTypeList9;
    }

    let bedType = [];
    if (roomInfor.bedType != null) {
      bedType.push(roomInfor.bedType);
      if (roomInfor.customerInfoList.length > 0) {
        _date.next = true;
      }
    }else {
      _date.allert = "床型为必选";
    }
    _date.bedType = bedType;

    // 初始化客人信息
    _date.customerInfoList = roomInfor.customerInfoList;

    this.setState(_date);
  }
  render() {
    return (
      <div>
        <div className="NavTOP">
          <div style={{
            width: '0.7rem',
            height: '0.7rem',
            background: 'url('+traveler+') center center /  0.4rem 0.4rem no-repeat' }}
            onClick={function(){
              this.props.router.push('/s6');
            }.bind(this)}
          />
          <span>填写入住信息</span>
        </div>

        <div className="partroom">

          <List renderHeader={() => '房间床型'} className="my-list">
            <Picker
              data={this.state.bedTypeList} cols={1} className="forss"
              value={this.state.bedType}
              title="请选床型"
              onChange={function(val){
                let _this = this;
                let _data = assign({},this.state);
                _data.bedType = val;

                // 判断是否能够进入下一步
                if (this.state.customerInfoList.length > 0) {
                  _data.next = true;
                }else {
                  _data.allert = "至少一位入住人信息";
                }
                // 上传床型
                let infor = assign({},this.props.infor.finaldata);
                const roomId = this.props.room.roomID;
                infor.roomInfoList[roomId].bedType = val[0];
                Toast.loading('Loading...', 0.5, () => {
                  _this.props.dispatch({type:'change_infor',data:infor});
                  _this.setState(_data);
                });
              }.bind(this)}
              >
              <Item arrow="horizontal">房间床型</Item>
            </Picker>
          </List>

          {this.state.customerRestNum.map(function(customerRestNum, elem) {
            let newInfoNum = this.state.customerInfoList.length;
            if ( customerRestNum > 0 ) {
              return <List renderHeader={() => '入住信息'} className="my-list">
                <div onClick={function(){
                    this.props.dispatch({type:'init_customerID',data:newInfoNum});
                    this.props.router.push('/customer');
                  }.bind(this)}>
                  <Item arrow="horizontal" extra={"还可入住"+customerRestNum+"人"}>
                    <Brief>新增入住信息</Brief>
                  </Item>
                </div>
              </List>
            }else {
              return <List renderHeader={() => '入住信息'} className="my-list">
                <div>
                  <Item arrow="horizontal" extra={"已住满"}>
                    <Brief>新增入住信息</Brief>
                  </Item>
                </div>
              </List>
            }
          }.bind(this))}
          {this.state.customerInfoList.map(function(index, elem) {
            let _this = this;

            // 数据进行初始化
            let passportNo = index.passportNo;
            if ( index.passportNo == null || index.passportNo == "" ) {
              passportNo =  "暂无"
            }

            let nationality = index.nationality;
            let chineseName = index.chineseName;
            let pinyinName = index.pinyinName;

            let gender = '';
            if ( index.gender == 1) {
              gender =  '男';
            }else {
              gender =  '女';
            }

            let mobile = index.mobile;
            let email = index.email;

            let isDive = "";
            if ( index.isDive == "Y") {
              isDive =  '深潜';
            }else {
              isDive =  '浮潜';
            }

            let divingRank = "";
            if ( index.divingRank == "" || index.divingRank == null ) {
              divingRank =  '暂无';
            }else {
              divingRank =  index.divingRank;
            }

            let divingCount = "";
            if ( index.divingCount == "" || index.divingCount == null ) {
              divingCount =  '暂无';
            }else {
              divingCount =  index.divingCount;
            }


            let divingNo = "";
            if ( index.divingNo == "" || index.divingNo == null ) {
              divingNo =  '暂无';
            }else {
              divingNo =  index.divingNo;
            }

            let lastDiveTime = '';
            if (index.lastDiveTime == null) {
              lastDiveTime = "暂无";
            }else {
              lastDiveTime = dateTime.stampToFormat(index.lastDiveTime);
            }

            let birthday = dateTime.stampToFormat(index.birthday);

            let anamnesis = '';
            if (index.anamnesis == null) {
              anamnesis = "暂无";
            }else {
              anamnesis = index.anamnesis;
            }

            return <Accordion className="my-accordion">
                <Accordion.Panel header={"旅客信息" + ( elem + 1 )}>
                  <div className="accordionLine"></div>
                  <div className="room">
                    <InputItem
                      value={passportNo}
                      editable={false}
                    >护照号</InputItem>
                    <InputItem
                      value={nationality}
                      editable={false}
                    >国籍</InputItem>
                    <InputItem
                      value={chineseName}
                      editable={false}
                    >姓名(中文)</InputItem>
                    <InputItem
                      value={pinyinName}
                      editable={false}
                    >姓名(拼音)</InputItem>
                    <InputItem
                      value={gender}
                      editable={false}
                    >性别</InputItem>
                    <InputItem
                      value={birthday}
                      editable={false}
                    >生日</InputItem>
                    <InputItem
                      value={mobile}
                      editable={false}
                    >手机(电话)</InputItem>
                    <InputItem
                      value={email}
                      editable={false}
                    >邮箱</InputItem>
                    <InputItem
                      value={isDive}
                      editable={false}
                    >是否深潜</InputItem>
                    <InputItem
                      value={divingNo}
                      editable={false}
                    >潜水证号</InputItem>
                    <InputItem
                      value={divingRank}
                      editable={false}
                    >潜水级别</InputItem>
                    <InputItem
                      value={divingCount}
                      editable={false}
                    >潜水次数</InputItem>
                    <InputItem
                      value={lastDiveTime}
                      editable={false}
                    >上次潜水</InputItem>
                    <InputItem
                      value={anamnesis}
                      editable={false}
                    >重大病史</InputItem>
                  </div>
                  <div className='roomBTN'>
                    <List>
                      <Item
                        extra={
                          <div className="BTN"><div><Button onClick={function(){
                            _this.props.dispatch({type:'init_customerID',data:elem});
                            _this.props.router.push('/customer');
                          }} style={{'marginRight':'5px'}} type="ghost" size="small" inline>编辑</Button><Button onClick={function(){
                            if(confirm("确认删除吗?")){
                              // 执行删除操作
                              let infor = assign({},this.props.infor.finaldata);
                              let _data = assign({},this.state);

                              const roomId = this.props.room.roomID;

                              let customerInforArray = Immutable.List(infor.roomInfoList[roomId].customerInfoList);
                              let newcustomerInforArray = customerInforArray.delete(elem).toArray();
                              infor.roomInfoList[roomId].customerInfoList = newcustomerInforArray;
                              _data.customerInfoList = newcustomerInforArray;

                              let customerRestNum = [];
                              customerRestNum.push( ( this.state.customerRestNum[0] + 1 ) );
                              _data.customerRestNum = customerRestNum;

                              Toast.loading('Loading...', 0.5, () => {
                                this.props.dispatch({type:'change_infor',data:infor});
                                this.props.dispatch({type:'CUT_livingNum',data:true}); // 入住人数 -1
                                this.setState(_data);
                              });
                            }
                          }.bind(this)}  style={{'marginRight':'5px'}} type="warning" size="small" inline>删除</Button></div></div>
                        }
                      >
                        编辑旅客信息
                      </Item>
                    </List>
                  </div>
                </Accordion.Panel>
              </Accordion>
          }.bind(this))}
          <div className="accordionLine"></div>

        </div>

        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.next) {
              return <div className="NextPageActi" onClick={function(){
                Toast.loading('Loading...', 0.5, () => {
                  _this.props.router.push('/s6');
                });
              }}>保存</div>
            }else {
              return <div className="NextPage" onClick={function(){
                Toast.fail(_this.state.allert, 1);
              }}>保存</div>
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

export default room = connect(
  mapStateToProps
)(room);



