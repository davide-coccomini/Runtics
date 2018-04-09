import {StyleSheet, ScrollView, View,Image, Button,TableWrapper,Cell,TouchableOpacity} from 'react-native';
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
  Separator
} from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import CountDown from 'react-native-countdown-component';
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
    this.state = {
      tableData: nextProps.data.grid,
      score:0
    }
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
          <CountDown
          until={this.props.navigation.state.params.time}
          onFinish={() => navigate('Report')}
          size={20}
          timeToShow={["M","S"]}
          digitBgColor='#092D4B'
          digitTxtColor="white"
          timeTxtColor="white"
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
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
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
