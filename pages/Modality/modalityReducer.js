import {types} from './modalityActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {

switch (action.type){
 case types.SETTING_MODALITY:
     state = {
         ...state,
         loading: true,
         error:false
     }
     break
 case types.SET_MODALITY: 
    state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
    }   
    break
  case types.SET_MODALITY_ERROR:
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