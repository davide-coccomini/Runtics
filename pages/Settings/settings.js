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
import LocalizedStrings from 'react-native-localization';
import Strings from '../../components/localization';
import * as actions from './settingsActions'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Store from '../../redux/store';



class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        musicState:Store.getState().Settings.data
      }
    }
    
    componentWillReceiveProps(nextProps){
        var newState = {
            musicState: Store.getState().Settings.data
        }
        this.setState(newState)
    }
   
     render() {
        return (
            
            <View style={styles.container}>  
                <View style={styles.musicView}>
                    <View style={styles.descriptionView}>
                        <Text style={styles.musicText}>{Strings.settingsMusic}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}onPress={() => {this.props.actions.changing_music_state(2)}} ><Text style={styles.buttonText}>{this.state.musicState.disabled ? Strings.settingsButtonEnable:Strings.settingsButtonDisable}</Text></TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContainer}  onPress={() => {this.props.navigation.goBack();}} >
                <Text style={styles.buttonText}>{Strings.goBack}</Text>
              </TouchableOpacity>
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
      buttonContainer: {
        backgroundColor: "#092D4B",
        paddingVertical: 8,
        width:"80%",
        marginLeft:"10%",
        marginTop:5
      },
      footer: {
        alignSelf:"center",
        marginTop:"10%",
        minHeight:30
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