
import {combineReducers} from "redux";
import persist from './persist';
import HomeReducer from '../pages/Home/homeReducers';
import Match from '../pages/Match/matchReducer';


export default combineReducers({
    persist,
    Match
});
