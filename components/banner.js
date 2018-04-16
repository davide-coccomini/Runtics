import {StyleSheet, ScrollView,Image, View, Button, BackgroundImage,StatusBar,AppState,Alert} from 'react-native';
import React, {Component} from 'react';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'


export default class App extends Component {
    render() {

        return (
            <View style={styles.bannerContent}>
            <AdMobBanner style={styles.banner}
            adSize="fullBanner"
            adUnitID="ca-app-pub-7269857134561204/8704787773"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}/>
            </View>
        )
    }

}



const styles = StyleSheet.create({
bannerContent: {
    alignSelf: 'stretch',
    width:"100%"
  },
  banner: {
    alignSelf: 'stretch',
  }
});