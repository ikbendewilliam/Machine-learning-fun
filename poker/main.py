import tensorflow.compat.v2 as tf
import numpy as np
import random
import json
import math

def get_indexes_from_cards(cards):
  x = [0 for _ in range(52)]
  for card in cards:
    x[card] = 1
  return x

def convert_data(X, y):
  X_formatted = []
  y_formatted = []
  for i in range(len(X)):
    sample = X[i]
    for j in range(len(sample[0])):
      hand = sample[0][j]
      X_formatted.append(get_indexes_from_cards(hand))
      X_formatted.append(get_indexes_from_cards(hand + sample[1][:3]))
      X_formatted.append(get_indexes_from_cards(hand + sample[1][:4]))
      X_formatted.append(get_indexes_from_cards(hand + sample[1][:5]))
      y_formatted.append(y[i][j])
      y_formatted.append(y[i][j])
      y_formatted.append(y[i][j])
      y_formatted.append(y[i][j])
  return X_formatted, y_formatted

def convert_to_array(l):
  if type(l[0]) == list:
    # l = [[0.9999 * x for x in row] for row in l]
    return np.array(l)
  l = [0.9999 * x for x in l]
  return np.array(l)


# Load data
print("Load data")
with open("data/data.json", "r") as f:
    data = f.read()

data = json.loads(data)
X, y = data['X'], data['y']
# For testing, only use x samples
# X, y = X[:1000], y[:1000]

# Convert data
print("Convert data")
X, y = convert_data(X, y)

# Shuffle data
print("Shuffle data")
c = list(zip(X, y))
random.shuffle(c)
X, y = zip(*c)

# Split into train and test
print("Split into train and test")
split_integer = math.floor(len(X) * 0.7)
print("x_train")
x_train = convert_to_array(X[:split_integer])
print("y_train")
y_train = convert_to_array(y[:split_integer])
print("x_test")
x_test = convert_to_array(X[split_integer:])
print("y_test")
y_test = convert_to_array(y[split_integer:])

print("Creating model")
model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(520, input_shape=(52,), activation='relu'),
  tf.keras.layers.Dense(520, activation='relu'),
  tf.keras.layers.Dense(520, activation='relu'),
  tf.keras.layers.Dense(1, activation='sigmoid')
])

print("Compiling model")
model.compile(optimizer='adam',
              loss='mean_squared_error')

print("Fitting model")
model.fit(x_train, y_train, epochs=5)

print("Evaluating model")
model.evaluate(x_test, y_test)

print("Saving model")
model.save('./models/poker01.h5')
