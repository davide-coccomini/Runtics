import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './levelStorageActions';

function * storing_level(data){
    try {
        var response = {
            level: data.payload.level
        }
        yield put(Actions.stored_level(response))
    }catch(e){
        yield put(Actions.store_level_error());
        console.error(e);
    }
  }
export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STORING_LEVEL, storing_level)
    ]
}