import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';



let initialStoreObj = [
    {className: "matrixC", matrix: [['1', '2', '3', '4'],['5', '6', '7', '8']], name : "c", activeMatrix: "", status: "", description: ""},
    {className: "matrixA", matrix: [['1', '2', '3'],['1', '1', '1']], name : "a"},
    {className: "matrixB", matrix: [['2', '3', '4', '5'],['6', '6', '6', '6'],['7', '7', '7', '7']], name : "b"},
]
//Actions
function multiply(matrixA, matrixB){
    return {type: "MULTIPLY", matrixA, matrixB}
} 
function cleanMatrix(){
    return {type: "CLEAN"}
} 
function interchangePlace(matrixA, matrixB){
    return {type: "INTERCHANGE", matrixA, matrixB}
}
function swicthRadioMatrix(activeMatrix){
    return {type: "SWITCH_RADIO", activeMatrix}
}
function addRow(matrixIndex){
    return {type: "ADD_ROW", matrixIndex}
}
function addColumn(matrixIndex){
    return {type: "ADD_COLUMN", matrixIndex}
}
function removeRow(matrixIndex){
    return {type: "REMOVE_ROW", matrixIndex}
}
function removeColumn(matrixIndex){
    return {type: "REMOVE_COLUMN", matrixIndex}
}
function updateMatrix(matrix, index){
    return {type: "UPDATE", matrix, index}
}

//Reducers
function matrixReducers (state, action){
    
    function addColumnsRowsToResultMatrix(matrixA, matrixB){
        let matrixC = [];
        let matrixCRow = [];
        if (matrixA.length > 0){
            if (matrixB.length > 0){
               for (let j=0; j < matrixB[0].length; j++){
                matrixCRow.push('');
               }                    
               for (let i=0; i < matrixA.length; i++){
                matrixC.push(matrixCRow);
               }
            }
        }
        return matrixC;
    }
    
    function retunValueAfterAddRemove(index, updatedMatrix){
        let description = "";
        let status = "";
        if (index === 1){
            let matrixCUpdate = addColumnsRowsToResultMatrix(updatedMatrix, state[2].matrix);
            return [].concat(Object.assign({}, state[0], {matrix: matrixCUpdate}, {status: status}, {description: description}), Object.assign({}, state[1], {matrix: updatedMatrix}), state[2]);
        }
        if (index === 2){
            let matrixCUpdate = addColumnsRowsToResultMatrix(state[1].matrix, updatedMatrix); 
            return [].concat(Object.assign({}, state[0], {matrix: matrixCUpdate}, {status: status}, {description: description}), state[1], Object.assign({}, state[2], {matrix: updatedMatrix}));
        }
    }
    
    function checkMatrixData(matrix){
        for(let row=0; row < matrix.length; row++){
            for (let col=0; col < matrix[row].length; col++){
                let val = + matrix[row][col];
                if (typeof val !== "number" || val <= 0 || isNaN(val)){
                    return false
                }       
            }
        }
        return true;
    }
    switch(action.type){
        
        case "MULTIPLY": {
            let objectToReturn = state.slice();
            let matrixA = action.matrixA;
            let matrixB = action.matrixB;
            let resultMatrix = [];
            let status = "";
            let description = "";
            if (matrixA.length && matrixB.length){
                if (matrixA[0].length === matrixB.length){
                    if (checkMatrixData(matrixA) && checkMatrixData(matrixB)){
                        for (let row=0; row<matrixA.length; row++){
                            let resSum = 0;
                            let matrixBSize = 0;
                            let key = 0;
                            let col =0;
                            let matrixBCol = 0;
                            resultMatrix.push([]);
                                while(matrixBSize<matrixB.length*matrixB[0].length){
                                    resSum += matrixA[row][key]*matrixB[key][matrixBCol];
                                    key++;
                                    matrixBSize++;
                                    if (key > matrixA.length){
                                        key=0;
                                        resultMatrix[row][col]=resSum;
                                        col++;
                                        resSum = 0
                                        matrixBCol++
                                    }
                                }
                        }
                        objectToReturn[0] = Object.assign({}, state[0], {matrix: resultMatrix});
                        return objectToReturn;
                    } else {status = "fail"; description = "Матрицы должны быть заполнены положительными числами больше 0.";} 
                } else { status = "fail"; description = "Такие матрицы нельзя перемножить так как количество столбцов матрицы А не равно количеству строк матриц В."; }
            } else {status = "fail"; description = "Матрицы не определены"}
            objectToReturn[0] = Object.assign({}, state[0], {status: status}, {description: description});
            return objectToReturn;
        }
            
        case "UPDATE": {
            let status = "edit";
            let description = "";
            let objToReturn = retunValueAfterAddRemove(action.index, action.matrix).slice();
            objToReturn[0] = Object.assign({}, state[0], {status: status}, {description: description});
            return objToReturn; 
        }
            
        case "CLEAN": {
            let objToReturn = state.slice();
            let updatedMatrix = [];
            let description = "";
            let status = "";
            for (let index=0; index<state.length; index++){
                let matrix = state[index].matrix.slice();
                for (let row=0; row<matrix.length; row++){
                    let matrixRow = matrix[row];
                    for (let col=0; col<matrixRow.length; col++){
                        matrixRow[col] = ''; 
                    }
                }
                if (index === 0){
                    objToReturn[index] = Object.assign({}, state[index], {matrix: matrix}, {status: status}, {description: description})   
                } else {
                    objToReturn[index] = Object.assign({}, state[index], {matrix: matrix})   
                }
            }
            return objToReturn;
        }
            
        case "SWITCH_RADIO":
            let description = "";
            let status = "";
            return [].concat(Object.assign({}, state[0], {activeMatrix: action.activeMatrix}, {status: status}, {description: description}), state.slice(1));
            
        case "INTERCHANGE":{
            let objToReturn = [];
            let description = "";
            let status = "";
            for (var key= 0; key < state.length; key++){
                objToReturn.push(Object.assign({}, state[key], {matrix: []}));
            }
            let mC = addColumnsRowsToResultMatrix(action.matrixB, action.matrixA);
            Object.assign(objToReturn[0], state[0], {matrix: mC}, {status: status}, {description: description});
            Object.assign(objToReturn[1], {matrix: action.matrixB});
            Object.assign(objToReturn[2], {matrix: action.matrixA});
            return objToReturn
        }
            
        case "ADD_ROW":{ 
            let index=action.matrixIndex;
            let matrixToChange = state[index].matrix.slice();
            let addElementArray = [''];
            
            if (matrixToChange.length < 10){
                if (matrixToChange.length > 0){
                    for (let k=0; k < matrixToChange[0].length-1; k++){
                        addElementArray.push('');
                    }     
                }
                matrixToChange.push(addElementArray);
                return retunValueAfterAddRemove(index, matrixToChange);
            }
            
            return state;
        }
            
        case "ADD_COLUMN": {
            let index = action.matrixIndex;
            let matrixToChange = state[index].matrix.slice();
            
            if (matrixToChange.length > 0 && matrixToChange[0].length < 10){
                for (let row=0; row<matrixToChange.length; row++){
                    matrixToChange[row].push('');
                }
                return retunValueAfterAddRemove(index, matrixToChange);
            } 
            if (matrixToChange.length === 0){
                matrixToChange.push(['']);
                return retunValueAfterAddRemove(index, matrixToChange);
            }
            
            return state;
        }
            
        case "REMOVE_ROW":{
            let index = action.matrixIndex;
            let matrixToChange = state[action.matrixIndex].matrix.slice();
            let changeArray = [];
            
            if (matrixToChange.length > 0){
                matrixToChange.pop();
                return retunValueAfterAddRemove(index, matrixToChange);
            }
            
            return state;
        }

        case "REMOVE_COLUMN":{
            let index = action.matrixIndex;
            let matrixToChange = state[action.matrixIndex].matrix.slice();
            
            if (matrixToChange.length > 0){
                for (let row=0; row < matrixToChange.length; row++){
                    matrixToChange[row].pop();
                }
                if ( matrixToChange[0].length === 0){
                   matrixToChange.length = 0; 
                }
                return retunValueAfterAddRemove(index, matrixToChange);
            }
            
            return state;
        }
            
        default: 
            return state;     
}
}

let store = createStore(matrixReducers, initialStoreObj);

////React

function choosingMatrixToChange(func){
    let matrixC = store.getState()[0];
    if (matrixC.activeMatrix === "matrixA"){
        store.dispatch(func(1));
    } 
    if (matrixC.activeMatrix === "matrixB"){
        store.dispatch(func(2));
    }
}

let onMul = function(){
    let matrixA = store.getState()[1].matrix;
    let matrixB = store.getState()[2].matrix;
    store.dispatch(multiply(matrixA, matrixB));
    console.log(store.getState());
    return store.getState();
}

let onClearMatrix = function(){
    store.dispatch(cleanMatrix());
    return store.getState();
}

let onChangeActiveMatrix = function(e){
    store.dispatch(swicthRadioMatrix(e.target.value));
    return store.getState();
}

let onIntrchangePlace = function(){
    let matrixA = store.getState()[1].matrix;
    let matrixB = store.getState()[2].matrix;
    store.dispatch(interchangePlace(matrixA, matrixB));
    return store.getState();
}

let onAddRow = function(){
    choosingMatrixToChange(addRow);
    return store.getState();
}

let onRemoveRow = function() {
    choosingMatrixToChange(removeRow);
    return store.getState();
}

let onRemoveColumn = function() {
    choosingMatrixToChange(removeColumn);
    return store.getState();
}

let onAddColumn = function() {
    choosingMatrixToChange(addColumn);
    return store.getState();
}

let updateMatrixValues = function(e){
    let placeWithNewData = e.target.placeholder;
    let re = /a/;
    let index = re.test(placeWithNewData) ? 1 : 2;
    let row = placeWithNewData.slice(1, placeWithNewData.indexOf(",")) - 1;
    let col = placeWithNewData.slice(placeWithNewData.indexOf(",")+1) - 1;
    let matrix = store.getState()[index].matrix.slice();
    matrix[row][col] = e.target.value;
    store.dispatch(updateMatrix(matrix, index));
    return store.getState();
}


class MatrixCell extends React.Component{
    render() {
        let rowN = this.props.row + 1; 
        let name = this.props.name; 
        let mClassName = this.props.className;
        let update = this.props.update;
        let rows = this.props.data.map(function(elem, index){ 
            return <input key={index} type="text" placeholder={name + rowN + ","+ (++index)} value={ (elem || elem===0) ? elem : ""} readOnly = {(mClassName === "matrixC") ? true : false} onChange={update}/>
        })
        return <div>{rows}</div>
    }
}

class MatrixRow extends React.Component{
    render(){
        let className = this.props.data.className;
        let name = this.props.data.name;
        let update = this.props.update;
        let elementsRows = this.props.data.matrix.map(function(element, index){
            return <MatrixCell key={index} data = {element} row = {index} name = {name} className = {className} update = {update}/>
        })
        return <div className={className}>
            {elementsRows}
        </div>
    }
}

class MatrixContainer extends React.Component {
    render() {
        let matrixC = this.props.data[0];
        let matrixA = this.props.data[1];
        let matrixB = this.props.data[2];
        return <div className="matrixContainer">
            <MatrixRow data={matrixC}></MatrixRow>
            <MatrixRow data={matrixA} update={this.props.update}></MatrixRow><span>A</span>
            <MatrixRow data={matrixB} update={this.props.update}></MatrixRow><span>B</span>
        </div>
    }
}

class ControlsPanel extends React.Component{    
    render() {
        let status = this.props.data[0].status;
        let prompt = this.props.data[0].description;
        return <div className={"controlsPanel " + ((status === "edit") ? "controlsPanelEdit " : "") + ((status === "fail") ? "controlsPanelErr" : "")}>
            <button className="mulMatrix" onClick={this.props.multiply}>Умножить матрицы</button><br></br> 
            <button className="clearMatrix" onClick={this.props.clear}>Очистить матрицы</button><br></br>
            <button className="viceVersa" onClick={this.props.change}>Поменять матрицы местами</button><br></br>
            <div>
                <label><input type="radio" id="radioMatrixA" value="matrixA" name="matrix" onClick={this.props.setActiveMatrix}/> Матрица А</label>
                <label><input type="radio" id="radioMatrixB" value="matrixB" name="matrix" onClick={this.props.setActiveMatrix}/> Матрица B</label><br></br>
            <button className="addRow" onClick={this.props.addRow}>Добавить</button>
            <button className="removeRow" onClick={this.props.removeRow}>Удалить</button>строку <br></br>
            <button className="addColumn" onClick={this.props.addCol}>Добавить</button>
            <button className="removeColumn" onClick={this.props.removeCol}>Удалить</button>столбец
            <p>{prompt}</p>
            </div>
        </div>
    }
}

class MainContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props;
        this.update = this.update.bind(this);
        this.change = this.change.bind(this);
        this.clear = this.clear.bind(this);
        this.multiply = this.multiply.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addCol = this.addCol.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.removeCol = this.removeCol.bind(this);
        this.setActiveMatrix = this.setActiveMatrix.bind(this);
    }
    
    update(e){
        let data = updateMatrixValues(e);
        this.setState({data: data});
    }
    change(e){
        let data = onIntrchangePlace();
        this.setState({data: data});        
    }
    clear(e){
        let data = onClearMatrix();
        this.setState({data: data});
    }
    multiply(e){
        let data = onMul();
        this.setState({data: data});
    }
    addRow(){
        let data = onAddRow();
        this.setState({data: data});
    }
    removeCol(){
        let data = onRemoveColumn();
        this.setState({data: data});
    }
    addCol(){
        let data = onAddColumn();
        this.setState({data: data});
    }
    removeRow(){
        let data = onRemoveRow();
        this.setState({data: data});
    }
    setActiveMatrix(e){
        let data = onChangeActiveMatrix(e);
        this.setState({data: data});
    }
    render() {
        return <div>
            <ControlsPanel clear={this.clear} change={this.change} multiply={this.multiply} addRow={this.addRow} addCol={this.addCol} removeRow={this.removeRow} removeCol={this.removeCol} setActiveMatrix={this.setActiveMatrix} data={this.props.data}></ControlsPanel>            
            <MatrixContainer data={this.state.data} update={this.update}></MatrixContainer>
        </div>
    }
}

let render = () =>{
    console.log(store.getState());
    let data = store.getState();
    ReactDOM.render(<MainContainer data={data}></MainContainer>, document.getElementById("app"));   
}
                    
render();

store.subscribe(render);

export default MainContainer