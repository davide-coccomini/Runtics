import {put, takeEvery, select} from 'redux-saga/effects';
import {fork} from 'redux-saga/effects/';

//import Home from '../pages/Home/homeSagas';
import Match from '../pages/Match/matchSagas';
import Report from '../pages/Report/reportSagas';
import Settings from '../pages/Settings/settingsSagas';
import Scores from '../pages/Scores/scoresSagas';
import Arcade from '../pages/Arcade/arcadeSagas';
import Modality from '../pages/Modality/modalitySagas';
import ArcadeStoring from '../pages/Arcade/LevelStorage/levelStorageSagas';
import Tutorial from '../pages/Tutorial/tutorialSagas';
import Zapic from '../components/ZapicHandler/zapicHandlerSagas';
function * firstAppOpening() {
    console.log('====================================');
    console.log("APP_OPENED");
    console.log('====================================');
} 


export default function * root() {

    yield[
        takeEvery("APP_OPENED", firstAppOpening),
       // fork(Home),
        fork(Match),
        fork(Modality),
        fork(Report),
        fork(Settings),
        fork(Scores),
        fork(Arcade),
        fork(ArcadeStoring),
        fork(Tutorial),
        fork(Zapic)
    ]

}