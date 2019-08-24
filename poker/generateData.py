from random import randint
import math

def init(player_count):
    free_cards = [i for i in range(52)]
    hands = []
    for i in range(player_count):
        card, free_cards = get_card(1, free_cards)
        hands.append(card)
    for i in range(player_count):
        card, free_cards = get_card(1, free_cards)
        hands[i].append(card[0])
    return hands, free_cards

def get_card(card_count, free_cards):
    cards = []
    for _ in range(card_count):
        index = randint(1, len(free_cards))
        cards.append(free_cards[index])
        free_cards.remove(free_cards[index])
    return cards, free_cards

def get_winner(hands, board):
    m = -1
    winner = -1
    for i in range(len(hands)):
        hand = hands[i]
        value = get_value(hand, board)
        if (m < value):
            m = value
            winner = i
    return winner

def get_value(hand, board):
    raw_values = [0 for _ in hand]
    suit = [0 for _ in hand]
    for i in range(len(hand)):
        raw_values[i] = hand[i] % 13
        suit[i] = math.floor(hand[i] / 13)
    return sum(raw_values)

hands, free_cards = init(8)
print(hands, free_cards)
print(hands[get_winner(hands, [])])
# turn = 0

# playing = True
# while playing:
#     hands[0]