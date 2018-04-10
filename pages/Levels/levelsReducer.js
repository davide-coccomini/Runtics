import {types} from './levelsActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {

switch (action.type){
    case types.SETTING_LEVEL: 
    state = {
        ...state,
        error:false,
        loading:true
    }   
 break
 case types.SETTED_LEVEL: 
    state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
    }   
 break
 case types.SET_LEVEL_ERROR: 
    state = {
        ...state,
        data: action.payload,
        error:true,
        loading:false
    }   
 break
   default:
    break;
}
return state;

}

export default reducer;