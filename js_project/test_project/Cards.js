
// === Card Object ===
// could be number or special,
// special cards alse has a value (int or str)

export class Card {
  constructor(value, type = 'number') {
    this.value = value; // 1–12 ou spécial
    this.type = type;   // number | bonus | action
  }
}


// === Deck functions ===
// export async function for Deck manip
// deck and withdraw both are Game's lists of cards

export async function makeDeck() {
  // returns a full deck as a list of cards 
  const cards = []
  cards.push(new Card(0))
  
  // numbers
  for (let i=1; i<=12; i ++){
    for (let j=1; j<=i; j++) {
      cards.push(new Card(i));
    }
  }

  // bonus 
  cards.push(new Card("x2", "bonus"));
  cards.push(new Card(2, "bonus"));
  cards.push(new Card(4, "bonus"));
  cards.push(new Card(6, "bonus"));
  cards.push(new Card(8, "bonus"));
  cards.push(new Card(10, "bonus"));

  // action
  for (let k=1; k<=3; k++){
    cards.push(new Card("freeze", "action"));
    cards.push(new Card("flip three", "action"));
    cards.push(new Card("second chance", "action"));
  
  return cards
  }
}

export async function shuffle(cards) {   // call : let deck = await shuffle(deck);
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

// === Use ===
// once deck is created and shuffled
// use it as a list : 
//    - deck.pop to draw
//    - withdraw.push to withdraw card


// === TESTS ===

let deck = []

deck = await makeDeck()
console.log(deck)

deck = await shuffle(deck)
console.log(deck)

// in one command, create a shuffled deck ?

let sdeck = await shuffle(makeDeck())

// card manip 

let withdraw = []
const drew = deck.pop()
console.log(drew)
withdraw.push(drew)
console.log(withdraw)

// seems to work