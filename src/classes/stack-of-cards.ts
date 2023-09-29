import { Card } from "./card";

/**
 * Class representing a stack of cards.
 *
 * Represents a stack of playing cards for poker.
 */
export class StackOfCards {
  private cards: Card[];

  constructor() {
    this.cards = [];
  }

  /**
   * addCard
   *
   * Adds a card to the stack.
   * 
   * @returns {void} None.
   */
  addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * removeCard
   *
   * Removes a card from the stack.
   * 
   * @param {number} i - The index of the card to remove.
   * 
   * @returns {Card} The card that was removed.
   */
  removeCard(i: number): Card {
    return this.cards.splice(i, 1)[0];
  }

  /**
   * getCard
   *
   * Views a card from the stack.
   * 
   * @param {number} i - The index of the card to get.
   * 
   * @returns {Card} The card.
   */
  getCard(i: number): Card {
    return this.cards[i];
  }

  /**
   * getLength
   *
   * Returns the length of the stack of cards.
   * 
   * @returns {number} The number of cards in the stack.
   */
  getLength(): number {
    return this.cards.length;
  }
}