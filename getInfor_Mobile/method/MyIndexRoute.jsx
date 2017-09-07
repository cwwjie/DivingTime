import { connect } from 'react-redux'
import React from 'react';


class MyIndexRoute extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if (this.props.infor.inti) {
      if (this.props.infor.loaddata.isRead == "N") {
        this.props.router.push('/s1');
      }else {
        this.props.router.push('/index');
      }
      return
    }
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  infor:state.reducer.infor
});

export default MyIndexRoute = connect(
  mapStateToProps
)(MyIndexRoute);
