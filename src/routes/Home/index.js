import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import config from './../../config';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isloaded: null // false true
    }

    this.dealwithInfo.bind(this);
  }

  componentDidMount() {
    const _this = this;

    this.getGatherInfo()
    .then(val => {
      if (val.result === '0') {
        _this.dealwithInfo(val.data);
        _this.setState({'isloaded': true})
      } else {
        _this.setState({'isloaded': `请求服务器成功, 但是获取的用户收集信息有误! 原因:${val.message}. 请联系客服!`})
      }
    }, 
    error => _this.setState({'isloaded': error}));
  }

  getGatherInfo() {
    var uniqueKey = localStorage.getItem('_uniqueKey'),
      token = localStorage.getItem('_token'),
      digest = localStorage.getItem('_digest');

    return new Promise((resolve, reject) => {
      fetch(`${config.URLversion}/gather/link/${uniqueKey}/getGatherInfo.do`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json; charset=utf-8',
          'token': token,
          'digest': digest
        }
      }).then(
        response =>  resolve(response.json()),
        error => reject(`向服务器发起请求用户收集信息失败, 原因: ${error}`)
      ).catch((error) => {
        reject(`向服务器发起请求用户收集信息失败, 原因: ${error}`);
      })
    })
  }

  dealwithInfo(data) {
    if (data) {
      this.props.dispatch({type: 'load/setFirst', isFirst: false, value: data})
    } 
  }

  render() {
    const isloaded = this.state.isloaded;

    const HomeNode = (
      <div className="Home">

      </div>
    )

    if (isloaded === null) {
      return <div className="Home">正在加载...</div>
    } else if (isloaded === true) {
      return HomeNode
    } else {
      return <div className="Home">{isloaded}</div>
    }
  }
}

const mapStateToProps = (state) => ({
  isFirst: state.load.isFirst,
  loadData: state.load.value
})

export default connect(mapStateToProps)(Home);
