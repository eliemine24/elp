import {makedeck, shuffle} from "../cards/Deck.js"
import { Player } from "../players/Player.js";
import { applyCardEffect } from "../rules/actions.js";


export class Game {
  constructor(players=[]) {
    this.players = players;
    this.deck = makedeck()
  }

  start() {
    //first round 
  }
  playRound() {}
  isGameOver() {}
}


// Test 

const valentin = new Player("valentin")
const lea = new Player("lea")
const elie = new Player("elie")

const game = new Game([valentin, lea, elie])