import { combineReducers } from 'redux';


function anotherReducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
import example from './example';
const reducers =  combineReducers({  example, anotherReducer  })

export default reducers;
