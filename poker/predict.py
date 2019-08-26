import tensorflow.compat.v2 as tf
import numpy as np

def get_indexes_from_cards(cards):
  x = [0 for _ in range(52)]
  for card in cards:
    x[card] = 1
  return np.array(x)


# model = tf.keras.models.Sequential([
#   tf.keras.layers.Dense(520, input_shape=(52,), activation='relu'),
#   tf.keras.layers.Dense(520, activation='relu'),
#   tf.keras.layers.Dense(520, activation='relu'),
#   tf.keras.layers.Dense(1, activation='sigmoid')
# ])

model = tf.keras.models.load_model(
    "./models/poker01.h5",
    compile=True
)

def predict(hand, board):
    x = get_indexes_from_cards(hand + board)
    return model.predict(x.reshape(52,1).T)

print(8, predict([7, 6], [12, 11, 10, 9, 8]))
print(7, predict([12, 12], [12, 12, 10, 9, 8]))
print(6, predict([11, 11], [12, 12, 12, 9, 8]))
print(5, predict([12, 11], [10, 9, 7, 19, 18]))
print(4, predict([51, 50], [38, 25, 10, 9, 8]))
print(3, predict([12, 12], [12, 22, 27, 23, 24]))
print(2, predict([11, 11], [12, 12, 21, 29, 28]))
print(1, predict([12, 12], [21, 22, 1, 26, 36]))
print(0, predict([7, 6], [21, 22, 25, 26, 37]))
