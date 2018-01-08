import React, {Component} from 'react';
import NavigationBar from './components/NavigationBar';

import { Radio, Button  } from 'antd';

class Terms extends Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      Radio:false
    };
  }
  render() {
  return (
    <div className="Terms">
      <NavigationBar/>
      <div className="Terms-Bimg" ><img src="./clauseStatement.jpg"></img></div>
      <div className="Terms-Title">
        <div className="ZH">
          政策条款
        </div>
        <div className="EH">
          POLICY TERMS
        </div>
      </div>
      <div className="Terms-Content">
        <div className="line"></div>
        <div className="paragraph">
          <div className="Num">1.</div>
          <div><span className="strong">潜游时光通过网络为客人提供代定服务。如用户预定的相关服务项目中，最终服务的酒店或者度假村以及其他一日游，包船等服务商提供的服务出现纠纷，本公司并不承担责任，</span>但本公司将尽力协助客人与相关服务提供商进行协调，不能协商解决的，客人可以向当地旅游局或通过法律途径解决。</div>
        </div>
        <div className="paragraph">
          <div className="Num">2.</div>
          <div>潜游时光提供的只是代预定服务，如最终不能顺利代客人预定到相关产品，潜游时光将无条件退还客人为预定该项目所支付的全额款项，但潜游时光不承担任何由此产生的、可能对行程产生影响的后果的责任，如不能接受此政策，请勿在本店铺选择潜游的服务或拍下并支付任何款项。</div>
        </div>
        <div className="paragraph">
          <div className="Num">3.</div>
          <div>关于套餐预定之外的其他一切额外要求，如蜜月布置、楼层房间相邻或朝向的指定，无(或可吸)烟房等，一律以登记入住时，酒店实际安排为准，<span className="strong">潜游时光只提供代备注的协助，并无决定或满足以上要求的权利。</span></div>
        </div>
        <div className="paragraph">
          <div className="Num">4.</div>
          <div>因部分地区酒店的价格变化大，所以在客人支付款项到支付宝后和本店下单给酒店之间的过程中，不排除预定价格出现变化的情况发生。此时如客人不接受变化后的价格，客人可向客服申请支付宝退款。潜游时光对下单到酒店前的价格变化不承担任何责任。</div>
        </div>
        <div className="paragraph">
          <div className="Num">5.</div>
          <div>在给买家提供的免费咨询服务过程中，除报价以外的其他信息，如行程评点建议，航班信息、各国签证情况、酒店信息(如酒店位置、房间上网收费否、房间面积数等设施配置等信息)等，<span className="strong">我们的回复仅供客人选择参考，不构成任何推荐责任。如提供参考信息有不符，请分别以航空公司和度假村官网或实际情况为准。</span></div>
        </div>
        <div className="paragraph">
          <div className="Num">6.</div>
          <div><span className="strong">潜游时光保留可更改网店上显示价格的权利，恕不另行通知。另外本店已经确认了您的预定并接受了您的付款，但本店仍保留取消及返还您付款的权利。</span></div>
        </div>
        <div className="paragraph">
          <div className="Num">7.</div>
          <div>本店对客人在度假村的服务范围内所遇到的替代性的安排一概不承担任何责任。在任何情况下，潜游时光的赔偿与退款都不会超出您支出的费用。</div>
        </div>
        <div className="paragraph">
          <div className="Num">8.</div>
          <div>通常情况下，潜游时光的电子确认单内容不会超过淘宝产品页注明的包含内容(住宿，潜水和接送等)，如有额外支付费用预定项目和接送服务请和客服仔细确认。没有特殊说明的情况下，均按网站页面显示的套餐包含内容执行。</div>
        </div>
        <div className="paragraph">
          <div className="Num">9.</div>
          <div>请详细阅读网站的服务政策，如您在本网站支付了预定款项，代表您已<span className="strong">审慎阅读、充分理解并</span>同意接受以上之政策。只要您理解并同意相关预定政策，您才选择我们的服务，谢谢理解。</div>
        </div>
        <div className="paragraph">
          <div className="tenNum">10.</div>
          <div>最后，感谢您通过潜游时光来预定您的行程，预祝您游玩愉快。</div>
        </div>
        <div className="paragraph">
          <div className="tenNum">11.</div>
          <div><span className="strong">如果您未满18周岁，请在法定监护人的陪同下阅读本协议并进行网站注册、使用相关服务。</span></div>
        </div>
        <div className="paragraph">
          <div className="tenNum">12.</div>
          <div><span className="strong">本条款内容中以黑体、加粗、下划线、斜体、红色字体等方式显著标识的条款，请用户着重阅读。</span></div>
        </div>
        <div className="paragraph">
        <Radio checked={this.state.Radio} onChange={function(event){
          if (event.target.checked ==true) {
            this.setState({
              Radio:true
            });
          }
        }.bind(this)}><span className="Radio">我已阅读并同意以上条款</span></Radio>
        </div>
        <div className="next">
          <Button type="primary" onClick={function(){
            if (this.state.Radio == true) {
              this.props.router.push('/infor');
            }else {
              alert("请仔细阅读以上条款");
            }
          }.bind(this)}>下一步</Button>
        </div>
      </div>
      <div style={{height:'800px'}}></div>
    </div>
    );
  }
}


export default Terms
