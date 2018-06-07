import {types} from './zapicHandlerActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
       case types.PROCESSING_FIRST_UPLOAD:
        state = {
            ...state,
            loading: true,
            error:false
        }
        break
        case types.PROCESSED_FIRST_UPLOAD: 
        state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
        }   
        break
        case types.PROCESS_FIRST_UPDATE_ERROR:
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