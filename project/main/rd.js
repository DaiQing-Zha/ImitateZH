import {getLastedNews, getBeforeNews, getThemeData} from './webApi';
import {lastestNewsData, yesterdayNews} from '../bean/lastestNews';
import {Utils} from 'kit';
const initalState = {
    isRefreshing: false,
    isLoadMore: false,
    topDataSource: [],
    dataSource: [],
    renderType: 'home',
    themeData: null,
    nightMode: false
};

export function mainReducer(state = initalState, action) {
  if (__DEV__)
      console.log('reducer====>' + action.type);
  switch (action.type) {
      case actionTypes.ACTION_START_REFRESH:
          return {
              ...state,
              isRefreshing: true,
          };
      case actionTypes.ACTION_END_REFRESH:
          //处理首页列表数据
          let dataSource = [ // 不同section渲染相同类型的子组件
              {data: action.data.stories, key: action.data.date, date: action.data.date},
          ];
          console.log('-----before forEach-----');
          console.log('-----size-----' + dataSource.length);
          //dataSource date时间处理
          dataSource.forEach((item, index, input) => {
              let originDate = input[index].date;
              let dateStr = '';
              if (Utils.dateStrToDate(originDate).toString() === new Date().toString()) {
                  dateStr = '今日热闻';
              } else {
                  dateStr = `${originDate.substring(4, 6)}月${originDate.substring(6, 8)}日  ${Utils.getWeekDay(Utils.dateStrToDate(originDate))}`;
              }
              input[index].key = dateStr;
          });
         return {
              ...state,
              isRefreshing: false,
              topDataSource: action.data.top_stories,
              dataSource,
          };
          case actionTypes.ACTION_RENDER_TYPE:
              // rendertype:home  theme
              switch (action.renderType) {
                  case 'theme':
                      return {
                          ...state,
                          renderType: action.renderType,
                          themeData: action.data,
                      };
                  default:
                      return {
                          ...state,
                          renderType: 'home',
                      };
              }
              case actionTypes.ACTION_CHANGE_NIGHT_MODE:
                let nightMode = !state.nightMode;
                return{
                  ...state,
                  nightMode
                }
      default:
          return {...state};
  }
}


export const actionTypes = {
    ACTION_START_REFRESH: 'start_refresh',
    ACTION_END_REFRESH: 'end_refresh',
    // ACTION_FETCH_SUCCESS: 'fetch_success',
    // ACTION_FETCH_ERROR: 'fetch_error',
    ACTION_START_LOAD_NEXT_PAGE: 'start_load_next_page',
    ACTION_END_LOAD_NEXT_PAGE: 'end_load_next_page',
    ACTION_RENDER_TYPE: 'main:render_type',
    ACTION_CHANGE_NIGHT_MODE: 'main:change_night_mode',
};
/**
 * getLasted缓存策略：先加载网络数据，如果网络错误，则加载缓存数据，如果网络正常，则更新缓存数据
 * @returns {function(*)}
 */
export function action_getLastedNews() {
  console.log("====>刷新首页内容 yes ====> 执行getLastedNews()方法");
    return async (dispatch) => {
        dispatch({type: actionTypes.ACTION_START_REFRESH});
        let responseJson = {};
        try {
          console.log("--------------before getLastedNews");
            responseJson = await  getLastedNews();
            console.log("====>刷新首页内容 yes reponseJson = " + responseJson + " size = " + responseJson.length);
            storage.save({
                key: 'home',
                id: 'lasted',
                data: responseJson,
            });
        } catch (err) {
            console.log("====>刷新首页内容 yes ====> encounter error " + err);
            responseJson = await storage.load({
                key: 'home',
                id: 'lasted',
                // 你还可以给sync方法传递额外的参数
                syncParams: {},
            });
        } finally {
            dispatch({type: actionTypes.ACTION_END_REFRESH, data: responseJson});
        }
    }
}
