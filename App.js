import {StyleSheet, SafeAreaView, ScrollView,Image, View, Button, BackgroundImage,StatusBar,AppState,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import Navigation from './router';
import {Root} from "native-base";
import Navigator from './router';
import { Provider } from 'react-redux';
import Store from './redux/store';
import {Container} from 'native-base';
import Banner from './components/banner';
import Handler from './components/handler';
import ScoresHandler from './components/scoresHandler';
import ZapicHandler from './components/ZapicHandler/zapicHandler';
import MusicPlayer from './components/musicPlayer';
import { AppRegistry } from 'react-native';
import LocalizedStrings from 'react-native-localization';
import Strings from './components/localization';
import Sound from 'react-native-sound';
import * as settingsActions from './pages/Settings/settingsActions';
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }
  componentDidMount() {
    SplashScreen.hide()
  }


  render() {
    console.disableYellowBox = true;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#164593'}}>
      <Container>
         <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
            hidden={true}
          />
      <LinearGradient colors={['#164593', '#2b62bc', '#0073BB']} style={styles.linearGradient}>
      <Provider store={Store}>
        <Root style={styles.root}>
          <ZapicHandler />
          <MusicPlayer />
          <Handler/>
          <ScoresHandler matches = {{   
            winEasy:0,
            lostEasy:0,
            timeEasy:0,
            bestTimeEasy:0,
            winMedium:0,
            lostMedium:0,
            timeMedium:0,
            bestTimeMedium:0,
            winHard:0,
            lostHard:0,
            timeHard:0,
            bestTimeHard:0,
            winVeryHard:0,
            lostVeryHard:0,
            timeVeryHard:0,
            bestTimeVeryHard:0,
            winInsane:0,
            lostInsane:0,
            timeInsane:0,
            bestTimeInsane:0,
            winImpossible:0,
            lostImpossible:0,
            timeImpossible:0,
            bestTimeImpossible:0
            }} />
          <Navigator/>
        </Root>
      </Provider>
      </LinearGradient>
      <Banner />
       </Container>
      </SafeAreaView>
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
