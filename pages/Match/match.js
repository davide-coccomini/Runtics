import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,Alert,Text,StatusBar} from 'react-native';
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
      lastClicked: -1,
      lastValue: 9999,
    }
  }
  
  componentWillReceiveProps(nextProps){
  this.countdown.restartCount();
    const newState = {
      tableData: nextProps.data.grid,
      score:0,
      rows: nextProps.data.rows,
      cols: nextProps.data.cols,
      time: nextProps.data.time,
      maxScore: maxScore
    }
    this.setState(newState)
  }
 
  checkWin(newScore){
    const {navigate} = this.props.navigation;
    if(newScore==this.state.maxScore){
      navigate("Report")
      const payload = {
        score: newScore, 
        maxScore: maxScore,
        win: true
      }
      this.props.actions.ending_game(payload)
    }
  }
  isAdjacency(x,y){
    if(x+1 < this.state.rows){
      if(this.state.tableData[x+1][y].id==this.state.lastClicked){
        return true;
      }
    }
    if(x-1 >= 0){
      if(this.state.tableData[x-1][y].id==this.state.lastClicked){
        return true;
      }
    }
    if(y+1 < this.state.cols){
      if(this.state.tableData[x][y+1].id==this.state.lastClicked){
        return true;
      }
    }
    if(y-1 >= 0){
      if(this.state.tableData[x][y-1].id==this.state.lastClicked){
        return true;
      }
    }
   return false;
  }
  resetClickedCells(){
    for(var i=0; i<this.state.rows; i++){
      for(var j=0; j<this.state.cols; j++){
        this.state.tableData[i][j].clicked = false
      }
    }
  }
  cellClick(id) {
    
    var x,y
    for(var i=0; i<this.state.rows; i++){
      for(var j=0; j<this.state.cols;j++){
        if(this.state.tableData[i][j].id == id){
          x=i
          y=j
          if(this.state.tableData[i][j].clicked)
            value = -this.state.tableData[i][j].number
          else
            value = this.state.tableData[i][j].number
          break
        }
      }
    }
    if(this.state.lastClicked==-1){ // se è la prima cella cliccata
      this.state.lastClicked = id
    }else{
      if(!this.isAdjacency(x,y) || this.state.tableData[x][y].number>=this.state.lastValue){
        this.resetClickedCells()
        this.state.score = 0
        if(value<0) // evita che il punteggio vada in negativo qualora si ricominciasse un percorso con una cella già cliccata
          value = -value
      }
    }
    this.state.lastClicked = id
    this.state.tableData[x][y].clicked = !this.state.tableData[x][y].clicked
    this.state.lastValue = this.state.tableData[x][y].number
    curScore = this.state.score 
    newScore = curScore + value 
    this.setState({
        score: newScore
    })
    this.checkWin(newScore)
  }
 
render () {
  const state = this.state;
  const {navigate} = this.props.navigation;
  const cols =  state.cols
  const rows =  state.rows
  
    return(
      <Container>
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
                                
                                  navigate('Report'); 
                                  const payload = {
                                                    score: state.score, 
                                                    maxScore: state.maxScore, 
                                                    win: false} 
                                  this.props.actions.ending_game(payload)
                                }
                          }
        />
         
      </Left>
      <Right>
            <Text style={styles.score}>{state.score}</Text>
      </Right>
    </Header>
      <View style={styles.tableContainer}>
      {
        state.tableData.map((rowData, index)  => (
          <View key={index} style={styles.rowContainer}>
              {
                rowData.map((cellData, cellIndex) => (
                    <TouchableOpacity key={cellIndex}  style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer} onPress={() => {this.cellClick(cellData.id)}}> 
                      <Text style={styles.cellText}>{cellData.number}</Text>
                    </TouchableOpacity>
                ))
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
    height:50,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius:5
  },
  cellContainer: {
    aspectRatio: 1,
    backgroundColor: "#092D4B",
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth:1,
    borderColor:"black"
  },
  cellContainerClicked: {
    width:50,
    aspectRatio: 1,
    backgroundColor: "#0097EC",
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth:1,
    borderColor:"black"
  },
  cellText: { 
    textAlign: 'center',
    fontWeight:"bold",
    color:"white",
    fontSize:18
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
