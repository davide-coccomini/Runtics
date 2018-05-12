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
import * as actions from '../pages/Arcade/arcadeActions';

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
      shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state
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
    const {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    } = Dimensions.get('window');                
    return (
          <TouchableOpacity  style={(state.clicked)?styles.cellContainerClicked:styles.cellContainer} onPress={() => {this.props.actions.clicking_cell_arcade(payload)}}>
            <Text style={[styles.cellText,
                state.level==1 && state.id==this.props.data.root ? {fontSize:SCREEN_WIDTH*0.06, color:"#FEC011"}:
                state.level==1 && state.id!=this.props.data.root ? {fontSize:SCREEN_WIDTH*0.05, color:"white"}:
                state.level==2 && state.id==this.props.data.root ? {fontSize:SCREEN_WIDTH*0.05, color:"#FEC011"}:
                state.level==2 && state.id!=this.props.data.root ? {fontSize:SCREEN_WIDTH*0.045, color:"white"}:
                state.level==3 && state.id==this.props.data.root ? {fontSize:SCREEN_WIDTH*0.045, color:"#FEC011"}:
                state.level==3 && state.id!=this.props.data.root ? {fontSize:SCREEN_WIDTH*0.04, color:"white"}:
                state.id==this.props.data.root ? {fontSize:SCREEN_WIDTH*0.035, color:"#FEC011"}:{fontSize:SCREEN_WIDTH*0.03, color:"white"}]}
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
  return {data: state.Arcade.data, loading: state.Arcade.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);