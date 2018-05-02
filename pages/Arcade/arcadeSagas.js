import {call, put,takeEvery, select} from 'redux-saga/effects';
import * as Actions from './arcadeActions';
import Levels from './arcadeGrids';
import Store from '../../redux/store';


function * starting_arcade(action){
    try {
        var response = yield call(generate,action.payload)
        yield put(Actions.started_arcade(response))
    }catch(e){
        console.error(e);
        yield put(Actions.start_arcade_error());
       
    }
}
function generate(payload){  
    
    var {rows,cols,level,maxScore,grid} = Levels[payload-1]
    var index = 0; 
    var matrix = []
    for(var i=0; i<rows; i++){
        matrix[i] = []
        for(var j=0; j<cols; j++){
            var number =  grid[i][j]
            matrix[i][j] = {
                id: index,
                number:number,
                clicked: false
            }
            index++ 
        }
    }

    var difficulty = (rows == 4 && cols == 4) ? 1:(rows==6 && cols == 5) ? 2:(rows==7 && cols == 6)?3:(rows==10 && cols==7)?4:(rows==11 && cols==8)?5:6;
    var response = {
        tableData: matrix,
        rows: rows,
        cols: cols,
        level: level,
        difficulty: difficulty,
        score: 0,
        maxScore: maxScore,
        root: -1,
        lastClicked: -1,
        lastValue: 9999,
        newMatch: true
    }
   return response
}

function * clicking_cell_arcade(action){
    try {
        var cellPayload = action.payload
        var response = yield call(cellClick, cellPayload);

        yield put(Actions.clicked_cell_arcade(response))
    }catch(e){
        yield put(Actions.click_cell_arcade_error());
        console.error(e);
    }
 }
 function checkWin(newScore,maxScore){
    if(newScore>=maxScore)
        return true

   return false
  }
function isAdjacency(id,lastClicked,cols){
    
    
    if(id == lastClicked+1 || id == lastClicked-1 || id == lastClicked+cols || id == lastClicked-cols){
        return true;
    }
   return false;
  }

function cellClick(payload) {
    var {id,clicked,number} = payload
    var {lastClicked,cols,rows,score,maxScore,tableData,level,difficulty} = Store.getState().Arcade.data
    
    var reset = false
          if(clicked)
            value = -number
          else
            value = number
      
    if(lastClicked==-1){ // se è la prima cella cliccata
      lastClicked = id
      root = id
    }else{
      if(!isAdjacency(id,lastClicked,cols) || number>=lastValue){
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
    win = checkWin(newScore,maxScore)
    const response = {
        id: id,
        clicked: clicked,
        rows: rows,
        cols: cols,
        newScore: newScore,
        lastClicked: lastClicked,
        lastValue: lastValue,
        root: root,
        reset: reset,
        score: newScore,
        maxScore: maxScore,
        tableData:tableData,
        level:level,
        difficulty: difficulty,
        win: win,
        newMatch: false
    }
   return response
  }

export default function * root() {
    yield * 
    [
        takeEvery(Actions.types.STARTING_ARCADE, starting_arcade),
        takeEvery(Actions.types.CLICKING_CELL_ARCADE, clicking_cell_arcade)
    ]
}
