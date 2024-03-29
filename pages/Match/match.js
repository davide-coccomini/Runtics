import {StyleSheet, View,Image, Button,BackHandler,TouchableOpacity,Text,StatusBar} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {
  Container,
  Header,
  Left,
  Right,
} from 'native-base';
import {
  AdMobRewarded
} from 'react-native-admob';
import Store from '../../redux/store';
import CountdownCircle from 'react-native-countdown-circle';
import * as actions from '../Report/reportActions';
import Cell from '../../components/cell';
import ScoreCounter from '../../components/scoreCounter';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
export const trackerMatch = new GoogleAnalyticsTracker('UA-117921514-1');
trackerMatch.trackScreenView("Match");


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.data.tableData,
      rows:props.data.rows,  
      cols: props.data.cols,
      time: props.data.time,
      maxScore: props.data.maxScore,
      bestPath: props.data.bestPath,
      level: props.data.level,
      lastClicked: props.data.lastClicked,
      root: props.data.root,
      lastValue: props.data.lastValue,
      left: props.data.left,
      newMatch: props.data.newMatch,
      win: false
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  componentWillReceiveProps(nextProps){
    var newState
   var grid = "[";
    for(var i=0; i<nextProps.data.rows;i++){
      grid += "["
      for(var j=0; j<nextProps.data.cols;j++){
        if(j!=nextProps.data.cols-1)
          grid += nextProps.data.tableData[i][j].number+","
        else
         grid += nextProps.data.tableData[i][j].number
      }
      grid += "]"
    }
    grid += "]"
    var log = {
      grid: grid,
      rows: nextProps.data.rows,
      cols: nextProps.data.cols,
      maxScore: nextProps.data.maxScore
    }
    console.log("*************************************************************************************************",log)
    
    if(nextProps.data.newMatch){
      newState = {
        tableData: nextProps.data.tableData,
        lastClicked: nextProps.data.lastClicked,
        lastValue: nextProps.data.lastValue,
        root: nextProps.data.root,
        maxScore: nextProps.data.maxScore,
        cols: nextProps.data.cols,
        rows: nextProps.data.rows,
        time:nextProps.data.time,
        left: nextProps.data.left,
        newMatch: nextProps.data.newMatch,
        level: nextProps.data.level,
        bestPath: nextProps.data.bestPath,
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
        time:nextProps.data.time,
        left: nextProps.data.left,
        newMatch: nextProps.data.newMatch,
        level: nextProps.data.level,
        win:nextProps.data.win
      }
    }
    this.setState(newState)
    if(nextProps.data.newMatch){
      this.countdown.restartCount();
    }
    if(nextProps.data.win)
      this.win();

  }
  getScore(){
    return Store.getState().Match.data.newScore;
  }
  win(){
  const {navigate} = this.props.navigation;

    if(Store.getState().Match.data.newScore>=this.state.maxScore){
      this.state.win = true
      navigate("Report")
      const payload = {
        endTime:this.countdown.getTimeRemained(),
        time: 99999,
        bestScore: this.getScore(), 
        maxScore: this.state.maxScore,
        win: true,
        rows: this.state.rows,
        cols: this.state.cols,
        tableData: this.state.tableData,
        bestPath: this.state.bestPath,
        level: this.state.level
      }
      
      this.props.actions.ending_game(payload)
    }
  }
  pressGetHint(){
    AdMobRewarded.setAdUnitID('ca-app-pub-7269857134561204/1953345461');
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId,"C662FD490DFFA8C7A5F955A5611FFF81","3AF4D8E43DC30789019E9C68B1DD784C"]);
    AdMobRewarded.showAd();
    console.log("ciao")
  }
render () {
  const state = this.state;
  const {navigate} = this.props.navigation;

  BackHandler.addEventListener('hardwareBackPress', function() {
    state.left = true
  });

  
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
      <CountdownCircle
            ref = {ref => this.countdown = ref}
            seconds={state.time}
            radius={30}
            borderWidth={2}
            color="#092D4B"
            bgColor="#092D4B"
            textStyle={{ fontSize: 20, color:"white" }}
              
            onTimeElapsed={() => {
                                if(!state.left && !state.win){
                                  navigate('Report'); 
                                  const payload = {
                                                    endTime:this.countdown.getTimeRemained(), 
                                                    bestScore: Store.getState().Match.data.bestScore,
                                                    maxScore: state.maxScore, 
                                                    win: false,
                                                    rows: state.rows,
                                                    cols: state.cols,
                                                    tableData: state.tableData,
                                                    bestPath: state.bestPath,
                                                    level: state.level
                                                  } 
                                     this.props.actions.ending_game(payload)
                                }
                              }
                          }
        />
         
        <View><TouchableOpacity><Text onPress = {() => {this.pressGetHint()}}>Hint</Text></TouchableOpacity></View>
      </Left>
      <Right>
           <ScoreCounter score={0} bestScore={0} maxScore={state.maxScore} ref = {ref => this.scoreCounter = ref} />
      </Right>
    </Header>
    
      <View style={[styles.tableContainer]}>
      {
        state.tableData.map((rowData, index)  => (
          <View key={index} style={[styles.rowContainer,  state.level==1 ? {height: "17%"}: state.level==2? {height:"12%"}:state.level == 3 ? {height:"10%"}:state.level == 4 ? {height:"8.5%"}:{height:"7%"}]}>
              {
                rowData.map((cellData, cellIndex) => { 
                return (
                    <Cell key={cellIndex} level={state.level} cellData={cellData}  />
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
    marginTop:15,
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

});


function mapStateToProps(state) {
  return {data: state.Match.data, loading: state.Match.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
