import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './matchActions';
import Store from '../../redux/store';
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
function setLevel(payload){
    level = payload.level;
    modality = payload.modality;
    switch(level)
    {
        case 1:
        return {  
            modality: modality,
            rows: 4,
            cols: 4,
            time: 180,
            min: 1,
            max: 15,
            level: level
        }
         
        break
        case 2:
        return {
            modality: modality,
            rows: 6,
            cols: 5,
            time: 170,
            min: 1,
            max: 25,
            level: level
        }
           
        break
        case 3:
         return{
            modality: modality,
            rows: 7,
            cols: 6,
            time: 170,
            min: 10,
            max: 100,
            level: level
         }
           
        break
        case 4:
         return {
            modality: modality,
            rows: 10,
            cols: 7,
            time: 150, 
            min: 20,
            max: 300,
            level: level
         }
        break;
        case 5:
         return {
            modality: modality,
            rows: 11,
            cols: 8,
            time: 150, 
            min: 35,
            max: 400,
            level: level
         }
        case 6:
         return {
            modality: modality,
            rows: 11,
            cols: 9,
            time: 140, //140
            min: 50, //50
            max: 600, //600
            level: level
         }
     

    }
}
function generate(config){
    var {modality, rows, cols, time,min,max, level} = config;
    matrix = new Array();
    var index = 0;
    for(var i = 0; i<rows; i++){
        matrix[i] = new Array();
        for(var j = 0; j<cols; j++){
            var rand = Math.random() * max;
            var randomNumber = Math.floor(rand+min); 

            var status = {id: index, x:i, y:j, number: randomNumber};
            matrix[i][j] = status;
            index++;
        }
     }
     pathCounter = 0
     for(var i=0; i<rows; i++){
         for(var j=0; j<cols;j++){
           searchPath(modality,i,j,matrix[i][j].number,false,-1,-1,-1, rows, cols); // Ricerca di tutti i possibili percorsi
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
     
     var bestPath = findBestPath(modality,maxIndex,matrix,rows,cols)
     
     var response = {
         tableData: matrix,
         rows: rows,
         cols: cols,
         time: time,
         level: level,
         score: 0,
         bestScore: 0,
         maxScore: maxScore,
         bestPath: bestPath,
         root: -1,
         lastClicked: -1,
         lastValue: 9999,
         left:false,
         newMatch: true
     }
    return response;
   }
   
function findBestPath(modality, index,matrix,rows,cols){
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
       
    
       
   
    if(x+1<rows && y+1<cols && modality == 2){ // Diagonale in basso a destra
        if(matrix[x+1][y+1].number>max){
            max = matrix[x+1][y+1].number
            coordMax = [x+1,y+1]
        }
    }
    if(x+1 < rows){
        if(matrix[x+1][y].number>max){
            max = matrix[x+1][y].number
            coordMax = [x+1,y]
        }
    }
    if(x-1>=0 && y-1>=0 && modality == 2){ // Diagonale in alto a sinistra
        if(matrix[x-1][y-1].number>max){
            max = matrix[x-1][y-1].number
            coordMax = [x-1,y-1]
        }
    }

    if(x-1 >= 0){
        if(matrix[x-1][y].number>max){
            max = matrix[x-1][y].number
            coordMax = [x-1,y]
        }
    }
    if(x-1>=0 && y+1<cols && modality == 2){ // Diagonale in alto a destra
        if(matrix[x-1][y+1].number>max){
            max = matrix[x-1][y+1].number
            coordMax = [x-1,y+1]
        }
    }
    if(y+1 < cols){
        if(matrix[x][y+1].number>max){
            max = matrix[x][y+1].number
            coordMax = [x,y+1]
        }
    }
    if(x+1<rows && y-1>=0 && modality == 2){ // Diagonale in basso a sinistra
        if(matrix[x+1][y-1].number>max){
            max = matrix[x+1][y-1].number
            coordMax = [x+1,y-1]
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
function searchPath(modality, x, y, sum, isChild, xp, yp, parentId, rows, cols){


    if(x>=rows || y>=cols || x<0 || y<0){
        return;
    }
    if(modality == 2){
        if(x+1<rows && y+1<cols){ // Diagonale in basso a destra
            if((matrix[x][y].number>matrix[x+1][y+1].number)){
             var pSum = sum + matrix[x+1][y+1].number;
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
                 coordY: y+1,
                 parentX: x,
                 parentY: y,
                 parentId: parentId,
                 pointSum: pSum
             }
             paths.push(pathElement);
             pathCounter++
             searchPath(modality,x+1,y+1,pSum,true,x,y,pathCounter-1, rows, cols);
            }
        }
        if(x-1>=0 && y-1>=0){ // Diagonale in alto a sinistra
            if((matrix[x][y].number>matrix[x-1][y-1].number)){
             var pSum = sum + matrix[x-1][y-1].number;
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
                 coordY: y-1,
                 parentX: x,
                 parentY: y,
                 parentId: parentId,
                 pointSum: pSum
             }
             paths.push(pathElement);
             pathCounter++
             searchPath(modality,x-1,y-1,pSum,true,x,y,pathCounter-1, rows, cols);
            }
        }
        if(x-1>=0 && y+1<cols){ // Diagonale in alto a destra
            if((matrix[x][y].number>matrix[x-1][y+1].number)){
             var pSum = sum + matrix[x-1][y+1].number;
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
                 coordY: y+1,
                 parentX: x,
                 parentY: y,
                 parentId: parentId,
                 pointSum: pSum
             }
             paths.push(pathElement);
             pathCounter++
             searchPath(modality,x-1,y+1,pSum,true,x,y,pathCounter-1, rows, cols);
            }
        }
        if(x+1<rows && y-1>=0){ // Diagonale in basso a sinistra
            if((matrix[x][y].number>matrix[x+1][y-1].number)){
             var pSum = sum + matrix[x+1][y-1].number;
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
                 coordY: y-1,
                 parentX: x,
                 parentY: y,
                 parentId: parentId,
                 pointSum: pSum
             }
             paths.push(pathElement);
             pathCounter++
             searchPath(modality,x+1,y-1,pSum,true,x,y,pathCounter-1, rows, cols);
            }
        }
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
         searchPath(modality,x+1,y,pSum,true,x,y,pathCounter-1, rows, cols);
         
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
         searchPath(modality,x-1,y,pSum,true,x,y,pathCounter-1, rows, cols);
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
            searchPath(modality,x,y+1,pSum,true,x,y,pathCounter-1, rows, cols);
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
         searchPath(modality,x,y-1,pSum,true,x,y,pathCounter-1, rows, cols);
        }
    }
    
    
  
    return;
 }

 function * clicking_cell(action){
    try {
        var cellPayload = action.payload
        var response = yield call(cellClick, cellPayload);

        yield put(Actions.clicked_cell(response))
    }catch(e){
        yield put(Actions.click_cell_error());
        console.error(e);
    }
 }
 function checkWin(newScore,maxScore){
    if(newScore>=maxScore)
        return true

   return false
  }

function isAdjacency(modality,id,lastClicked,cols){
    if(id == lastClicked+1 || id == lastClicked-1 || id == lastClicked+cols || id == lastClicked-cols){
        return true;
    }else if(modality == 2 && (id==lastClicked-1-cols || id == lastClicked+1-cols || id == lastClicked-1+cols || id == lastClicked+1+cols)){
        return true;
    }
   return false;
  }

function cellClick(payload) {
    var {id,clicked,number,modality} = payload
    var {lastClicked,cols,rows,score,bestScore,maxScore,time,left,tableData,level} = Store.getState().Match.data

    var reset = false
          if(clicked)
            value = -number
          else
            value = number
      
    if(lastClicked==-1){ // se è la prima cella cliccata
      lastClicked = id
      root = id
    }else{
      if(!isAdjacency(modality,id,lastClicked,cols) || number>=lastValue){
        reset = true
        score = 0
        root = id
        if(value<0) // evita che il punteggio vada in negativo qualora si ricominciasse un percorso con una cella già cliccata
          value = -value
      }
    }
    lastClicked = id
    if(reset){
        clicked = true
    }else{
        clicked = !clicked
    }
    lastValue = number
    newScore = score + value 
    if(newScore > bestScore){
        bestScore = newScore
    }
    win = checkWin(newScore,maxScore)
    const response = {
        id: id,
        clicked: clicked,
        rows: rows,
        cols: cols,
        bestScore: bestScore,
        newScore: newScore,
        lastClicked: lastClicked,
        lastValue: lastValue,
        root: root,
        reset: reset,
        score: newScore,
        maxScore: maxScore,
        tableData:tableData,
        time: time,
        left:left,
        win: win,
        level:level,
        newMatch: false
    }
   return response
  }
 
export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STARTING_GAME, starting_game),
        takeEvery(Actions.types.CLICKING_CELL, clicking_cell)
    ]
}
