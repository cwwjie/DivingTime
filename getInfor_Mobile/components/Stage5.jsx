import React from 'react';
import { connect } from 'react-redux';
import {Accordion, List, InputItem, Toast, DatePicker, ActivityIndicator} from 'antd-mobile';
import assign from 'lodash.assign';
import moment from 'moment';

import topicon from './../icon/order.png';
import dateTime from './../method/dateTime.jsx';
import URL from './../method/URL.jsx';

const Item = List.Item;
const Brief = Item.Brief;


let minDate = new Date();
minDate = dateTime.dateToFormat(minDate)+' +0800';
const _minDate = moment(minDate,'YYYY-MM-DD Z');



class Stage5 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      template:3,

      animating:false,
      first:true,
      next:true,

      checkIn:"正在加载...",
      checkOut:"正在加载...",
      cycleLength:"正在加载...",

      // 马来西亚抵达航班
      disOutbound:"block",
      outboundNum:"",
      landDate:null,
      landTime:null,

      // 斗湖抵达航班
      inHarbourNum:"",
      hLandDate:null,
      hLandTime:null,

      // 斗湖离开航班
      outHarbourNum:"",
      hTakeoffDate:null,
      hTakeoffTime:null,

      // 马来西亚离开航班
      disInbound:"block",
      inboundNum:"",
      takeoffDate:null,
      takeoffTime:null,
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

    // 初始化模板
    _date.template = this.props.infor.loaddata.template;

    // 判断模板 只有 2 个 航班
    if (
      this.props.infor.loaddata.template == 1 ||
      this.props.infor.loaddata.template == 2 ||
      this.props.infor.loaddata.template == 4 ||
      this.props.infor.loaddata.template == 5 ||
      this.props.infor.loaddata.template == 6 ||
      this.props.infor.loaddata.template == 7 ||
      this.props.infor.loaddata.template == 8
    ) {
      _date.disOutbound = "none";
      _date.disInbound = "none";
    }

    // 上岛日期
    _date.checkIn = dateTime.stampToFormat(this.props.infor.loaddata.checkIn);
    // 离岛日期
    _date.checkOut = dateTime.stampToFormat(this.props.infor.loaddata.checkOut);

    // 几天几晚
    const cycleLength = Math.floor((this.props.infor.loaddata.checkOut - this.props.infor.loaddata.checkIn)/86400000);
    _date.cycleLength = (cycleLength+1)+'天'+cycleLength+'晚';


    let today = new Date();
    let birtoday = Date.parse( new Date( today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0 ) );

    // 马来西亚抵达航班
    _date.outboundNum = this.props.infor.finaldata.outboundNum;
    if ( this.props.infor.finaldata.landDate != null ) {
      _date.landDate = stampToFormat(this.props.infor.finaldata.landDate);
    }
    if ( this.props.infor.finaldata.landTime != null ) {
      let landTime = this.props.infor.finaldata.landTime + birtoday + 28800000;
      _date.landTime = stampToFormat(landTime);
    }


    // 斗湖抵达航班
    _date.inHarbourNum = this.props.infor.finaldata.inHarbourNum;
    if ( this.props.infor.finaldata.hLandDate != null ) {
      _date.hLandDate = stampToFormat(this.props.infor.finaldata.hLandDate);
    }
    if ( this.props.infor.finaldata.hLandTime != null ) {
      let hLandTime = this.props.infor.finaldata.hLandTime + birtoday + 28800000;
      _date.hLandTime = stampToFormat(hLandTime);
    }


    // 斗湖离开航班
    _date.outHarbourNum = this.props.infor.finaldata.outHarbourNum;
    if ( this.props.infor.finaldata.hTakeoffDate != null ) {
      _date.hTakeoffDate = stampToFormat(this.props.infor.finaldata.hTakeoffDate);
    }
    if ( this.props.infor.finaldata.hTakeoffTime != null ) {
      let hTakeoffTime = this.props.infor.finaldata.hTakeoffTime + birtoday + 28800000;
      _date.hTakeoffTime = stampToFormat(hTakeoffTime);
    }


    // 马来西亚离开航班
    _date.inboundNum = this.props.infor.finaldata.inboundNum;
    if ( this.props.infor.finaldata.takeoffDate != null ) {
      _date.takeoffDate = stampToFormat(this.props.infor.finaldata.takeoffDate);
    }
    if ( this.props.infor.finaldata.takeoffTime != null ) {
      let takeoffTime = this.props.infor.finaldata.takeoffTime + birtoday + 28800000;
      _date.takeoffTime = stampToFormat(takeoffTime);
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
              if (this.state.first) {
                this.props.router.push('/s4');
              }else {
                this.props.router.push('/index');
              }
            }.bind(this)}
          />
          <span>完善航班信息</span>
        </div>
        <div className="part5">

          <List renderHeader={() => '行程套餐'} className="my-list">
            <Item extra={this.state.checkIn}>上岛日期</Item>
            <Item extra={this.state.checkOut}>离岛日期</Item>
            <Item extra={this.state.cycleLength}>周期长度</Item>
          </List>

          <div style={{"display":this.state.disOutbound}}>
            <List renderHeader={() => '马来西亚抵达航班'} className="my-list">
              <InputItem
                type="text"
                placeholder="请输入航班号"
                onChange={function(value){
                  this.setState({
                    outboundNum:value,
                  });
                }.bind(this)}
                value={this.state.outboundNum}
              >抵达航班号</InputItem>
              <DatePicker
                mode="date"
                title="选择抵达日期"
                extra="请选择"
                value={this.state.landDate}
                minDate={_minDate}
                onChange={function(val){
                  let _data = assign({},this.state);
                  _data.landDate = val;
                  this.setState(_data)
                }.bind(this)}
              >
                <Item arrow="horizontal">抵达日期</Item>
              </DatePicker>
              <DatePicker
                mode="time"
                value={this.state.landTime}
                minuteStep={5}
                onChange={function(val){
                  let _data = assign({},this.state);
                  _data.landTime = val;
                  this.setState(_data)
                }.bind(this)}
              >
                <List.Item arrow="horizontal">抵达时间</List.Item>
              </DatePicker>
            </List>
          </div>

          <List renderHeader={() => '斗湖抵达航班'} className="my-list">
            <InputItem
              type="text"
              placeholder="请输入航班号"
              onChange={function(value){
                this.setState({
                  inHarbourNum:value,
                });
              }.bind(this)}
              value={this.state.inHarbourNum}
            >抵达航班号</InputItem>
            <DatePicker
              mode="date"
              title="选择抵达日期"
              extra="请选择"
              value={this.state.hLandDate}
              minDate={_minDate}
              onChange={function(val){
                let _data = assign({},this.state);
                _data.hLandDate = val;
                this.setState(_data)
              }.bind(this)}
            >
              <Item arrow="horizontal">抵达日期</Item>
            </DatePicker>
            <DatePicker
              mode="time"
              value={this.state.hLandTime}
              minuteStep={5}
              onChange={function(val){
                let _data = assign({},this.state);
                _data.hLandTime = val;
                this.setState(_data)
              }.bind(this)}
            >
              <List.Item arrow="horizontal">抵达时间</List.Item>
            </DatePicker>
          </List>

          <List renderHeader={() => '斗湖离开航班'} className="my-list">
            <InputItem
              type="text"
              placeholder="请输入航班号"
              onChange={function(value){
                this.setState({
                  outHarbourNum:value,
                });
              }.bind(this)}
              value={this.state.outHarbourNum}
            >离开航班号</InputItem>
            <DatePicker
              mode="date"
              title="选择离开日期"
              extra="请选择"
              value={this.state.hTakeoffDate}
              minDate={_minDate}
              onChange={function(val){
                let _data = assign({},this.state);
                _data.hTakeoffDate = val;
                this.setState(_data)
              }.bind(this)}
            >
              <Item arrow="horizontal">离开日期</Item>
            </DatePicker>
            <DatePicker
              mode="time"
              value={this.state.hTakeoffTime}
              minuteStep={5}
              onChange={function(val){
                let _data = assign({},this.state);
                _data.hTakeoffTime = val;
                this.setState(_data)
              }.bind(this)}
            >
              <List.Item arrow="horizontal">离开时间</List.Item>
            </DatePicker>
          </List>

          <div style={{"display":this.state.disInbound}}>
            <List renderHeader={() => '马来西亚离开航班'} className="my-list">
              <InputItem
                type="text"
                placeholder="请输入航班号"
                onChange={function(value){
                  this.setState({
                    inboundNum:value,
                  });
                }.bind(this)}
                value={this.state.inboundNum}
              >抵达航班号</InputItem>
              <DatePicker
                mode="date"
                title="选择离开日期"
                extra="请选择"
                value={this.state.takeoffDate}
                minDate={_minDate}
                onChange={function(val){
                  let _data = assign({},this.state);
                  _data.takeoffDate = val;
                  this.setState(_data)
                }.bind(this)}
              >
                <Item arrow="horizontal">离开日期</Item>
              </DatePicker>
              <DatePicker
                mode="time"
                value={this.state.takeoffTime}
                minuteStep={5}
                onChange={function(val){
                  let _data = assign({},this.state);
                  _data.takeoffTime = val;
                  this.setState(_data)
                }.bind(this)}
              >
                <List.Item arrow="horizontal">离开时间</List.Item>
              </DatePicker>
            </List>
          </div>






          {(function(){
            if (this.state.template == 1) {
              return <div>
                <div className="AccoAddtion">度假村接送时间</div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="斗湖机场--中转酒店">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 提前一天15：00前到达的航班仅接送至斗湖市区HERITAGE HOTEL（需提供预订码），或者送至仙本那的SEAFEST HOTEL与DRAGON INN。</Item>
                        <Item wrap>② 提前一天15：00后到达的航班仅接送至斗湖市区的HERITAGE HOTEL（需要提供入住预订码）</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="仙本那码头上岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 10：00</Item>
                          <Item wrap>② 12：00</Item>
                          <Item wrap>③ 16：30</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="中转酒店接送时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 住斗湖酒店的客人7：30AM在酒店大堂等待接送</Item>
                          <Item wrap>② 住仙本那酒店的客人9：00AM在酒店大堂等待接送</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="马达京度假村离岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>11：00/14：00</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="马达京度假村--中转酒店">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 离岛后可送至斗湖市区的酒店</Item>
                          <Item wrap>② 离岛后可送至仙本那海丰酒店和DRAGON INN。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="马达京度假村--机场">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 离岛当天可送至机场，离岛后第二天起请自行前往机场。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>乘11点的船离岛买15点后的航班，乘14点的船离岛买18点后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 2) {
              return <div>
                <div className="AccoAddtion">度假村接送时间</div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="斗湖机场--仙本那">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 15点之前到斗湖机场的可以接机送上岛</Item>
                        <Item wrap>② 提前一天15点前到斗湖机场可送到仙本那酒店（斗湖酒店需自行前往），第二天9:30在酒店大堂等接上岛。</Item>
                        <Item wrap>③ 其他时间到达，需自行前往酒店。</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="仙本那码头上岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 10：00AM</Item>
                          <Item wrap>② 12：30PM</Item>
                          <Item wrap>③ 16：30PM</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="马布岛度假村—机场">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 06：30AM</Item>
                          <Item wrap>② 11：00AM</Item>
                          <Item wrap>③ 14：00PM</Item>
                          <Item wrap>离岛第二天不送机</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>乘6点的船离岛买10点后的航班，乘11点的船离岛买15点后的航班，乘14：00的船离岛买18：00后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 3) {
              return <div>
                <div className="AccoAddtion">度假村接送时间</div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="斗湖机场--仙本那">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 提前1天到达（16：30前）可免费送至斗湖或仙本那酒店。</Item>
                        <Item wrap>② 提前1天到达（16：30后到）可免费送至斗湖酒店。</Item>
                        <Item wrap>③ 入住当天13：30 前抵达斗湖机场，可入住卡帕莱。</Item>
                        <Item wrap>④ 提前2天起到达不接机。</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="仙本那码头上岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 10：00AM</Item>
                          <Item wrap>② 12：30PM</Item>
                          <Item wrap>③ 16：30PM</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="卡帕莱度假村离岛船班">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 06：30AM</Item>
                          <Item wrap>② 09：30AM</Item>
                          <Item wrap>③ 13：30PM</Item>
                          <Item wrap>离岛第二天自行前往机场</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="温馨提示，爱的建议">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 当天上岛的客人请尽量预订最早航班到达斗湖。</Item>
                          <Item wrap>② 离岛航班推荐：乘6：30的船离岛买10点半后的航班，乘9：30的船离岛买13：30后的航班，乘13：30点的船离岛买17：30后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 4) {
              return <div></div>
            }else if (this.state.template == 5) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="仙本那码头上岛时间">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 12:30</Item>
                        <Item wrap>② 16:30</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="邦邦岛度假村离岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 09:30</Item>
                          <Item wrap>② 13:00</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="度假村接送时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>抵达：当天上岛，需购买15:00前到达斗湖的航班，否则无法当天上岛。</Item>
                          <Item wrap>离开：离岛当天离开斗湖，需预定13：30以后的航班</Item>
                          <Item wrap>斗湖酒店：早上8:00在酒店大堂接，乘12:30船班上岛</Item>
                          <Item wrap>仙本那酒店：早上11:15在酒店大堂接，乘12:30船班上岛</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>乘9：30点的船离岛买13：30点后的航班，乘13：30点的船离岛买17：30点后的航班。提前&离岛后一天均无航班接送。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 6) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="斗湖机场--仙本那">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 15点之前到斗湖机场的可以接机送上岛</Item>
                        <Item wrap>② 提前一天15点前到斗湖机场可送到仙本那酒店（斗湖酒店需自行前往），第二天9:30在酒店大堂等接上岛。</Item>
                        <Item wrap>③ 其他时间到达，需自行前往酒店。</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="仙本那码头上岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 10：00AM</Item>
                          <Item wrap>② 12：30PM</Item>
                          <Item wrap>③ 16：30PM</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="马布岛度假村—机场">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 06：30AM</Item>
                          <Item wrap>② 11：00AM</Item>
                          <Item wrap>③ 14：00PM</Item>
                          <Item wrap>离岛第二天不送机</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>乘6点的船离岛买10点后的航班，乘11点的船离岛买15点后的航班，乘13：30的船离岛买17：30后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 7) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="仙本那码头上岛时间">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 12:30</Item>
                        <Item wrap>② 16:30</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="邦邦岛度假村离岛时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 06:30</Item>
                          <Item wrap>② 09:30</Item>
                          <Item wrap>③ 13:30</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="度假村接送说明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>当天上岛的客人按到达的时间接送至仙本那码头（超过14：30 后到达的航班当天不安排上岛，但是可以送往仙本那酒店）</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>乘6：30的船离岛买10：30后的航班，乘9：30的船离岛买13：30后的航班，乘13：30的船离岛买17：30后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 8) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="仙本那码头上岛时间">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>① 10：00</Item>
                        <Item wrap>② 12：00</Item>
                        <Item wrap>③ 16：30</Item>
                        <Item wrap>11：00后到达斗湖的航班需第二天上岛；提前一天17：00前到达的航班可送至仙本那</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="中转酒店接送时间">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 住斗湖酒店的客人7：00AM在酒店大堂等待接送</Item>
                          <Item wrap>② 住仙本那酒店的客人9：30AM在酒店大堂等待接送</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛船班">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>① 06：00</Item>
                          <Item wrap>② 11：00</Item>
                          <Item wrap>③ 13：30</Item>
                          <Item wrap>离岛第二天不送机</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>乘6点的船离岛买10点后的航班，乘11点的船离岛买15点后的航班，乘13：30的船离岛买17：30后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 9) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="上岛船班">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>10:00AM</Item>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛船班">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>7:00AM</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="离岛航班推荐">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>建议购买11：00后离开山打根的航班，当天上岛需8：30前到达山打根。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
                <div className="Accordion">
                  <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header="接送说明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>08:30之前抵达山打根航班可当天送上兰卡央岛</Item>
                          <Item wrap>08:30之后抵达无法当天上岛，需要提前一天到并自行前往山打根住宿，次日09:30从山打根酒店接上前往码头上岛</Item>
                          <Item wrap>返程航班在上午11:00之前需提前一晚离岛，次日自行前往机场，如需离岛当天起飞，建议至少订中午12:00后山打根起飞的航班,如需参加西必洛半日游的，请订14点以后的航班。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }
          }.bind(this))()}




        </div>
        <div className="NavBottom">
          {(function(){
            let _this = this;
            if (this.state.first == false) {
              if (this.state.next) {
                return <div className="submitContent">
                  <div className="subData" onClick={function(){
                    let _data = assign({},_this.props.infor.finaldata);

                    let today = new Date();
                    let birtoday = Date.parse( new Date( today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0 ) );

                    // 马来西亚抵达航班
                    _data.outboundNum = _this.state.outboundNum;
                    if (_this.state.landDate != null) {
                      _data.landDate = Date.parse(_this.state.landDate._d);
                    }
                    if (_this.state.landTime != null) {
                      _data.landTime = Date.parse(_this.state.landTime._d) - birtoday - 28800000;
                    }

                    // 斗湖抵达航班
                    _data.inHarbourNum = _this.state.inHarbourNum;
                    if (_this.state.hLandDate != null) {
                      _data.hLandDate = Date.parse(_this.state.hLandDate._d);
                    }
                    if (_this.state.hLandTime != null) {
                      _data.hLandTime = Date.parse(_this.state.hLandTime._d) - birtoday - 28800000;
                    }

                    // 斗湖离开航班
                    _data.outHarbourNum = _this.state.outHarbourNum;
                    if (_this.state.hTakeoffDate != null) {
                      _data.hTakeoffDate = Date.parse(_this.state.hTakeoffDate._d);
                    }
                    if (_this.state.hTakeoffTime != null) {
                      _data.hTakeoffTime = Date.parse(_this.state.hTakeoffTime._d) - birtoday - 28800000;
                    }

                    // 马来西亚离开航班
                    _data.inboundNum = _this.state.inboundNum;
                    if (_this.state.takeoffDate != null) {
                      _data.takeoffDate = Date.parse(_this.state.takeoffDate._d);
                    }
                    if (_this.state.takeoffTime != null) {
                      _data.takeoffTime = Date.parse(_this.state.takeoffTime._d) - birtoday - 28800000;
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
                        body:JSON.stringify(_data)
                      }).then(function(response) {
                        return response.json()
                      }).then(function(json) {
                        let _date = assign({},_this.state);
                        if (json.result == "0") {
                          _this.props.dispatch({type:'change_infor',data:_data});
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
                return <div className="NextPage">保存</div>
              }
            }else{
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let _data = assign({},_this.props.infor.finaldata);

                  let today = new Date();
                  let birtoday = Date.parse( new Date( today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0 ) );

                  // 马来西亚抵达航班
                  _data.outboundNum = _this.state.outboundNum;
                  if (_this.state.landDate != null) {
                    _data.landDate = Date.parse(_this.state.landDate._d);
                  }
                  if (_this.state.landTime != null) {
                    _data.landTime = Date.parse(_this.state.landTime._d) - birtoday - 28800000;
                  }

                  // 斗湖抵达航班
                  _data.inHarbourNum = _this.state.inHarbourNum;
                  if (_this.state.hLandDate != null) {
                    _data.hLandDate = Date.parse(_this.state.hLandDate._d);
                  }
                  if (_this.state.hLandTime != null) {
                    _data.hLandTime = Date.parse(_this.state.hLandTime._d) - birtoday - 28800000;
                  }

                  // 斗湖离开航班
                  _data.outHarbourNum = _this.state.outHarbourNum;
                  if (_this.state.hTakeoffDate != null) {
                    _data.hTakeoffDate = Date.parse(_this.state.hTakeoffDate._d);
                  }
                  if (_this.state.hTakeoffTime != null) {
                    _data.hTakeoffTime = Date.parse(_this.state.hTakeoffTime._d) - birtoday - 28800000;
                  }

                  // 马来西亚离开航班
                  _data.inboundNum = _this.state.inboundNum;
                  if (_this.state.takeoffDate != null) {
                    _data.takeoffDate = Date.parse(_this.state.takeoffDate._d);
                  }
                  if (_this.state.takeoffTime != null) {
                    _data.takeoffTime = Date.parse(_this.state.takeoffTime._d) - birtoday - 28800000;
                  }

                  _this.props.dispatch({type:'change_infor',data:_data});

                  Toast.loading('Loading...', 0.5, () => {
                    _this.props.router.push('/s6');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  });
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

export default Stage5 = connect(
  mapStateToProps
)(Stage5);



function stampToFormat(stamp) {
  let FormatDate = dateTime.dateToMoment(new Date(stamp));
  let FormatMoment = moment(FormatDate,'YYYY-MM-DD HH:mm');
  return FormatMoment;
}




