import { Card } from "./Cards.js"

// === Player Object ===
// creating an object for 
// players modelisation

export class Player {
  constructor(name="unnamed") {
    this.name = name;
    this.hand = [];
    this.state = "ACTIVE";  // can also be "STAYING" or "OUT"
    this.dealer = false;  // true when the player is the dealer
    this.score = 0;
  }

  addCard(card){
    this.hand.push(card)
  }
}

// === TESTS ===
/*
let valentin  = new Player("valentin")
valentin.addCard(new Card(9))
valentin.addCard(new Card("x2", "modifier"))
valentin.state = "STAYING"
console.log(valentin)
*/
// seems to work