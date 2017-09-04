import AppRoute from './routes';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import {
  Text,
  View,
} from 'react-native';

const rootStore = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Provider store={rootStore}>
            <AppRoute/>
        </Provider>);
    }
}

export default App;
