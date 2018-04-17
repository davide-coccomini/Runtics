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
import * as actions from '../pages/Match/matchActions';

class App extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            id: props.cellData.id,
            level: props.level,
            number: props.cellData.number,
            clicked: false
        }
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.data.reset){
          var state
          if(this.state.id!=nextProps.data.id){
            if(this.state.clicked){
              state = {
                clicked: false
               }
            }
             
          }else{
             state = {
              clicked: true
             }
          }    
          this.setState(state)
        }
        if(this.state.clicked != nextProps.data.clicked && this.state.id == nextProps.data.id){
            const state = {
              clicked: nextProps.data.clicked
            }
         this.setState(state)
        }
        if(nextProps.data.newMatch){
          const state = {
            id: nextProps.cellData.id,
            level: nextProps.level,
            number: nextProps.cellData.number,
            clicked: false
          }
          this.setState(state)
        }
      
      }



render () {
    const state = this.state;
    const payload =  {
                      id:state.id,
                      clicked: state.clicked,
                      number: state.number,
                    }
    return (
          <TouchableOpacity  style={(state.clicked)?styles.cellContainerClicked:styles.cellContainer} onPress={() => {this.props.actions.clicking_cell(payload)}}>
            <Text style={[styles.cellText,
                state.level==1 && state.id==this.props.data.root ? {fontSize:24, color:"#FEC011"}:
                state.level==1 && state.id!=this.props.data.root ? {fontSize:20, color:"white"}:
                state.level==2 && state.id==this.props.data.root ? {fontSize:22, color:"#FEC011"}:
                state.level==2 && state.id!=this.props.data.root ? {fontSize:18, color:"white"}:
                state.level==3 && state.id==this.props.data.root ? {fontSize:19, color:"#FEC011"}:
                state.level==3 && state.id!=this.props.data.root ? {fontSize:15, color:"white"}:
                state.id==state.root ? {fontSize:16, color:"#FEC011"}:{fontSize:12, color:"white"}]}
             >{state.number}</Text>
            </TouchableOpacity>
        )
}
}


const styles = StyleSheet.create({

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
})

function mapStateToProps(state) {
  return {data: state.Match.data, loading: state.Match.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);