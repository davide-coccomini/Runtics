import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,StatusBar} from 'react-native';
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
import * as actions from '../pages/Scores/scoresActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winEasy: props.matches.winEasy,
      lostEasy: props.matches.lostEasy,
      winMedium: props.matches.winMedium,
      lostMedium: props.matches.lostMedium,
      winHard: props.matches.winHard,
      lostHard: props.matches.lostHard,
      winVeryHard: props.matches.winVeryHard,
      lostVeryHard: props.matches.lostVeryHard,
      winInsane: props.matches.winInsane,
      lostInsane: props.matches.lostInsane,
      winImpossible: props.matches.winImpossible,
      lostImpossible: props.matches.lostImpossible,
    }
}


  componentWillReceiveProps(nextProps){
    console.log("nextttt",nextProps)
    var newState = {
        winEasy: nextProps.matches.winEasy,
        lostEasy: nextProps.matches.lostEasy,
        winMedium: nextProps.matches.winMedium,
        lostMedium: nextProps.matches.lostMedium,
        winHard: nextProps.matches.winHard,
        lostHard: nextProps.matches.lostHard,
        winVeryHard: nextProps.matches.winVeryHard,
        lostVeryHard: nextProps.matches.lostVeryHard,
        winInsane:  nextProps.matches.winInsane,
        lostInsane: nextProps.matches.lostInsane,
        winImpossible: nextProps.matches.winImpossible,
        lostImpossible: nextProps.matches.lostImpossible
    }
    this.setState(newState)
  }

  render() {
    return null
  }
}


function mapStateToProps(state) {
  return {data: state.Scores.data, loading: state.Scores.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
