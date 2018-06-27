import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,StatusBar} from 'react-native';
import React, {Component} from 'react';
import LocalizedStrings from 'react-native-localization';
import Strings from '../../components/localization';
import {connect} from "react-redux";
import * as actions from './tutorialActions';
import {bindActionCreators} from 'redux';
import Store from '../../redux/store';
import {
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
  H1,
  Container
} from 'native-base';

class App extends React.Component {
render () {
    const {navigate} = this.props.navigation;
    const state = this.state;
    return (
        <Container style={styles.container}>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button}  onPress={() => {navigate('Tutorial'); this.props.actions.making_tutorial()}}>
                <Text style={styles.buttonText}>{Strings.homeHowToPlay}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.buttonText}>{Strings.firstTutorialText}</Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button}  onPress={() => {navigate('Levels'); this.props.actions.making_tutorial()}}>
                <Text style={styles.buttonText}>{Strings.homeNewGame}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}  onPress={() => {navigate('Arcade'); this.props.actions.making_tutorial()}}>
                <Text style={styles.buttonText}>{Strings.homeArcade}</Text>
              </TouchableOpacity>
            </View>
        </Container>
    );
}
_renderDotIndicator() {
    return <PagerDotIndicator pageCount={4} />;
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    topText:{
        marginTop:"10%"
    },
    text: {
        marginTop:0,
        alignSelf:"center",
        textAlign:"center",
        color:"white"
    },
      buttonView: {
        flex:1,
        marginTop:"2%"
      },
      button: {
          backgroundColor: "#092D4B",
          width:"80%",
          height:50,
          paddingVertical: 15,
          alignSelf:"center",
          marginTop:15
        },
      buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700"
      },
  });
  




  function mapStateToProps(state) {
    return {data: state.Tutorial.data, loading: state.Tutorial.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);