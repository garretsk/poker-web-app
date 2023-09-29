import { CardRanks } from "@/constants/card-ranks";
import { Card } from "./card";
import { StackOfCards } from "./stack-of-cards";
import { NUM_CARDS, PokerHands } from "@/constants/poker";

/**
 * Class representing a player.
 *
 * Represents a poker player with a hand of playing cards.
 */
export class Player {
  private name: string;
  private hand: StackOfCards;

  constructor(name: string) {
    this.name = name;
    this.hand = new StackOfCards;
  }

  /**
   * getName
   * 
   * Returns the name of the player.
   *
   * @returns {string} The name of the player.
   */
  getName(): string {
    return this.name;
  }

  /**
   * receiveCard
   * 
   * Adds a card to the player's hand.
   *
   * @param {Card} card - The card given to the player.
   * 
   * @returns {}
   */
  receiveCard(card: Card) {
    this.hand.addCard(card);
  }

  /**
   * showHand
   *
   * Returns the player's hand.
   * 
   * @returns {StackOfCards} The player's hand.
   */
  showHand(): StackOfCards {
    return this.hand;
  }

  /**
   * evaluateHand
   *
   * Determines what hand the player has.
   * 
   * @throws {Error} If the hand does not contain the correct number of cards for poker.
   * 
   * @returns {{name: string, hierarchy: number}} The name of the hand the player has.
   */
  evaluateHand(): {name: string, hierarchy: number} {
    if (this.hand.getLength() !== NUM_CARDS) {
      throw new Error("Invalid Poker Hand");
    }

    if (this.hasRoyalFlush()) {
      return PokerHands.ROYAL_FLUSH;
    }
    else if (this.hasStraightFlush()) {
      return PokerHands.STRAIGHT_FLUSH;
    }
    else if (this.hasFourOfAKind()) {
      return PokerHands.FOUR_OF_A_KIND;
    }
    else if (this.hasFullHouse()) {
      return PokerHands.FULL_HOUSE;
    }
    else if (this.hasFlush()) {
      return PokerHands.FLUSH;
    }
    else if (this.hasStraight()) {
      return PokerHands.STRAIGHT;
    }
    else if (this.hasThreeOfAKind()) {
      return PokerHands.THREE_OF_A_KIND;
    }
    else if (this.hasTwoPair()) {
      return PokerHands.TWO_PAIR;
    }
    else if (this.hasPair()) {
      return PokerHands.PAIR;
    }
    else {
      return PokerHands.HIGH_CARD;
    }
  }

  /**
   * hasRoyalFlush
   *
   * Determines if the hand is a royal flush.
   * 
   * @returns {boolean} True if the hand is a royal flush.
   */
  private hasRoyalFlush(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const suits: Set<string> = new Set<string>();
    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      suits.add(this.hand.getCard(i).getSuit());
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    const requiredCardRanks: number[] = [CardRanks.TEN, CardRanks.JACK, CardRanks.QUEEN, CardRanks.KING, CardRanks.ACE];
    return suits.size === 1 && requiredCardRanks.every((rank) => ranks.includes(rank));
  }

  /**
   * hasStraightFlush
   *
   * Determines if the hand is a straight flush.
   * 
   * @returns {boolean} True if the hand is a straight flush.
   */
  private hasStraightFlush(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const suits: Set<string> = new Set<string>();
    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      suits.add(this.hand.getCard(i).getSuit());
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    ranks.sort((a, b) => a - b);
    for (let j = 1; j < ranks.length; j++) {
      if (ranks[j - 1] + 1 !== ranks[j]) {
        return false;
      }
    }
    return suits.size === 1;
  }

  /**
   * hasFourOfAKind
   *
   * Determines if the hand is a four of a kind.
   * 
   * @returns {boolean} True if the hand is four of a kind.
   */
  private hasFourOfAKind(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    ranks.sort((a, b) => a - b);
    return ranks[1] === ranks[NUM_CARDS - 1] || ranks[0] === ranks[NUM_CARDS - 2];
  }

  /**
   * hasFullHouse
   *
   * Determines if the hand is a full house.
   * 
   * @returns {boolean} True if the hand is a full house.
   */
  private hasFullHouse(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const uniqueRanks: Set<number> = new Set<number>();
    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      uniqueRanks.add(this.hand.getCard(i).getRank());
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    ranks.sort((a, b) => a - b);
    return uniqueRanks.size === 2 && ranks[0] === ranks[1] && ranks[NUM_CARDS - 1] === ranks[NUM_CARDS - 2];
  }

  /**
   * hasFlush
   *
   * Determines if the hand is a flush.
   * 
   * @returns {boolean} True if the hand is a flush.
   */
  private hasFlush(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const suits: Set<string> = new Set<string>();
    for (let i = 0; i < NUM_CARDS; i++) {
      suits.add(this.hand.getCard(i).getSuit());
    }
    
    return suits.size === 1;
  }

  /**
   * hasStraight
   *
   * Determines if the hand is a straight.
   * 
   * @returns {boolean} True if the hand is a straight.
   */
  private hasStraight(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    ranks.sort((a, b) => a - b);
    for (let j = 1; j < ranks.length; j++) {
      if (ranks[j - 1] + 1 !== ranks[j]) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * hasThreeOfAKind
   *
   * Determines if the hand is a three of a kind.
   * 
   * @returns {boolean} True if the hand is three of a kind.
   */
  private hasThreeOfAKind(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    const counter = new Map<number, number>();
    for (const rank of ranks) {
      counter.set(rank, (counter.get(rank) || 0) + 1);
    }

    for (const count of counter.values()) {
      if (count === 3) {
        return true;
      }
    }

    return false;
  }

  /**
   * hasTwoPair
   *
   * Determines if the hand is a two pair.
   * 
   * @returns {boolean} True if the hand is a two pair.
   */
  private hasTwoPair(): boolean {
    let numPairs: number = 0;
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    const counter = new Map<number, number>();
    for (const rank of ranks) {
      counter.set(rank, (counter.get(rank) || 0) + 1);
    }

    for (const count of counter.values()) {
      if (count === 2) {
        numPairs++;
      }
    }
    
    return numPairs === 2;
  }

  /**
   * hasPair
   *
   * Determines if the hand is a pair.
   * 
   * @returns {boolean} True if the hand is a pair.
   */
  private hasPair(): boolean {
    if (this.hand.getLength() !== NUM_CARDS) {
      return false;
    }

    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      ranks.push(this.hand.getCard(i).getRank());
    }
    
    const counter = new Map<number, number>();
    for (const rank of ranks) {
      counter.set(rank, (counter.get(rank) || 0) + 1);
    }

    for (const count of counter.values()) {
      if (count === 2) {
        return true;
      }
    }

    return false;
  }

  /**
   * getHighCard
   *
   * Returns the number associated with the highest card in the hand.
   * 
   * @returns {number} The highest card.
   */
  getHighCard(): number {
    const ranks: number[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      ranks.push(this.hand.getCard(i).getRank());
    }

    let highest: number = 0;
    for (const rank of ranks) {
      if (rank > highest) {
        highest = rank;
      }
    }

    return highest;
  }
}