import { CardRanks } from "@/constants/card-ranks";
import { CardSuits } from "@/constants/card-suits";
import { Card } from "./card";
import { StackOfCards } from "./stack-of-cards";
import { Deck } from "./deck";
import { Player } from "./player";
import { NUM_CARDS, PokerHands } from "@/constants/poker";

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

  getPlayers(): Player[] {
    return this.players;
  }

  play(): Player {
    for (let card = 0; card < NUM_CARDS; card++) {
      for (let player = 0; player < this.players.length; player++) {
        this.deck.dealCard(this.players[player]);
      }
    }

    let playerResults: string[] = [];
    for (const player of this.players) {
      let outcome = player.evaluateHand();
      playerResults.push(outcome.name);
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

    index = playerResults.indexOf(PokerHands.HIGH_CARD.name);
    return this.players[index];
  }
}