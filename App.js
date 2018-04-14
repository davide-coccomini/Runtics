import {StyleSheet, ScrollView,Image, View, Button, BackgroundImage,StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import Navigation from './router';
import {Root} from "native-base";
import Navigator from './router';
import { Provider } from 'react-redux';
import Store from './redux/store';
import {Container} from 'native-base'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

export default class App extends Component {
  render() {
    return (
      <Container>
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
      <View style={styles.bannerContent}>
         <AdMobBanner style={styles.banner}
         adSize="fullBanner"
         adUnitID="ca-app-pub-7269857134561204/8704787773"
         testDevices={[AdMobBanner.simulatorId]}
         onAdFailedToLoad={error => console.error(error)}/>
       </View>
       </Container>
    );
  }
}
const audio_options = {
  source:{local: require('./music/background.mp3')}  
}
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height:"100%",
    paddingRight:15,
    paddingLeft:15
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  bannerContent: {
    alignSelf: 'stretch',
    textAlign: 'center',
    width:"100%"
  },
  banner: {
    alignSelf: 'stretch',
    textAlign: 'center',
  }
});
