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
        this.round_ = false
        this.dealer_indice = 0
    }

    async init() {
        // initialize game calling makedack functions and maybe initializing json score file
        this.deck = await shuffle(await makeDeck())
        // choose first dealer 
        await this.chooseDealer()
        // set json score file 

        // lauch game eventually to be called outside the init method
        this.lauch()
    }

    async lauch() {
        this.round_ = true
        await this.fisrtTour()
        let indice = this.dealer_indice // identify who is playing
        
        while (this.round_==true){ // still need to review ending condition !!
            
            indice += 1     // starting from not dealer
            if (indice>=this.players.length) {
                indice = 0
            }
            // no need to verify dealers indice because already verifying player's state
            if (this.players[indice].state=="ACTIVE") {
                
                await this.playersTurn(indice)

            }
        }
    }

    async chooseDealer() {
        
        let valid = false
        while (valid==false) {
            const dealer = await askUser("designate dealer among players : ") //!\\ askuSer question to use as a python input() function !!! (await indispensable)
            
            for (let i in this.players) {
                if (dealer == this.players[i].name) {
                    valid = true
                    this.dealer_indice = i 
                    this.players[i].state = "DEALER"
                }
            }
        }
    }

    async fisrtTour() {
        // function for first tour : each player plays on time
        console.log("----- first tour ----- ")
        for (let i in this.players) {
            
            if (this.players[i].state=="ACTIVE"){ // could be DEALER at the begining
                
                let new_card = this.deck.pop()
                console.log(this.players[i].name, "drew :", new_card)
                // apply card effect, see later ...
                this.players[i].addCard(new_card)
                // maybe apply card effect only here idk 
            }
        }
    }
    
    async playersTurn(i) {
        // function for ONLY ONE player's turn 
        console.log("-----", this.players[i].name, "'s turn -----")
        // → draw a card
        let new_card = this.deck.pop()
        console.log("You drew :", new_card)

        // → apply card effect if need
        //      → compare with previous card
        //      → apply effect if needed
        // → player chooses if stay or continues
        await this.StayOrContinue(i)
    }

    async StayOrContinue(i) {
        // asks players decision and updates their state
        let valid = false
        while (valid==false) {
            const decision = await askUser("Do you want to Continue this Round ? (Y/n) : ")
            
            if (decision=="Y") {
                console.log("yout choosed to continue")
                valid = true
            }

            else if (decision=="n") {
                console.log("you choosed to stay")
                this.players[i].state = "STAYING"
                valid = true
            }
        }
    }
}

// === TESTS ===

let valentin = new Player("valentin")
let lea = new Player("lea")
let elie = new Player("elie")

let game = new Game([valentin, lea, elie])
game.init()

// working omg 