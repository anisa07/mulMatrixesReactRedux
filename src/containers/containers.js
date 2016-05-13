import React from 'react';
import ControlsPanel from '../controls/controlPanel'
import MatrixContainer from '../controls/matrixContainer'

import {updateMatrixValues, onMul, onClearMatrix, onChangeActiveMatrix, onIntrchangePlace, onAddRow, onRemoveRow, onRemoveColumn, onAddColumn} from '../handlers/handlers'     
    
export default class MainContainer extends React.Component{
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