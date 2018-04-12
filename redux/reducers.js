
import {combineReducers} from "redux";
import persist from './persist';
import Report from '../pages/Report/reportReducer';
import Match from '../pages/Match/matchReducer';


export default combineReducers({
    persist,
    Match,
    Report
});
