export const types = {
    ENDING_GAME: "ENDING_GAME",
    ENDED_GAME: "ENDED_GAME",
    END_GAME_ERROR: "END_GAME_ERROR"
}

export const ending_game = (obj => ({type: types.ENDING_GAME, payload: obj}));
export const ended_game = (obj => ({type: types.ENDED_GAME, payload: obj}));
export const end_game_error = (obj => ({type: types.END_GAME_ERROR, payload: obj}));