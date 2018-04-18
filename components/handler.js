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
}

     
  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (currentAppState) => {
    if(currentAppState == "background") {
      console.log("background")
      this.props.actions.changing_music_state(0)
    }
    if(currentAppState == "active")
    {
      console.log("active")
      this.props.actions.changing_music_state(1)
    }
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