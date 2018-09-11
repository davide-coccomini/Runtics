import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Strings from '../../components/localization';
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
          <View style={styles.titleContent}>
            <Text style={styles.titleText}>{Strings.modalityTitle}</Text>
          </View>
            <View style={styles.titleContent}>
              <Text style={styles.subTitleText}>{Strings.modalitySubTitle1}</Text>
            </View>
              <TouchableOpacity style={styles.buttonContainerHalf}  onPress={() =>{ navigate('Levels'); tracker.trackScreenView("Levels"); this.props.actions.setting_modality(1); this.props.tutorialActions.making_tutorial()}}>
               <Image style={styles.buttonImage} source={require("../../images/modality1.png")}/>
              </TouchableOpacity>
              <View style={styles.titleContent}>
                <Text style={styles.subTitleText}>{Strings.modalitySubTitle2}</Text>
              </View>
              <TouchableOpacity style={styles.buttonContainerHalf}  onPress={() =>{ navigate('Levels'); tracker.trackScreenView("Levels"); this.props.actions.setting_modality(2); this.props.tutorialActions.making_tutorial()}}>
              <Image style={styles.buttonImage} source={require("../../images/modality2.png")}/>
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
      titleContent:{
        width:"100%",
        marginTop: 25
      },
      titleText:{
        color:"white",
        fontWeight:"700",
        textAlign:"center",
        fontSize:23
      },
      subTitleText:{
        color:"white",
        fontWeight:"700",
        textAlign:"center",
        fontSize:17
      },
      buttonContainer: {
        backgroundColor: "#092D4B",
        paddingVertical: 15,
        width:"80%",
        marginLeft:"10%",
        marginTop:5
      },
      buttonContainerHalf: {
        //backgroundColor: "#092D4B",
        paddingVertical: 12,
        width:"100%",
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
        width: 155,
        height: 155,
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
  