import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './settingsActions';
import Store from '../../redux/store';

function * changing_music_state(action){
    try {
        var parameter = action.payload
        var response = yield call(generate, parameter);
        yield put(Actions.changed_music_state(response))
    }catch(e){
        yield put(Actions.change_music_state_error());
        console.error(e);
    }
}


function generate(parameter){
    var disabled = Store.getState().Settings.data.disabled != undefined ? Store.getState().Settings.data.disabled:false
    var status = Store.getState().Settings.data.status != undefined ? Store.getState().Settings.data.status:true
    var response;
    if(parameter == 0){ // stop
        if(disabled){
            response = {
                status: status,
                disabled: disabled
            }
            return response
        }
        response = {
            status: false,
            disabled: false
        }
    }else if(parameter == 1){ //start
        if(disabled){
            response = {
                status: status,
                disabled: disabled
            }
            return response
        }
        response = {
            status: true,
            disabled: false
        }
    }else if(parameter == 2){ //disable
        if(disabled){
            response = {
                status: true,
                disabled: false
            }
        }else{
            response = {
                status: false,
                disabled: true
            }
        }
    }
    return response
}

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.CHANGING_MUSIC_STATE, changing_music_state)
    ]
}
