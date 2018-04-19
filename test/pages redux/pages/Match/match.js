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
import CountdownCircle from 'react-native-countdown-circle';
import * as actions from '../Report/reportActions';
import Cell from '../../components/cell';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tableData: props.data.grid,
      score: 0,
      rows:props.data.rows,  
      cols: props.data.cols,
      time: props.data.time,
      maxScore: props.data.maxScore,
      bestPath: props.data.bestPath,
      level: props.data.level,
      lastClicked: props.data.lastClicked,
      root: props.data.root,
      lastValue: props.data.lastValue,
      left: false
    }
    
  }
  
  componentWillReceiveProps(nextProps){
    const newState = {
      score:nextProps.data.score,
      lastClicked: nextProps.data.lastClicked,
      lastValue: nextProps.data.lastValue,
      root: nextProps.data.root,
      left: false
    }
    this.setState(newState)
  }
  checkWin(newScore){
  const {navigate} = this.props.navigation;

  

  if(newScore>=this.state.maxScore){
    navigate("Report")
    const payload = {
      time: 99999,
      score: newScore, 
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
render () {
  const state = this.state;
  const {navigate} = this.props.navigation;
  const cols =  state.cols
  const rows =  state.rows
  BackHandler.addEventListener('hardwareBackPress', function() {
    state.left = true
  });

    return(
      <Container>
            {this.props.loading
            ? <Spinner/>
            : null}
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
                                if(!state.left){
                                  navigate('Report'); 
                                  const payload = {
                                                    score: state.score, 
                                                    maxScore: state.maxScore, 
                                                    win: false,
                                                    rows: rows,
                                                    cols: cols,
                                                    tableData: state.tableData,
                                                    bestPath: state.bestPath,
                                                    level: state.level
                                                  } 
                                  this.props.actions.ending_game(payload)
                                }
                              }
                          }
        />
         
      </Left>
      <Right>
            <Text style={styles.score}>{state.score}</Text>
      </Right>
    </Header>
      <View style={[styles.tableContainer, state.level==1 ? {marginTop: 70}: state.level==2? {marginTop:55}:state.level == 3 ? {marginTop:40}: state.level == 4 ? {marginTop:5}:state.level == 5 ?{marginTop:10}:{marginTop:5} ]}>
      {
        
        state.tableData.map((rowData, index)  => (
          <View key={index} style={[styles.rowContainer,  state.level==1 ? {height: 75}: state.level==2? {height:50}:state.level == 3 ? {height:50}:state.level == 4 ? {height:40}:{height:35}]}>
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
  header:{
    height:80,
    paddingBottom:5,
    paddingTop:5,
    backgroundColor:0,
    borderWidth:0,
    shadowOpacity:1,
    marginTop:5
  },
  score: {
    fontSize:23,
    marginRight:15,
    color:"white",
    fontWeight: "bold"
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
  return {data: state.Match.data, loading: state.Match.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
