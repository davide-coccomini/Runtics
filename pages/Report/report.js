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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.data.score,
      maxScore: props.data.maxScore,
      win: props.data.win
    }
  }
  componentWillReceiveProps(nextProps){
    const newState = {
      score: nextProps.data.score,
      maxScore: nextProps.data.maxScore,
      win:nextProps.data.win
    }
    this.setState(newState)
  }
render () {
    const {navigate} = this.props.navigation;
    const state = this.state;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
        <StatusBar
            backgroundColor="#164593"
            barStyle="light-content"
          />
          <Left style={styles.yourScore}>
              <Text style={styles.textScore}>YOUR SCORE{"\n"}{state.score}</Text>
          </Left>
          <Right style={styles.bestScore}>
              <Text style={styles.textScore}>MAX SCORE{"\n"}{state.maxScore}</Text>
          </Right>
        </Header>
        <View style={styles.titleView}>
          <H1 style={state.win ? styles.titleWin : styles.titleLose}>{state.win ? "You win" : "You lose"}</H1>
        </View>
        <View >
         {this.props.loading
            ? <Spinner/>
            : null}
          <View behavior="padding" style={styles.buttonView}>
      
              <TouchableOpacity style={styles.button}  onPress={() => navigate('Home')}>
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
    titleView: {
      marginTop:"30%"
    },
    titleWin: {
      fontWeight: "bold",
      color: "#41A700",
      fontSize:50,
      alignSelf: "center",
      height:"50%",
      lineHeight: 50
    },
    titleLose: {
      fontWeight:"bold",
      color:"#D32323",
      fontSize:50,
      height:"50%",
      alignSelf: "center",
      justifyContent: 'center', 
      height:100,
      lineHeight: 50
    },
    header:{
      height:"30%",
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