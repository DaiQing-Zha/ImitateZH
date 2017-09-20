/**
 * Created by zhujiaming on 17/5/20.
 */
'use strict';
import {combineReducers} from 'redux';
import {mainReducer as mainStore} from './main/rd';
import {newsDetailReducer as newDetailStore} from './detail/rd';

export default combineReducers({
  mainStore,
  newDetailStore,
});
