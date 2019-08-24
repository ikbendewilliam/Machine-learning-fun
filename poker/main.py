import tensorflow.compat.v2 as 
import random
import json

# Load data and shuffle
with open("data/data.txt", "r") as f:
    data = f.read()

data = json.loads(data)
X, y = data
c = list(zip(X, y))
random.shuffle(c)
X, y = zip(*c)

# Split into train and test
x_train, y_train = X[:700], y[:700]
x_test, y_test = X[700:], y[700:]

model = tf.keras.models.Sequential([
  tf.keras.layers.Dense(52),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(104, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(1, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)

model.evaluate(x_test, y_test)