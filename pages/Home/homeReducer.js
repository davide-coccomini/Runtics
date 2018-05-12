/*import {types} from './homeActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {

switch (action.type){
 case types.OPENING_APP:
     state = {
         ...state,
         loading: true,
         error:false
     }
     break
 case types.OPENED_APP: 
    state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
    }   
    break
  case types.OPEN_APP_ERROR:
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

export default reducer;*/