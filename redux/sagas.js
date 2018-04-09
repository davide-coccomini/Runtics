import {put, takeEvery, select} from 'redux-saga/effects';
import {fork} from 'redux-saga/effects/';
import Match from '../pages/Match/matchSagas';


function * firstAppOpening() {
    console.log('====================================');
    console.log("APP_OPENED");
    console.log('====================================');
} 


export default function * root() {

    yield[
        takeEvery("APP_OPENED", firstAppOpening),
        fork(Match)
    ]

}