import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
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
import * as actions from './arcadeActions';
import * as storingActions from './LevelStorage/levelStorageActions'
import Store from '../../redux/store';
import Levels from "./arcadeGrids";
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');

class App extends React.Component {

    constructor(props) {
        super(props);
        if(Store.getState().ArcadeStoring.data.level == undefined && Store.getState().Arcade.data.level != undefined){ //vecchi salvataggi
          level = Store.getState().Arcade.data.level
        }else if(Store.getState().ArcadeStoring.data.level == undefined && Store.getState().Arcade.data.level == undefined){
          level = 0
        }else if(Store.getState().ArcadeStoring.data.level != undefined){
          level = Store.getState().ArcadeStoring.data.level
        }
        this.state = {
          level: level
        }
      }
      componentWillReceiveProps(nextProps){
       if(nextProps.data.win && this.state.level<nextProps.data.level){
           var newState = {
               level: this.state.level+1
           }
           this.setState(newState)
           this.props.storingActions.storing_level(newState)
       }  
      }
render () {
    const {navigate} = this.props.navigation;
    return (
        
        <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        {
          Levels.map((Levels, index)  => (
            <TouchableOpacity style={this.state.level >= Levels.level ? styles.buttonClicked: this.state.level+1 == Levels.level ? styles.button:styles.buttonDisabled} disabled = {(this.state.level+1 < Levels.level) ? true:false } key={index} onPress={() =>{ navigate('ArcadeMatch'); tracker.trackScreenView("Arcade Level "+Levels.level); this.props.actions.starting_arcade(Levels.level)}}> 
                <Text style={this.state.level+1 < Levels.level ? styles.buttonTextDisabled:styles.buttonText}>{Levels.level}</Text>
            </TouchableOpacity> 
          ))
        }
        </View>
        </ScrollView>
      );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
        
    },
    content: {    
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: "5%",
        paddingBottom: "8%"
    },
    buttonText: {
      textAlign: "center",
      color: "#FFF",
      fontWeight: "700"
    },
    buttonTextDisabled: {
        color: "#CDDAE2",
        textAlign: "center",
    },
    buttonClicked: {
        backgroundColor: "#0097EC",
        width:"18%",
        marginTop: 10,
        aspectRatio: 1,
        justifyContent: "center",
        borderWidth:1,
        borderColor:"black",
        borderRadius: 5
    },
    button: {
      backgroundColor: "#092D4B",
      width:"18%",
      marginTop: 10,
      aspectRatio: 1,
      justifyContent: "center",
      borderWidth:1,
      borderColor:"black",
      borderRadius: 5
    },
    buttonDisabled: {
        backgroundColor: "#336A8B",
        width:"18%",
        marginTop: 10,
        aspectRatio: 1,
        justifyContent: "center",
        borderWidth:1,
        borderColor:"black",
        borderRadius: 5
    }
  });
  
  function mapStateToProps(state) {
    return {data: state.Arcade.data, loading: state.Arcade.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch),
      storingActions: bindActionCreators(storingActions,dispatch)
      
    };
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);