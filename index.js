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
        console.error("Error matrices cannot be multiplicated, sizes " + M1.length + "x" + M1[0].length + " and " + M2.length + "x" + M2[0].length + " are not compatible");
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
        debugger;
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

machineLearningLib.matrixFunctions.addRow = function (M, standardValue) {
    if (standardValue === undefined) {
        standardValue = 0;
    }
    M = JSON.parse(JSON.stringify(M));
    M.unshift([]);
    for (let i = 0; i < M[1].length; i++) {
        M[0].push(standardValue);
    }
    return M;
}

machineLearningLib.matrixFunctions.removeColumn = function (M) {
    M = JSON.parse(JSON.stringify(M));
    for (let i = 0; i < M.length; i++) {
        M[i] = M[i].splice(1, M[i].length - 1);
    }
    return M;
}

machineLearningLib.matrixFunctions.removeRow = function (M) {
    M2 = [];
    for (let i = 1; i < M.length; i++) {
        M2.push(M[i]);
    }
    return M2;
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

machineLearningLib.matrixFunctions.getMaxIndexes = function (M) {
    M2 = [];
    for (let i = 0; i < M.length; i++) {
        let max = -1;
        let maxIndex = -1;
        for (let j = 0; j < M[i].length; j++) {
            if (M[i][j] > max) {
                max = M[i][j];
                maxIndex = j;
            }
        }
        M2.push(maxIndex + 1);
    }
    return M2;
}

machineLearningLib.neuralNetworkFunctions.forwardPropagate = function (X, theta) {
    return machineLearningLib.matrixFunctions.sigmoid(machineLearningLib.matrixFunctions.matrixMultiplication(X, machineLearningLib.matrixFunctions.transpose(theta)));
}

// X = last layer
// y = Labels
// K = number of output units
machineLearningLib.neuralNetworkFunctions.costFunction = function (X, y, K, thetas, lambda) {
    if (lambda === undefined) {
        lambda = 0;
    }
    let J = 0;
    for (k = 0; k < K; k++) {
        let Mx = [machineLearningLib.matrixFunctions.getColumn(X, k)];
        let My1 = machineLearningLib.matrixFunctions.executeOnAllElements([y], function (x) { return -1 * (x === (k + 1)); });
        let My2 = machineLearningLib.matrixFunctions.executeOnAllElements([y], function (x) { return 1 - 1 * (x === (k + 1)); });
        let Mlog1 = machineLearningLib.matrixFunctions.executeOnAllElements(Mx, function (x) { return x <= 0 ? 0 : Math.log(x); });
        let Mlog2 = machineLearningLib.matrixFunctions.executeOnAllElements(Mx, function (x) { return (1 - x) <= 0 ? 0 : -Math.log(1 - x); });
        let M1 = machineLearningLib.matrixFunctions.matrixMultiplyingElements(My1, Mlog1);
        let M2 = machineLearningLib.matrixFunctions.matrixMultiplyingElements(My2, Mlog2);
        let M = machineLearningLib.matrixFunctions.matrixAddition(M1, M2);
        J += 1 / X.length * machineLearningLib.matrixFunctions.sumMatrix(M);
    }

    for (l = 0; l < thetas.length; l++) {
        let T = machineLearningLib.matrixFunctions.removeColumn(thetas[l]);
        let T2 = machineLearningLib.matrixFunctions.executeOnAllElements(T, function (x) { return Math.pow(x, 2) });
        J += lambda / (2 * X.length) * machineLearningLib.matrixFunctions.sumMatrix(T2);
    }
    return J;
}

machineLearningLib.neuralNetworkFunctions.gradientDescent = function (thetas, alpha, theta_grad) {
    newThetas = [];
    for (let i = 0; i < thetas.length; i++) {
        newThetas.push(machineLearningLib.matrixFunctions.executeOnAllElements(machineLearningLib.matrixFunctions.matrixMultiplyingElements(thetas[i], theta_grad[i + 1]), function (x) { return x * alpha; }));
    }
    return newThetas;
}

machineLearningLib.neuralNetworkFunctions.backPropagrate = function (X, y, K, thetas, lambda) {
    if (lambda === undefined) {
        lambda = 0;
    }
    theta_grad = [];
    for (i = 0; i < X.length; i++) {
        let a = [];
        let z = [];
        a.push([X[i]]);
        for (l = 0; l < thetas.length; l++) {
            a[l] = machineLearningLib.matrixFunctions.addRow(machineLearningLib.matrixFunctions.transpose(a[l]), 1);
            z[l + 1] = machineLearningLib.matrixFunctions.matrixMultiplication(thetas[l], a[l]);
            a[l + 1] = machineLearningLib.matrixFunctions.sigmoid([z[l + 1]]);
        }

        a[thetas.length] = machineLearningLib.matrixFunctions.transpose(a[thetas.length]);
        temp_y = machineLearningLib.matrixFunctions.createMatrix(K, 1, 0)
        temp_y[y[i] - 1][0] = -1;

        let delta = [];
        delta[thetas.length + 1] = machineLearningLib.matrixFunctions.matrixAddition(a[thetas.length], temp_y);
        for (l = thetas.length; l >= 1; l--) {
            // console.log(l);
            let d = delta[l + 1];
            if (l !== thetas.length) {
                d = machineLearningLib.matrixFunctions.removeRow(d);
            }
            d = machineLearningLib.matrixFunctions.matrixMultiplication(d, machineLearningLib.matrixFunctions.transpose(a[l - 1]));
            if (theta_grad[l] === undefined) {
                theta_grad[l] = machineLearningLib.matrixFunctions.createMatrix(d.length, d[0].length);
            }
            theta_grad[l] = machineLearningLib.matrixFunctions.matrixAddition(theta_grad[l], d);
            // console.log(theta_grad);

            if (l === 1) {
                continue; // No need to calculate delta_1 since this is the input layer and this has no error
            }
            delta[l] = machineLearningLib.matrixFunctions.transpose(thetas[l - 1]);
            // console.log(delta);
            delta[l] = machineLearningLib.matrixFunctions.matrixMultiplication(delta[l], delta[l + 1]);
            // console.log(delta);
            let zd = machineLearningLib.matrixFunctions.sigmoidGradient(machineLearningLib.matrixFunctions.addColumn([z[l - 1]], 1));
            // console.log(zd);
            delta[l] = machineLearningLib.matrixFunctions.matrixMultiplyingElements(delta[l], machineLearningLib.matrixFunctions.transpose(zd));
            // console.log(delta);
        }
    }

    for (l = thetas.length; l >= 1; l--) {
        theta_grad[l] = machineLearningLib.matrixFunctions.executeOnAllElements(theta_grad[l], function (x) { return x / X.length; });
        let tg = machineLearningLib.matrixFunctions.removeColumn(thetas[l - 1]);
        tg = machineLearningLib.matrixFunctions.executeOnAllElements(tg, function (x) { return x * lambda / X.length; });
        theta_grad[l] = machineLearningLib.matrixFunctions.matrixAddition(theta_grad[l], machineLearningLib.matrixFunctions.addColumn(tg, 0));
        // theta_grad[l] += [zeros(size(Theta1, 1), 1) (lambda / m .* Theta1(:,2:end))];
    }

    return theta_grad;
}

// Private functions

makeRandom = function (epsilon) {
    return function () {
        return 2 * epsilon * Math.random() - epsilon;
    }
}
