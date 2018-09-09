import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Store from '../../redux/store';
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
import * as actions from '../Modality/modalityActions';
import * as tutorialActions from '../Tutorial/tutorialActions';
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');
var Analytics = require('react-native-firebase-analytics');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          matrix:[]
        }
      }
componentWillMount(){
  Analytics.logEvent('Levels', {
    'Levels': 'Quick Match'
  });
}
render () {
    const {navigate} = this.props.navigation;
    if(Store.getState().Tutorial.data==0 || Store.getState().Tutorial.data==undefined){ // Chiedi se vuole fare il tutorial
      navigate("FirstTutorial")
    }
    return (
        <View style={styles.container}>
         
          <View behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require("../../images/logo.png")} />
            </View>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() =>{ navigate('Levels'); tracker.trackScreenView("Levels"); this.props.actions.setting_modality(1); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>CLASSIC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() =>{ navigate('Levels'); tracker.trackScreenView("Levels"); this.props.actions.setting_modality(2); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>WITH DIAGONAL</Text>
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
  
  function mapStateToProps(state) {
    return {data: state.Match.data, loading: state.Match.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch),
      tutorialActions: bindActionCreators(tutorialActions,dispatch)
    };
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  