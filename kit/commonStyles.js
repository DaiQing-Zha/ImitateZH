'use strict';
import {Platform, StyleSheet} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const APPBAR_BACKGROUND_COLOR = 'rgb(27,163,234)';   //topBar的背景色

const CommonStyles = {
    appColor: APPBAR_BACKGROUND_COLOR,
    topBarIconStyle: {
        width: 30,
        height: 30,
        margin:10,
    },

    topBarTextStyle: {
        fontSize: 17,
        color: '#fff',
        margin: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
}
export default CommonStyles;
