machineLearningLib = {};
machineLearningLib.matrixFunctions = {};
machineLearningLib.neuralNetworkFunctions = {};

machineLearningLib.sigmoid = function (x) {
    return 1.0 / (1.0 + Math.pow(Math.E, -x));
}

machineLearningLib.sigmoidGradient = function (x) {
    return machineLearningLib.sigmoid(x) * (1 - machineLearningLib.sigmoid(x));
}

machineLearningLib.matrixFunctions.executeOnAllElements = function (M, func) {
    M2 = [];
    for (let i = 0; i < M.length; i++) {
        if (Array.isArray(M[i])) {
            newRow = [];
            for (let j = 0; j < M[i].length; j++) {
                newRow.push(func(M[i][j]));
            }
            M2.push(newRow);
        }
        else {
            M2.push(M[i]);
        }
    }
    return M2;
}

machineLearningLib.matrixFunctions.sigmoid = function (M) {
    return machineLearningLib.matrixFunctions.executeOnAllElements(M, machineLearningLib.sigmoid);
}

machineLearningLib.matrixFunctions.sigmoidGradient = function (M) {
    return machineLearningLib.matrixFunctions.executeOnAllElements(M, machineLearningLib.sigmoidGradient);
}

machineLearningLib.matrixFunctions.initializeRandom = function (M, optionalEpsilon) {
    if (optionalEpsilon === undefined) {
        optionalEpsilon = Math.sqrt(6) / Math.sqrt(M.length + M[0].length);
    }
    return machineLearningLib.matrixFunctions.executeOnAllElements(M, makeRandom(optionalEpsilon));
}

machineLearningLib.matrixFunctions.createMatrix = function (width, height, standardValue) {
    if (standardValue === undefined) {
        standardValue = 0;
    }
    M = [];
    v = [];
    for (let i = 0; i < height; i++) {
        v.push(standardValue);
    }
    for (let i = 0; i < width; i++) {
        M.push(JSON.parse(JSON.stringify(v)));
    }

    return M;
}

machineLearningLib.matrixFunctions.matrixMultiplication = function (M1, M2) {
    if (M1[0].length !== M2.length) {
        console.error("Error matrices cannot be multiplicated, sizes are not compatible");
        return "Error matrices cannot be multiplicated";
    }
    M3 = machineLearningLib.matrixFunctions.createMatrix(M1.length, M2[0].length);
    for (let i = 0; i < M1.length; i++) {
        for (let j = 0; j < M2[0].length; j++) {
            for (let k = 0; k < M1[0].length; k++) {
                M3[i][j] += M1[i][k] * M2[k][j];
            }
        }
    }
    return M3;
}

machineLearningLib.matrixFunctions.matrixAddition = function (M1, M2) {
    if (M1.length !== M2.length || M1[0].length !== M2[0].length) {
        console.error("Error matrices cannot be added, sizes are not compatible");
        return "Error matrices cannot be added";
    }
    M3 = machineLearningLib.matrixFunctions.createMatrix(M1.length, M1[0].length);
    for (let i = 0; i < M1.length; i++) {
        for (let j = 0; j < M1[i].length; j++) {
            M3[i][j] = M1[i][j] + M2[i][j];
        }
    }
    return M3;
}

machineLearningLib.matrixFunctions.matrixMultiplyingElements = function (M1, M2) {
    if (M1.length !== M2.length || M1[0].length !== M2[0].length) {
        console.error("Error matrices cannot be multiplied, sizes are not compatible");
        return "Error matrices cannot be multiplied";
    }
    M3 = machineLearningLib.matrixFunctions.createMatrix(M1.length, M1[0].length);
    for (let i = 0; i < M1.length; i++) {
        for (let j = 0; j < M1[i].length; j++) {
            M3[i][j] = M1[i][j] * M2[i][j];
        }
    }
    return M3;
}

machineLearningLib.matrixFunctions.transpose = function (M) {
    M2 = machineLearningLib.matrixFunctions.createMatrix(M[0].length, M.length);
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M[i].length; j++) {
            M2[j][i] = M[i][j];
        }
    }
    return M2;
}

machineLearningLib.matrixFunctions.addColumn = function (M, standardValue) {
    if (standardValue === undefined) {
        standardValue = 0;
    }
    M = JSON.parse(JSON.stringify(M));
    for (let i = 0; i < M.length; i++) {
        M[i].unshift(standardValue);
    }
    return M;
}

machineLearningLib.matrixFunctions.sumMatrix = function (M) {
    let total = 0;
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M[i].length; j++) {
            total += M[i][j];
        }
    }
    return total;
}

machineLearningLib.matrixFunctions.getColumn = function (M, column) {
    M2 = [];
    for (let i = 0; i < M.length; i++) {
        M2.push(M[i][column]);
    }
    return M2;
}

machineLearningLib.neuralNetworkFunctions.forwardPropagate = function (X, theta) {
    return machineLearningLib.matrixFunctions.sigmoid(machineLearningLib.matrixFunctions.matrixMultiplication(X, machineLearningLib.matrixFunctions.transpose(theta)));
}

// X = last layer
// y = Labels
// K = number of output units
machineLearningLib.neuralNetworkFunctions.costFunction = function (X, y, K, lambda) {
    if (lambda === undefined) {
        lambda = 0;
    }
    let J = 0;
    for (k = 0; k < K; k++) {
        let Mx = [machineLearningLib.matrixFunctions.getColumn(X, k)];
        console.log("Mx", Mx);
        let My1 = machineLearningLib.matrixFunctions.executeOnAllElements([y], function (x) { return -1 * (x === (k + 1)); });
        console.log("My1", My1);
        let My2 = machineLearningLib.matrixFunctions.executeOnAllElements([y], function (x) { return 1 - 1 * (x === (k + 1)); });
        console.log("My2", My2);
        let Mlog1 = machineLearningLib.matrixFunctions.executeOnAllElements(Mx, function (x) { return x <= 0 ? 0 : Math.log(x); });
        console.log("Mlog1", Mlog1);
        let Mlog2 = machineLearningLib.matrixFunctions.executeOnAllElements(Mx, function (x) { return (1 - x) <= 0 ? 0 : -Math.log(1 - x); });
        console.log("Mlog2", Mlog2);
        let M1 = machineLearningLib.matrixFunctions.matrixMultiplyingElements(My1, Mlog1);
        console.log("M1", M1);
        let M2 = machineLearningLib.matrixFunctions.matrixMultiplyingElements(My2, Mlog2);
        console.log("M2", M2);
        let M = machineLearningLib.matrixFunctions.matrixAddition(M1, M2);
        console.log("M", M);
        J += 1 / X.length * machineLearningLib.matrixFunctions.sumMatrix(M);
        console.log("J", J);
    }
    // J = J + lambda / (2 * m) * (sum(sum(Theta1(:, 2: end).^ 2)) + sum(sum(Theta2(:, 2: end).^ 2)));
    return J;
}


// Private functions

makeRandom = function (epsilon) {
    return function () {
        return 2 * epsilon * Math.random() - epsilon;
    }
}
