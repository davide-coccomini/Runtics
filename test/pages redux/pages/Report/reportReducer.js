import {types} from './reportActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
       case types.ENDING_GAME:
        state = {
            ...state,
            loading: true,
            error:false
        }
        break
        case types.ENDED_GAME: 
        state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
        }   
        break
        case types.END_GAME_ERROR:
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