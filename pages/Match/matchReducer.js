import {types} from './matchActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {

switch (action.type){
 case types.STARTING_GAME:
     state = {
         ...state,
         loading: true,
         error:false
     }
     break
 case types.STARTED_GAME: 
    state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
    }   
    break
  case types.START_GAME_ERROR:
    state = {
        ...state,
        loading:false,
        error:true
    }
    break
   default:
    break;
}
return state;

}

export default reducer;