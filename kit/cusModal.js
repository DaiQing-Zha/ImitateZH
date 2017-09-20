'use strict';

import React,{PureComponent}from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  DeviceEventEmitter,
}from 'react-native';

import CommonStyles from './commonStyles';

export default class CusModal extends PureComponent {
  static defaultProps = {
    menuItems: [],
    renderCusChild: null,
    visible: false,
    animationType: 'fade',
  };
  constructor(props) {
    super(props);
    this._rendMenuContent = this._rendMenuContent.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  render(){
    return <Modal
      animationType={this.props.animationType}
      transparent={true}
      visible={this.props.visible}
      onRequestClose={()=>{

      }}>
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', ...StyleSheet.absoluteFillObject}}/>
          <TouchableOpacity style={styles.container} activeOpacity={1} onPress = {
            ()=> {
              this._close();
            }}>
            <View style={styles.modal}>
              {this.renderContent()}
            </View>
          </TouchableOpacity>
      </View>
    </Modal>
  }
  renderContent(){
    let {menuItems,renderCusChild} = this.props;
    if (menuItems && menuItems.length > 0) {
      return this._rendMenuContent(menuItems);
    }else if (renderCusChild) {
      return renderCusChild();
    }else{
      return null;
    }
  }
  _rendMenuContent(menuItems){

    return menuItems.map((item,index) => {
      return <TouchableOpacity key = {index} style = {styles.item} activeOpacity = {0.7} onPress = {()=>{
        item.click();
        this._close();
      }}>
      <Text style = {styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    });
  }

  _close(){
    DeviceEventEmitter.emit("modalDidChanged",{visible:false});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: CommonStyles.modalWith,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
  },
  itemText: {
    color: 'black',
    margin: 10,
    fontSize: 17,
  },
});
