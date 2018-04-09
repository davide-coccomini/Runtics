import {TabNavigator} from 'react-navigation';
import Home from './pages/Home/home';
import Levels from './pages/Levels/levels';
import Match from './pages/Match/match';
import Report from './pages/Report/report';

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