if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target, firstSource) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }

                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }

export default function matrixReducers(state=initialStoreObj, action) {

    function addColumnsRowsToResultMatrix(matrixA, matrixB) {
        let matrixC = [];
        let matrixCRow = [];
        if (matrixA.length > 0) {
            if (matrixB.length > 0) {
                for (let j = 0; j < matrixB[0].length; j++) {
                    matrixCRow.push('');
                }
                for (let i = 0; i < matrixA.length; i++) {
                    matrixC.push(matrixCRow);
                }
            }
        }
        return matrixC;
    }

    function retunValueAfterAddRemove(index, updatedMatrix) {
        let description = "";
        let status = "";
        if (index === 1) {
            let matrixCUpdate = addColumnsRowsToResultMatrix(updatedMatrix, state[2].matrix);
            return [].concat(Object.assign({}, state[0], {
                matrix: matrixCUpdate
            }, {
                status: status
            }, {
                description: description
            }), Object.assign({}, state[1], {
                matrix: updatedMatrix
            }), state[2]);
        }
        if (index === 2) {
            let matrixCUpdate = addColumnsRowsToResultMatrix(state[1].matrix, updatedMatrix);
            return [].concat(Object.assign({}, state[0], {
                matrix: matrixCUpdate
            }, {
                status: status
            }, {
                description: description
            }), state[1], Object.assign({}, state[2], {
                matrix: updatedMatrix
            }));
        }
    }

    function checkMatrixData(matrix) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                let val = +matrix[row][col];
                if (typeof val !== "number" || val <= 0 || isNaN(val)) {
                    return false
                }
            }
        }
        return true;
    }
    switch (action.type) {

    case "MULTIPLY":
        {
            let objectToReturn = state.slice();
            let matrixA = action.matrixA;
            let matrixB = action.matrixB;
            let resultMatrix = [];
            let status = "";
            let description = "";
            if (matrixA.length && matrixB.length) {
                if (matrixA[0].length === matrixB.length) {
                    if (checkMatrixData(matrixA) && checkMatrixData(matrixB)) {
                        for (let row = 0; row < matrixA.length; row++) {
                            let resSum = 0;
                            let matrixBSize = 0;
                            let key = 0;
                            let col = 0;
                            let matrixBCol = 0;
                            resultMatrix.push([]);
                            while (matrixBSize < matrixB.length * matrixB[0].length) {
                                resSum += matrixA[row][key] * matrixB[key][matrixBCol];
                                key++;
                                matrixBSize++;
                                if (key > matrixA.length) {
                                    key = 0;
                                    resultMatrix[row][col] = resSum;
                                    col++;
                                    resSum = 0
                                    matrixBCol++
                                }
                            }
                        }
                        objectToReturn[0] = Object.assign({}, state[0], {
                            matrix: resultMatrix
                        });
                        return objectToReturn;
                    } else {
                        status = "fail";
                        description = "Matrixes should be filled with positive numbers larger then 0.";
                    }
                } else {
                    status = "fail";
                    description = "These matrixes shouldn't be multiplied cause number of rows of matrix A is not equal to number of rows from matrix B.";
                }
            } else {
                status = "fail";
                description = "Matrixes are not defined."
            }
            objectToReturn[0] = Object.assign({}, state[0], {
                status: status
            }, {
                description: description
            });
            return objectToReturn;
        }

    case "UPDATE":
        {
            let status = "edit";
            let description = "";
            let objToReturn = retunValueAfterAddRemove(action.index, action.matrix).slice();
            objToReturn[0] = Object.assign({}, state[0], {
                status: status
            }, {
                description: description
            });
            return objToReturn;
        }

    case "CLEAN":
        {
            let objToReturn = state.slice();
            let updatedMatrix = [];
            let description = "";
            let status = "";
            for (let index = 0; index < state.length; index++) {
                let matrix = state[index].matrix.slice();
                for (let row = 0; row < matrix.length; row++) {
                    let matrixRow = matrix[row];
                    for (let col = 0; col < matrixRow.length; col++) {
                        matrixRow[col] = '';
                    }
                }
                if (index === 0) {
                    objToReturn[index] = Object.assign({}, state[index], {
                        matrix: matrix
                    }, {
                        status: status
                    }, {
                        description: description
                    })
                } else {
                    objToReturn[index] = Object.assign({}, state[index], {
                        matrix: matrix
                    })
                }
            }
            return objToReturn;
        }

    case "SWITCH_RADIO":
        let description = "";
        let status = "";
        return [].concat(Object.assign({}, state[0], {
            activeMatrix: action.activeMatrix
        }, {
            status: status
        }, {
            description: description
        }), state.slice(1));

    case "INTERCHANGE":
        {
            let objToReturn = [];
            let description = "";
            let status = "";
            for (var key = 0; key < state.length; key++) {
                objToReturn.push(Object.assign({}, state[key], {
                    matrix: []
                }));
            }
            let mC = addColumnsRowsToResultMatrix(action.matrixB, action.matrixA);
            Object.assign(objToReturn[0], state[0], {
                matrix: mC
            }, {
                status: status
            }, {
                description: description
            });
            Object.assign(objToReturn[1], {
                matrix: action.matrixB
            });
            Object.assign(objToReturn[2], {
                matrix: action.matrixA
            });
            return objToReturn
        }

    case "ADD_ROW":
        {
            let index = action.matrixIndex;
            let matrixToChange = state[index].matrix.slice();
            let addElementArray = [''];

            if (matrixToChange.length < 10) {
                if (matrixToChange.length > 0) {
                    for (let k = 0; k < matrixToChange[0].length - 1; k++) {
                        addElementArray.push('');
                    }
                }
                matrixToChange.push(addElementArray);
                return retunValueAfterAddRemove(index, matrixToChange);
            }

            return state;
        }

    case "ADD_COLUMN":
        {
            let index = action.matrixIndex;
            let matrixToChange = state[index].matrix.slice();

            if (matrixToChange.length > 0 && matrixToChange[0].length < 10) {
                for (let row = 0; row < matrixToChange.length; row++) {
                    matrixToChange[row].push('');
                }
                return retunValueAfterAddRemove(index, matrixToChange);
            }
            if (matrixToChange.length === 0) {
                matrixToChange.push(['']);
                return retunValueAfterAddRemove(index, matrixToChange);
            }

            return state;
        }

    case "REMOVE_ROW":
        {
            let index = action.matrixIndex;
            let matrixToChange = state[action.matrixIndex].matrix.slice();
            let changeArray = [];

            if (matrixToChange.length > 0) {
                matrixToChange.pop();
                return retunValueAfterAddRemove(index, matrixToChange);
            }

            return state;
        }

    case "REMOVE_COLUMN":
        {
            let index = action.matrixIndex;
            let matrixToChange = state[action.matrixIndex].matrix.slice();

            if (matrixToChange.length > 0) {
                for (let row = 0; row < matrixToChange.length; row++) {
                    matrixToChange[row].pop();
                }
                if (matrixToChange[0].length === 0) {
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