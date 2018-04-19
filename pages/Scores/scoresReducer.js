import {types} from './scoresActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
       case types.STORING_SCORES:
        state = {
            ...state,
            loading: true,
            error:false
        }
        break
        case types.STORED_SCORES: 
        state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
        }   
        break
        case types.STORE_SCORES_ERROR:
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