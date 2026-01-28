import { Card } from "./Card.js"

export class Deck {
  constructor(cards = []) {
    this.cards = cards;
    this.makedeck()
    this.discardPile = [];
  }

  makedeck() {
    // complete deck with numbers and special cards 
    this.cards.push(new Card(0))
    
    for (let i=1; i<=12; i ++){
      for (let j=1; j<=i; j++) {
        this.cards.push(new Card(i));
      }
    }

    this.cards.push(new Card("x2", "modifier"));
    this.cards.push(new Card(2, "modifier"));
    this.cards.push(new Card(4, "modifier"));
    this.cards.push(new Card(6, "modifier"));
    this.cards.push(new Card(8, "modifier"));
    this.cards.push(new Card(10, "modifier"));

    for (let k=1; k<=3; k++){
      this.cards.push(new Card("freeze", "action"));
      this.cards.push(new Card("flip three", "action"));
      this.cards.push(new Card("second chance", "action"));
    }
}}

export async function shuffle(cards) {   // let deck = await shuffle(myCards);
    let myShuffledCards = [];
    while (cards.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 0));

        let i = Math.floor(Math.random() * cards.length);
        let n = cards.splice(i, 1).pop();
        myShuffledCards.push(n);
    }
    return myShuffledCards;
}
  
export function draw() {
    return this.cards.pop()
  }
  
export function discard(card) {
    // discard one card 
    this.discardPile.push(card)
  }