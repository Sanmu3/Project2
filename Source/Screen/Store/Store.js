// patch save to store

import {createStore} from 'redux';
import Data from '../Reducers/Data';
export const store = createStore(Data);
