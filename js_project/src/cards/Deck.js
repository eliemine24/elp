import { Card } from "./Card.js"

export class Deck {
  constructor(cards = []) {
    this.cards = cards;
    this.makedeck()
    this.discardPile = [];
  }

  makedeck() {
    // complete deck with numbers and special cards 
    this.cards.push(Card(0))
    
    for (i=1; i<=12; i ++){
      for (j=1; j<=i; j++) {
        this.cards.push(Card(i));
      }
    }

    this.cards.push(Card("x2", "modifier"));
    this.cards.push(Card(2, "modifier"));
    this.cards.push(Card(4, "modifier"));
    this.cards.push(Card(6, "modifier"));
    this.cards.push(Card(8, "modifier"));
    this.cards.push(Card(10, "modifier"));

    for (k=1; k<=3; k++){
      this.cards.push(Card("freeze", "action"));
      this.cards.push(Card("flip three", "action"));
      this.cards.push(Card("second chance", "action"));
    }
}

  shuffle() {}
  
  draw() {
    return this.cards.pop()
  }
  
  discard(card) {
    // discard one card 
    this.discardPile.push(card)
  }
}