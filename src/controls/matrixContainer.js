import React from 'react';

class MatrixCell extends React.Component{
    render() {
        let rowN = this.props.row + 1; 
        let name = this.props.name; 
        let mClassName = this.props.className;
        let update = this.props.update;
        let rows = this.props.data.map(function(elem, index){ 
            let position = name + rowN + ","+ (++index);
            return <input key={index} type="text" id = {position} placeholder={position} value={(elem || elem===0) ? elem : ""} disabled = {(mClassName === "matrixC") ? true : false} onChange={update}/>
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

export default class MatrixContainer extends React.Component {
    render() {
        let matrixC = this.props.data[0];
        let matrixA = this.props.data[1];
        let matrixB = this.props.data[2];
        return <div className="matrixContainer">
            <MatrixRow data={matrixC}></MatrixRow>
            <div id="matrixAContainer"><MatrixRow data={matrixA} update={this.props.update}></MatrixRow><span>A</span></div>
            <div id="matrixBContainer"><MatrixRow data={matrixB} update={this.props.update}></MatrixRow><span>B</span></div>
        </div>
    }
}