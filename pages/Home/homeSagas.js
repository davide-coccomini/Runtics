/*import {call, put,takeEvery, takeLatest, select} from 'redux-saga/effects';
import * as Actions from './homeActions';
import Store from '../../redux/store';
import { NavigationActions } from 'react-navigation'

function * checking_persist(){
    yield put(Actions.checking_tutorial())
}
function * checking_tutorial(){
    try {
        var response = yield call(generate);
        if(response){
            yield put(NavigationActions.navigate({ routeName: 'Levels' }));
        }
        yield put(Actions.checked_tutorial(response))
    }catch(e){
        yield put(Actions.check_tutorial_error());
        console.error(e);
    }
}
function generate(){
    var state = Store.getState().Home
    var newState = state.data.firstOpening == undefined ? true:false
    Store.getState().Home.data.firstOpening = newState
    return newState

}

export default function * root() {
    yield * 
    [
        takeEvery("persist/REHYDRATE",checking_persist),
        takeEvery(Actions.types.CHECKING_TUTORIAL,checking_tutorial)
    ]
}*/
