import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './reportActions';
import * as scoresActions from '../Scores/scoresActions';


function * ending_game(action){
    try {
        var response = yield call(generate,action.payload)
        yield put(Actions.ended_game(response))
        yield put(scoresActions.storing_scores(response))
    }catch(e){
        yield put(Actions.end_game_error());
        console.error(e);
    }
}

function generate(payload)
{
    var matches = {
        winEasy: 0,
        lostEasy: 0,
        winMedium: 0,
        lostMedium: 0,
        winHard: 0,
        lostHard: 0,
        winVeryHard: 0,
        lostVeryHard: 0,
        winInsane: 0,
        lostInsane: 0,
        winImpossible: 0,
        lostImpossible: 0
    }
    if(payload.win){
        switch(payload.level){
            case 1:
                matches.winEasy = 1
            break
            case 2:
                matches.winMedium = 1
            break
            case 3:
                matches.winHard = 1
            break
            case 4:
                matches.winVeryHard = 1
            break
            case 5:
                matches.winInsane = 1
            break
            case 6:
                matches.winImpossible = 1
            break
        }
    }else{
        switch(payload.level){
            case 1:
                matches.lostEasy = 1
            break
            case 2:
                matches.lostMedium = 1
            break
            case 3:
                matches.lostHard = 1
            break
            case 4:
                matches.lostVeryHard = 1
            break
            case 5:
                matches.lostInsane = 1
            break
            case 6:
                matches.lostImpossible = 1
            break
        }
    }
    var response = {
        matchInformations: payload,
        matchStatus: matches
    }

    return response
}
export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.ENDING_GAME, ending_game)
    ]
}
