import matrixReducers from '../reducers/reducers'
import { createStore } from 'redux';

let initialStoreObj = [
    {className: "matrixC", matrix: [['', '', '', ''],['', '', '', '']], name : "c", activeMatrix: "", status: "", description: ""},
    {className: "matrixA", matrix: [['1', '2', '3'],['1', '1', '1']], name : "a"},
    {className: "matrixB", matrix: [['2', '3', '4', '5'],['6', '6', '6', '6'],['7', '7', '7', '7']], name : "b"},
]

let store = createStore(matrixReducers, initialStoreObj);

export default store