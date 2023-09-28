import { CardRanks } from "@/constants/card-ranks";
import { CardSuits } from "@/constants/card-suits";
import { Card } from "./card";
import { StackOfCards } from "./stack-of-cards";
import { NUM_CARDS, PokerHands } from "@/constants/poker";

export class Player {
  private name: string;
  private hand: StackOfCards;

  constructor(name: string) {
    this.name = name;
    this.hand = new StackOfCards;
  }

  getName(): string {
    return this.name;
  }

  receiveCard(card: Card) {
    this.hand.addCard(card);
  }

  showHand(): StackOfCards {
    return this.hand;
  }

  evaluateHand() {
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

  private getHighCard(): number {
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