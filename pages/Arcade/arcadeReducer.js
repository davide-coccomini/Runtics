import {types} from './arcadeActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
       case types.STARTING_ARCADE:
        state = {
            ...state,
            loading: true,
            error:false
        }
        break
        case types.STARTED_ARCADE: 
        state = {
            ...state,
            data: action.payload,
            error:false,
            loading:false
        }   
        break
        case types.START_ARCADE_ERROR:
            state = {
            ...state,
            loading:false,
            error:true
        }
        break
        case types.CLICKING_CELL_ARCADE:
        state = {
            ...state,
            loading:true,
            error:false
        }
        break
        case types.CLICKED_CELL_ARCADE:
        state = {
            ...state,
            data: action.payload,
            loading:false,
            error:false
        }
        break
        case types.CLICK_CELL_ARCADE_ERROR:
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