import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './reportActions';

function * ending_game(action){
    try {
        console.log("payload",action)
        var response = action.payload
        yield put(Actions.ended_game(response))
    }catch(e){
        yield put(Actions.end_game_error());
        console.error(e);
    }
}


export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.ENDING_GAME, ending_game)
    ]
}
