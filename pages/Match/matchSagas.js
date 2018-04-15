import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './matchActions';

var matrix;
var paths = new Array();
var pathCounter = 0;


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
            time: 200,
            max: 15,
            level: level
        }
         
        break
        case 2:
        return {
            rows: 6,
            cols: 5,
            time: 190,
            max: 25,
            level: level
        }
           
        break
        case 3:
         return{
            rows: 7,
            cols: 6,
            time: 180,
            neg: false,
            max: 80,
            level: level
         }
           
        break
        case 4:
         return {
            rows: 10,
            cols: 7,
            time: 170,
            max: 150,
            level: level
         }
        break;
        case 5:
         return {
            rows: 11,
            cols: 8,
            time: 160,
            max: 180,
            level: level
         }
        case 6:
         return {
            rows: 11,
            cols: 9,
            time: 150,
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

            var status = {id: index, x:i, y:j, number: randomNumber, clicked: false};
            matrix[i][j] = status;
            index++;
        }
     }
     pathCounter = 0
     for(var i=0; i<rows; i++){
         for(var j=0; j<cols;j++){
           searchPath(i,j,matrix[i][j].number,false,-1,-1,-1, rows, cols); // Ricerca di tutti i possibili percorsi
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
     
     var bestPath = findBestPath(maxIndex,matrix,rows,cols)
     
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
   
function findBestPath(index,matrix,rows,cols){
    var bestPath = new Array();
    var leaf = [paths[index].coordX,paths[index].coordY];
    bestPath.push(leaf)
    var node
    while((paths[index].parentId!=-1)){
            index = paths[index].parentId
            node = [paths[index].coordX,paths[index].coordY]
            bestPath.push(node)
    }

    var x = node[0]
    var y = node[1]
    var max = 0
    var coordMax = [0,0]
    if(x+1 < rows){
        if(matrix[x+1][y].number>max){
            max = matrix[x+1][y].number
            coordMax = [x+1,y]
        }
    }
    if(x-1 >= 0){
        if(matrix[x-1][y].number>max){
            max = matrix[x-1][y].number
            coordMax = [x-1,y]
        }
    }
    if(y+1 < cols){
        if(matrix[x][y+1].number>max){
            max = matrix[x][y+1].number
            coordMax = [x,y+1]
        }
    }
    if(y-1 >= 0){
        if(matrix[x][y-1].number>max){
            max = matrix[x][y-1].number
            coordMax = [x,y-1]
        }
    }
    bestPath.push(coordMax) // la root
 return bestPath 
}
function searchPath(x,y,sum, isChild, xp, yp, parentId, rows, cols){


    if(x>=rows || y>=cols || x<0 || y<0){
        return;
    }
    
    if(x+1<rows){
        if((matrix[x][y].number>matrix[x+1][y].number)){
         var pSum = sum + matrix[x+1][y].number;
         if(!isChild){
            var pathElementRoot = {
                id: pathCounter,
                coordX: x,
                coordY: y,
                parentX: x,
                parentY: y,
                parentId: -1,
                pointSum: matrix[x][y].number
            }
            paths.push(pathElementRoot);
            pathCounter++
         }
       
         var pathElement = {
             id: pathCounter,
             coordX: x+1,
             coordY: y,
             parentX: x,
             parentY: y,
             parentId: parentId,
             pointSum: pSum
         }
         paths.push(pathElement);
         pathCounter++
         searchPath(x+1,y,pSum,true,x,y,pathCounter-1, rows, cols);
         
        }
    }
    if(x-1>=0){
        if((matrix[x][y].number>matrix[x-1][y].number)){
         var pSum = sum + matrix[x-1][y].number;
         if(!isChild){
            var pathElementRoot = {
                id: pathCounter,
                coordX: x,
                coordY: y,
                parentX: x,
                parentY: y,
                parentId: -1,
                pointSum: matrix[x][y].number
            }
            paths.push(pathElementRoot);
            pathCounter++
         }
         var pathElement = {
             id: pathCounter,
             coordX: x-1,
             coordY: y,
             parentX: x,
             parentY: y,
             parentId: parentId,
             pointSum: pSum 
         }
         paths.push(pathElement);
         pathCounter++
         searchPath(x-1,y,pSum,true,x,y,pathCounter-1, rows, cols);
        }
    
    }
  
    if(y+1<cols){
        if((matrix[x][y].number>matrix[x][y+1].number)){
            var pSum = sum + matrix[x][y+1].number;
            if(!isChild){
                var pathElementRoot = {
                    id: pathCounter,
                    coordX: x,
                    coordY: y,
                    parentX: x,
                    parentY: y,
                    parentId: -1,
                    pointSum: matrix[x][y].number
                }
                pathCounter++
                paths.push(pathElementRoot);
             }
            var pathElement = {
                id: pathCounter,
                coordX: x,
                coordY: y+1,
                parentX: x,
                parentY: y,
                parentId: parentId,
                pointSum: pSum
            }
            paths.push(pathElement);
            pathCounter++
            searchPath(x,y+1,pSum,true,x,y,pathCounter-1, rows, cols);
        }
    }
   
    if(y-1>=0){
       
        if((matrix[x][y].number>matrix[x][y-1].number)){
            if(!isChild){
                var pathElementRoot = {
                    id: pathCounter,
                    coordX: x,
                    coordY: y,
                    parentX: x,
                    parentY: y,
                    parentId: -1,
                    pointSum: matrix[x][y].number
                }
                paths.push(pathElementRoot);
                pathCounter++
             }
         var pSum = sum + matrix[x][y-1].number;
         var pathElement = {
             id: pathCounter,
             coordX: x,
             coordY: y-1,
             parentX: x,
             parentY: y,
             parentId: parentId,
             pointSum: pSum 
         }
         
         paths.push(pathElement);
         pathCounter++
         searchPath(x,y-1,pSum,true,x,y,pathCounter-1, rows, cols);
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
