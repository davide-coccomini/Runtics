import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,StatusBar,Dimensions} from 'react-native';
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
} from 'react-native-admob';
import LocalizedStrings from 'react-native-localization';
import Strings from '../../components/localization';
import { GoogleAnalyticsTracker,GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
GoogleAnalyticsSettings.setDispatchInterval(30);
export const tracker = new GoogleAnalyticsTracker('UA-117921514-1');
tracker.trackScreenView("Report"); 

class App extends React.Component {
  constructor(props) {
    super(props);
    var matrix = this.generateResultTable(props.data.matchInformations.tableData,props.data.matchInformations.bestPath,props.data.matchInformations.rows,props.data.matchInformations.cols)
    var pathLabel = this.generatePathLabel(props.data.matchInformations.tableData,props.data.matchInformations.bestPath)
    
    this.state = {
      bestScore: props.data.matchInformations.bestScore,
      maxScore: props.data.matchInformations.maxScore,
      win: props.data.matchInformations.win,
      tableData: matrix,
      rows: props.data.matchInformations.rows,
      cols: props.data.matchInformations.cols,
      level: props.data.matchInformations.level,
      pathLabel: pathLabel
    }
    if(this.state.level > 1)
     this.generateAd();
  }
  componentWillReceiveProps(nextProps){
    
    var matrix = this.generateResultTable(nextProps.data.matchInformations.tableData,nextProps.data.matchInformations.bestPath,nextProps.data.matchInformations.rows,nextProps.data.matchInformations.cols)
    var pathLabel = this.generatePathLabel(nextProps.data.matchInformations.tableData,nextProps.data.matchInformations.bestPath)
    const newState = {
      bestScore: nextProps.data.matchInformations.bestScore,
      maxScore: nextProps.data.matchInformations.maxScore,
      win:nextProps.data.matchInformations.win,
      tableData: matrix,
      rows: nextProps.data.matchInformations.rows,
      cols: nextProps.data.matchInformations.cols,
      level: nextProps.data.matchInformations.level,
      pathLabel: pathLabel,
    }
    this.setState(newState)
    
    if(this.state.level > 1)
      this.generateAd();
  }
  generateAd(){ 
    //AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); //TEST
    AdMobInterstitial.setAdUnitID('ca-app-pub-7269857134561204/1953345461');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId,"C662FD490DFFA8C7A5F955A5611FFF81","3AF4D8E43DC30789019E9C68B1DD784C"]);
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
    const {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    } = Dimensions.get('window');
    return (
      <Container>
        <Header style={[styles.header,state.win ? {backgroundColor:"#41A700"}:{backgroundColor:"#D32323"}]}>
        <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
          />
          <Left style={styles.yourScore}>
              <Text style={styles.textScore}>{Strings.reportYour}{"\n"}{state.bestScore}</Text>
          </Left>
          <Right style={styles.bestScore}>
              <Text style={styles.textScore}>{Strings.reportBest}{"\n"}{state.maxScore}</Text>
          </Right>
        </Header>
        <View>
         <Text style={state.win ? styles.titleWin : styles.titleLose}>{state.win ? Strings.reportTitleWin : Strings.reportTitleLose}</Text>
         </View>
        <View>
        <View>
          <Text style={styles.label}>{Strings.reportRoute} {state.pathLabel}...</Text>
        </View>
        <View style={styles.tableContainer}>
        {
          state.tableData.map((rowData, index)  => (
            <View key={index} style={[styles.rowContainer, state.level==1 ? {height: "16%"}: state.level==2? {height:"11.5%"}:state.level == 3 ? {height:"9.5%"}:state.level == 4 ? {height:"6.8%"}:{height:"6.6%"}]}>
                {
                  rowData.map((cellData, cellIndex) => (
                      <TouchableOpacity key={cellIndex}   disabled={true} style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer} > 
                        <Text style={[styles.cellText,
                        state.level==1 ? {fontSize:SCREEN_WIDTH*0.05, color:"white"}:
                        state.level==2 ? {fontSize:SCREEN_WIDTH*0.04, color:"white"}:
                        state.level==3 ? {fontSize:SCREEN_WIDTH*0.03, color:"white"}:{fontSize:SCREEN_WIDTH*0.02, color:"white"}]}>{cellData.number}</Text>
                      </TouchableOpacity>
                  ))
                }
            </View>
          ))
        }
        </View>
          <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button}  onPress={() => navigate('Levels')}>
                <Text style={styles.buttonText}>{Strings.reportButtonPlay}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}  onPress={() => navigate('Home')}>
                <Text style={styles.buttonText}>{Strings.reportButtonBack}</Text>
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
      padding:0,
      marginTop: -55,
      height:"5%"
    },
    button: {
        backgroundColor: "#092D4B",
        width:"80%",
        height:50,
        paddingVertical: 15,
        alignSelf:"center",
        marginTop:5
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