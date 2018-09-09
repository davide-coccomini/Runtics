import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './modalityActions';
import Store from '../../redux/store';


function * setting_modality(action){
    try {
        response = {
            modality: action
        }
        console.log("rerere",response)
        yield put(Actions.set_modality(action));
    }catch(e){
        yield put(Actions.set_modality_error());
        console.error(e);
    }
}

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.SETTING_MODALITY, setting_modality)
    ]
}