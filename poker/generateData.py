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
    #print("cards left: ", len(free_cards))
    for _ in range(card_count):
        index = randint(0, len(free_cards) - 1)
        cards.append(free_cards[index])
        free_cards.remove(free_cards[index])
    return cards, free_cards

def get_winners(hands, board):
    m = -1
    winners = []
    for i in range(len(hands)):
        hand = hands[i]
        value = get_value(hand, board)
        if m < value:
            m = value
            winners = [i]
        elif m == value:
            winners.append(i)
    return winners

def get_value(hand, board):
    raw_values = [card % 13 for card in hand + board]
    suits = [math.floor(card / 13) for card in hand + board]

    straight_flush = []
    straight = get_straight(raw_values)
    flush = get_flush(suits)
    four_of_a_kind = get_four_of_a_kind(raw_values)
    three_of_a_kind = get_three_of_a_kind(raw_values)
    two_of_a_kind = get_two_of_a_kind(raw_values)

    if len(straight) != 0:
        if len(flush) != 0:
            for s in straight:
                if len(straight_flush) >= 5:
                    break
                for i in s:
                    if i in flush:
                        straight_flush.append(i)
                    elif len(straight_flush) < 5:
                        straight_flush = []
                    else:
                        break
    
    if len(straight_flush) >= 5: # straight flush or royal flush
        highest_cards = get_highest_cards(straight_flush, [], 5)
        return 8
    elif len(four_of_a_kind) > 0: # four of a kind
        highest_cards = get_highest_cards(raw_values, four_of_a_kind, 1)
        return 7
    elif len(three_of_a_kind) > 0 and len(two_of_a_kind) >= 2: # full house
        return 6
    elif len(flush) >= 5: # flush
        highest_cards = get_highest_cards(flush, [], 5)
        return 5
    elif len(straight) > 0: # straight
        highest_cards = get_highest_cards(straight, [], 5)
        return 4
    elif len(three_of_a_kind) > 0: # three of a kind
        highest_cards = get_highest_cards(raw_values, three_of_a_kind, 2)
        return 3
    elif len(two_of_a_kind) >= 2: # two pair
        highest_pairs = get_highest_pairs(two_of_a_kind, 2)
        highest_cards = get_highest_cards(raw_values, highest_pairs, 1)
        return 2
    elif len(two_of_a_kind) > 0: # one pair
        highest_pair = get_highest_pairs(two_of_a_kind, 1)
        highest_cards = get_highest_cards(raw_values, highest_pair, 3)
        return 1
    else: # high card
        highest_cards = get_highest_cards(raw_values, [], 5)
        return 0

    return sum(raw_values)

def get_straight(raw_values): # returns all straights found
    cards = [(raw_values[i], i) for i in range(len(raw_values))]
    cards.sort()
    sequences = []
    for i in range(len(cards[4:])):
        sequences += [find_straight(cards[i:], [])]
    indexes = [[i[1] for i in sequence] for sequence in cleanup_list(sequences)]
    while [] in indexes:
        indexes.remove([])
    return indexes

def find_straight(cards, s):
    if len(s) == 0:
        return find_straight(cards[1:], [cards[0]])
    elif len(cards) + len(s) < 5:
        return []
    elif len(cards) == 0:
        return s
    elif cards[0][0] == s[-1][0]:
        return [find_straight(cards[1:], s), find_straight(cards[1:], s[:-1] + [cards[0]])]
    elif cards[0][0] == s[-1][0] + 1:
        return find_straight(cards[1:], s + [cards[0]])
    elif len(s) >= 5:
        return s
    else:
        return []

def cleanup_list(lists):
    clean_lists = []
    for l in lists:
        if len(l) == 0:
            continue
        if type(l[0]) == tuple:
            clean_lists.append(l)
        else:
            for j in cleanup_list(l):
                clean_lists.append(j)
    return clean_lists

def get_flush(suits): # returns a series of cards if found 5 or more of the same suit
    cards = [(suits[i], i) for i in range(len(suits))]
    suits_found = [[] for _ in range(4)]
    for card in cards:
        suits_found[card[0]].append(card[1])
    for s in suits_found:
        if len(s) >= 5:
            return s
    return []

def get_x_of_a_kind(raw_values, x):
    couples = []
    cards = [(raw_values[i], i) for i in range(len(raw_values))]
    values_found = [[] for _ in range(13)]
    for card in cards:
        values_found[card[0]].append(card[1])
    for s in values_found:
        if len(s) >= x:
            couples.append(s)
    return couples


def get_four_of_a_kind(raw_values): # returns a series of cards if found 4 of the same raw_value
    couples = get_x_of_a_kind(raw_values, 4)
    if len(couples) >= 1:
        return couples[0]
    return []

def get_three_of_a_kind(raw_values): # returns the highest series of cards if found 3 of the same raw_value
    couples = get_x_of_a_kind(raw_values, 3)
    if len(couples) >= 1:
        return couples[0]
    return []

def get_two_of_a_kind(raw_values): # returns multiple series of cards if found (2 of the same raw_value) any number of times
    return get_x_of_a_kind(raw_values, 2)

def get_highest_pairs(pairs, amount): # returns a single series of cards from the [amount] highest pairs found in [pairs] in order
    return []

def get_highest_cards(raw_values, used_cards, amount): # returns the [amount] highest cards in [raw_values] that are not in [used_cards] in order
    # get the highest card
    # call get_highest_cards with highest card in used_cards and amount -1 if amount -1 > 0
    # return sequence of highest card + value returned
    return []

# hands, free_cards = init(2)
# board, free_cards = get_card(5, free_cards)
# print(hands, free_cards, board)
# for winner in get_winners(hands, board):
#     print(hands[winner])

print(8, get_value([7, 6], [12, 11, 10, 9, 8]))
print(7, get_value([7, 7], [7, 7, 10, 9, 8]))
print(6, get_value([7, 7], [12, 12, 12, 9, 8]))
print(5, get_value([7, 6], [2, 0, 10, 19, 18]))
print(4, get_value([51, 50], [13, 13, 10, 9, 8]))
print(3, get_value([7, 7], [7, 22, 27, 23, 24]))
print(2, get_value([7, 7], [12, 12, 21, 29, 28]))
print(1, get_value([7, 7], [21, 22, 25, 26, 36]))
print(0, get_value([7, 6], [21, 22, 25, 26, 37]))

