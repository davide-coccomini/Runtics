import {TabNavigator} from 'react-navigation';
import Home from './pages/Home/home';
import Levels from './pages/Levels/levels';
import Match from './pages/Match/match';
import Report from './pages/Report/report';
import Tutorial from './pages/Tutorial/tutorial';
import Settings from './pages/Settings/settings';
import Scores from './pages/Scores/scores';

export default Routes = TabNavigator({
    Home: {
        screen: Home
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