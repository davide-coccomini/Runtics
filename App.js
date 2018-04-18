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
import Handler from './components/handler';
import MusicPlayer from './components/musicPlayer';
import { AppRegistry } from 'react-native';
import Sound from 'react-native-sound';
import * as settingsActions from './pages/Settings/settingsActions';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }


  render() {
    console.disableYellowBox = true;
    return (
      <Container>
         <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
            hidden={true}
          />
      <LinearGradient colors={['#164593', '#2b62bc', '#0073BB']} style={styles.linearGradient}>
      <Provider store={Store}>
        <Root style={styles.root}>
          <MusicPlayer />
          <Handler />
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
