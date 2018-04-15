module.exports = async (data) => {
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
        case 'playback-track-changed':
            store.dispatch(playbackTrack(data.nextTrack));
            break;
        case 'playback-error':
            Alert.alert('An error ocurred', data.error);
            break;
    }
};