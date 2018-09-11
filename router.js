import {TabNavigator} from 'react-navigation';
import Home from './pages/Home/home';
import Levels from './pages/Levels/levels';
import Match from './pages/Match/match';
import Report from './pages/Report/report';
import Tutorial from './pages/Tutorial/tutorial';
import Modality from './pages/Modality/modality';
import Settings from './pages/Settings/settings';
import Scores from './pages/Scores/scores';
import Arcade from './pages/Arcade/arcadeLevels';
import ArcadeMatch from './pages/Arcade/arcadeMatch';
import FirstTutorial from './pages/Tutorial/firstTutorial';

export default Routes = TabNavigator({
    Home: {
        screen: Home
    },
    Modality: {
        screen: Modality
    },
    Levels: {
        screen: Levels
    },
    Match: {
        screen: Match
    },
    Report: {
        screen: Report
    },
    Tutorial: {
        screen: Tutorial
    },
    Scores: {
        screen: Scores
    },
    Settings: {
        screen: Settings
    },
    Arcade:{
        screen: Arcade
    },
    ArcadeMatch:{
        screen: ArcadeMatch
    },
    FirstTutorial:{
        screen: FirstTutorial
    }
},{
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        tabBarVisible:false,
        swipeEnabled: false    
    }
})