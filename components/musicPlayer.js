import {AppState} from 'react-native';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Sound from 'react-native-sound';

import * as actions from '../pages/Settings/settingsActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    const music = {
      title: 'Background music',
      isRequire: true,
      url: require('../music/background.mp3'),
    }
      this.state = {
         status: true,
         music: music,
         sound: null,
         disabled: false
      }
      this.initSound()
    }
    componentWillReceiveProps(nextProps){
      var newState
      newState = {
        status: nextProps.data.status,
        music: this.state.music,
        sound: this.state.sound,
        disabled: nextProps.data.disabled
      }
    
      this.setState(newState)
      if(newState.disabled){
        this.stopSound()
        return
      }
      if(newState.status){
        if(!newState.disabled){
          this.playSound()
        }
      } 
      if(!newState.status){
        this.stopSound()
      }
    }
  initSound(){
    
    const callback = (error, sound) => {
      if (error) {
        console.log(error)
        return;
      }
      
    this.playSound()
    };
    this.state.sound  = new Sound(this.state.music.url, error => callback(error, this.state.sound));

  }

  playSound() {
    
    this.state.sound.setVolume(0.1)
    this.state.sound.play(() => {
      this.state.sound.release();
    });
  }
  stopSound() {
    this.state.sound.stop()
  }

  render() {
    return null
  }
}


function mapStateToProps(state) {
  return {data: state.Settings.data, loading: state.Settings.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);