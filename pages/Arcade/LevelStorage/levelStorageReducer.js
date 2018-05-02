import {types} from './levelStorageActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case types.STORING_LEVEL:
        state = {
            ...state,
            loading: true,
            error:false
        }
        break
        case types.STORED_LEVEL: 
        state = {
            ...state,
            data: action.payload,
            error:false,
            loading:false
        }   
        break
        case types.STORE_LEVEL_ERROR:
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