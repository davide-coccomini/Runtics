
export const types = {
    STORING_LEVEL: "STORING_LEVEL",
    STORED_LEVEL: "STORED_LEVEL",
    STORE_LEVEL_ERROR:"STORE_LEVEL_ERROR"
}


export const storing_level = (obj => ({type: types.STORING_LEVEL, payload: obj}));
export const stored_level = (obj => ({type: types.STORED_LEVEL, payload: obj}));
export const store_level_error = (obj => ({type: types.STORE_LEVEL_ERROR, payload: obj}));