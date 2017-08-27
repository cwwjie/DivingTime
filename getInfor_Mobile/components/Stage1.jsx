import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Toast } from 'antd-mobile';
import assign from 'lodash.assign'
import topicon from './../icon/order.png';

const AgreeItem = Checkbox.AgreeItem;

class Stage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first:false,
      next:false,
      AgreeItem:false
    };
  }
  componentDidMount() {
    let _date = assign({},this.state);
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }else {
      // 测试用
      // this.props.router.push('/s6');
    }


    if (this.props.infor.loaddata.isRead == "N") {
      _date.first = true;
    }
    if (this.props.infor.loaddata.isRead == "Y" || this.props.infor.finaldata.isRead == "Y" ) {
      _date.next = true;
      _date.AgreeItem = true;
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
              }
            }.bind(this)}
          />
          <span>条款声明</span>
        </div>
        <div className="main">
          <div className="part1">
            <div className="row">1、<span className="strong">潜游时光通过网络为客人提供代定服务。如用户预定的相关服务项目中，最终服务的酒店或者度假村以及其他一日游，包船等服务商提供的服务出现纠纷，本公司并不承担责任，</span>但本公司将尽力协助客人与相关服务提供商进行协调，不能协商解决的，客人可以向当地旅游局或通过法律途径解决。</div>
            <div className="row">2、潜游时光提供的只是代预定服务，如最终不能顺利代客人预定到相关产品，潜游时光将无条件退还客人为预定该项目所支付的全额款项，但潜游时光不承担任何由此产生的、可能对行程产生影响的后果和责任，如不能接受此政策，请勿在本店铺选择潜游的服务或拍下并支付任何款项。</div>
            <div className="row">3、关于套餐预定之外的其他一切额外要求，如蜜月布置、楼层房间相邻或朝向的指定，无(或可吸)烟房等，一律以登记入住时，酒店实际安排为准，<span className="strong">潜游时光只提供代备注的协助，并无决定或满足以上要求的权利。</span></div>
            <div className="row">4、因部分地区酒店的价格变化大，所以在客人支付款项到支付宝后和本店下单给酒店之间的过程中，不排除预定价格出现变化的情况发生。此时如客人不接受变化后的价格，客人可向客服申请支付宝退款。潜游时光对本店下单给酒店前的价格变化不承担任何责任。</div>
            <div className="row">5、在给买家提供的免费咨询服务过程中，除报价以外的其他信息，如行程评点建议，航班信息、各国签证情况、酒店信息(如酒店位置、房间上网收费否、房间面积数等设施配置等信息)等，<span className="strong">我们的回复仅供客人选择参考，不构成任何推荐责任。如提供参考信息有不符，请分别以航空公司和度假村官网或实际情况为准。</span></div>
            <div className="row">6、<span className="strong">潜游时光保留可更改网店上显示价格的权利，恕不另行通知。另外本店已经确认了您的预定并接受了您的付款，但本店仍保留取消订单及返还您已付款项的权利。</span></div>
            <div className="row">7、本店对客人在度假村的服务范围内所遇到的替代性的安排一概不承担任何责任。在任何情况下，潜游时光的赔偿与退款都不会超出您支出的费用。</div>
            <div className="row">8、通常情况下，潜游时光的电子确认单内容不会超过淘宝产品页注明的包含内容(住宿，潜水和接送等)，如有额外支付费用预定项目和接送服务请和客服仔细确认。没有特殊说明的情况下，均按网站页面显示的套餐包含内容执行。</div>
            <div className="row">9、请详细阅读网站的服务政策，如您在本网站支付了预定款项，代表您已<span className="strong">审慎阅读、充分理解并</span>同意接受以上之政策。只有您理解并同意，您才选择我们的服务，谢谢理解。</div>
            <div className="row">10、最后，感谢您通过潜游时光来预定您的行程，预祝您游玩愉快。</div>
            <div className="row">11、<span className="strong">如果您未满18周岁，请在法定监护人的陪同下阅读本协议并进行网站注册、使用相关服务。</span></div>
            <div className="row">12、<span className="strong">本条款内容中以黑体、加粗、下划线、斜体、红色字体等方式显著标识的条款，请用户着重阅读。</span></div>
            <div className="AgreeItem">
              <AgreeItem
                checked={this.state.AgreeItem}
                onChange={function (argument) {
                  let _date = assign({},this.state);
                  // 如果是第一次才能编辑
                  if (this.state.first) {
                    if (argument.target.checked) {
                      _date.next = true;
                      _date.AgreeItem = true;
                    }else {
                      _date.AgreeItem = false;
                      _date.next = false;
                    }
                  }
                  this.setState(_date);
                }.bind(this)}>
                <div className="Item">同意条款</div>
              </AgreeItem>
            </div>
          </div>
        </div>
        <div className="NavBottom">
          {(function(){
            let _this = this;
            // 如果是第一次
            if (this.state.first) {
              if (this.state.next) {
                return <div className="NextPageActi" onClick={function(){
                  let _data = assign({},_this.props.infor.finaldata);
                  _data.isRead = "Y";
                  _this.props.dispatch({type:'change_infor',data:_data});
                  Toast.loading('Loading...', 0.5, () => {
                    _this.props.router.push('/s2');
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  });
                }}>下一步</div>
              }else {
                return <div className="NextPage">下一步</div>
              }
            }else {
              // 不是第一次的情况
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

export default Stage1 = connect(
  mapStateToProps
)(Stage1);
