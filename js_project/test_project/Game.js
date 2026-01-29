import { askUser } from "./AskUser.js"
import { Card, shuffle, makeDeck } from "./Cards.js"
import { Player } from "./Player.js"
import { calculPlayerScore } from "./Scores.js"

// === Gaming functions ===
// trying to implement game as a class
// only as a information keeper 

export class Game{
    constructor(players, scorefilename) {
        this.players = players
        this.deck = []
        this.discardPile = []
        this.file_name = scorefilename
        this.round_ = false
        this.game_ = false
        this.dealer_indice = 0
    }

    async init() {
        // initialize game calling makedack functions and maybe initializing json score file
        this.deck = await shuffle(await makeDeck())
        // choose first dealer 
        await this.chooseDealer()
        // set json score file 

        // lauch game eventually to be called outside the init method
        await this.game()
    }

    async game() {
        this.game_ = true
        while (this.game_) {
            await this.round()
            await this.checkGameEnd()
        }
        console.log("----- end of the game -----")
    }

    async round() {
        this.round_ = true
        await this.firstTour()
        let indice = this.dealer_indice // identify who is playing

        while (this.round_==true){ // still need to review ending condition !!
            
            indice ++     // starting from not dealer

            if (indice>=this.players.length) {
                indice = 0
            }
            // no need to verify dealers indice because already verifying player's state
            
            if (this.players[indice].state=="ACTIVE") {
                
                await this.playersTurn(indice)

            }

            if (await this.checkRoundEnd()) {
                await this.roundEnd()
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
                    this.players[i].dealer = true
                }
            }
        }
    }

    async firstTour() {
        // function for first tour : each player plays on time
        console.log("----- first tour ----- ")
        for (let i in this.players) {
            // shuffle if empty deck
            if (this.deck.length <= 0) {
                this.deck = await shuffle(this.discardPile);
                this.discardPile = []
            }
            let new_card = this.deck.pop()
            console.log(this.players[i].name, "drew :", new_card)
            // apply card effect, see later ...
            this.players[i].addCard(new_card)
            // maybe apply card effect only here idk 
            }
        }
    
    async playersTurn(i) {
        // function for ONLY ONE player's turn 
        console.log("-----", this.players[i].name, "'s turn -----")
        // → player chooses if stay or continues
        await this.StayOrContinue(i)
        if (this.players[i].state == "ACTIVE") {
            // shuffle if empty deck
            if (this.deck.length <= 0) {
                this.deck = await shuffle(this.discardPile);
                this.discardPile = []
            }
            // → draw a card
            let new_card = this.deck.pop()
            console.log("You drew :", new_card)
            // → compare with previous card
            if (await this.hasDuplicate(this.players[i].hand, new_card)) {
                // add to hand
                this.players[i].addCard(new_card)
                this.players[i].state = "OUT";
                console.log("You are out for this round")
            }
            else {
                // add to hand
                this.players[i].addCard(new_card)
                // → apply effect if needed
                if (new_card.type !== 'number') {
                //applyCardEffect(player, card)
                }
            }
            console.log(this.players)
        }
    }

    async StayOrContinue(i) {
        // asks players decision and updates their state
        let valid = false
        while (valid==false) {
            const decision = await askUser("Do you want to continue this round ? (Y/n) : ")
            
            if (decision=="Y") {
                console.log("You chose to continue")
                valid = true
            }

            else if (decision=="n") {
                console.log("You chose to stay")
                this.players[i].state = "STAYING"
                valid = true
            }
        }
    }

    async hasDuplicate(hand, card) {
        let dupli = false
        for (let i in hand) {
            if (card.value == hand[i].value) {
                dupli = true
            }
        }
        return dupli
    }

    async checkRoundEnd() {
        for (let p in this.players) {
            if (this.players[p].state == "ACTIVE") {
                return false
            }
        }
        return true
    }
    
    async roundEnd() {
        this.round_ = false
        console.log("----- end of the round -----")
        for (let i in this.players) {
            // calcul scores players
            this.players[i].score += await calculPlayerScore(this.players[i])
            console.log(this.players[i].name, " : ", this.players[i].score)
            // store hand in json file
            // free player's hand
            await this.discardHand(this.players[i].hand)
            this.players[i].state = "ACTIVE"
        }
    }

    async discardHand(hand) { 
        while (hand.length > 0) {
            let cardToThrow = hand.pop()
            this.discardPile.push(cardToThrow)
        }
    }

    async checkGameEnd() {
        for (let i in this.players) {
            if (this.players[i].score >= 200) {
                this.game_ = false
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