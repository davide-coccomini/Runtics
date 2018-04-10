export const types = {
    SETTING_LEVEL: "SETTING_LEVEL",
    SETTED_LEVEL: "SETTED_LEVEL",
    SET_LEVEL_ERROR: "SET_LEVEL_ERROR"
}
export const setting_level = (obj => ({type: types.SETTING_LEVEL, payload: obj}));
export const setted_level = (obj => ({type: types.SETTED_LEVEL, payload: obj}));
export const set_level_error = (obj => ({type: types.SET_LEVEL_ERROR, payload: obj}));
