import {call, put,takeEvery} from 'redux-saga/effects';
import * as Actions from './matchActions';
import * as LevelsActions from '../Levels/levelsActions';

var matrix;
var rows = 10;
var cols = 5;
var paths = new Array();
var contatore = 0;
function * setting_level(action,level){
    try {
        var response = 5
        yield put(LevelsActions.setted_level(response))
    }catch(e){
        yield put(LevelsActions.set_level_error());
        console.error(e);
    }
    return;
}
function * starting_game(action){
    try {
        var response = yield call(generate);
        yield put(Actions.started_game(response))
    }catch(e){
        yield put(Actions.start_game_error());
        console.error(e);
    }
}

function generate(){
    matrix = new Array();
    for(var i = 0; i<rows; i++){
        matrix[i] = new Array();
        for(var j = 0; j<cols; j++){
            var rand = Math.random() * 20;
            var randomNumber = Math.floor(rand+1); 
            matrix[i][j] = randomNumber;
        }
     }
     for(var i=0; i<rows; i++){
         for(var j=0; j<cols;j++){
           searchPath(i,j,matrix[i][j],false,-1,-1); // Ricerca di tutti i possibili percorsi
         }
     }
     maxScore = 0;
     for(var i=0; i<paths.length; i++){
       if(paths[i].pointSum>maxScore){
           maxScore = paths[i].pointSum;
       }
     }
     var response = {
         grid: matrix,
         maxScore: maxScore
     }
    return response;
   }
   
function searchPath(x,y,sum, isChild, xp, yp){
    if(x>=rows || y>=cols || x<0 || y<0){
        return;
    }
    
    if(x+1<rows){
        if((matrix[x][y]>matrix[x+1][y])){
         var pSum = sum + matrix[x+1][y];
         var pathElement = {
             coordX: x+1,
             coordY: y,
             parentX: x,
             parentY: y,
             pointSum: pSum
         }
         paths.push(pathElement);
         searchPath(x+1,y,pSum,true,x,y);
        }
    }
    if(x-1>=0){
        if((matrix[x][y]>matrix[x-1][y])){
         var pSum = sum + matrix[x-1][y];
         var pathElement = {
             coordX: x-1,
             coordY: y,
             parentX: x,
             parentY: y,
             pointSum: pSum 
         }
         paths.push(pathElement);
         searchPath(x-1,y,pSum,true,x,y);
        }
    }
  
    if(y+1<cols){
        if((matrix[x][y]>matrix[x][y+1])){
            var pSum = sum + matrix[x][y+1];
            var pathElement = {
                coordX: x,
                coordY: y+1,
                parentX: x,
                parentY: y,
                pointSum: pSum
            }
            paths.push(pathElement);
            searchPath(x,y+1,pSum,true,x,y);
        }
    }
   
    if(y-1>=0){
        if((matrix[x][y]>matrix[x][y-1])){
         var pSum = sum + matrix[x][y-1];
         var pathElement = {
             coordX: x,
             coordY: y-1,
             parentX: x,
             parentY: y,
             pointSum: pSum 
         }
         
         paths.push("path"+pathElement);
         searchPath(x,y-1,pSum,true,x,y);
        }
    }
  
    return;
 }
export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STARTING_GAME, starting_game),
        takeEvery(LevelsActions.types.SETTING_LEVEL, setting_level)
    ]
}
