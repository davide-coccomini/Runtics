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
      timeEasy: props.matches.timeEasy,
      bestTimeEasy: props.matches.bestTimeEasy,

      winMedium: props.matches.winMedium,
      lostMedium: props.matches.lostMedium,
      timeMedium: props.matches.timeMedium,
      bestTimeMedium: props.matches.bestTimeMedium,

      winHard: props.matches.winHard,
      lostHard: props.matches.lostHard,
      timeHard: props.matches.timeHard,
      bestTimeHard: props.matches.bestTimeHard,

      winVeryHard: props.matches.winVeryHard,
      lostVeryHard: props.matches.lostVeryHard,
      timeVeryHard: props.matches.timVeryHard,
      bestTimeVeryHard: props.matches.bestTimeVeryHard,

      winInsane: props.matches.winInsane,
      lostInsane: props.matches.lostInsane,
      timeInsane: props.matches.timeInsane,
      bestTimeInsane: props.matches.bestTimeInsane,
      
      winImpossible: props.matches.winImpossible,
      lostImpossible: props.matches.lostImpossible,
      timeImpossible: props.matches.timeImpossible,
      bestTimeImpossible: props.matches.bestTimeImpossible
    }
}


  componentWillReceiveProps(nextProps){
    var newState = {
        winEasy: nextProps.matches.winEasy,
        lostEasy: nextProps.matches.lostEasy,
        timeEasy: nextProps.matches.timeEasy,
        bestTimeEasy: nextProps.matches.bestTimeEasy,

        winMedium: nextProps.matches.winMedium,
        lostMedium: nextProps.matches.lostMedium,
        timeMedium: nextProps.matches.timeMedium,
        bestTimeMedium: nextProps.matches.bestTimeMedium,

        winHard: nextProps.matches.winHard,
        lostHard: nextProps.matches.lostHard,
        timeHard: nextProps.matches.timeHard,
        bestTimeHard: nextProps.matches.bestTimeHard,

        winVeryHard: nextProps.matches.winVeryHard,
        lostVeryHard: nextProps.matches.lostVeryHard,
        timeVeryHard: nextProps.matches.timeVeryHard,
        bestTimeVeryHard: nextProps.matches.bestTimeVeryHard,

        winInsane:  nextProps.matches.winInsane,
        lostInsane: nextProps.matches.lostInsane,
        timeInsane: nextProps.matches.timeInsane,
        bestTimeInsane: nextProps.matches.bestTimeInsane,

        winImpossible: nextProps.matches.winImpossible,
        lostImpossible: nextProps.matches.lostImpossible,
        timeImpossible: nextProps.matches.timeImpossible,
        bestTimeImpossible: nextProps.matches.bestTimeImpossible,
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
