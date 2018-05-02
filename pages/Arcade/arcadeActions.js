export const types = {
    STARTING_ARCADE: "STARTING_ARCADE",
    STARTED_ARCADE: "STARTED_ARCADE",
    START_ARCADE_ERROR: "START_ARCADE_ERROR",
    CLICKING_CELL_ARCADE: "CLICKING_CELL_ARCADE",
    CLICKED_CELL_ARCADE: "CLICKED_CELL_ARCADE",
    CLICK_CELL_ARCADE_ERROR: "CLICK_CELL_ARCADE_ERROR",
    STORING_LEVEL: "STORING_LEVEL",
    STORED_LEVEL: "STORED_LEVEL",
    STORE_LEVEL_ERROR:"STORE_LEVEL_ERROR"
}

export const starting_arcade = (obj => ({type: types.STARTING_ARCADE, payload: obj}));
export const started_arcade = (obj => ({type: types.STARTED_ARCADE, payload: obj}));
export const start_arcade_error = (obj => ({type: types.START_ARCADE_ERROR, payload: obj}));
export const clicking_cell_arcade = (obj => ({type: types.CLICKING_CELL_ARCADE, payload: obj}));
export const clicked_cell_arcade = (obj => ({type: types.CLICKED_CELL_ARCADE, payload: obj}));
export const click_cell_arcade_error = (obj => ({type: types.CLICK_CELL_ARCADE_ERROR, payload: obj}));
