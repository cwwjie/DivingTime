import React from 'react';
import { connect } from 'react-redux';
import {Accordion, List} from 'antd-mobile';
import assign from 'lodash.assign';

import topicon from './../icon/order.png';
import dateTime from './../method/dateTime.jsx';

const Item = List.Item;
const Brief = Item.Brief;


class Stage2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first:false,
      next:true,
      orderName:"正在加载...",
      orderSn:"正在加载...",
      payStatus:"正在加载...",
      roomNum:"正在加载...",
      peopleNum:"正在加载...",
      adultNum:"正在加载...",
      childNum:"正在加载...",
      checkIn:"正在加载...",
      checkOut:"正在加载...",
      cycleLength:"正在加载...",
      productAmount:"正在加载...",
      discount:"正在加载...",
      orderAmount:"正在加载...",
      calMethod:"正在加载...",
      payAmount:"正在加载...",
      notPayAmount:"正在加载...",
    };
  }
  componentDidMount() {
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    let _date = assign({},this.state);
    // 第一次填写
    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
    }else {
      _date.first = false;
    }

    // 套餐名称
    _date.orderName = this.props.infor.loaddata.orderName;
    // 订单号
    _date.orderSn = this.props.infor.loaddata.orderSn;
    // 订单状态
    let payStatus = '';
    if (this.props.infor.loaddata.payStatus == 1) {
      payStatus = "已付全款";
    }else {
      payStatus = "已付定金";
    }
    _date.payStatus = payStatus;
    // 房间数
    _date.roomNum = this.props.infor.loaddata.roomNum;
    // 总人数
    _date.peopleNum = this.props.infor.loaddata.peopleNum;
    // 成人数
    _date.adultNum = this.props.infor.loaddata.adultNum;
    // 儿童数
    _date.childNum = this.props.infor.loaddata.childNum;
    // 入住日期
    _date.checkIn = dateTime.stampToFormat(this.props.infor.loaddata.checkIn);
    // 退房日期
    _date.checkOut = dateTime.stampToFormat(this.props.infor.loaddata.checkOut);
    // 几天几晚
    const cycleLength = Math.floor((this.props.infor.loaddata.checkOut - this.props.infor.loaddata.checkIn)/86400000);
    _date.cycleLength = (cycleLength+1)+'天'+cycleLength+'晚';
    // 产品金额
    _date.productAmount = this.props.infor.loaddata.productAmount;
    // 优惠金额
    _date.discount = this.props.infor.loaddata.discount;
    // 订单总金额
    _date.orderAmount = this.props.infor.loaddata.orderAmount;
    // 计算方式
    _date.calMethod = this.props.infor.loaddata.calMethod;
    // 已付金额
    _date.payAmount = this.props.infor.loaddata.payAmount;
    // 未付金额
    _date.notPayAmount = this.props.infor.loaddata.notPayAmount;

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
                this.props.router.push('/s1');
              }
            }.bind(this)}
          />
          <span>订单</span>
        </div>
        <div className="part2">

          <List className="my-list">
            <Item>套餐名称<Brief>{this.state.orderName}</Brief></Item>
            <Item extra={this.state.orderSn}>订单号</Item>
            <Item extra={this.state.payStatus}>付款状态</Item>
          </List>

          <div className="interval"></div>
          <div className="Accordion">
            <Accordion className="my-accordion">
              <Accordion.Panel header="人员数量">
                <div className="List">
                  <List className="my-list">
                    <Item extra={this.state.roomNum}>房间数</Item>
                    <Item extra={this.state.peopleNum}>总人数</Item>
                    <Item extra={this.state.adultNum}>成人数</Item>
                    <Item extra={this.state.childNum}>儿童数</Item>
                  </List>
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>

          <div className="interval"></div>
          <div className="Accordion">
            <Accordion className="my-accordion">
              <Accordion.Panel header="时间周期">
                <div className="List">
                  <List className="my-list">
                    <Item extra={this.state.checkIn}>入住日期</Item>
                    <Item extra={this.state.checkOut}>退房日期</Item>
                    <Item extra={this.state.cycleLength}>周期长度</Item>
                  </List>
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>

          <div className="interval"></div>
          <div className="Accordion">
            <Accordion className="my-accordion">
              <Accordion.Panel header="详细金额">
                <div className="List">
                  <List className="my-list">
                    <Item extra={this.state.productAmount}>产品金额</Item>
                    <Item extra={this.state.discount}>优惠金额</Item>
                    <Item extra={this.state.orderAmount}>订单总额</Item>
                    <Item>计算方式<Brief>{this.state.calMethod}</Brief></Item>
                    <Item extra={this.state.payAmount}>已付金额</Item>
                    <Item extra={this.state.notPayAmount}>未付金额</Item>
                  </List>
                </div>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.first) {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  // 说明没有特别赠送
                  if (!_this.props.infor.loaddata.present) {
                    _this.props.router.push('/s4');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  }else {
                    _this.props.router.push('/s3');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  }
                }}>下一步</div>
              }else {
                return <div className="NextPage">下一步</div>
              }
            }else {
              return <div className="NextPageActi" onClick={function(){
                _this.props.router.push('/index');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }}>返回</div>
            }
          }.bind(this))()}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor
});

export default Stage2 = connect(
  mapStateToProps
)(Stage2);

