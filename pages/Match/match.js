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
      lastClicked: -1,
      root: -1,
      lastValue: 9999,
      left: false
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
      level: nextProps.data.level,
      lastClicked: -1,
      root: -1,
      maxScore: nextProps.data.maxScore,
      bestPath: nextProps.data.bestPath,
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
  cellClick(id,x,y) {
          if(this.state.tableData[x][y].clicked)
            value = -this.state.tableData[x][y].number
          else
            value = this.state.tableData[x][y].number
      
    if(this.state.lastClicked==-1){ // se è la prima cella cliccata
      this.state.lastClicked = id
      this.state.root = id
    }else{
      if(!this.isAdjacency(x,y) || this.state.tableData[x][y].number>=this.state.lastValue){
        this.resetClickedCells()
        this.state.score = 0
        this.state.root = this.state.tableData[x][y].id
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
                rowData.map((cellData, cellIndex) => (
                    <TouchableOpacity key={cellIndex}  style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer} onPress={() => {this.cellClick(cellData.id,cellData.x,cellData.y)}}> 
                      <Text style={[styles.cellText,
                                state.level==1 && cellData.id==state.root ? {fontSize:24, color:"#FEC011"}:
                                state.level==1 && cellData.id!=state.root ? {fontSize:20, color:"white"}:
                                state.level==2 && cellData.id==state.root ? {fontSize:22, color:"#FEC011"}:
                                state.level==2 && cellData.id!=state.root ? {fontSize:18, color:"white"}:
                                state.level==3 && cellData.id==state.root ? {fontSize:19, color:"#FEC011"}:
                                state.level==3 && cellData.id!=state.root ? {fontSize:15, color:"white"}:
                                cellData.id==state.root ? {fontSize:16, color:"#FEC011"}:{fontSize:12, color:"white"}]}
                      >{cellData.number}</Text>
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
