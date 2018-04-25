import {StyleSheet, ScrollView, View,Image, Button,BackHandler,TouchableOpacity,Alert,Text,StatusBar} from 'react-native';
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
  Icon,
  Left,
  Body,
  Right,
  Spinner,
  Separator
} from 'native-base';
import Store from '../../redux/store';
import * as actions from './arcadeActions';
import Cell from '../../components/cellArcade';
import ScoreCounter from '../../components/scoreCounterArcade';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
export const trackerArcade = new GoogleAnalyticsTracker('UA-117921514-1');
trackerArcade.trackScreenView("Arcade Level");


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tableData: props.data.tableData,
        rows:props.data.rows,  
        cols: props.data.cols,
        maxScore: props.data.maxScore,
        level: props.data.level,
        difficulty: props.data.difficulty,
        lastClicked: props.data.lastClicked,
        root: props.data.root,
        lastValue: props.data.lastValue,
        newMatch: props.data.newMatch,
        win: false
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  componentWillReceiveProps(nextProps){
    var newState
    if(nextProps.data.newMatch){
        newState = {
            tableData: nextProps.data.tableData,
            lastClicked: nextProps.data.lastClicked,
            lastValue: nextProps.data.lastValue,
            root: nextProps.data.root,
            maxScore: nextProps.data.maxScore,
            cols: nextProps.data.cols,
            rows: nextProps.data.rows,
            newMatch: nextProps.data.newMatch,
            level: nextProps.data.level,
            difficulty: nextProps.data.difficulty,
            win:nextProps.data.win
          }
    }else{
         newState = {
            lastClicked: nextProps.data.lastClicked,
            lastValue: nextProps.data.lastValue,
            root: nextProps.data.root,
            maxScore: nextProps.data.maxScore,
            cols: nextProps.data.cols,
            rows: nextProps.data.rows,
            level: nextProps.data.level,
            difficulty: nextProps.data.difficulty,
            newMatch: nextProps.data.newMatch
        }
    }
    this.setState(newState)
    if(nextProps.data.win)
      this.win();

  }
  getScore(){
    return Store.getState().Arcade.data.newScore;
  }
  win(){
  const {navigate} = this.props.navigation;

  if(Store.getState().Arcade.data.newScore>=this.state.maxScore){
    this.state.win = true
    const payload = {
      score: this.getScore(), 
      maxScore: this.state.maxScore,
      win: true,
      rows: this.state.rows,
      cols: this.state.cols,
      tableData: this.state.tableData,
      bestPath: this.state.bestPath,
      level: this.state.level
    }
    navigate("Arcade")
  }
}
render () {
  const state = this.state;
  const {navigate} = this.props.navigation;
  if(state.newMatch){
    const cols =  state.cols
    const rows =  state.rows
  }
    return(
      
      <Container>

      <Header style={styles.header}>
        <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
        />
      <Left>
          <Text>Livello</Text>
      </Left>
      <Right>
           <ScoreCounter score={0} ref = {ref => this.scoreCounter = ref} />
      </Right>
    </Header>
    
      <View style={[styles.tableContainer, state.difficulty==1 ? {marginTop: 70}: state.difficulty==2? {marginTop:55}:state.difficulty == 3 ? {marginTop:40}: state.difficulty == 4 ? {marginTop:5}:state.difficulty == 5 ?{marginTop:10}:{marginTop:5} ]}>
      {
        state.tableData.map((rowData, index)  => (
          <View key={index} style={[styles.rowContainer,  state.difficulty==1 ? {height: 75}: state.difficulty==2? {height:50}:state.difficulty == 3 ? {height:50}:state.difficulty == 4 ? {height:40}:{height:35}]}>
              {
                rowData.map((cellData, cellIndex) => { 
                return (
                    <Cell key={cellIndex} level={state.difficulty} cellData={cellData}  />
                )}) 
              }
          </View>
        ))
      }
      </View>
      </Container>
    )
}

}

const styles = StyleSheet.create({
  header:{
    height:80,
    paddingBottom:5,
    paddingTop:5,
    backgroundColor:0,
    borderWidth:0,
    shadowOpacity:1,
    marginTop:5
  },
  
  tableContainer: { 
    flexDirection: 'column',
    alignItems: "center",
    marginTop:5
  },
  rowContainer:{
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius:5
  },

});


function mapStateToProps(state) {
  return {data: state.Arcade.data, loading: state.Arcade.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
