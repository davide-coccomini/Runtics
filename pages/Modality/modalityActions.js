export const types = {
    SETTING_MODALITY: "SETTING_MODALITY",
    SET_MODALITY: "SET_MODALITY",
    SET_MODALITY_ERROR: "SET_MODALITY_ERROR"
}
export const setting_modality = (obj => ({type: types.SETTING_MODALITY, payload: obj}));
export const set_modality = (obj => ({type: types.SET_MODALITY, payload: obj}));
export const set_modality_error = (obj => ({type: types.SET_MODALITY_ERROR, payload: obj}));