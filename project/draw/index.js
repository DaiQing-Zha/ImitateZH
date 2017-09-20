import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {CommonStyles} from 'kit';

class MainDraw extends Component {
  render() {
    let nightMode = this.props.nightMode;
    return (
      <View style={[styles.container,{backgroundColor:nightMode?'#343434':CommonStyles.appColor}]}>
        <Text style={styles.welcome}>
          侧滑栏
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyles.appColor,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
});
export default connect((state) => {
  return {
    nightMode:state.mainStore.nightMode
  }
})(MainDraw);
