export const types = {
    CHANGING_MUSIC_STATE: "CHANGING_MUSIC_STATE",
    CHANGED_MUSIC_STATE: "CHANGED_MUSIC_STATE",
    CHANGE_MUSIC_STATE_ERROR: "CHANGE_MUSIC_STATE_ERROR"
}

export const changing_music_state = (obj => ({type: types.CHANGING_MUSIC_STATE, payload: obj}));
export const changed_music_state = (obj => ({type: types.CHANGED_MUSIC_STATE, payload: obj}));
export const change_music_state_error = (obj => ({type: types.CHANGE_MUSIC_STATE_ERROR, payload: obj}));