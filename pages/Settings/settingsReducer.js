import {types} from './settingsActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {

switch (action.type){
    case types.PLAYBACK_INIT:
    return {
        ...state,
        init: true
    };
    case types.PLAYBACK_STATE:
    return {
        ...state,
        state: action.state
    };
   default:
    break;
}
return state;

}

export default reducer;