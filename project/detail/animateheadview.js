'use strict'
import React,{PureComponent}from 'react';
import {View,Animate,StyleSheet,Easing,InteractionManager}from 'react-native';
class  AnimateHeadView extends PureComponent {
static defaultProps = {
  h:0,
};
  constructor(props) {
    super(props);
    this.state = {
      _abs_y:new Animated.Value(0),
    };
    this.close = this.close.bind(this);
    this.expand = this.expand.bind(this);
  }
  close(){
    Animated.timing(this.state._abs_y,{
      toValue:0-this.props.h,
      duration:100,
      easing:Easing.linear,
    }).start((result) => {

    });
  }
  expand(){
    Animated.timing(this.state._abs_y,{
      toValue:0,
      duration:100,
      easing:Easing.linear,
    }).start((result) => {});
  }
  render(){
    return(<Animated.View
      style={{...this.props.style,
      top:this.state._abs_y,}}>
      {this.props.children}
    </Animated.View>);
  }
}

export default AnimateHeadView;
