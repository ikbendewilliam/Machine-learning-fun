from math import e, log
from random import random
import json


def sigmoid(x):
    return 1.0 / (1.0 + pow(e, -x))


def sigmoidGradient(x):
    return sigmoid(x) * (1 - sigmoid(x))


def matrixSigmoid(M):
    return [[sigmoid(x) for x in row] for row in M]


def matrixSigmoidGradient(M):
    return [[sigmoidGradient(x) for x in row] for row in M]


def initializeRandom(M, epsilon=None):
    if (epsilon == None):
        epsilon = pow(6, 1/2) / pow(len(M) + len(M[0]), 1/2)
    return [[2 * random() * epsilon - epsilon for x in row] for row in M]


def matrix(width, height, standardValue=0):
    return [[standardValue for i in range(width)] for j in range(height)]


def matrixMultiplication(M1, M2):
    if (len(M1[0]) != len(M2)):
        print("Error, sizes are not compatible for multiplication (%s != %s)" %
              (len(M1[0]), len(M2)))
        return "Error, sizes are not compatible for multiplication (%s != %s)" % (len(M1[0]), len(M2))
    M3 = matrix(len(M2[0]), len(M1))
    for i in range(len(M1)):
        for j in range(len(M2[0])):
            # print(i,j)
            M3[i][j] = 0
            for k in range(len(M1[i])):
                M3[i][j] += M1[i][k] * M2[k][j]
    return M3


def matrixAddition(M1, M2):
    if (len(M1) != len(M2) or len(M1[0]) != len(M2[0])):
        print("Error, sizes are not compatible for addition (%s != %s || %s != %s)" % (
            len(M1), len(M2), len(M1[0]), len(M2[0])))
        return "Error, sizes are not compatible for addition (%s != %s || %s != %s)" % (len(M1), len(M2), len(M1[0]), len(M2[0]))
    M3 = matrix(len(M1[0]), len(M1))
    for i in range(len(M1)):
        for j in range(len(M1[0])):
            M3[i][j] = M1[i][j] + M2[i][j]
    return M3


def matrixElementMultiplication(M1, M2):
    if (len(M1) != len(M2) or len(M1[0]) != len(M2[0])):
        print("Error, sizes are not compatible for multiplication (%s != %s || %s != %s)" % (
            len(M1), len(M2), len(M1[0]), len(M2[0])))
        return "Error, sizes are not compatible for multiplication (%s != %s || %s != %s)" % (len(M1), len(M2), len(M1[0]), len(M2[0]))
    M3 = matrix(len(M1[0]), len(M1))
    for i in range(len(M3)):
        for j in range(len(M3[0])):
            M3[i][j] = M1[i][j] * M2[i][j]
    return M3


def transpose(M):
    M2 = matrix(len(M), len(M[0]))
    for i in range(len(M)):
        for j in range(len(M[0])):
            M2[j][i] = M[i][j]
    return M2


def addColumn(M, standardValue=0):
    return [[0] + row for row in M]


def addRow(M, standardValue=0):
    return [[standardValue for i in range(len(M[0]))]] + M


def removeColumn(M):
    return [row[1:] for row in M]


def removeRow(M):
    return M[1:]


def matrixSum(M):
    return sum([sum(row) for row in M])


def matrixMaxIndexes(M):
    return [row.index(max(row)) for row in M]


def forwardPropagate(X, theta):
    return matrixSigmoid(matrixMultiplication(X, transpose(theta)))


def costFunction(X, y, K, thetas, lamda=0):
    J = 0
    for k in range(K):
        Mx = [[row[k] for row in X]]
        My1 = [[-1 * (x == (k + 1)) for x in row] for row in y]
        My2 = [[1 - 1 * (x == (k + 1)) for x in row] for row in y]
        Mlog1 = [[log(x) for x in row] for row in Mx]
        Mlog2 = [[-log(1 - x) for x in row] for row in Mx]
        M1 = matrixElementMultiplication(transpose(My1), Mlog1)
        M2 = matrixElementMultiplication(transpose(My2), Mlog2)
        M = matrixAddition(M1, M2)
        s = matrixSum(M)
        J += 1 / len(X) * s
    for l in range(len(thetas)):
        T = removeColumn(thetas[l])
        T2 = [[pow(x, 2) for x in row] for row in T]
        J += lamda / (2 * len(X)) * matrixSum(T2)
    return J


def gradientDescent(thetas, alpha, theta_grad):
    newThetas = []
    for i in range(len(thetas)):
        newThetas.append(matrixAddition(thetas[i], [
                         [-x * alpha for x in row] for row in matrixElementMultiplication(thetas[i], theta_grad[i + 1])]))
    return newThetas


def backPropagate(X, y, K, thetas, lamda=0):
    theta_grad = matrix(1, len(thetas) + 1)
    for i in range(len(X)):
        a = matrix(1, len(thetas) + 1)
        z = matrix(1, len(thetas) + 1)
        a[0] = [X[i]]
        for l in range(len(thetas)):
            a[l] = addRow(transpose(a[l]), 1)
            z[l + 1] = matrixMultiplication(thetas[l], a[l])
            a[l + 1] = transpose(matrixSigmoid(z[l + 1]))

        a[len(thetas)] = transpose(a[len(thetas)])
        temp_y = matrix(1, K, 0)
        temp_y[y[i][0] - 1][0] = -1

        delta = matrix(1, len(thetas) + 2)
        delta[len(thetas) + 1] = matrixAddition(a[len(thetas)], temp_y)
        for l in range(len(thetas), 0, -1):
            d = delta[l + 1]
            if (l != len(thetas)):
                d = removeRow(d)
            d = matrixMultiplication(d, transpose(a[l - 1]))
            if (theta_grad[l] == [0]):
                theta_grad[l] = matrix(len(d[0]), len(d))
            theta_grad[l] = matrixAddition(theta_grad[l], d)
            if (l == 1):
                continue  # No need to calculate delta_1 since this is the input layer and this has no error

            delta[l] = transpose(thetas[l - 1])
            delta[l] = matrixMultiplication(delta[l], delta[l + 1])
            zd = matrixSigmoidGradient(addColumn(z[l - 1], 1))
            delta[l] = matrixElementMultiplication(delta[l], addRow(removeColumn(zd)))

    for l in range(len(thetas), 0, -1):
        theta_grad[l] = [[x / len(X) for x in row] for row in theta_grad[l]]
        tg = removeColumn(thetas[l - 1])
        tg =  [[x * lamda / len(X) for x in row] for row in tg]
        theta_grad[l] = matrixAddition(theta_grad[l], addColumn(tg, 0))
        #theta_grad[l] += [zeros(size(Theta1, 1), 1)(lamda / m .* Theta1(:, 2:end))]
    return theta_grad


def loadFile(file):
    with open(file, 'r') as f:
        return json.load(f)

def printsize(M):
    print(len(M), len(M[0]))

def ml(X, y, thetas, alpha, lamda, K, repetitions):
    for _ in range(repetitions):
        a2 = forwardPropagate(addColumn(X, 1), thetas[0])
        a3 = forwardPropagate(addColumn(a2, 1), thetas[1])
        J = costFunction(a3, y, K, thetas, lamda)
        print(J)
        theta_grad = backPropagate(X, y, K, thetas, lamda)
        thetas = gradientDescent(thetas, alpha, theta_grad)
    outputs = matrixMaxIndexes(a3)
    print(y, outputs)
    return thetas

K = 10
lamda = 0
alpha = 0.1
repetitions = 10
hidden_layer = 25
X = loadFile('./data/data.json')
y = loadFile('./data/labels.json')
theta1 = matrix(len(X[0]) + 1, hidden_layer)
theta2 = matrix(hidden_layer + 1, K)
thetas = [theta1, theta2]
for i in range(len(thetas)):
    thetas[i] = initializeRandom(thetas[i])
# thetas_ = loadFile('./data/thetas.json')
# thetas = [thetas_['theta1'], thetas_['theta2']]
print('data loaded')

ml(X, y, thetas, alpha, lamda, K, repetitions)
