export function multiply(matrixA, matrixB) {
    return {
        type: "MULTIPLY",
        matrixA,
        matrixB
    }
}

export function cleanMatrix() {
    return {
        type: "CLEAN"
    }
}

export function interchangePlace(matrixA, matrixB) {
    return {
        type: "INTERCHANGE",
        matrixA,
        matrixB
    }
}

export function swicthRadioMatrix(activeMatrix) {
    return {
        type: "SWITCH_RADIO",
        activeMatrix
    }
}

export function addRow(matrixIndex) {
    return {
        type: "ADD_ROW",
        matrixIndex
    }
}

export function addColumn(matrixIndex) {
    return {
        type: "ADD_COLUMN",
        matrixIndex
    }
}

export function removeRow(matrixIndex) {
    return {
        type: "REMOVE_ROW",
        matrixIndex
    }
}

export function removeColumn(matrixIndex) {
    return {
        type: "REMOVE_COLUMN",
        matrixIndex
    }
}

export function updateMatrix(matrix, index) {
    return {
        type: "UPDATE",
        matrix,
        index
    }
}