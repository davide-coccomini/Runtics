import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './zapicHandlerActions';
import Store from '../../redux/store';
import Zapic from '../zapic';

function * processing_first_upload(action){
    try {
        var response = yield call(generate)
        yield put(Actions.processed_first_upload(response))
    }catch(e){
        console.error(e);
        yield put(Actions.store_scores_error());
    }
}



function generate(){  
   var zapicState = Store.getState().Zapic.data
   var scores = Store.getState().Scores.data
   if(zapicState.uploaded == undefined || zapicState.uploaded == 0){

    var zapicReponse = {
            EASY_TIME: scores.bestTimeEasy,
            MEDIUM_TIME: scores.bestTimeMedium,
            HARD_TIME: scores.bestTimeHard,
            VERYHARD_TIME: scores.bestTimeVeryHard,
            INSANE_TIME: scores.bestTimeInsane,
            IMPOSSIBLE_TIME: scores.bestTimeImpossible,
            EASY_WINS: scores.winEasy,
            MEDIUM_WINS: scores.winMedium,
            HARD_WINS: scores.winHard,
            VERYHARD_WINS: scores.winVeryHard,
            INSANE_WINS: scores.winInsane,
            IMPOSSIBLE_WINS: scores.winImpossible
        }
        Zapic.submitEvent(JSON.stringify(zapicReponse))
        return {
            uploaded: 1
        };
    }else{
        return {
            uploaded: zapicState.uploaded
        };
    }
}

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.PROCESSING_FIRST_UPLOAD, processing_first_upload)
    ]
}
