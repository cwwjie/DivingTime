import React from 'react';
import { connect } from 'react-redux';
import {ActivityIndicator, Result, Icon} from 'antd-mobile';
import assign from 'lodash.assign';
import URL from './../method/URL.jsx';

class ResultPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      progress:'loading',// loading submit fail
      message:'',
    };
  }
  componentWillMount(){
    let _this = this;
    if (this.props.infor.loaddata == null) {
      this.props.router.push('/');
      return
    }
    let _date = assign({},this.state);
    let _json = this.props.infor.finaldata;
    // 第一次提交
    if (this.props.infor.loaddata.isRead == "N") {
      fetch(
        URL.base + URL.version + "/gather/"+localStorage.getItem('_uniqueKey')+"/gather.do",{
        method: "POST",
        headers:{
          "Content-Type": "application/json; charset=utf-8",
          'token':localStorage.getItem('_token'),
          'digest':localStorage.getItem('_digest')
        },
        body:JSON.stringify(_json)
       }).then(function(response) {
        return response.json()
       }).then(function(json) {
        let _date = assign({},_this.state);
        if (json.result == "0") {
          _date.progress = "submit";
        }else if (json.result == "2") {
          _date.progress = "fail";
          _date.message = "非常抱歉，该链接已经失效";
        }else if (json.result == "3") {
          _date.progress = "fail";
          _date.message = "非常抱歉，无法进行数据修改";
        }else {
          _date.progress = "fail";
          _date.message = "发生未知错误:" + json.message;
        }
        _this.setState(_date);
      });
    }else {
      // 更新
      fetch(
        URL.base + URL.version + "/gather/"+localStorage.getItem('_uniqueKey')+"/updateForm.do",{
        method: "POST",
        headers:{
          "Content-Type": "application/json; charset=utf-8",
          'token':localStorage.getItem('_token'),
          'digest':localStorage.getItem('_digest')
        },
        body:JSON.stringify(_json)
       }).then(function(response) {
        return response.json()
       }).then(function(json) {
        let _date = assign({},_this.state);
        if (json.result == "0") {
          _date.progress = "submit";
        }else if (json.result == "2") {
          _date.progress = "fail";
          _date.message = "非常抱歉，该链接已经失效";
        }else if (json.result == "3") {
          _date.progress = "fail";
          _date.message = "非常抱歉，无法进行数据修改";
        }else {
          _date.progress = "fail";
          _date.message = "发生未知错误:" + json.message;
        }
        _this.setState(_date);
      });
    }
    this.setState(_date);
  }
  render() {
    return (
      <div className="Result">
        {(function(){
          let _this = this;
          if ( this.state.progress == "submit" ) {
            return <div className="success">
              <Result
                img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6' }} />}
                title="您的信息已成功提交"
                message="并已邮件的形式通知客服! 请注意关注相关信息！谢谢！"
                buttonText="查看提交信息"
                buttonClick={function(){
                  _this.props.router.push('/index');
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }}
              />
            </div>
          }else if (this.state.progress == 'fail') {
            return <div className="success">
              <Result
                img={<Icon type="cross-circle-o" className="icon" style={{ fill: '#F13642' }} />}
                title={this.state.message}
              />
            </div>
          }else {
            return <div className="submit">
              <Result
                img={<div className="loading"><ActivityIndicator size="large" /></div>}
                title="正在提交您的信息请稍等.."
              />
            </div>
          }
        }.bind(this))()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor
});

export default ResultPage = connect(
  mapStateToProps
)(ResultPage);

