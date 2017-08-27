import { combineReducers } from 'redux'
import infor from './infor'
import room from './room'

const todoApp = combineReducers({
  infor,
  room
})

export default todoApp
