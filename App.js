import {StyleSheet, ScrollView,Image, View, Button, BackgroundImage,StatusBar,AppState} from 'react-native';
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
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';




export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pause:false,
      appState: AppState.currentState
    };

    AppRegistry.registerComponent('example', () => App);
    TrackPlayer.registerEventHandler(module.exports = async (data) => {
      if(data.type == 'playback-state') {
          TrackPlayer.play();
      }else if(data.state==2){
        TrackPlayer.stop()
        console.log("ciao")
      }else{}
        
      console.log("data",data.state)
  });
    // Creates the player
    TrackPlayer.setupPlayer().then(async () => {
    
        // Adds a track to the queue
        await TrackPlayer.add({
            id: '1',
            url: require('./music/background.mp3'),
        });
        TrackPlayer.updateOptions({
          stopWithApp: true
      });
        TrackPlayer.setVolume(0.5);
        // Starts playing it
        TrackPlayer.play();
        

    });
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      TrackPlayer.stop()
    }
    this.setState({appState: nextAppState});
  }
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
    width:"100%"
  },
  banner: {
    alignSelf: 'stretch',
  }
});
