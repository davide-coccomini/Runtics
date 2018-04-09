export const types = {
    STARTING_GAME: "STARTING_GAME",
    STARTED_GAME: "STARTED_GAME",
    START_GAME_ERROR: "START_GAME_ERROR"
}
export const starting_game = (obj => ({type: types.STARTING_GAME, payload: obj}));
export const started_game = (obj => ({type: types.STARTED_GAME, payload: obj}));
export const start_game_error = (obj => ({type: types.START_GAME_ERROR, payload: obj}));