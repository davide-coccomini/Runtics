import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,StatusBar} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {BackHandler} from 'react-native'
import * as tutorialActions from '../Tutorial/tutorialActions';
import {
  Container,
  Header,
  Content,
  List,
  Toast,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Spinner,
  Separator
} from 'native-base';
import LocalizedStrings from 'react-native-localization';
import Strings from '../../components/localization';
import * as actions from './homeActions';
import * as zapicActions from '../../components/ZapicHandler/zapicHandlerActions';
import Store from '../../redux/store';
import {rehydration} from '../../redux/store';
import Zapic from '../../components/zapic';
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');

tracker.trackScreenView("Home")

class App extends React.Component {
render () {
    const {navigate} = this.props.navigation;
    
    return (
     
        <View style={styles.container}>
          <View behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require("../../images/logo.png")} />
            </View>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => {navigate('Modality'); tracker.trackScreenView("Modality"); this.props.zapicActions.processing_first_upload();}}>
                <Text style={styles.buttonText}>{Strings.homeNewGame}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => {navigate('Arcade'); tracker.trackScreenView("Arcade")}}>
                <Text style={styles.buttonText}>{Strings.homeArcade}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => {navigate('Tutorial'); tracker.trackScreenView("Tutorial"); this.props.actions.making_tutorial(1)}}>
                <Text style={styles.buttonText}>{Strings.homeHowToPlay}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => {navigate('Scores'); tracker.trackScreenView("Scores")}}>
                <Text style={styles.buttonText}>{Strings.homeScores}</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row',alignItems:"center", alignSelf:"center", width:"80%"}}>
                <TouchableOpacity style={styles.buttonContainerHalf}  onPress={() => {Zapic.showDefaultPage();  tracker.trackScreenView("Multiplayer");  this.props.zapicActions.processing_first_upload()}}>
                  <Image style={styles.buttonImage} source={require("../../images/zapic.png")}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainerHalf, {marginLeft:"1%"}]}  onPress={() => {navigate('Settings'); tracker.trackScreenView("Settings")}}>
                 <Image style={styles.buttonImage} source={require("../../images/gear.png")}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.buttonContainer}  onPress={()=>{ return BackHandler.exitApp();}}>
                <Text style={styles.buttonText}>{Strings.homeQuit}</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    logoContainer: {
      alignItems: "center",
      flexGrow: 0.32,
      marginTop:35,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom:15
    },
    logo: {
      flex: 0.7,
      resizeMode: 'contain',
    },
    buttonContainer: {
      backgroundColor: "#092D4B",
      paddingVertical: 15,
      width:"80%",
      marginLeft:"10%",
      marginTop:5
    },
    buttonContainerHalf: {
      backgroundColor: "#092D4B",
      paddingVertical: 12,
      width:"49%",
    
      marginTop:5
    },
    buttonText: {
      textAlign: "center",
      color: "#FFF",
      fontWeight: "700"
    },
    button: {
      backgroundColor: "#092D4B",
      paddingVertical: 15,
    },
    buttonImage: {
      alignSelf:"center",
      width: 25,
      height: 25,
      resizeMode: 'contain' 
    }
  });
/* 
  function mapStateToProps(state) {
    return {data: state.Home.data, loading: state.Home.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }*/
  
  function mapStateToProps(state) {
    return {data: state.Tutorial.data, loading: state.Tutorial.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(tutorialActions, dispatch),
      zapicActions: bindActionCreators(zapicActions,dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);