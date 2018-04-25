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
            //adUnitID="ca-app-pub-3940256099942544/6300978111" //TEST
            testDevices={[AdMobBanner.simulatorId,"C662FD490DFFA8C7A5F955A5611FFF81","3AF4D8E43DC30789019E9C68B1DD784C"]}
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