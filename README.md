# Machine-learning-fun

## creating own model
I wrote a little library to try out some neural network stuff. The library isn't optimazed and is written in JavaScript (Afterwards, I translated to python). It is just for fun and doesn't work well

## Poker

I use tensorflow basic stuff to try and learn to play poker.
results:
> 8 - straight flush
> 7 - four of a kind
> 6 - full house
> 5 - flush
> 4 - straight
> 3 - three of a kind
> 2 - two pairs
> 1 - one pair
> 0 - high card

poker01.h5 MSE ~0.165
8. [[1.]]
7. [[0.68580973]]
6. [[0.78495437]]
5. [[0.9385425]]
4. [[0.99220955]]
3. [[0.29329005]]
2. [[0.17279343]]
1. [[0.1435402]]
0. [[0.00660706]]

poker02.h5 MSE: 0.1609 (trained with 10k samples)
8. [[0.99907243]]
7. [[0.9798028]]
6. [[0.84834665]]
5. [[0.11785185]]
4. [[0.971907]]
3. [[0.24121298]]
2. [[0.10808231]]
1. [[0.00157727]]
0. [[0.00131233]]