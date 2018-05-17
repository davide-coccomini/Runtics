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

import Store from '../redux/store';
import * as actions from '../pages/Arcade/arcadeActions';

class App extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            score: props.score,
            maxScore: props.maxScore
        }
      }
      componentWillReceiveProps(nextProps){
          var newState = {
            score: nextProps.data.score,
            maxScore: nextProps.data.maxScore
          }
          this.setState(newState)     
      }
      getScore(){
        return this.score
      }


render () {
    const state = this.state;

    return (
            <View>
              <Text style={[styles.score, state.score<state.maxScore/3?{color:"#c91e00"}:state.score<=state.maxScore/2?{color:"#c97500"}:state.score<=state.maxScore*3/4?{color:"#e0e800"}:state.score<=state.maxScore*5/6?{color:"#92e800"}:{color:"#17e800"}]}>{state.score}</Text>
           </View>
        )
}
}


const styles = StyleSheet.create({
    score: {
        fontSize:23,
        marginRight:15,
        color:"white",
        fontWeight: "bold"
      },
})

function mapStateToProps(state) {
  return {data: state.Arcade.data, loading: state.Arcade.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);