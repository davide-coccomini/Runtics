import {StyleSheet, View,Image,ScrollView, Button,TouchableOpacity,StatusBar} from 'react-native';
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
import LocalizedStrings from 'react-native-localization';
import Strings from '../../components/localization';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import * as actions from './scoresActions';
import Store from '../../redux/store';

class App extends React.Component {


  render() {
    var matches = Store.getState().Scores.data
    isNaN(matches.winEasy) ? 0:matches.winEasy
    isNaN(matches.lostEasy)? 0:matches.lostEasy
    isNaN(matches.winMedium) ? 0:matches.winMedium
    isNaN(matches.lostMedium) ? 0:matches.lostMedium
    isNaN(matches.winHard) ? 0:matches.winHard
    isNaN(matches.lostHard) ? 0:matches.lostHard
    isNaN(matches.winVeryHard) ? 0:matches.winVeryHard
    isNaN(matches.lostVeryHard) ? 0:matches.lostVeryHard
    isNaN(matches.winInsane) ? 0:matches.winInsane
    isNaN(matches.lostInsane) ? 0:matches.lostInsane
    isNaN(matches.winImpossible) ? 0:matches.winImpossible
    isNaN(matches.lostImpossible) ? 0:matches.lostImpossible
    if(matches.length==0)
    {
      matches = {   
        winEasy:0,
        lostEasy:0,
        timeEasy:0,
        bestTimeEasy:0,
        winMedium:0,
        lostMedium:0,
        timeMedium:0,
        bestTimeMedium:0,
        winHard:0,
        lostHard:0,
        timeHard:0,
        bestTimeHard:0,
        winVeryHard:0,
        lostVeryHard:0,
        timeVeryHard:0,
        bestTimeVeryHard:0,
        winInsane:0,
        lostInsane:0,
        timeInsane:0,
        bestTimeInsane:0,
        winImpossible:0,
        lostImpossible:0,
        timeImpossible:0,
        bestTimeImpossible:0
      }
    }
    return(
      <IndicatorViewPager
      style={{height:"100%"}}
      indicator={this._renderDotIndicator()}>
      <View style={styles.levelView}>
            <View>
              <Text style={[styles.levelTitle,{color:"#29c100"}]}>EASY</Text>  
            </View>
            <View style={styles.levelContent}>
              <View>
                <Text style={styles.levelLabel}>- {Strings.scoresTotal}   {matches.lostEasy+matches.winEasy}</Text>
              </View>
              <View>
                <Text style={styles.levelLabel}>- {Strings.scoresWin}     {matches.winEasy}</Text>
              </View>
              <View>
                <Text style={styles.levelLabel}>- {Strings.scoresLost}    {matches.lostEasy}</Text>
              </View>
              <View>
                <Text style={styles.levelLabel}>- {Strings.scoresAvg}   {isNaN(matches.timeEasy/(matches.lostEasy+matches.winEasy))?"//":Math.round(matches.timeEasy/(matches.lostEasy+matches.winEasy))}</Text>
              </View>
              <View>
                <Text style={styles.levelLabel}>- {Strings.scoresBest}   {(isNaN(matches.bestTimeEasy)||matches.bestTimeEasy==0)?"//":matches.bestTimeEasy}</Text>
              </View>
            </View>
          </View>
      <View style={styles.levelView}>
            <View>
              <Text style={[styles.levelTitle,,{color:"#e57914"}]}>MEDIUM</Text>  
            </View>
            <View>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresTotal}   {matches.lostMedium+matches.winMedium}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresWin}     {matches.winMedium}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresLost}    {matches.lostMedium}</Text>
            </View>    
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresAvg}   {isNaN(matches.timeMedium/(matches.lostMedium+matches.winMedium))?"//":Math.round(matches.timeMedium/(matches.lostMedium+matches.winMedium))}</Text>
            </View>
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresBest}   {(isNaN(matches.bestTimeMedium)||matches.bestTimeMedium==0)?"//":matches.bestTimeMedium}</Text>
            </View>
      </View>
      <View style={styles.levelView}>
            <View>
              <Text style={[styles.levelTitle,,{color:"#d30404"}]}>HARD</Text>  
            </View>
            <View>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresTotal}   {matches.lostHard+matches.winHard}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresWin}     {matches.winHard}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresLost}    {matches.lostHard}</Text>
            </View>
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresAvg}   {isNaN(matches.timeHard/(matches.lostHard+matches.winHard))?"//":Math.round(matches.timeHard/(matches.lostHard+matches.winHard))}</Text>
            </View>    
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresBest}   {(isNaN(matches.bestTimeHard)||matches.bestTimeHard==0)?"//":matches.bestTimeHard}</Text>
            </View>
      </View>
      <View style={styles.levelView}>
            <View>
              <Text style={[styles.levelTitle,,{color:"#791900"}]}>VERY HARD</Text>  
            </View>
            <View>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresTotal}   {matches.lostVeryHard+matches.winVeryHard}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresWin}     {matches.winVeryHard}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresLost}    {matches.lostVeryHard}</Text>
            </View>   
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresAvg}   {isNaN(matches.timeVeryHard/(matches.winVeryHard+matches.winVeryHard))?"//":Math.round(matches.timeVeryHard/(matches.winVeryHard+matches.winVeryHard))}</Text>
            </View> 
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresBest}   {(isNaN(matches.bestTimeVeryHard)||matches.bestTimeVeryHard==0)?"//":matches.bestTimeVeryHard}</Text>
            </View>
      </View>
      <View style={styles.levelView}>
            <View>
              <Text style={[styles.levelTitle,,{color:"#b800c1"}]}>INSANE</Text>  
            </View>
            <View>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresTotal}   {matches.lostInsane+matches.winInsane}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresWin}     {matches.winInsane}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresLost}    {matches.lostInsane}</Text>
            </View>    
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresAvg}   {isNaN(matches.timeInsane/(matches.lostInsane+matches.winInsane))?"//":Math.round(matches.timeInsane/(matches.lostInsane+matches.winInsane))}</Text>
            </View>
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresBest}   {(isNaN(matches.bestTimeInsane)||matches.bestTimeInsane==0)?"//":matches.bestTimeInsane}</Text>
            </View>
      </View>
      <View style={styles.levelView}>
            <View>
              <Text style={[styles.levelTitle,,{color:"#050505"}]}>IMPOSSIBLE</Text>  
            </View>
            <View>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresTotal}   {matches.lostImpossible+matches.winImpossible}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresWin}     {matches.winImpossible}</Text>
            </View>
            <View>
              <Text style={styles.levelLabel}>- {Strings.scoresLost}    {matches.lostImpossible}</Text>
            </View>    
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresAvg}   {isNaN(matches.timeImpossible/(matches.lostImpossible+matches.winImpossible))?"//":Math.round(matches.timeImpossible/(matches.lostImpossible+matches.winImpossible))}</Text>
            </View>
            <View>
                <Text style={styles.levelLabel}>- {Strings.scoresBest}   {(isNaN(matches.bestTimeImpossible)||matches.bestTimeImpossible==0)?"//":matches.bestTimeImpossible}</Text>
           </View>
      </View>

     </IndicatorViewPager>
    )
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={6} />;
}
}






const styles = StyleSheet.create({
  levelView: {
    width:"100%"
  },
  levelContent: {

  },
  levelTitle: {
    fontSize:40,
    marginTop:"35%",
    textAlign:"center",
    alignSelf:"center",
    fontWeight:"bold",
    textDecorationLine:"underline",
  },
  levelLabel: {
    color:"white",
    fontSize:25,
    textAlign:"center",
    alignSelf: "center",
  }
}); 



function mapStateToProps(state) {
  return {data: state.Scores.data, loading: state.Scores.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
