export const NUM_CARDS = 5;

interface IPokerHands {
	[key: string]: {name: string, hierarchy: number};
}

export const PokerHands: IPokerHands = {
  ROYAL_FLUSH: { name: "Royal Flush", hierarchy: 1 },
  STRAIGHT_FLUSH: { name: "Straight Flush", hierarchy: 2 },
  FOUR_OF_A_KIND: { name: "Four Of A Kind", hierarchy: 3 },
  FULL_HOUSE: { name: "Full House", hierarchy: 4 },
  FLUSH: { name: "Flush", hierarchy: 5 },
  STRAIGHT: { name: "Straight", hierarchy: 6 },
  THREE_OF_A_KIND: { name: "Three Of A Kind", hierarchy: 7 },
  TWO_PAIR: { name: "Two Pair", hierarchy: 8 },
  PAIR: { name: "Pair", hierarchy: 9 },
  HIGH_CARD: { name: "High Card", hierarchy: 10 },
};