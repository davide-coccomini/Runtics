import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {BackHandler} from 'react-native'
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


class App extends React.Component {

render () {
    const {navigate} = this.props.navigation;

    return (
        <View style={styles.container}>
         {this.props.loading
            ? <Spinner/>
            : null}
          <View behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require("../../images/logo.png")} />
            </View>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigate('Levels')}>
                <Text style={styles.buttonText}>NEW GAME</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigate('Levels')}>
                <Text style={styles.buttonText}>SCORES</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigate('Levels')}>
                <Text style={styles.buttonText}>SETTINGS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}  onPress={()=>{ return BackHandler.exitApp();}}>
                <Text style={styles.buttonText}>QUIT</Text>
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
      flexGrow: 0.3,
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
  
export default App;