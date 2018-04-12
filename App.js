import {StyleSheet, ScrollView,Image, View, Button, BackgroundImage,StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import Navigation from './router';
import {Root} from "native-base";
import Navigator from './router';
import { Provider } from 'react-redux';
import Store from './redux/store';


export default class App extends Component {
  render() {
    return (
      <LinearGradient colors={['#164593', '#2b62bc', '#0073BB']} style={styles.linearGradient}>
       
      <Provider store={Store}>
        <Root style={styles.root}>
            <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
          />
          <Navigator/>
        </Root>
      </Provider>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
