import {types} from './settingsActions';

console.log("types",types)
const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {

switch (action.type){
    case types.CHANGING_MUSIC_STATE:
    return {
        ...state,
        error:false,
        loading:true
    };
    case types.CHANGED_MUSIC_STATE:
    return {
        ...state,
        data: action.payload,
        error:false,
        loading:false
    };
    case types.CHANGE_MUSIC_STATE_ERROR: 
    return {
        ...state,
        data: action.payload,
        error:true,
        loading:false
    };
   default:
    break;
}
return state;

}

export default reducer;