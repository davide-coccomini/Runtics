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
import Strings from '../../components/localization';
import * as actions from '../Match/matchActions';
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');
var Analytics = require('react-native-firebase-analytics');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modality: props.data.payload,
          matrix:[]
        }
      }
componentWillMount(){
  Analytics.logEvent('Levels', {
    'Levels': 'Quick Match'
  });
}
componentWillReceiveProps(nextProps){
  console.log("call")
  state = {modality: nextProps.data.payload}
  this.setState(state)
}
render () {
    const {navigate} = this.props.navigation;
    const state = this.state;
    return (
        <View style={styles.container}>
         
          <View behavior="padding" style={styles.container}>
          <View style={styles.titleContent}>
            <Text style={styles.titleText}>{Strings.levelsTitle}</Text>
          </View>
              <TouchableOpacity style={styles.buttonContainerEasy}  onPress={() =>{ navigate('Match'); tracker.trackScreenView("Match Easy"); this.props.actions.starting_game({level: 1,modality: state.modality});}}>
                <Text style={styles.buttonText}>EASY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerMedium}  onPress={() =>{ navigate('Match'); tracker.trackScreenView("Match Medium"); this.props.actions.starting_game({level: 2,modality: state.modality});}}>
                <Text style={styles.buttonText}>MEDIUM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerHard}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Hard"); this.props.actions.starting_game({level: 3,modality: state.modality});}}>
                <Text style={styles.buttonText}>HARD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerVeryHard}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Very Hard"); this.props.actions.starting_game({level: 4,modality: state.modality});}}>
                <Text style={styles.buttonText}>VERY HARD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerInsane}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Insane"); this.props.actions.starting_game({level: 5,modality: state.modality});}}>
                <Text style={styles.buttonText}>INSANE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainerImpossible}  onPress={() => { navigate('Match'); tracker.trackScreenView("Match Impossible"); this.props.actions.starting_game({level: 6,modality: state.modality});}}>
                <Text style={styles.buttonText}>IMPOSSIBLE</Text>
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
      marginTop: 35
    },
    titleText:{
      color:"white",
      fontWeight:"700",
      textAlign:"center",
      fontSize:23
    },
    buttonContainerEasy: {
      backgroundColor: "#29c100",
      paddingVertical: 15,
      width:"80%",
      marginLeft:"10%",
      marginTop:25
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
    return {data: state.Modality.data, loading: state.Modality.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  