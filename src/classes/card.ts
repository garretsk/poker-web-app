import { CardRanks } from "@/constants/card-ranks";
import { CardSuits } from "@/constants/card-suits";

/**
 * Class representing a card.
 *
 * Represents a playing card for poker.
 */

export class Card {
  private rank: number;
  private suit: string;

  /**
   * Creates a Card.
   *
   * @throws {Error} If rank or suit is invalid.
   * 
   * @param {number} rank - The rank of the new card.
   * 
   * @param {string} suit - The suit of the new card.
   */
  constructor(rank: number, suit: string) {
    if (Number.isInteger(rank) && rank >= CardRanks.TWO && rank <= CardRanks.ACE) {
      this.rank = rank;
    }
    else {
      throw new Error("Invalid rank: ${rank}");
    }

    if (CardSuits.hasOwnProperty(suit)) {
      this.suit = suit;
    }
    else {
      throw new Error("Invalid suit: ${suit}");
    }
  }

  /**
   * getRank
   *
   * Gets the rank of the card.
   * 
   * @returns {number} The rank of the card.
   */
  getRank(): number {
    return this.rank;
  }

  /**
   * getSuit
   *
   * Gets the suit of the card.
   * 
   * @returns {string} The suit of the card.
   */

  getSuit(): string {
    return CardSuits[this.suit];
  }
}