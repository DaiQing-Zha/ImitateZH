import {StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
import {View, Text,StatusBar} from 'react-native';
import PageMain from './main/index';
import NewsDetail from './detail/index';
import MainDraw  from './draw/index';
import {CommonStyles} from 'kit';
/*首页带抽屉的Navigator*/
const MainWithDraw = DrawerNavigator({
    main: {screen: PageMain},
    holdView: {screen: View},
}, {
    contentComponent: props => <MainDraw {...props}/>
});


/*路由栈注册*/
const stackRouteConfigs = {
    PageMain: {screen: MainWithDraw},
    PageNewsDetail: {screen: NewsDetail},
};

const stackNavigatorConfig = {
    initialRouteName: 'PageMain',//初始的页面
    // initialRouteParams//初始页面的传参数
    // navigationOptions //navigation默认配置，作用于所有navigator中的页面
    navigationOptions: {
        header: null,
    }
    //...https://reactnavigation.org/docs/navigators/stack#StackNavigatorConfig
};


const Navigator = StackNavigator(stackRouteConfigs, stackNavigatorConfig);
const defaultGetStateForAction = Navigator.router.getStateForAction;
Navigator.router.getStateForAction = (action, state) => {
    return defaultGetStateForAction(action, state);
};

class AppRoute extends Component {
    constructor() {
        super();
    }

    render() {
      return (<View style={{flex: 1}}>
          <StatusBar
                  backgroundColor={CommonStyles.appColor}
              barStyle="light-content"
              networkActivityIndicatorVisible={true}
          />
          <Navigator onNavigationStateChange={(prevState, newState, action) => {
              if (__DEV__) {
                  console.log('******************************');
                  console.log('prevState:', prevState);
                  console.log('newState:', newState);
                  console.log('action:', action);
                  console.log('******************************');
              }
          }}/>
      </View>);
    }
}

export default AppRoute;
