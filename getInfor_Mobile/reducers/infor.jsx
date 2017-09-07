import assign from 'lodash.assign'

let _state = {
  loaddata:null,
  finaldata:null,
  submit:false,
  inti:false
}



const infor = (state = _state, action) => {
  switch (action.type) {

    case 'inti_infor':
      // 初始化 信息收集
      let initstate = assign({},state);
      initstate.loaddata = action.data;
      initstate.finaldata = action.data;
      initstate.inti = true;
      return initstate

    case 'change_infor':
      // 修改 信息收集
      let newstate = assign({},state);
      newstate.finaldata = action.data;
      return newstate

    case 'submit_infor':
      // 提交 信息收集
      let substate = assign({},state);
      substate.submit = true;
      return substate


    default:
      return state
  }
}

export default infor