import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './tutorialActions';
import Store from '../../redux/store';

function * making_tutorial(action){
    try {
        var response = yield call(generate)
        yield put(Actions.made_tutorial(response))
    }catch(e){
        console.error(e);
        yield put(Actions.make_tutorial_error());
       
    }
}
function generate(){  
    var tutorial = Store.getState().Tutorial.data
    if(tutorial.status == undefined || tutorial.status == 0){ // il tutorial non è stato fatto
        return 1 // adesso è stato fatto
    }else{
        return tutorial.status 
    }
}

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.MAKING_TUTORIAL, making_tutorial)
    ]
}
