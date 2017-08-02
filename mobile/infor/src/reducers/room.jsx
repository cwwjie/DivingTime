import assign from 'lodash.assign'

let _state = {
  roomID:null,
  customerId:null,
  livingNum:null, // 已经入住几人
}



const infor = (state = _state, action) => {
  switch (action.type) {


    case 'init_roomID':
      // 初始化 房间信息
      let roomID = assign({},state);
      roomID.roomID = action.data;
      return roomID


    case 'init_customerID':
      // 初始化 顾客信息
      let customerId = assign({},state);
      customerId.customerId = action.data;
      return customerId


    case 'init_livingNum':
      // 初始化 已入住人数
      let livingNum = assign({},state);
      livingNum.livingNum = action.data;
      return livingNum
    case 'ADD_livingNum':
      // 已入住人数 +1
      let livingAddNum = assign({},state);
      if (action.data == true) {
        livingAddNum.livingNum += 1;
      }
      return livingAddNum
    case 'CUT_livingNum':
      // 已入住人数 +1
      let livingCutNum = assign({},state);
      if (action.data == true) {
        livingCutNum.livingNum -= 1;
      }
      return livingCutNum

    default:
      return state
  }
}

export default infor