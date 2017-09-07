import React from 'react';
import inforData from './../method/inforData.jsx';
import {Toast} from 'antd-mobile';

class SaveInfor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:"SaveInfor",
      data:{}
    }
  }
  componentDidMount() {
    if (this.props.first) {
      if (this.props.next) {
        this.setState({name:'SaveInforActive'});
      }else {
        this.setState({name:'SaveInfor'});
      }
    }else {
      this.setState({name:'SaveInforNone'});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.first) {
      if (nextProps.next) {
        this.setState({name:'SaveInforActive',data:nextProps.data});
      }else {
        this.setState({name:'SaveInfor',data:false});
      }
    }else {
      this.setState({name:'SaveInforNone'});
    }
  }
  render() {
    return (
      <div className={this.state.name} onClick={function(){
        if ( this.props.next && this.state.data) {
          inforData.save(this.state.data);
          Toast.success('已为您临时储存在本地，请1个小时内提交！', 5);
        }
      }.bind(this)}>
        临时保存
      </div>
    );
  }
}

export default SaveInfor;