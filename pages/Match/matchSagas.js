import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './matchActions';

var matrix;
var paths = new Array();
var contatore = 0;


function * starting_game(action){
    try {
        paths = []
        var config = yield call(setLevel, action.payload);
        var response = yield call(generate, config);
        yield put(Actions.started_game(response))
    }catch(e){
        yield put(Actions.start_game_error());
        console.error(e);
    }
}
function setLevel(level){
    switch(level)
    {
        case 1:
        return {   
            rows: 4,
            cols: 4,
            time: 3,
            max: 15,
            level: level
        }
         
        break
        case 2:
        return {
            rows: 6,
            cols: 5,
            time: 2,
            max: 25,
            level: level
        }
           
        break
        case 3:
         return{
            rows: 7,
            cols: 6,
            time: 2,
            neg: false,
            max: 80,
            level: level
         }
           
        break
        case 4:
         return {
            rows: 10,
            cols: 7,
            time: 2,
            max: 150,
            level: level
         }
        break;
        case 5:
         return {
            rows: 11,
            cols: 8,
            time: 2,
            max: 160,
            level: level
         }
        case 6:
         return {
            rows: 12,
            cols: 9,
            time: 2,
            max: 220,
            level: level
         }
     

    }
}
function generate(config){
    var {rows, cols, time,max, level} = config;
    matrix = new Array();
    var index = 0;
    for(var i = 0; i<rows; i++){
        matrix[i] = new Array();
        for(var j = 0; j<cols; j++){
            var rand = Math.random() * max;
            var randomNumber = Math.floor(rand+1); 

            var status = {id: index, number: randomNumber, clicked: false};
            matrix[i][j] = status;
            index++;
        }
     }
     for(var i=0; i<rows; i++){
         for(var j=0; j<cols;j++){
           searchPath(i,j,matrix[i][j].number,false,-1,-1, rows, cols); // Ricerca di tutti i possibili percorsi
         }
     }
     maxScore = 0;
     maxIndex = 0;
     for(var i=0; i<paths.length; i++){
       if(paths[i].pointSum>maxScore){
           maxScore = paths[i].pointSum;
           maxIndex = i;
       }
     }
     var bestPath = findBestPath(maxIndex)
     var response = {
         grid: matrix,
         rows: rows,
         cols: cols,
         time: time,
         level: level,
         maxScore: maxScore,
         bestPath: bestPath
     }
    return response;
   }
   
function findBestPath(index){
    var bestPath = new Array();
    var leaf = [paths[index].coordX,paths[index].coordY];
    bestPath.push(leaf)
    
    while(paths[index].parentId!=-1) {
            index = paths[index].parentId
            var node = [paths[index].coordX,paths[index].coordY]
            bestPath.push(node)
    }
 return bestPath
}
function searchPath(x,y,sum, isChild, xp, yp, rows, cols){
    if(x>=rows || y>=cols || x<0 || y<0){
        return;
    }
    var id;
    var idParent;
    if(x+1<rows){
        if((matrix[x][y].number>matrix[x+1][y].number)){
         var pSum = sum + matrix[x+1][y].number;
         if(!isChild){
            var pathElementRoot = {
                id: paths.length,
                coordX: x,
                coordY: y,
                parentX: x,
                parentY: y,
                parentId: -1,
                pointSum: matrix[x][y].number
            }
            paths.push(pathElementRoot);
         }
       
         var pathElement = {
             id: paths.length,
             coordX: x+1,
             coordY: y,
             parentX: x,
             parentY: y,
             parentId: paths.length-1,
             pointSum: pSum
         }
         paths.push(pathElement);
         searchPath(x+1,y,pSum,true,x,y, rows, cols);
        }
    }
    if(x-1>=0){
        if(!isChild){
            var pathElementRoot = {
                id: paths.length,
                coordX: x,
                coordY: y,
                parentX: x,
                parentY: y,
                parentId: -1,
                pointSum: matrix[x][y].number
            }
            paths.push(pathElementRoot);
         }
        if((matrix[x][y].number>matrix[x-1][y].number)){
         var pSum = sum + matrix[x-1][y].number;
         var pathElement = {
             id: paths.length,
             coordX: x-1,
             coordY: y,
             parentX: x,
             parentY: y,
             parentId: paths.length-1,
             pointSum: pSum 
         }
         paths.push(pathElement);
         searchPath(x-1,y,pSum,true,x,y, rows, cols);
        }
    
    }
  
    if(y+1<cols){
        if(!isChild){
            var pathElementRoot = {
                id: paths.length,
                coordX: x,
                coordY: y,
                parentX: x,
                parentY: y,
                parentId: -1,
                pointSum: matrix[x][y].number
            }
            paths.push(pathElementRoot);
         }
        if((matrix[x][y].number>matrix[x][y+1].number)){
            var pSum = sum + matrix[x][y+1].number;
            var pathElement = {
                id: paths.length,
                coordX: x,
                coordY: y+1,
                parentX: x,
                parentY: y,
                parentId: paths.length-1,
                pointSum: pSum
            }
            paths.push(pathElement);
            searchPath(x,y+1,pSum,true,x,y, rows, cols);
        }
    }
   
    if(y-1>=0){
        if(!isChild){
            var pathElementRoot = {
                id: paths.length,
                coordX: x,
                coordY: y,
                parentX: x,
                parentY: y,
                parentId: -1,
                pointSum: matrix[x][y].number
            }
            paths.push(pathElementRoot);
         }
        if((matrix[x][y].number>matrix[x][y-1].number)){
         var pSum = sum + matrix[x][y-1].number;
         var pathElement = {
             id: paths.length,
             coordX: x,
             coordY: y-1,
             parentX: x,
             parentY: y,
             parentId: paths.length-1,
             pointSum: pSum 
         }
         
         paths.push(pathElement);
         searchPath(x,y-1,pSum,true,x,y, rows, cols);
        }
    }
  
    return;
 }
export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STARTING_GAME, starting_game)
    ]
}
