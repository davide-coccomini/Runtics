export const types = {
    STARTING_GAME: "STARTING_GAME",
    STARTED_GAME: "STARTED_GAME",
    START_GAME_ERROR: "START_GAME_ERROR",
    CLICKING_CELL: "CLICKING_CELL",
    CLICKED_CELL: "CLICKED_CELL",
    CLICK_CELL_ERROR: "CLICK_CELL_ERROR",
}
export const starting_game = (obj => ({type: types.STARTING_GAME, payload: obj}));
export const started_game = (obj => ({type: types.STARTED_GAME, payload: obj}));
export const start_game_error = (obj => ({type: types.START_GAME_ERROR, payload: obj}));
export const clicking_cell = (obj => ({type: types.CLICKING_CELL, payload: obj}));
export const clicked_cell = (obj => ({type: types.CLICKED_CELL, payload: obj}));
export const click_cell_error = (obj => ({type: types.CLICK_CELL_ERROR, payload: obj}));