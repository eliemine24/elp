import {Deck} from "../cards/Deck.js"
import { Player } from "../players/Player.js";
import { applyCardEffect } from "../rules/actions.js";


export class Game {
  constructor(players=[]) {
    this.players = players;
    this.deck = new Deck();
  }

  start() {
    // execute game's fisrt round 
    for (let i=0; i<this.players.length; i++) {
      const drewcard = this.deck.draw()
      console.log(this.players[i], "drew card = ", drewcard, "\n")
    }
  }
  playRound() {}
  isGameOver() {}
}


// Test 

const valentin = new Player("valentin")
const lea = new Player("lea")
const elie = new Player("elie")

const game = new Game([valentin, lea, elie])
game.start()