import React, { PureComponent } from 'react';
import Svg, {Rect,} from 'react-native-svg';
import {Header,CommonStyles,ViewPager} from 'kit';
import {connect} from 'react-redux';
import {action_getLastedNews} from './rd';
import ListItem from './listItem';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  SectionList,
  ToastAndroid,
} from 'react-native';

class PageMain extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
        headTitle: '首页',
        showMore: false,
    }
    this.menuItems = [{
      text: '夜间模式',
      click: ()=> {
        let currentMode = this.props.mainStore.nightMode;
        this.props.dispatch({type:'main:change_night_mode'});
        this.menuItems[0].text = currentMode ? '夜间模式':'日间模式';
        DeviceEventEmitter.emit('statusBarDidChanged',!currentMode);
      }
    },{
      text: '设置选项',
      click: ()=> {

      }
    }];
    this.calculateTopIconPosition = this.calculateTopIconPosition.bind(this);
    this.renderTopBarLeft = this.renderTopBarLeft.bind(this);
    this.renderTopBarRight = this.renderTopBarRight.bind(this);
    this.renderTopBarLeft = this.renderTopBarLeft.bind(this);
  }

  componentDidMount() {
      this._onRefresh();
  }

  _onRefresh() {
      if (__DEV__)
      console.log("====>刷新首页内容");
      if (!this.props.mainStore.isRefreshing){
        console.log("====>刷新首页内容 yes");
        this.props.dispatch(action_getLastedNews());
      }
  }

  render() {
    let nightMode = this.props.mainStore.nightMode;
    return (<View style={[styles.container,{backgroundColor:nightMode?'#343434':'#F3F3F3'}]}>
        <Header
            renderLeft={this.renderTopBarLeft}
            renderRight={this.renderTopBarRight}
            nightMode = {nightMode}
        />
        {this.renderContentZH()}
        {this.renderShowMore()}
    </View>)
  }
  renderTopBarLeft() {
      let iw = 18;
      let ih = 2;
      let space = 3;
      let positions = this.calculateTopIconPosition(CommonStyles.topBarIconStyle.width, CommonStyles.topBarIconStyle.height, iw, ih, space);
      return ([<TouchableOpacity key={'l1'} onPress={() => {
          this.props.navigation.navigate('DrawerOpen'); // open drawer
      }}>
          <Svg
              width={CommonStyles.topBarIconStyle.width}
              height={CommonStyles.topBarIconStyle.height}
          >
              <Rect
                  x={positions[0].x}
                  y={positions[0].y}
                  width={iw}
                  height={ih}
                  fill="#fff"
              />
              <Rect
                  x={positions[1].x}
                  y={positions[1].y}
                  width={iw}
                  height={ih}
                  fill="#fff"
              />
              <Rect
                  x={positions[2].x}
                  y={positions[2].y}
                  width={iw}
                  height={ih}
                  fill="#fff"
              />
          </Svg>
      </TouchableOpacity>,
          < Text key={'l2'} style={[CommonStyles.topBarTextStyle, {margin: 20}]}>{this.state.headTitle}</Text >
      ]);
  }

  renderTopBarRight() {
      return ([
          <TouchableOpacity key={'r1'} onPress={() => {
              this.props.navigation.navigate('PageLogin');
          }}>
              <Image style={[CommonStyles.topBarIconStyle]}
                     source={require('../imgs/message_main.png')}/>
          </TouchableOpacity>,
          <TouchableOpacity key={'r2'} onPress={() => {//15697811103
            console.log("-----------hhh-----------");
              DeviceEventEmitter.emit('modalDidChanged',{visible:true,menuItems:this.menuItems,});
              this.setState({
                  showMore: !this.state.showMore,

              });
          }}>
              <Image style={[CommonStyles.topBarIconStyle, {width: 50, height: 50}]}
                     source={require('../imgs/showmore.png')}/>
          </TouchableOpacity>,
      ]);
  }
  calculateTopIconPosition(x, y, iwidth, iheight, space) {
      let positions = [];
      let px = (y - (iwidth / 2)) / 2;
      let p1y = (x - 2 * space - 3 * iheight) / 2;
      let p2y = p1y + iheight + space;
      let p3y = p2y + iheight + space;
      positions[0] = {x: px, y: p1y};
      positions[1] = {x: px, y: p2y};
      positions[2] = {x: px, y: p3y};
      return positions;
  }

_sectionComp = (info) => {
  var txt = info.section.key;
  return <Text
    style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
}
renderShowMore() {
    if (this.state.showMore)
        return <TouchableOpacity style={styles.popupStyle} onPress={() => {
            this.setState({
                showMore: !this.state.showMore,
            });
        }}>
            <View style={styles.popChildStyle}></View>
        </TouchableOpacity>
    else {
        return null;
    }
}

renderContentZH(){
  let dataSource = this.props.mainStore.dataSource;
  let topDataSource = this.props.mainStore.topDataSource;
  let isNightMode = this.props.mainStore.nightMode;
  return (<View style = {{flex:1}}>
    <SectionList
      // renderSectionHeader={this._sectionComp}
      ListHeaderComponent = {() => <ViewPager imageDataArray = {topDataSource} onItemPress = {(item) =>{
          this.props.navigation.navigate("PageNewsDetail",{data:item});
        }}/>
      }
      renderItem={({item}) => <ListItem data={item} navigation={this.props.navigation} nightMode={isNightMode}/>}
      sections={dataSource}
      keyExtractor = {(item,index) => "index" + index + item}
      ItemSeparatorComponent={() => <View><Text></Text></View>}
    />
    </View>);
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    }
});
export default connect((state) => {
    return {
        mainStore: state.mainStore,
    }
})(PageMain);
