import React, { PureComponent } from 'react';
import Svg, {Rect,} from 'react-native-svg';
import {Header,CommonStyles} from 'kit';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';

export default class PageMain extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
        headTitle: '首页',
    }
    this.calculateTopIconPosition = this.calculateTopIconPosition.bind(this);
    this.renderTopBarLeft = this.renderTopBarLeft.bind(this);
  }
  render() {
    return (<View style={[styles.container]}>
        <Header
            renderLeft={this.renderTopBarLeft}
            renderRight={this.renderTopBarRight}
        />
        {this.renderContent()}
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
  renderContent() {

  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    }
});
