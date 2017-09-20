'use strict';
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  PixelRatio,
  InteractionManager,
  DeviceEventEmitter,
} from 'react-native';
import Svg,{LinearGradient,Rect,Defs,Stop} from 'react-native-svg';
import {Header,CommonStyles,CusWebView,Loading} from 'kit';
import {action_getDetilNewsData,action_getDetailNewsExtra} from './rd';
import AnimateHeadView from './animateheadview';

let headImgHeight = 0;
let o_headCoverHeight = 256;
let o_topMargin = CommonStyles.appBarHeight;

let headCoverHeight = o_headCoverHeight;
let topMargin = o_topMargin;
let lasty = 0;

class NewsDetail extends PureComponent {

  static defaultProps = {
    newsId: 0,
  };
  constructor(props){
    super(props);
    headImgHeight = o_headCoverHeight - CommonStyles.appBarHeight;
    this.state = {
      collect:false,
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(action_getDetilNewsData(this.props.navigation.state
        .params.data.id,this.props.nightMode));
      // this.props.dispatch(action_getDetailNewsExtra(this.props.navigation.state
      //   .params.data.id));
    });
  }
  onScroll(dy){
    if (dy >= PixelRatio.getPixelSizeForLayoutSize(o_headCoverHeight)) {
      this.refs.coverParentView && this.refs.coverParentView.setNativeProps({
        style:{
          height:0,
        }
      });
      this.refs.headView && this.refs.headView.close();
    }else {
      let _headCoverHeight =
       (PixelRatio.getPixelSizeForLayoutSize(o_headCoverHeight) - dy) / PixelRatio.get();
      let _topMargin =
       (PixelRatio.getPixelSizeForLayoutSize(o_topMargin) - dy / 2) / PixelRatio.get();
      this.refs.coverParentView && this.refs.coverParentView.setNativeProps({
        style:{
          height:_headCoverHeight,
        }
      });
      this.refs.coverParentView && this.refs.coverChildView.setNativeProps({
        style:{
          marginTop:_topMargin,
        }
      });
    }
    if (dy - lasty < 0) {
      this.refs.headView && this.refs.headView.expang();
    }
    lasty = dy;
  }
  render() {
      let targetId = this.props.navigation.state.params.data.id;
      let storeId = this.props.newDetailStore.newsData.id;
      let isSameNews = targetId === storeId;
      return (<View style={styles.container}>
        {isSameNews ? this.renderContent() : <Loading showLoading={true}/>}
        {isSameNews && this.props.newDetailStore.newsData.image ? this.renderCoverHeader() : null}

      </View>);
      //    DeviceEventEmitter.emit('modalDidChanged', {visible: true, renderCusChild:this._renderShareDialog()});
  }

  renderCoverHeader(){
    let imgUrl = this.props.newDetailStore.newsData.image;
    let title = this.props.newDetailStore.newsData.title;
    let image_source = this.props.newDetailStore.newsData.image_source;
    // console.log("图片地址：", imgUrl);
    return <View
        ref="coverParentView"
        style={{...StyleSheet.absoluteFillObject, height: headCoverHeight, backgroundColor: '#fff'}}>
        <View
            ref="coverChildView"
            style={{
                marginTop: topMargin,
                width: Dimensions.get('window').width,
                height: headImgHeight
            }}>
            <Image
                style={{width: Dimensions.get('window').width, height: headImgHeight}}
                resizeMode='cover'
                source={{uri: imgUrl}}
            />
            {/*{this.renderCoverView(imgItem.title)}*/}

            <View style={[StyleSheet.absoluteFillObject]}>
                <Svg
                    width={Dimensions.get('window').width}
                    height={headCoverHeight}
                >
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1={headCoverHeight / 3} x2="0" y2={headCoverHeight}>
                            <Stop offset="0" stopColor="#555555" stopOpacity="0"/>
                            <Stop offset="1" stopColor="#000000" stopOpacity="1"/>
                        </LinearGradient>
                    </Defs>
                    <Rect
                        x="0"
                        y="0"
                        width={Dimensions.get('window').width}
                        height={headCoverHeight}
                        fill="url(#grad)"
                    />
                </Svg>
            </View>
            <View style={[StyleSheet.absoluteFillObject, {flex: 1, justifyContent: 'flex-end'}]}>
                <Text style={styles.coverTextStyle}>{title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{color: '#AEA29E', fontSize: 14, margin: 10, marginTop: 0}}>{image_source}</Text>
                </View>

            </View>
        </View>
    </View>
  }
  renderContent(){
    let htmlContent = this.props.newDetailStore.newsData.body;
    return htmlContent ? (<View style={{flex:1}}>
      <CusWebView
      html={htmlContent}
      onScroll={(dy) => this.onScroll(dy)}
      style={styles.webView}/>
      </View>):null;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView:{
    flex:1,
    paddingTop:CommonStyles.appBarHeight,
  },
  coverTextStyle:{
    color:'#fff',
    fontSize:22,
    marginLeft:20,
    marginRight:20,
    marginBottom:5,
  }
});

export default connect((state) => {
    return {
        newDetailStore: state.newDetailStore,
        nightMode:state.mainStore.nightMode,
    }
})(NewsDetail);
