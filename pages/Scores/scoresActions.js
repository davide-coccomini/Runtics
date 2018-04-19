export const types = {
    STORING_SCORES: "STORING_SCORES",
    STORED_SCORES: "STORED_SCORES",
    STORE_SCORES_ERROR: "STORE_SCORES_ERROR"
}

export const storing_scores = (obj => ({type: types.STORING_SCORES, payload: obj}));
export const stored_scores = (obj => ({type: types.STORED_SCORES, payload: obj}));
export const store_score_error = (obj => ({type: types.STORE_SCORE_ERROR, payload: obj}));