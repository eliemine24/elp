import { Card } from "./Card.js"

export async function makedeck() {
  // returns a full deck as a list of cards 
  const cards = []
  cards.push(new Card(0))
  
  for (let i=1; i<=12; i ++){
    for (let j=1; j<=i; j++) {
      cards.push(new Card(i));
    }
  }

  cards.push(new Card("x2", "modifier"));
  cards.push(new Card(2, "modifier"));
  cards.push(new Card(4, "modifier"));
  cards.push(new Card(6, "modifier"));
  cards.push(new Card(8, "modifier"));
  cards.push(new Card(10, "modifier"));

  for (let k=1; k<=3; k++){
    cards.push(new Card("freeze", "action"));
    cards.push(new Card("flip three", "action"));
    cards.push(new Card("second chance", "action"));
  
  return cards
  }
}

export async function shuffle(cards) {   // let deck = await shuffle(myCards);
  // shuffle deck, returns a list of cards
    let myShuffledCards = [];
    while (cards.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 0));

        let i = Math.floor(Math.random() * cards.length);
        let n = cards.splice(i, 1).pop();
        myShuffledCards.push(n);
    }
    return myShuffledCards;
}
  
export function discard(card) {
    // discard one card 
    discardPile.push(card)
  }



// Test
let deck = await makedeck()
deck = await shuffle(deck)
console.log(deck)