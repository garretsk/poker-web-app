import { Deck } from "./deck";
import { Player } from "./player";
import { NUM_CARDS, PokerHands } from "@/constants/poker";

/**
 * Class representing a round of poker.
 *
 * Represents a round of poker being played.
 */
export class Round {
  private static MIN_PLAYERS = 2;
  private deck: Deck;
  private players: Player[];

  constructor(playerNames: string[]) {
    this.deck = new Deck;

    this.players = [];
    for (let i = 0; i < playerNames.length; i++) {
      this.players.push(new Player(playerNames[i]));
    }
  }

  /**
   * getPlayers
   *
   * Returns the players participating in the round.
   * 
   * @returns {Player[]} The participating players.
   */
  getPlayers(): Player[] {
    return this.players;
  }

  /**
   * play
   *
   * Simulates the playing of a round of poker.
   * 
   * @returns {Player} The winning player.
   */
  play(): Player {
    for (let card = 0; card < NUM_CARDS; card++) {
      for (let player = 0; player < this.players.length; player++) {
        this.deck.dealCard(this.players[player]);
      }
    }

    let playerResults: string[] = [];
    let playerHighCards: number[] = [];
    for (const player of this.players) {
      let outcome = player.evaluateHand();
      playerResults.push(outcome.name);
      playerHighCards.push(player.getHighCard());
    }

    let index: number;

    index = playerResults.indexOf(PokerHands.ROYAL_FLUSH.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.STRAIGHT_FLUSH.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.FOUR_OF_A_KIND.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.FULL_HOUSE.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.FLUSH.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.STRAIGHT.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.THREE_OF_A_KIND.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.TWO_PAIR.name);
    if (index !== -1) {
      return this.players[index];
    }

    index = playerResults.indexOf(PokerHands.PAIR.name);
    if (index !== -1) {
      return this.players[index];
    }

    let indexOfHighest: number = 0;
    let highest: number = 0;
    for (let i = 0; i < playerHighCards.length; i++) {
      if (playerHighCards[i] > highest) {
        indexOfHighest = i;
        highest = playerHighCards[i];
      }
    }
    return this.players[indexOfHighest];
  }
}