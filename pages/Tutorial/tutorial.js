import {StyleSheet, ScrollView, View,Image, Button,TouchableOpacity,StatusBar} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

import {
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

class App extends React.Component {
    constructor(props) {
        super(props);

        const numbers = []
        numbers.push([4,1,10,8,1])
        numbers.push([2,7,9,1,2])
        numbers.push([2,6,2,1,1])
        numbers.push([2,5,2,1,1])
        numbers.push([1,3,2,8,1])
        var matrix0 = new Array();
        for(var i=0; i<5;i++){
            matrix0[i] = new Array();
            for(var j=0;j<5;j++){
                matrix0[i][j] = {number: numbers[i][j], clicked: false}
            }
        }
        var matrix1 = new Array();
        for(var i=0; i<5;i++){
            matrix1[i] = new Array();
            for(var j=0;j<5;j++){
                if((i==0 && j==2) || (i==1 && j==2) || (i==1 && j==1) || (i==2 && j==1) || (i==3 && j==1) || (i==4 && j==1) || (i==4 && j==0))
                    matrix1[i][j] = {number: numbers[i][j], clicked: true}
                else
                    matrix1[i][j] = {number: numbers[i][j], clicked: false}
            }
        }
        var matrix2 = new Array();
        for(var i=0; i<5;i++){
            matrix2[i] = new Array();
            for(var j=0;j<5;j++){
                if((i==4 && j==3))
                    matrix2[i][j] = {number: numbers[i][j], clicked: true}
                else
                    matrix2[i][j] = {number: numbers[i][j], clicked: false}
            }
        }
        this.state = {
          tableData0: matrix0,
          tableData1: matrix1,
          tableData2: matrix2
        }
      }
render () {
    const {navigate} = this.props.navigation;
    const state = this.state;
    return (
        <View style={{flex:1}}>
            <IndicatorViewPager
                    style={{height:"100%"}}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={styles.imageContent}>   
                        <View style={styles.tableContainer}>
                        {
                            state.tableData0.map((rowData, index)  => (
                            <View key={index} style={styles.rowContainer}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <TouchableOpacity key={cellIndex}  disabled={true} style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer}> 
                                        <Text style={styles.cellText}>{cellData.number}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            ))
                        }
                        </View>                          
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>The game's goal is to find the best route in the grid made by numbers ordered in descending order ...</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.tableContainer}>
                        {
                            state.tableData1.map((rowData, index)  => (
                            <View key={index} style={styles.rowContainer}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <TouchableOpacity key={cellIndex} disabled={true}  style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer}> 
                                        <Text style={styles.cellText}>{cellData.number}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            ))
                        }
                        </View>
                        <View style={styles.textContainer}>
                        <Text style={styles.text}>In this case 10 -> 9 -> 7 -> 6 -> 5 -> 3 -> 1 is the best route findable. It is decreasing and all the numbers are adjacent to each other. Diagonal is not admitted ...</Text>
                        </View>
                    </View>
                    <View>
                    <View style={styles.tableContainer}>
                        {
                            state.tableData1.map((rowData, index)  => (
                            <View key={index} style={styles.rowContainer}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <TouchableOpacity key={cellIndex} disabled={true}  style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer}> 
                                        <Text style={styles.cellText}>{cellData.number}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            ))
                        }
                        </View>
                        <View style={styles.textContainer}>
                        <Text style={styles.text}>The score is the sum of the numbers in the route, in this case the score is 41 ...</Text>
                        </View>
                    </View>
                    <View>
                    <View style={styles.tableContainer}>
                        {
                            state.tableData2.map((rowData, index)  => (
                            <View key={index} style={styles.rowContainer}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <TouchableOpacity key={cellIndex} disabled={true} style={cellData.clicked?styles.cellContainerClicked:styles.cellContainer}> 
                                        <Text style={styles.cellText}>{cellData.number}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            ))
                        }
                        
                        </View>
                    <View style={styles.textContainer}>
                        <Text  style={styles.text}>If you press a number higher than the last pressed or not adjacent to it, a new route will be started.</Text>
                    </View>
                    <View behavior="padding" style={styles.buttonView}>
      
                        <TouchableOpacity style={styles.button}  onPress={() => navigate('Levels')}>
                            <Text style={styles.buttonText}>LET'S PLAY</Text>
                        </TouchableOpacity>
                    
                    </View>
                    </View>
            </IndicatorViewPager>
        </View>
    );
}
_renderDotIndicator() {
    return <PagerDotIndicator pageCount={4} />;
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    image: {
        flex: 1,
        width: null,
        height: "80%",
        resizeMode: 'contain'
    },
    textContainer: {
        height:"15%",
        marginTop:"10%"
    },
    text: {
        marginTop:0,
        alignSelf:"center",
        textAlign:"center",
        color:"white"
    },
    tableContainer: { 
        flexDirection: 'column',
        alignItems: "center",
        marginTop:"10%"
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
        fontSize:20
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
          marginTop:0
        },
      buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700"
      },
  });
  


  export default App;