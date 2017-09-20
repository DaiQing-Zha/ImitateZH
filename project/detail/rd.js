'use strict'
import {getDetailNews,getDetailNewsExtras} from './webapi';
import {detailNewsData} from '../bean/detailnews';
import {Utils} from 'kit';
const initalState ={
  isLoading:false,
  newsData:{},
  extrasData:{},
};
export function newsDetailReducer(state = initalState, action) {
    switch (action.type) {
        case actionTypes.ACTION_START_REFRESH:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.DETAIL_ACTION_END_REFRESH:
          console.log("ACTION_END_REFRESH-------------------------------ACTION_END_REFRESH");
            action.data.body = Utils.getHtml(action.data.body,action.data.css,action.nightMode);//html处理
            return {
                ...state,
                isLoading: false,
                newsData: action.data,
            }
        case actionTypes.ACTION_GET_EXTRAS:
            return {
                ...state,
                extrasData:action.data,
            }
        default :
            return {
                ...state,
            }
    }
}

export const actionTypes ={
  ACTION_START_REFRESH:'detailNews:start_refresh',
  DETAIL_ACTION_END_REFRESH:'detailNews:end_refresh',
  ACTION_GET_EXTRAS:'detailNews:get_extras',
}
export function action_getDetilNewsData(newsId,nightMode = false){
  console.log("newsId:", newsId);
  return async(dispatch) => {
    dispatch({type:actionTypes.ACTION_START_REFRESH});
    try{
      let responseJson = await getDetailNews(newsId);
      console.log("dispatch-------------------------------dispatch");
      dispatch({type: actionTypes.DETAIL_ACTION_END_REFRESH, data: /*detailNewsData*/responseJson,nightMode:nightMode});
      // dispatch({type: actionTypes.DETAIL_ACTION_END_REFRESH});
      console.log("responseJson-------------------------------" + responseJson);
    }catch(err){
      console.log("err:", err);
    }finally{
      console.log("finally-------------------------------");
    }
  };
}
export function action_getDetailNewsExtra(newsId){
  return async(dispatch) => {
    let responseJson = await getDetailNewsExtras(newsId);
    dispatch({type:actionTypes.ACTION_GET_EXTRAS,data:responseJson});
  };
}
