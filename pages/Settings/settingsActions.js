export const types = {
    PLAYBACK_INIT: "PLAYBACK_INIT",
    PLAYBACK_STATE: "PLAYBACK_STATE"
}
export const playback_state = (obj => ({type: types.PLAYBACK_STATE, payload: obj}));

export function updatePlayback() {
    return async (dispatch, getState) => {
        try {
            dispatch(playbackState(await TrackPlayer.getState()));
            dispatch(playbackTrack(await TrackPlayer.getCurrentTrack()));
        } catch(e) {
            // The player is probably not yet initialized
            // which means we don't have to update anything
        }
    };
}
export function initializePlayback() {//TODO
    return async (dispatch, getState) => {
        await TrackPlayer.setupPlayer({
            maxCacheSize: 1024 * 5 // 5 mb
        });
        dispatch({
            type: types.PLAYBACK_INIT
        });
    };
}

export function playbackState(state) {
    return {
        type: types.PLAYBACK_STATE,
        state: state
    };
}