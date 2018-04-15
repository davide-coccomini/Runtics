import {StyleSheet, ScrollView,Image, View, Button, BackgroundImage,StatusBar,AppState,TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
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
import TrackPlayer from 'react-native-track-player';


  


export default class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        pause:false,
      };
     }
     render() {
        return (
            <View style={styles.container}>  
                <View style={styles.musicView}>
                    <View style={styles.descriptionView}>
                        <Text style={styles.musicText}>Music</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => manageMusic()} style={styles.button}><Text style={styles.buttonText}>{TrackPlayer.getState()?"DISABLE":"UNABLE"}</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
     }
}
function manageMusic(){
   if(TrackPlayer.getState()){
    TrackPlayer.stop()
    TrackPlayer.setVolume(0)
   }else{
    TrackPlayer.setVolume(0)
   }

 }

const styles = StyleSheet.create({

    container: {
        flex:1
    },
    musicView: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: 'rgb(180,180,180)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)',
    },
    descriptionView: {
        width:"60%"
    },
    buttonView: {
        width:"40%",
    },
    musicText: {
        color:"white",
        fontWeight:"bold",
        textAlign:"left",
        fontSize:23
    },
      button: {
        padding: 7,
        backgroundColor: "#092D4B",
     },
      buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700"
      },


})
