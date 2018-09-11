import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './levelStorageActions';
import Store from '../../../redux/store';

function * storing_level(data){
    try {
        var response
        var levelClassic = Store.getState().ArcadeStoring.level
        var levelDiagonal = Store.getState().ArcadeStoring.levelDiagonal 

        if(levelClassic == undefined){
            levelClassic = 0;
        }
        if(levelDiagonal == undefined){
            levelDiagonal = 0;
        }
    console.log("data", data.payload)
        if(data.payload.modality == 1){
            response = {
                modality: data.payload.modality,
                level: data.payload.level,
                levelDiagonal: levelDiagonal 
              }
        }else{
            response = {  
                modality: data.payload.modality,
                level: levelClassic,
                levelDiagonal: data.payload.levelDiagonal
            }
           
        }
        console.log("response",response)
        yield put(Actions.stored_level(response))
    }catch(e){
        yield put(Actions.store_level_error());
        console.error(e);
    }
  }
export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STORING_LEVEL, storing_level)
    ]
}