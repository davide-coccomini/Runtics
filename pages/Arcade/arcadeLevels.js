import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,Dimensions} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {
  Text
} from 'native-base';
import * as actions from './arcadeActions';
import Strings from '../../components/localization';
import * as storingActions from './LevelStorage/levelStorageActions';
import * as tutorialActions from '../Tutorial/tutorialActions';
import Store from '../../redux/store';
import Levels1 from "./Grids/arcadeGrids1";
import Levels2 from "./Grids/arcadeGrids2";
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');

class App extends React.Component {
    constructor(props) {
        super(props);
            if(Store.getState().ArcadeStoring.data.level == undefined && Store.getState().Arcade.data.level != undefined){ //vecchi salvataggi
              level = Store.getState().Arcade.data.level
              var newState = {
                level: level
              }
              this.props.storingActions.storing_level(newState)
            }else if(Store.getState().ArcadeStoring.data.level == undefined && Store.getState().Arcade.data.level == undefined){
              level = 0
            }else if(Store.getState().ArcadeStoring.data.level != undefined){
              level = Store.getState().ArcadeStoring.data.level
            }
          if(Store.getState().ArcadeStoring.data.levelDiagonal == undefined && Store.getState().Arcade.data.levelDiagonal == undefined){
            levelDiagonal = 0
          }else if(Store.getState().ArcadeStoring.data.levelDiagonal != undefined){
            levelDiagonal = Store.getState().ArcadeStoring.data.levelDiagonal
          }
          
          this.state = {
            modality: props.modality.payload,
            level: level,
            levelDiagonal: levelDiagonal,
            updated: true
          }
        }
      componentWillReceiveProps(nextProps){
        var newState
        console.log("updated", this.state.updated)
        if(nextProps.modality.payload == 1){
          if(nextProps.data.win && this.state.level<nextProps.data.level && this.state.updated == false){
              newState = {
                  modality: nextProps.modality.payload,
                  level: this.state.level+1,
                  levelDiagonal: this.state.levelDiagonal,
                  updated: true
              }
          
          }else{
            newState = {
              modality: nextProps.modality.payload,
              level: this.state.level,
              levelDiagonal: this.state.levelDiagonal,
              updated: false
            }
          }
        }else{
          if(nextProps.data.win && this.state.levelDiagonal<nextProps.data.level && this.state.updated == false){
            newState = {
                modality: nextProps.modality.payload,
                level: this.state.level,
                levelDiagonal: this.state.levelDiagonal+1,
                updated: true
            }
        
        }else{
          newState = {
            modality: nextProps.modality.payload,
            level: this.state.level,
            levelDiagonal: this.state.levelDiagonal,
            updated: false
          }
        }
        }
       this.setState(newState)
       this.props.storingActions.storing_level(newState)
      }
render () {
    const {navigate} = this.props.navigation;
    const state = this.state;
    const {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    } = Dimensions.get('window');
    const Levels = state.modality == 1 ? Levels1:Levels2;
    return (
      
        <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        <View style={styles.titleContent}>
          <Text style={styles.titleText}>{Strings.arcadeLevelTitle}</Text>
        </View>
        {state.modality == 1 ? (
          Levels.map((Levels, index)  => (
            <TouchableOpacity style={this.state.level >= Levels.level ? styles.buttonClicked: this.state.level+1 == Levels.level ? styles.button:styles.buttonDisabled} disabled = {(this.state.level+1 < Levels.level) ? true:false } key={index} onPress={() =>{ this.state.updated = false; navigate('ArcadeMatch'); tracker.trackScreenView("Arcade Level "+Levels.level); this.props.actions.starting_arcade({level: Levels.level, modality: this.state.modality}); this.props.tutorialActions.making_tutorial()}}> 
                <Text style={[this.state.level+1 < Levels.level ? styles.buttonTextDisabled:styles.buttonText,{fontSize:SCREEN_WIDTH*0.05}]}>{this.state.level+1 < Levels.level ? "🔒":Levels.level}</Text>
            </TouchableOpacity> 
          ))
        ):(
          Levels.map((Levels, index)  => (
            <TouchableOpacity style={this.state.levelDiagonal >= Levels.level ? styles.buttonClicked: this.state.levelDiagonal+1 == Levels.level ? styles.button:styles.buttonDisabled} disabled = {(this.state.levelDiagonal+1 < Levels.level) ? true:false } key={index} onPress={() =>{this.state.updated = false; navigate('ArcadeMatch'); tracker.trackScreenView("Arcade Level "+Levels.level); this.props.actions.starting_arcade({level: Levels.level, modality: this.state.modality}); this.props.tutorialActions.making_tutorial()}}> 
                <Text style={[this.state.levelDiagonal+1 < Levels.level ? styles.buttonTextDisabled:styles.buttonText,{fontSize:SCREEN_WIDTH*0.05}]}>{this.state.levelDiagonal+1 < Levels.level ? "🔒":Levels.level}</Text>
            </TouchableOpacity> 
          ))
        )
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
    titleContent:{
      width:"100%"
    },
    titleText:{
      color:"white",
      fontWeight:"700",
      textAlign:"center",
      fontSize:23
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
    return {data: state.Arcade.data, loading: state.Arcade.loading,
            modality: state.Modality.data, loading: state.Modality.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch),
      storingActions: bindActionCreators(storingActions,dispatch),
      tutorialActions: bindActionCreators(tutorialActions,dispatch)
    };
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);