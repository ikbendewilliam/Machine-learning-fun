const mf = machineLearningLib.matrixFunctions;
const nn = machineLearningLib.neuralNetworkFunctions;

// console.log = function (text, otherstuff) {
//     document.querySelector("#result").innerHTML += "<div>" + text + "</div>";
//     if (otherstuff !== undefined) {
//         console.log(otherstuff);
//     }
// }

// let A = mf.createMatrix(100, 100);
// console.log(A);
// A = mf.initializeRandom(A)
// console.log(A);
//A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
//A = mf.matrixMultiplication(A, mf.transpose(A));
//console.log(A);
//B = mf.executeOnAllElements(A, function(x) { return x / 2 });
//console.log(B);
//C = mf.executeOnAllElements(A, (x) => { return (x > 50) * 1 });
//console.log(JSON.stringify(C));
//D = mf.executeOnAllElements(A, (x) => { return x - 2 });
//console.log(JSON.stringify(D));
//E = mf.executeOnAllElements(A, (x) => { return x * 2 });
//console.log(JSON.stringify(E));
//F = mf.executeOnAllElements(A, (x) => { return x + 2 });
//console.log(JSON.stringify(F));
//G = mf.addColumn(F, 1);
//console.log(JSON.stringify(G));

X = [[0.1683, -0.1923], [0.1819, -0.1502], [0.0282, 0.0300], [-0.1514, 0.1826], [-0.1918, 0.1673], [-0.0559, -0.0018], [0.1314, -0.1692], [0.1979, -0.1811], [0.0824, -0.0265], [-0.1088, 0.1525], [-0.2000, 0.1913], [-0.1073, 0.0542], [0.0840, -0.1327], [0.1981, -0.1976], [0.1301, -0.0808], [-0.0576, 0.1103]]
y = [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1];

theta1 = [[0.8415, 0.4121, -0.9614], [0.1411, -1.0000, 0.1499], [-0.9589, 0.4202, 0.8367], [0.6570, 0.6503, -0.8462]];
theta2 = [[0.5403, -0.9111, -0.2752, 0.9912, -0.0133], [-0.9900, 0.0044, 0.9887, -0.2921, -0.9037], [0.2837, 0.9074, -0.5477, -0.7481, 0.7654], [0.7539, -0.7597, -0.5328, 0.9147, 0.2666]];


a2 = nn.forwardPropagate(mf.addColumn(X, 1), theta1);
a3 = nn.forwardPropagate(mf.addColumn(a2, 1), theta2);

J = nn.costFunction(a3, y, 4, [theta1, theta2], 1);
theta_grads = nn.backPropagrate(X, y, 4, [theta1, theta2], 1);
document.querySelector("#result").innerHTML = JSON.stringify(theta_grads);
console.log(theta_grads);

/*
for t = 1:m
    at1 = X(t,:)';
    at1 = [1; at1];
    zt2 = Theta1 * at1;
    at2 = [1;sigmoid(zt2)];
    zt3 = Theta2 * at2;
    at3 = sigmoid(zt3);

    temp_y = zeros(num_labels, 1);
    temp_y(y(t)) = 1;

    delta_3 = at3 - temp_y;
    delta_2 = Theta2' * delta_3 .* sigmoidGradient([1;zt2]);
    delta_2 = delta_2(2:end);
    Theta1_grad = Theta1_grad + delta_2 * (at1');
    Theta2_grad = Theta2_grad + delta_3 * (at2');
end

Theta1_grad = Theta1_grad ./ m + [zeros(size(Theta1, 1), 1) (lambda / m .* Theta1(:,2:end))];
Theta2_grad = Theta2_grad ./ m + [zeros(size(Theta2, 1), 1) (lambda / m .* Theta2(:,2:end))];


Theta1_grad =

   -0.0121   -0.0031    0.0038
   -0.1278   -0.0042    0.0049
    0.0426    0.0040   -0.0047
    0.0997    0.0013   -0.0017

    Theta2_grad =

    0.2550    0.1826    0.1317    0.0693    0.1732
   -0.0080   -0.0081   -0.0024   -0.0011   -0.0080
    0.4669    0.3262    0.2487    0.1296    0.3077
    0.3410    0.2397    0.1806    0.0939    0.2262

*/