import {types} from './tutorialActions';


const initialState = {
    data: [],
    loading: false,
    error:false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
       case types.MAKING_TUTORIAL:
        state = {
            ...state,
            loading: true,
            error:false
        }
        break
        case types.MADE_TUTORIAL: 
        state = {
        ...state,
        data: action.payload,
        error:false,
        loading:false
        }   
        break
        case types.MAKE_TUTORIAL_ERROR:
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