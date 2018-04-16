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
import {updatePlayBack} from './settingsActions'

import * as actions from './settingsActions'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
  


export default class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        pause:false,
      };
     }
     
        componentWillUnmount() {
            AppState.removeEventListener('change', this._handleStateChange);
        }
    

    
     _playPause() {
        if(this.props.state == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }
     render() {
        return (
            <View style={styles.container}>  
                <View style={styles.musicView}>
                    <View style={styles.descriptionView}>
                        <Text style={styles.musicText}>Music</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this._playPause.bind(this)} style={styles.button}><Text style={styles.buttonText}>{this.props.state == TrackPlayer.STATE_PAUSED?"ENABLE":"DISABLE"}</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Royalty Free Music from Bensound{"\n"}App created by Davide Coccomini</Text>
                </View>
            </View>
        )
     }
}

function mapStateToProps(state) {
    console.log("state",state)
    return {
        state: state.Settings.state
    };
}

module.exports = connect(mapStateToProps)(App);

const styles = StyleSheet.create({

    container: {
        flex:1,
        marginTop:25
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
      footer: {
        alignSelf:"center",
        marginTop:"120%"
      },
      footerText: {
        color:"white",
        fontSize:10,
        textAlign:"center"
      }
})
