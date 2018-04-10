import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,Alert,Text} from 'react-native';
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
import { Table,TableWrapper, Row, Rows,Cell } from 'react-native-table-component';
import CountdownCircle from 'react-native-countdown-circle';
import * as actions from './matchActions';

 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      score: 0,  
    }
  }
  componentWillMount(){
    this.props.actions.starting_game();
  }
  componentWillReceiveProps(nextProps){
    const newState = {
      tableData: nextProps.data.grid,
      score:0
    }
    this.setState(newState)
    
  }
   
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
 
render () {
  const state = this.state;
  const {navigate} = this.props.navigation;
  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );
  
    return(
      <Container>
      <Header style={styles.header}>
      <Left>
      <CountdownCircle
            seconds={this.props.navigation.state.params.time}
            radius={30}
            borderWidth={2}
            color="#092D4B"
            bgColor="#092D4B"
            textStyle={{ fontSize: 20, color:"white" }}
            onTimeElapsed={() => navigate('Report')}
        />
         
      </Left>
      <Right>
            <Text style={styles.score}>0</Text>
      </Right>
    </Header>
      <View style={styles.container}>
     <Table borderStyle={{borderWidth: 2, borderColor: 'black'}}>
          <Rows data={state.tableData} textStyle={styles.text} style={styles.cell}>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={element(cellData, index)} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
          </Rows>
        </Table>
      </View>
      </Container>
    )
}

}
function renderItem(item) {
  return (
      <View style={styles.item}>
          <View style={styles.content}>
              <Text style={styles.text}>{item}</Text>
          </View>
      </View>
  );
}

function mapStateToProps(state) {
  console.log(state.Match.data.grid);
  return {data: state.Match.data, loading: state.Match.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 16,
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
  cell: {
    width:"100%",
    height:40,
    backgroundColor: "#092D4B",
  },
  score: {
    fontSize:23,
    marginRight:15,
    color:"white",
    fontWeight: "bold"
  },
  text: { 
     textAlign: 'center',
     fontWeight:"bold",
     color:"white"
  },

});
