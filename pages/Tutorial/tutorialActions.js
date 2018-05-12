export const types = {
    MAKING_TUTORIAL: "MAKING_TUTORIAL",
    MADE_TUTORIAL: "MADE_TUTORIAL",
    MAKE_TUTORIAL_ERROR: "MAKE_TUTORIAL_ERROR"
}

export const making_tutorial = (obj => ({type: types.MAKING_TUTORIAL, payload: obj}));
export const made_tutorial = (obj => ({type: types.MADE_TUTORIAL, payload: obj}));
export const make_tutorial_error = (obj => ({type: types.MAKE_TUTORIAL_ERROR, payload: obj}));