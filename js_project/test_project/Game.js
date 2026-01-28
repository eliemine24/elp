import { askUser } from "./AskUser.js"
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
        // choose first dealer 
        console.log(this.players)
        this.chooseDealer()
    }

    async chooseDealer() {

        const dealer = await askUser("designate dealer among players : ")
        let valid = false
        for (let i in this.players) {
            if (dealer == this.players[i].name) {
                valid = true
                this.players[i].state = "DEALER"
            }
        }
        if (valid==false) {
            this.chooseDealer()
        }
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

// === TESTS ===

let valentin = new Player("valentin")
let lea = new Player("lea")
let elie = new Player("elie")

let game = new Game([valentin, lea, elie])
game.init()