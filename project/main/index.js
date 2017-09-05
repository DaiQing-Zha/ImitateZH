import React, { PureComponent } from 'react';
import Svg, {Rect,} from 'react-native-svg';
import {Header,CommonStyles} from 'kit';
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
    }
    this.calculateTopIconPosition = this.calculateTopIconPosition.bind(this);
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
    return (<View style={[styles.container]}>
        <Header
            renderLeft={this.renderTopBarLeft}
            renderRight={this.renderTopBarRight}
        />
        {this.renderContentZH()}
       {/* {this.renderShowMore()}*/}
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
          <TouchableOpacity key={'r2'} onPress={() => {
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

  _renderItem = (info) => {
  var txt = '  ' + info.item.title;
  return <Text
    style={ { height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}
    onPress={ () => {
      console.log("click item ----------");
        this.props.navigation.navigate('PageNewsDetail', {data: this.props.data});
    }}>{txt}</Text>
}
_sectionComp = (info) => {
  var txt = info.section.key;
  return <Text
    style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
}
  renderContent() {
    var sections = [
      { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },
      { key: "B", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
      { key: "C", data: [{ title: "成吉思汗" }, { title: "CCC" }] },
      { key: "W", data: [{ title: "王大锤" }, { title: "王二锤" }, { title: "王三锤" },{ title: "王小锤" }, { title: "王大爷" }, { title: "王八蛋" }] },
    ];
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          renderSectionHeader={this._sectionComp}
          renderItem={this._renderItem}
          sections={sections}
          keyExtractor = {(item,index) => "index" + index + item}
          ItemSeparatorComponent={() => <View><Text></Text></View>}
        />
      </View>
    );
  }

  renderContentZH(){
    let dataSource = this.props.mainStore.dataSource;
    return (<View style = {{flex:1}}>
      <SectionList
        renderSectionHeader={this._sectionComp}
        renderItem={({item}) => <ListItem data={item} navigation={this.props.navigation} />}
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
