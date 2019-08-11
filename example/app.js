const mf = machineLearningLib.matrixFunctions;
const nn = machineLearningLib.neuralNetworkFunctions;

// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }

X = [[0.1683, -0.1923], [0.1819, -0.1502], [0.0282, 0.0300], [-0.1514, 0.1826], [-0.1918, 0.1673], [-0.0559, -0.0018], [0.1314, -0.1692], [0.1979, -0.1811], [0.0824, -0.0265], [-0.1088, 0.1525], [-0.2000, 0.1913], [-0.1073, 0.0542], [0.0840, -0.1327], [0.1981, -0.1976], [0.1301, -0.0808], [-0.0576, 0.1103]]
//y = [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1];
y = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

theta1 = [[0.8415, 0.4121, -0.9614], [0.1411, -1.0000, 0.1499], [-0.9589, 0.4202, 0.8367], [0.6570, 0.6503, -0.8462]];
theta2 = [[0.5403, -0.9111, -0.2752, 0.9912, -0.0133], [-0.9900, 0.0044, 0.9887, -0.2921, -0.9037], [0.2837, 0.9074, -0.5477, -0.7481, 0.7654], [0.7539, -0.7597, -0.5328, 0.9147, 0.2666]];

theta1 = mf.createMatrix(theta1.length, theta1[0].length);
theta2 = mf.createMatrix(theta2.length, theta2[0].length);
theta1 = mf.initializeRandom(theta1);
theta2 = mf.initializeRandom(theta2);

const alpha = 0.01;
const lambda = 0;
const repetitions = 100;
let Js = [];

thetas = [theta1, theta2];
for (let i = 0; i < repetitions; i++) {
    a2 = nn.forwardPropagate(mf.addColumn(X, 1), thetas[0]);
    a3 = nn.forwardPropagate(mf.addColumn(a2, 1), thetas[1]);
    let J = nn.costFunction(a3, y, 4, thetas, lambda);
    theta_grad = nn.backPropagrate(X, y, 4, thetas, 1);
    thetas = nn.gradientDescent(thetas, alpha, theta_grad);
    let performance = 0;
    let outputs = mf.getMaxIndexes(a3);
    console.log(outputs);
    for (let j = 0; j < X.length; j++) {
        performance += (outputs[j] === (y[j] - 1));
    }
    performance /= X.length;
    document.querySelector("#result").innerHTML += performance + " - (" + (i + 1) + ")<br />";
    Js.push(J);
}
console.log(Js);
