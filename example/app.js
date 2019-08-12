const mf = machineLearningLib.matrixFunctions;
const nn = machineLearningLib.neuralNetworkFunctions;

const alpha = 0.1;
const lambda = 0;
const repetitions = 200;
const hidden_units = 100;
const K = 10;

// X = [[0, 0], [0, 1], [1, 0], [1, 1]];
// y = [2, 1, 1, 2];
// theta1 = [[-30, 20, 20], [10, -20, -20]];
// theta2 = [[10, -20, -20], [-10, 20, 20]];
// X = [[0.1683, -0.1923], [0.1819, -0.1502], [0.0282, 0.0300], [-0.1514, 0.1826], [-0.1918, 0.1673], [-0.0559, -0.0018], [0.1314, -0.1692], [0.1979, -0.1811], [0.0824, -0.0265], [-0.1088, 0.1525], [-0.2000, 0.1913], [-0.1073, 0.0542], [0.0840, -0.1327], [0.1981, -0.1976], [0.1301, -0.0808], [-0.0576, 0.1103]]
// y = [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1];
// // //y = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// theta1 = [[0.8415, 0.4121, -0.9614], [0.1411, -1.0000, 0.1499], [-0.9589, 0.4202, 0.8367], [0.6570, 0.6503, -0.8462]];
// theta2 = [[0.5403, -0.9111, -0.2752, 0.9912, -0.0133], [-0.9900, 0.0044, 0.9887, -0.2921, -0.9037], [0.2837, 0.9074, -0.5477, -0.7481, 0.7654], [0.7539, -0.7597, -0.5328, 0.9147, 0.2666]];

theta1 = mf.createMatrix(hidden_units, X[0].length + 1);
theta2 = mf.createMatrix(K, hidden_units + 1);
theta1 = mf.initializeRandom(theta1);
theta2 = mf.initializeRandom(theta2);

let Js = [];

function start() {
    thetas = [theta1, theta2];
    for (let i = 0; i < repetitions; i++) {
        z2 = mf.matrixMultiplication(mf.addColumn(X, 1), mf.transpose(thetas[0]));
        a2 = mf.sigmoid(z2);
        // a2 = nn.forwardPropagate(mf.addColumn(X, 1), thetas[0]);
        a3 = nn.forwardPropagate(mf.addColumn(a2, 1), thetas[1]);
        let J = nn.costFunction(a3, y, K, thetas, lambda);
        theta_grad = nn.backPropagrate(X, y, K, thetas, lambda);
        thetas = nn.gradientDescent(thetas, alpha, theta_grad);
        let performance = 0;
        let outputs = mf.getMaxIndexes(a3);
        // debugger;
        // console.log(a3, outputs);
        for (let j = 0; j < X.length; j++) {
            performance += (outputs[j] === y[j]);
        }
        performance = performance / X.length;
        console.log(i, performance, J);
        document.querySelector("#result").innerHTML += performance + " - (" + (i + 1) + ")<br />";
        Js.push(J);
    }
    console.log(Js);
}
document.querySelector("#btn").addEventListener('click', start);