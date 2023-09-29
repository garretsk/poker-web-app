import { CardRanks } from "@/constants/card-ranks";
import { CardSuits } from "@/constants/card-suits";
import { Card } from "./card";
import { StackOfCards } from "./stack-of-cards";
import { Player } from "./player";
import { getRandom } from "@/utils/random";

/**
 * Class representing a deck of cards.
 *
 * Represents a deck of playing cards for poker.
 */
export class Deck extends StackOfCards {
  constructor() {
    super();
    for (let i = CardRanks.TWO; i <= CardRanks.ACE; i++) {
      super.addCard(new Card(i, CardSuits.SPADES));
      super.addCard(new Card(i, CardSuits.HEARTS));
      super.addCard(new Card(i, CardSuits.DIAMONDS));
      super.addCard(new Card(i, CardSuits.CLUBS));
    }
  }

  /**
   * dealCard
   *
   * Deals a card to a player.
   * 
   * @param {Player} player - The player to deal the card to.
   * 
   * @returns {void} None.
   */
  dealCard(player: Player): void {
    let random = getRandom(0, super.getLength());
    player.receiveCard(super.removeCard(random));
  }
}