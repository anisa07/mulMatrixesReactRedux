import store from '../store/store'

import {multiply, cleanMatrix, interchangePlace, swicthRadioMatrix, addRow, addColumn, removeRow, removeColumn, updateMatrix} from '../actions/actions' 
    
function choosingMatrixToChange(func){
    let matrixC = store.getState()[0];
    if (matrixC.activeMatrix === "matrixA"){
        store.dispatch(func(1));
    } 
    if (matrixC.activeMatrix === "matrixB"){
        store.dispatch(func(2));
    }
}

export function onMul(){
    let matrixA = store.getState()[1].matrix;
    let matrixB = store.getState()[2].matrix;
    store.dispatch(multiply(matrixA, matrixB));
    return store.getState();
}

export function onClearMatrix(){
    store.dispatch(cleanMatrix());
    return store.getState();
}

export function onChangeActiveMatrix(e){
    store.dispatch(swicthRadioMatrix(e.target.value));
    return store.getState();
}

export function onIntrchangePlace(){
    let matrixA = store.getState()[1].matrix;
    let matrixB = store.getState()[2].matrix;
    store.dispatch(interchangePlace(matrixA, matrixB));
    return store.getState();
}

export function onAddRow(){
    choosingMatrixToChange(addRow);
    return store.getState();
}

export function onRemoveRow() {
    choosingMatrixToChange(removeRow);
    return store.getState();
}

export function onRemoveColumn() {
    choosingMatrixToChange(removeColumn);
    return store.getState();
}

export function onAddColumn() {
    choosingMatrixToChange(addColumn);
    return store.getState();
}

export function updateMatrixValues(e){
    let placeWithNewData = e.target.id;
    let re = /a/;
    let index = re.test(placeWithNewData) ? 1 : 2;
    let row = placeWithNewData.slice(1, placeWithNewData.indexOf(",")) - 1;
    let col = placeWithNewData.slice(placeWithNewData.indexOf(",")+1) - 1;
    let matrix = store.getState()[index].matrix.slice();
    matrix[row][col] = e.target.value;
    store.dispatch(updateMatrix(matrix, index));
    return store.getState();
}

