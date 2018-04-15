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
import * as actions from '../Report/reportActions';
import {
  AdMobInterstitial,
} from 'react-native-admob'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.generateAd();
    var matrix = this.generateResultTable(props.data.tableData,props.data.bestPath,props.data.rows,props.data.cols)
    var pathLabel = this.generatePathLabel(props.data.tableData,props.data.bestPath)
    
    this.state = {
      score: props.data.score,
      maxScore: props.data.maxScore,
      win: props.data.win,
      tableData: matrix,
      rows: props.data.rows,
      cols: props.data.cols,
      level: props.data.level,
      pathLabel: pathLabel
    }
  }
  componentWillReceiveProps(nextProps){
    this.generateAd();
    var matrix = this.generateResultTable(nextProps.data.tableData,nextProps.data.bestPath,nextProps.data.rows,nextProps.data.cols)
    var pathLabel = this.generatePathLabel(nextProps.data.tableData,nextProps.data.bestPath)
    
    const newState = {
      score: nextProps.data.score,
      maxScore: nextProps.data.maxScore,
      win:nextProps.data.win,
      tableData: matrix,
      rows: nextProps.data.rows,
      cols: nextProps.data.cols,
      level: nextProps.data.level,
      pathLabel: pathLabel
    }
    this.setState(newState)
  }
  generateAd(){
    AdMobInterstitial.setAdUnitID('ca-app-pub-7269857134561204/1953345461');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }
  generatePathLabel(grid,path){
    var pathLabel = ""
    
    for(i=path.length-1; i>=0; i--){
      pathLabel += "("+grid[path[i][0]][path[i][1]].number+")"
    }
    return pathLabel
  }
  generateResultTable(grid,path,rows,cols){
    for(var i=0; i<rows; i++){
      for(var j=0; j<cols; j++){
        if(this.isCellToCheck(path,i,j)){
          grid[i][j].clicked = true
        }else{
          grid[i][j].clicked = false
        }
      }
    }
    return grid
  }
  isCellToCheck(path,i,j){
    for(var k=0; k<path.length; k++){
      if(path[k][0]==i && path[k][1]==j){
        return true
      }
    }
    return false
  }

render () {
    const {navigate} = this.props.navigation;
    const state = this.state;
    return (
      <Container>
        <Header style={[styles.header,state.win ? {backgroundColor:"#41A700"}:{backgroundColor:"#D32323"}]}>
        <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
          />
          <Left style={styles.yourScore}>
              <Text style={styles.textScore}>YOUR SCORE{"\n"}{state.score}</Text>
          </Left>
          <Right style={styles.bestScore}>
              <Text style={styles.textScore}>TO WIN{"\n"}{state.maxScore}</Text>
          </Right>
        </Header>
        <View>
         <Text style={state.win ? styles.titleWin : styles.titleLose}>{state.win ? "You win" : "You lose"}</Text>
         </View>
        <View>
        <View>
          <Text style={styles.label}>A good path was {state.pathLabel}...</Text>
        </View>
        <View style={styles.tableContainer}>
        {
          state.tableData.map((rowData, index)  => (
            <View key={index} style={[styles.rowContainer,  state.level==1 ? {height: 45}: state.level==2? {height:40}:state.level == 3 ? {height:35}:state.level == 4 ? {height:30}:{height:25}]}>
                {
                  rowData.map((cellData, cellIndex) => (

                      <TouchableOpacity key={cellIndex}   disabled={true} style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer} > 
                        <Text style={[styles.cellText,state.level==1 ? {fontSize: 20}: state.level==2? {fontSize:18}:state.level == 3 ? {fontSize:15}:{fontSize:12}]}>{cellData.number}</Text>
                      </TouchableOpacity>
                  ))
                }
            </View>
          ))
        }
        </View>
        <View >
        </View>
          <View behavior="padding" style={styles.buttonView}>
      
              <TouchableOpacity style={styles.button}  onPress={() => navigate('Levels')}>
                <Text style={styles.buttonText}>PLAY AGAIN</Text>
              </TouchableOpacity>
          
          </View>
        </View>
       </Container>
      );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    textScore: {
      fontSize:14,
      color:"white",
      fontWeight: "bold",
      textAlign: "center"
    },
    label: {
      color: "white",
      textAlign:"center"
    },
    titleView: {
      marginTop:0
    },
    titleWin: {
      fontWeight: "bold",
      color: "#41A700",
      fontSize:35,
      alignSelf: "center",
    },
    titleLose: {
      fontWeight:"bold",
      color:"#D32323",
      fontSize:35,
      alignSelf: "center",
      justifyContent: 'center', 
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
    color:"white",
  },
    header:{
      height:80,
      paddingBottom:5,
      paddingTop:5,
      backgroundColor:0,
      borderWidth:0,
      shadowOpacity:1,
      marginTop:5
    },
    buttonView: {
      flex:1,
      marginTop:0
    },
    button: {
        backgroundColor: "#092D4B",
        width:"80%",
        height:50,
        paddingVertical: 15,
        alignSelf:"center",
        marginTop:"10%"
      },
    buttonText: {
      textAlign: "center",
      color: "#FFF",
      fontWeight: "700"
    },
  });
  


  function mapStateToProps(state) {
    return {data: state.Report.data, loading: state.Report.loading};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);