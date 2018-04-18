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

import * as actions from './settingsActions'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Store from '../../redux/store';



class App extends Component {
    constructor(props){
      super(props)
      console.log("initialState",Store.getState().Settings.data)
      this.state = {
        musicState:Store.getState().Settings.data
      }
    }
    
    componentWillReceiveProps(nextProps){
        var newState = {
            musicState: Store.getState().Settings.data
        }
        console.log("new",newState)
        this.setState(newState)
    }
   
     render() {
        return (
            
            <View style={styles.container}>  
                <View style={styles.musicView}>
                    <View style={styles.descriptionView}>
                        <Text style={styles.musicText}>Music</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}onPress={() => {this.props.actions.changing_music_state(2)}} ><Text style={styles.buttonText}>{this.state.musicState.disabled ? "ENABLE":"DISABLE"}</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Royalty Free Music from Bensound{"\n"}App created by Davide Coccomini</Text>
                </View>
            </View>
        )
     }
}



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


function mapStateToProps(state) {
    return {data: state.Settings.data, loading: state.Settings.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  