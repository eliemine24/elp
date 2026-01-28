import { Card, shuffle, makeDeck } from "./Cards.js"
import { Player } from "./Player.js"

// === Gaming functions ===
// trying to implement game as a class
// only as a information keeper 

export class Game{
    constructor(players, scorefilename) {
        this.players = players
        this.deck = []
        this.file_name = scorefilename
    }

    async init() {
        // initialize game calling makedack functions and maybe initializing json score file
        this.deck = await shuffle(await makeDeck())

    }

    async playerTurn() {
        // function for ONLY ONE player's turn 
        // → draw a card
        // → apply card effect if need
        //      → compare with previous card
        //      → apply effect if needed
        // → player chooses if stay or continues
        // → verify score ?
    }

    async round(){
        // while none of player's score complete ending conditions =
        //   - no more players
        //   - flip 7 (7 different cards)
        // loop for a complete round (each player plays)
    }

}

