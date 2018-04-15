import {StyleSheet, ScrollView,Image, View, Button, BackgroundImage,StatusBar,AppState,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import Navigation from './router';
import {Root} from "native-base";
import Navigator from './router';
import { Provider } from 'react-redux';
import Store from './redux/store';
import {Container} from 'native-base';
import Banner from './components/banner';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';




export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pause:false,
      appState: AppState.currentState
    }
    AppRegistry.registerComponent('backgroundMusic', () => App);
    TrackPlayer.registerEventHandler(module.exports = async (data) => {
      switch(data.type) {
        case 'remote-play':
            TrackPlayer.play();
            break;
        case 'remote-pause':
            TrackPlayer.pause();
            break;
        case 'remote-stop':
            TrackPlayer.stop();
            break;
        case 'remote-next':
            TrackPlayer.skipToNext();
            break;
        case 'remote-previous':
            TrackPlayer.skipToPrevious();
            break;
        case 'remote-seek':
            TrackPlayer.seekTo(data.position);
            break;
      
  
     
    }
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
      TrackPlayer.setVolume(0.4);
      // Starts playing it
      TrackPlayer.play();
  });
  }
 
     
    componentDidMount(){
      AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount(){
      AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange(currentAppState) {
      if(currentAppState == "background") {
        TrackPlayer.setVolume(0);
      } 
      if(currentAppState == "active") {
        TrackPlayer.setVolume(0.4);
      }
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
      <Banner />
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
  
});
