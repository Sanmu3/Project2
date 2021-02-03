// // pacth to add to cart and remove to cart

import {combineReducers} from 'redux';
import userReducer from '../Controller/user';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
