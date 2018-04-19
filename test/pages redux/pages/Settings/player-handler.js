
import TrackPlayer from 'react-native-track-player';
import {playbackState} from './settingsActions'

async function eventHandler(store, data) {

    switch(data.type) {
        case 'remote-play':
            TrackPlayer.play();
            break;
        case 'remote-pause':
            TrackPlayer.pause();
            break;
        case 'remote-stop':
            TrackPlayer.stop();
            break;
        case 'remote-next':
            TrackPlayer.skipToNext();
            break;
        case 'remote-previous':
            TrackPlayer.skipToPrevious();
            break;
        case 'remote-seek':
            TrackPlayer.seekTo(data.position);
            break;
        case 'playback-state':
            store.dispatch(playbackState(data.state));
            break;

    }
};

module.exports = function(store) {
    return eventHandler.bind(null, store);
};