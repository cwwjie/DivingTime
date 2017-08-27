import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Steps, List, WhiteSpace } from 'antd-mobile';
import assign from 'lodash.assign';

import topicon from './../icon/order.png';

const Item = List.Item;
const Brief = Item.Brief;
const Step = Steps.Step;

class Stage7 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      template:3,
      first:false,
      next:true,
    };
  }
  componentWillMount(){
    let _this = this;
    let _date = assign({},this.state);
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }

    // 初始化模板
    _date.template = this.props.infor.loaddata.template;

    // 判断是否第一次
    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
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
                this.props.router.push('/s6');
              }
            }.bind(this)}
          />
          <span>特别注意</span>
        </div>

        <div className="part7">
          {(function(){
            if (this.state.template == 1) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的75%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前35天以上退款<span className="deduction">需要扣除全款的30%</span></Item>
                        <Item wrap>入住前46天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前46天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="关于诗巴丹">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>1、船费（不含6%消费税）：一人1200马币，2人600马币/人，3人400马币/人，4人300马币/人，5人260马币/人，6或7人230马币/人。</Item>
                          <Item wrap>2、拼船价格需当天依度假村的具体安排为准</Item>
                          <Item wrap>3、诗巴丹名额一经预约（预订房间时让客服帮忙预约），就不可取消，你到达度假村后，都需要支付这个费用，务必考虑清楚</Item>
                          <Item wrap>4、诗巴丹名船费在马达京现付，预约成功，是不能取消不付费的</Item>
                          <Item wrap>5、诗巴丹上岛费40马币（不含6%消费税）每人需现付</Item>
                          <Item wrap>6、马达京到诗巴丹船程约80分钟</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 2) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的75%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前<span className="day">45-36</span>天退款<span className="deduction">扣除全款的30%</span></Item>
                        <Item wrap>入住前35天以上退款<span className="deduction">需要扣除全款的30%</span></Item>
                        <Item wrap>入住前35天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前46天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="关于诗巴丹许可证">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>入住独栋和水屋5晚及以上的客人享受一日诗巴丹，优先安排水屋的潜水员，并不能保证非潜水员诗巴丹名额。上岛当天可询问岛上工作人员是否被安排去诗巴丹，如果没被安排，可390马币/人购买。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

              </div>
            }else if (this.state.template == 3) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的30%</span></Item>
                        <Item wrap>入住前35天以上退款<span className="deduction">需要扣除全款的30%</span></Item>
                        <Item wrap>入住前46天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前35天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="申请诗巴丹潜水名额需满足以下条件">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>一、有潜水员证</Item>
                          <Item wrap>二、有20潜或以上的记录</Item>
                          <Item wrap>三、预订卡帕莱5天4晚或以上的深潜套餐</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

              </div>
            }else if (this.state.template == 4) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的75%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前35天以上退款<span className="deduction">需要扣除全款的30%</span></Item>
                        <Item wrap>入住前35天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前35天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="关于诗巴丹">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>诗巴丹许可证每天配额有限，请提早预订。</Item>
                          <Item wrap>2人间住3晚保证一次诗巴丹</Item>
                          <Item wrap>入住4人间，不含诗巴丹，可另付530马币/人/天前往（已含6%消费税）</Item>
                          <Item wrap>所有去诗巴丹的客人均需自付许可证RM40/人</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

              </div>
            }else if (this.state.template == 5) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的75%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前35天以上退款<span className="deduction">需要扣除全款的30%</span></Item>
                        <Item wrap>入住前46天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前46天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              </div>
            }else if (this.state.template == 6) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的75%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前<span className="day">45-36</span>天退款<span className="deduction">扣除全款的30%</span></Item>
                        <Item wrap>入住前46天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前46天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="关于诗巴丹许可证">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>入住独栋和水屋5晚及以上的客人享受一日诗巴丹，优先安排水屋的潜水员，并不能保证非潜水员诗巴丹名额。上岛当天可询问岛上工作人员是否被安排去诗巴丹，如果没被安排，可390马币/人购买。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

              </div>
            }else if (this.state.template == 7) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">15-</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前35天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前35天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

              </div>
            }else if (this.state.template == 8) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的75%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前35天以上退款<span className="deduction">扣除全款的30%</span></Item>
                        <Item wrap>入住前46天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前46天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="关于诗巴丹">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>仅确保入住5天4晚及以上的客人一天诗巴丹的名额；预订时需提前支付80人民币诗巴丹上岛费确保名额。</Item>
                          <Item wrap>任何额外的名额分配仅在入住度假村后确认，费用为146马币每人/天，12岁以下不能确保名额。</Item>
                          <Item wrap>申请诗巴丹名额，需提前告知客服，一天诗巴丹为四潜安排。</Item>
                        </List>
                      </div>
                    </Accordion.Panel>
                  </Accordion>
                </div>

              </div>
            }else if (this.state.template == 9) {
              return <div>
                <Accordion defaultActiveKey="0" className="my-accordion">
                  <Accordion.Panel header="退款说明">
                    <div className="List">
                      <List className="my-list">
                        <Item wrap>入住前<span className="day">7</span>天退款<span className="deduction">扣除100%全款</span></Item>
                        <Item wrap>入住前<span className="day">15-8</span>天退款<span className="deduction">扣除全款的50%</span></Item>
                        <Item wrap>入住前<span className="day">34-16</span>天退款<span className="deduction">扣除全款的30%</span></Item>
                        <Item wrap>入住前35天预定成功<span className="deduction">预定成功后定金不</span>
                        <div className="deduction_extra">退,退订扣除定金(入住前35天补余款)</div>
                        </Item>
                      </List>
                      <List className="my-list">
                        <div className="description_extra">因各个度假村上岛时间及接送安排不同，预定机票时请咨询我们的顾问。</div>
                      </List>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <WhiteSpace size="lg" />
                <div className="interval"></div>
                <div className="Accordion">
                  <Accordion className="my-accordion">
                    <Accordion.Panel header="免责声明">
                      <div className="List">
                        <List className="my-list">
                          <Item wrap>我们对自身掌控范围之外的原因直接或间接给客人造成的延迟、额外费用或不便不承担责任。</Item>
                          <Item wrap>具体请参考潜游时光淘宝店里“政策说明”页面。</Item>
                          <Item wrap>如您在本店铺支付了预订款项，代表您已同意以上政策，谢谢理解。</Item>
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
              return <div className="NextPageActi" onClick={function(){
                _this.props.router.push('/index');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }}>返回</div>
            }else {
              return <div className="NextPageActi" onClick={function(){
                _this.props.router.push('/result');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }}>提交</div>
            }
            if (this.state.next) {
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

export default Stage7 = connect(
  mapStateToProps
)(Stage7);



function RefundIcon(Num) {
  return (
    <div style={{
      fontSize:'14px',
      position:"relative",
      top:'7.5px'
    }}>{Num}</div>
  )
}