import { CardRanks } from "@/constants/card-ranks";
import { CardSuits } from "@/constants/card-suits";
import { Card } from "./card";

export class StackOfCards {
  private cards: Card[];

  constructor() {
    this.cards = [];
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  removeCard(i: number): Card {
    return this.cards.splice(i, 1)[0];
  }

  getCard(i: number): Card {
    return this.cards[i];
  }

  getLength(): number {
    return this.cards.length;
  }
}