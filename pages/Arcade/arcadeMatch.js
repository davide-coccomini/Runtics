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
import {
  AdMobInterstitial,
} from 'react-native-admob';
import Store from '../../redux/store';
import Strings from '../../components/localization';
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
        curLevel: props.data.curLevel,
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
            curLevel: nextProps.data.curLevel,
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
            curLevel: nextProps.data.curLevel,
            level: nextProps.data.level,
            difficulty: nextProps.data.difficulty,
            newMatch: nextProps.data.newMatch
        }
    }
    this.setState(newState)
    
    if(nextProps.data.win)
      this.win();

  }
  generateAd(){ 
    if(this.state.curLevel > 10 && this.state.curLevel%3 == 0){
       //AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); //TEST
      AdMobInterstitial.setAdUnitID('ca-app-pub-7269857134561204/1953345461');
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId,"C662FD490DFFA8C7A5F955A5611FFF81","3AF4D8E43DC30789019E9C68B1DD784C"]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }

  }
  getScore(){
    return Store.getState().Arcade.data.newScore;
  }
  win(){
  const {navigate} = this.props.navigation;

  if(Store.getState().Arcade.data.newScore>=this.state.maxScore){
    this.state.win = true
    this.generateAd()
    navigate("ArcadeLevels")
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
      
      <Container style={styles.container}>

      <Header style={styles.header}>
        <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
        />
      <Left>
          <Text style={styles.textLevel}>{Strings.arcadeLevel} {state.level}</Text>
      </Left>
      <Right>
           <ScoreCounter score={0} maxScore={state.maxScore} ref = {ref => this.scoreCounter = ref} />
      </Right>
    </Header>
    
      <View style={styles.tableContainer}>
      {
        state.tableData.map((rowData, index)  => (
          <View key={index} style={[styles.rowContainer, state.difficulty==1 ? {height: "17%"}: state.difficulty==2? {height:"12%"}:state.difficulty == 3 ? {height:"10%"}:state.difficulty == 4 ? {height:"8.5%"}:{height:"7%"}]}>
              {
                rowData.map((cellData, cellIndex) => { 
                return (
                    <Cell key={cellIndex} level={state.difficulty} cellData={cellData} levelReached={state.level}  />
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
  container: {
    width:"100%"
  },
  header:{
    height:80,
    paddingBottom:5,
    paddingTop:5,
    backgroundColor:0,
    borderWidth:0,
    shadowOpacity:1,
    marginTop:15
  },
  
  tableContainer: { 
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight:15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer:{
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius:5
  },
  textLevel: {
    fontSize:20,
    marginLeft:11,
    color:"white",
    fontWeight: "bold"
  }
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
