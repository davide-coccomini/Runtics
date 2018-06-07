import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Store from '../../redux/store';
import * as actions from './zapicHandlerActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    var uploaded;
    if(Store.getState().Zapic.uploaded != undefined){ 
        uploaded = Store.getState().Zapic.uploaded
        var newState = {
          uploaded: uploaded
        }
    }else{
        uploaded = 0;
    }
    this.state = {
        uploaded: uploaded
    }
    console.log("zapicstate",uploaded)
  }
  componentWillReceiveProps(nextProps){
    if(this.state.uploaded == 0 ){
        var newState = {
            uploaded: nextProps.data.uploaded
        }
      this.setState(newState)
    } 
    console.log("next",nextProps)
  }
  render() {
    return null
  }
}


function mapStateToProps(state) {
  return {data: state.Zapic.data, loading: state.Zapic.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
