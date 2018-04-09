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
  Separator,
  H1
} from 'native-base';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          matrix:[]
        }
      }
render () {
    const {navigate} = this.props.navigation;

    return (
        <View style={styles.container}>
         {this.props.loading
            ? <Spinner/>
            : null}
          <View behavior="padding" style={styles.container}>
            <View style={styles.header}>
                <H1>GAME OVER</H1>
                <Content>
                    <Left>
                        <Text>SCORE:</Text>
                        <Text>0</Text>
                    </Left>
                    <Right>
                        <Text>BEST SCORE:</Text>
                        <Text>122</Text>
                    </Right>
                </Content>
            </View>
              <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigate('Levels')}>
                <Text style={styles.buttonText}>PLAY AGAIN</Text>
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
    header:{
        alignItems:"center",
        justifyContent:"center"
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