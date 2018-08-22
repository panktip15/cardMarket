import {combineReducers} from 'redux'

const test = (state = {}, action = {}) => ({...state, ...action})

export const rootReducer = combineReducers({
  test
})
