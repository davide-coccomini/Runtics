import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './scoresActions';
import Store from '../../redux/store';

function * storing_scores(action){
    try {
        var response = yield call(generate,action.payload)
        yield put(Actions.stored_scores(response))
    }catch(e){
        yield put(Actions.store_scores_error());
        console.error(e);
    }
}
function generate(payload){
    var scores = Store.getState().Scores.data
    isNaN(scores.winEasy) ? 0:scores.winEasy
    isNaN(scores.lostEasy) ? 0:scores.lostEasy
    isNaN(scores.winMedium)? 0:scores.winMedium
    isNaN(scores.lostMedium) ? 0:scores.lostMedium
    isNaN(scores.winHard) ? 0:scores.winHard
    isNaN(scores.lostHard) ? 0:scores.lostHard
    isNaN(scores.winVeryHard) ? 0:scores.winVeryHard
    isNaN(scores.lostVeryHard)? 0:scores.lostVeryHard
    isNaN(scores.winInsane)? 0:scores.winInsane
    isNaN(scores.lostInsane) ? 0:scores.lostInsane
    isNaN(scores.winImpossible) ? 0:scores.winImpossible
    isNaN(scores.lostImpossible) ? 0:scores.lostImpossible
    if(scores.length==0)
    {
      scores = {   
        winEasy:0,
        lostEasy:0,
        winMedium:0,
        lostMedium:0,
        winHard:0,
        lostHard:0,
        winVeryHard:0,
        lostVeryHard:0,
        winInsane:0,
        lostInsane:0,
        winImpossible:0,
        lostImpossible:0}
    }
    const response = {
        
        winEasy: scores.winEasy + payload.matchStatus.winEasy,
        lostEasy: scores.lostEasy + payload.matchStatus.lostEasy,
        winMedium: scores.winMedium + payload.matchStatus.winMedium,
        lostMedium: scores.lostMedium + payload.matchStatus.lostMedium,
        winHard: scores.winHard + payload.matchStatus.winHard,
        lostHard: scores.lostHard + payload.matchStatus.lostHard,
        winVeryHard: scores.winVeryHard + payload.matchStatus.winVeryHard,
        lostVeryHard: scores.lostVeryHard + payload.matchStatus.lostVeryHard,
        winInsane: scores.winInsane + payload.matchStatus.winInsane,
        lostInsane: scores.lostInsane + payload.matchStatus.lostInsane,
        winImpossible: scores.winImpossible + payload.matchStatus.winImpossible,
        lostImpossible: scores.lostImpossible + payload.matchStatus.lostImpossible
    }
    return response
}

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STORING_SCORES, storing_scores)
    ]
}
