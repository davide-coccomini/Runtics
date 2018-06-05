import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './scoresActions';
import Store from '../../redux/store';
import Zapic from '../../components/zapic';

function * storing_scores(action){
    try {
        var response = yield call(generate,action.payload)
        yield put(Actions.stored_scores(response))
        var responseStats = {
            response: response,
            level: action.payload.matchInformations.level,
            endTime: action.payload.matchInformations.endTime,
            win: action.payload.win
        }
        var stats = yield call(generateStats,responseStats)
        console.log("stats",stats)
        Zapic.submitEvent(JSON.stringify(stats))
    }catch(e){
        console.error(e);
        yield put(Actions.store_scores_error());
       
    }
}

function generateStats(response){
    var level = response.level
    var startTime = level==1 ? 180: (level==2 || level==3) ? 170: (level==4 || level==5) ? 160:150
    var endTime = response.endTime
    var matchDuration = startTime - endTime
        switch(level){
            case 1:
            return({
                EASY_WINS: response.win ? 1:0,
                EASY_TIME: matchDuration
            })
            break
            case 2:
            return({
                MEDIUM_WINS: response.win ? 1:0,
                MEDIUM_TIME: matchDuration
            })
            break
            case 3:
            return({
                HARD_WINS: response.win ? 1:0,
                HARD_TIME: matchDuration
            })
            break
            case 4:
            return({
                VERYHARD_WINS: response.win ? 1:0,
                VERYHARD_TIME: matchDuration
            })
            break
            case 5:
            return({
                INSANE_WINS: response.win ? 1:0,
                INSANE_TIME: matchDuration
            })
            break
            case 6:
            return({
                IMPOSSIBLE_WINS: response.win ? 1:0,
                IMPOSSIBLE_TIME: matchDuration
            })
            break
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
        timeEasy: 0,
        winMedium:0,
        lostMedium:0,
        timeMedium: 0,
        winHard:0,
        lostHard:0,
        timeHard: 0,
        winVeryHard:0,
        lostVeryHard:0,
        timeVeryHard: 0,
        winInsane:0,
        lostInsane:0,
        timeInsane: 0,
        winImpossible:0,
        lostImpossible:0,
        timeImpossible: 0
     }
    }
    
    var level = payload.matchInformations.level
    var startTime = level==1 ? 180: (level==2 || level==3) ? 170: (level==4 || level==5) ? 160:150
    var endTime = payload.matchInformations.endTime
    var matchDuration = startTime - endTime
   
    const response = {
        winEasy: scores.winEasy + payload.matchStatus.winEasy,
        lostEasy: scores.lostEasy + payload.matchStatus.lostEasy,
        timeEasy: scores.timeEasy + (level == 1 ? matchDuration:0),
        bestTimeEasy: (level==1 && (scores.bestTimeEasy!=0 || matchDuration<scores.bestTimeEasy)) ? matchDuration:scores.bestTimeEasy,

        winMedium: scores.winMedium + payload.matchStatus.winMedium,
        lostMedium: scores.lostMedium + payload.matchStatus.lostMedium,
        timeMedium: scores.timeMedium + (level == 2 ? matchDuration:0),
        bestTimeMedium: (level==2 && (scores.bestTimeMedium!=0 || matchDuration<scores.bestTimeMedium)) ? matchDuration:scores.bestTimeMedium,
        
        winHard: scores.winHard + payload.matchStatus.winHard,
        lostHard: scores.lostHard + payload.matchStatus.lostHard,
        timeHard: scores.timeHard + (level == 3 ? matchDuration:0),
        bestTimeHard: (level==3 && (scores.bestTimeHard!=0 || matchDuration<scores.bestTimeHard)) ? matchDuration:scores.bestTimeHard,
       
        winVeryHard: scores.winVeryHard + payload.matchStatus.winVeryHard,
        lostVeryHard: scores.lostVeryHard + payload.matchStatus.lostVeryHard,
        timeVeryHard: scores.timeVeryHard + (level == 4 ? matchDuration:0),
        bestTimeVeryHard: (level==4 && (scores.bestTimeVeryHard!=0 || matchDuration<scores.bestTimeVeryHard)) ? matchDuration:scores.bestTimeVeryHard,
       
        winInsane: scores.winInsane + payload.matchStatus.winInsane,
        lostInsane: scores.lostInsane + payload.matchStatus.lostInsane,
        timeInsane: scores.timeInsane + (level == 5 ? matchDuration:0),
        bestTimeInsane: (level==5 && (scores.bestTimeInsane!=0 || matchDuration<scores.bestTimeInsane)) ? matchDuration:scores.bestTimeInsane,
       
        winImpossible: scores.winImpossible + payload.matchStatus.winImpossible,
        lostImpossible: scores.lostImpossible + payload.matchStatus.lostImpossible,
        timeImpossible: scores.timeImpossible + (level == 6 ? matchDuration:0),
        bestTimeImpossible: (level==6 && (scores.bestTimeImpossible!=0 || matchDuration<scores.bestTimeImpossible)) ? matchDuration:scores.bestTimeImpossible
    }
    return response
}

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STORING_SCORES, storing_scores)
    ]
}
