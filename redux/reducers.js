
import {combineReducers} from "redux";
import persist from './persist';
//import Home from '../pages/Home/homeReducer';
import Report from '../pages/Report/reportReducer';
import Match from '../pages/Match/matchReducer';
import Scores from '../pages/Scores/scoresReducer';
import Settings from '../pages/Settings/settingsReducer';
import Arcade from '../pages/Arcade/arcadeReducer';
import Modality from '../pages/Modality/modalityReducer';
import ArcadeStoring from '../pages/Arcade/LevelStorage/levelStorageReducer';
import Tutorial from '../pages/Tutorial/tutorialReducer';
import Zapic from '../components/ZapicHandler/zapicHandlerReducer';



export default combineReducers({
    persist,
    //Home,
    Match,
    Modality,
    Report,
    Scores,
    Settings,
    Arcade,
    ArcadeStoring,
    Tutorial,
    Zapic
});
