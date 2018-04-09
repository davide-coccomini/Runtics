import {REHYDRATE} from 'redux-persist/constants'

const persist = (state = {}, action) => {
    switch (action.type) {
      case  REHYDRATE:
        state = {...state, persistedState: action.payload};
        break;
        default:
        break;
    }
    return state;
}
  
export default persist;
  