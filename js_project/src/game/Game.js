import "../cards/Deck.js"
import {Player} from "../players/Player.js"
import "../players/Player.js";
import "../game/Round.js"
import "../game/Turn.js"
import { firstTurn } from "../game/Round.js";
import { makedeck, shuffle } from "../cards/Deck.js";
// import "../rules/actions.js";


export class Game {
  constructor(players=[]) {
    this.players = players;
    this.cards = []
  }

  start() {
    this.cards = makedeck()
    this.cards = shuffle(this.cards)
    firstTurn(this.players, this.cards)
    console.log(this.players[0].hand[0])
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