import { CardRanks } from "@/constants/card-ranks";
import { CardSuits } from "@/constants/card-suits";

export class Card {
  private rank: number;
  private suit: string;

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

  getRank(): number {
    return this.rank;
  }

  getSuit(): string {
    return CardSuits[this.suit];
  }
}