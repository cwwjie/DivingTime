import React from 'react';

export default class Autocomplete extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:[
        '@163.com',
        '@163.net',
        '@126.com',
        '@qq.com',
        '@yahoo.com',
        '@googlemail.com',
        '@sohu.com',
        '@hongkong.com',
        '@sogou.com',
        '@gmail.com',
      ]
    };
  }
  render() {
    return (
      <div className="autocomplete" style={(function(){
        if (this.props.show) {
          return {display:'block'}
        }else {
          return {display:'none'}
        }
      }.bind(this))()}>
        {this.state.email.map(function(val){
          let _this = this;
          return <div onClick={function(){
            _this.props.onChange(val);
          }}>{val}</div>
        }.bind(this))}
      </div>
    ) 
  }
}