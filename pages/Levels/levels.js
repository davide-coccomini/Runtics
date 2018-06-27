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
import LocalizedStrings from 'react-native-localization';
import Strings from '../../components/localization';
import * as actions from '../Match/matchActions';
import * as tutorialActions from '../Tutorial/tutorialActions';
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          matrix:[]
        }
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
            
            </View>
              <TouchableOpacity style={styles.buttonContainerEasy}  onPress={() =>{ navigate('Match'); tracker.trackScreenView("Match Easy"); this.props.actions.starting_game(1); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>EASY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerMedium}  onPress={() =>{ navigate('Match'); tracker.trackScreenView("Match Medium"); this.props.actions.starting_game(2); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>MEDIUM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerHard}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Hard"); this.props.actions.starting_game(3); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>HARD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerVeryHard}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Very Hard"); this.props.actions.starting_game(4); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>VERY HARD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerInsane}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Insane"); this.props.actions.starting_game(5); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>INSANE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerImpossible}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Impossible"); this.props.actions.starting_game(6); this.props.tutorialActions.making_tutorial()}}>
                <Text style={styles.buttonText}>IMPOSSIBLE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => {this.props.navigation.goBack();}} >
                <Text style={styles.buttonText}>{Strings.goBack}</Text>
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
      flexGrow: 0.30,
      marginTop:5,
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
      paddingVertical: 8,
      width:"80%",
      marginLeft:"10%",
      marginTop:15
    },
    buttonContainerEasy: {
      backgroundColor: "#29c100",
      paddingVertical: 15,
      width:"80%",
      marginLeft:"10%",
      marginTop:5
    },
    buttonContainerMedium: {
        backgroundColor: "#e57914",
        paddingVertical: 15,
        width:"80%",
        marginLeft:"10%",
        marginTop:5
    },
    buttonContainerHard:{
        backgroundColor: "#d30404",
        paddingVertical: 15,
        width:"80%",
        marginLeft:"10%",
        marginTop:5
    },
    buttonContainerVeryHard:{
      backgroundColor: "#791900",
      paddingVertical: 15,
      width:"80%",
      marginLeft:"10%",
      marginTop:5
    },
    buttonContainerInsane:{
        backgroundColor: "#b800c1",
        paddingVertical: 15,
        width:"80%",
        marginLeft:"10%",
        marginTop:5
    },
    buttonContainerImpossible:{
      backgroundColor: "#050505",
      paddingVertical: 15,
      width:"80%",
      marginLeft:"10%",
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
  