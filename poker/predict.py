import tensorflow.compat.v2 as tf
import numpy as np

def get_indexes_from_cards(cards):
  x = [0 for _ in range(52)]
  for card in cards:
    x[card] = 1
  return np.array(x)

def predict(model, hand, board):
    x = get_indexes_from_cards(hand + board)
    return model.predict(x.reshape(52,1).T)

def predict_model(file):
  print(file)
  model = tf.keras.models.load_model(
    "./models/%s" % file,
    compile=True
  )
  print("8.", predict(model, [7, 6], [12, 11, 10, 9, 8]))
  print("7.", predict(model, [12, 12], [12, 12, 10, 9, 8]))
  print("6.", predict(model, [11, 11], [12, 12, 12, 9, 8]))
  print("5.", predict(model, [12, 11], [10, 9, 7, 19, 18]))
  print("4.", predict(model, [51, 50], [38, 25, 10, 9, 8]))
  print("3.", predict(model, [12, 12], [12, 22, 27, 23, 24]))
  print("2.", predict(model, [11, 11], [12, 12, 21, 29, 28]))
  print("1.", predict(model, [12, 12], [21, 22, 1, 26, 36]))
  print("0.", predict(model, [7, 6], [21, 22, 25, 26, 37]))

predict_model("poker01.h5")
predict_model("poker02.h5")
