import assign from 'lodash.assign'

let _state = {
  loaddata:null,
  finaldata:null
}



const infor = (state = _state, action) => {
  switch (action.type) {

    case 'inti_infor':
      // 初始化 信息收集
      let initstate = assign({},state);
      initstate.loaddata = action.data;
      initstate.finaldata = action.data;
      return initstate

    case 'change_infor':
      // 修改 信息收集
      let newstate = assign({},state);
      newstate.finaldata = action.data;
      return newstate


    default:
      return state
  }
}

export default infor