import React from 'react';
import { connect } from 'react-redux';
import {List} from 'antd-mobile';
import assign from 'lodash.assign';

const Item = List.Item;
const Brief = Item.Brief;

class Stage1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      present:[false]
    };
  }
  componentWillMount(){
    let _date = assign({},this.state);
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    let present = [];
    if (!this.props.infor.loaddata.present) {
      present.push(false);
    }else {
      present.push(true);
    }
    _date.present = present;

    this.setState(_date);
  }
  render() {
    return (
      <div className="homepage">
        <div className="tiltle">Diving Time 潜游时光</div>
        <div className="message">客户信息收集</div>
        <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
        <div className="ListItem" onClick={function(){
          this.props.router.push('/s1');
        }.bind(this)}>
          <List>
            <Item arrow="horizontal">条款声明</Item>
          </List>
        </div>
        <div className="ListItem" onClick={function(){
          this.props.router.push('/s2');
        }.bind(this)}>
          <List>
            <Item arrow="horizontal">订单信息</Item>
          </List>
        </div>
        {this.state.present.map(function(index, elem) {
          if (index == false) {
            return <div></div>
          }else {
            return <div>
              <div className="ListItem" onClick={function(){
                this.props.router.push('/s3');
              }.bind(this)}>
                <List>
                  <Item arrow="horizontal">潜游时光赠送项目</Item>
                </List>
              </div>
            </div>
          }
        }.bind(this))}

        <div className="ListItem" onClick={function(){
          this.props.router.push('/s4');
        }.bind(this)}>
          <List>
            <Item arrow="horizontal">预定人信息</Item>
          </List>
        </div>
        <div className="ListItem" onClick={function(){
          this.props.router.push('/s5');
        }.bind(this)}>
          <List>
            <Item arrow="horizontal">航班信息</Item>
          </List>
        </div>
        <div className="ListItem" onClick={function(){
          this.props.router.push('/s6');
        }.bind(this)}>
          <List>
            <Item arrow="horizontal">入住信息</Item>
          </List>
        </div>
        <div className="ListItem" onClick={function(){
          this.props.router.push('/s7');
        }.bind(this)}>
          <List>
            <Item arrow="horizontal">特别注意</Item>
          </List>
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
