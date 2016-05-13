import React from 'react';
let cleanUrl = require('../pics/clean.png');
let vvUrl = require('../pics/viceversa.png');
let minusUrl = require('../pics/minus.png');
let plusUrl = require('../pics/plus.png');

export default class ControlsPanel extends React.Component{    
    render() {
        let status = this.props.data[0].status;
        let prompt = this.props.data[0].description;
        let activeMatrix = this.props.data[0].activeMatrix;
        return <div className={"controlsPanel " + ((status === "edit") ? "controlsPanelEdit " : "") + ((status === "fail") ? "controlsPanelErr" : "")}>
            <div id="mulContainer">
                <div id="mulButtonPart1" onClick={this.props.multiply}><span>Умножить матрицы</span></div>
                <div id="mulButtonPart2"></div>
            </div>
            <div id="matrixOp">
            <button id="clearMatrix" onClick={this.props.clear}><img id="cleanImg" src={cleanUrl}/>Очистить матрицы</button><br></br>
            <button id="viceVersa" onClick={this.props.change}><img id="viceVersaImg" src={vvUrl}/>Поменять матрицы местами</button><br></br>
                <label id="labelRadioA"><input type="radio" id="radioMatrixA" value="matrixA" name="matrix" onClick={this.props.setActiveMatrix}/> Матрица А</label>
                <label id="labelRadioB"><input type="radio" id="radioMatrixB" value="matrixB" name="matrix" onClick={this.props.setActiveMatrix}/> Матрица B</label>
                <br></br>
            <button id="addRow" onClick={this.props.addRow} disabled={(activeMatrix) ? false : true}><img id="addRowImg" src={plusUrl}/>Добавить</button>
            <button id="removeRow" onClick={this.props.removeRow} disabled={(activeMatrix) ? false : true}><img id="minusRowImg" src={minusUrl}/>Удалить</button>строку <br></br>
            <button id="addColumn" onClick={this.props.addCol} disabled={(activeMatrix) ? false : true}><img id="addColImg" src={plusUrl}/>Добавить</button>
            <button id="removeColumn" onClick={this.props.removeCol} disabled={(activeMatrix) ? false : true}><img id="minusColImg" src={minusUrl}/>Удалить</button>столбец
            <p>{prompt}</p>
            
            </div>
        </div>
    }
}


//<button className="mulMatrix" onClick={this.props.multiply}>Умножить матрицы</button><br></br> 