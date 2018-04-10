
import {combineReducers} from "redux";
import persist from './persist';
import HomeReducer from '../pages/Home/homeReducers';
import Match from '../pages/Match/matchReducer';
import Levels from '../pages/Levels/levelsReducer';


export default combineReducers({
    persist,
    Levels,
    Match
});
