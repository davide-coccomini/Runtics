
import {combineReducers} from "redux";
import persist from './persist';
import Report from '../pages/Report/reportReducer';
import Match from '../pages/Match/matchReducer';
import Scores from '../pages/Scores/scoresReducer';
import Settings from '../pages/Settings/settingsReducer';


export default combineReducers({
    persist,
    Match,
    Report,
    Scores,
    Settings
});
