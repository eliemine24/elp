import { askUser } from "./AskUser.js"
import { Card, shuffle, makeDeck } from "./Cards.js"
import { Player } from "./Player.js"
import { calculPlayerScore, registerRound, writejson } from "./Scores.js"
import { applyCardEffect, countNumberedCards } from "./Actions.js"

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
        this.register = {}
        this.roundindice = 1
    }

    async init() {
        // initialize game calling makedack functions and maybe initializing json score file
        this.deck = await shuffle(await makeDeck())
        // show game players
        console.log("---- Starting Game ---- \nPLayers :")
        for (let i in this.players) {
            console.log(` player ${i} : ${this.players[i].name} (${this.players[i].state})`)
        }
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
            console.log(`${this.players[i].name} drew ${new_card.value} (${new_card.type})`)
            
            // Add card to hand
            this.players[i].addCard(new_card)
            
            // Apply card effect if it's an action card
            if (new_card.type === 'action') {
                await applyCardEffect(this, this.players[i], new_card)
            }
            // Apply bonus cards during score calculation
        }
    }
    
    async playersTurn(i) {
        // function for ONLY ONE player's turn 
        console.log("-----", this.players[i].name, "'s turn -----")
        
        // Check if player has 7 numbered cards (winning condition)
        if (countNumberedCards(this.players[i].hand) >= 7) {
            console.log(`${this.players[i].name} has 7 numbered cards! They stay.`);
            this.players[i].state = "STAYING";
            return;
        }
        
        // â†’ player chooses if stay or continues
        await this.StayOrContinue(i)

        if (this.players[i].state == "ACTIVE") {
            // shuffle if empty deck
            if (this.deck.length <= 0) {
                this.deck = await shuffle(this.discardPile);
                this.discardPile = []
            }
            // â†’ draw a card
            let new_card = this.deck.pop()
            console.log(`You drew : ${new_card.value} (${new_card.type})`)
            
            // â†’ compare with previous card (check for duplicates)
            // Special handling for Second Chance - checked within applyCardEffect
            if (new_card.type !== "action" || new_card.type !== "bonus") {
                if (await this.hasDuplicate(this.players[i].hand, new_card)) {
                    // check if player has a second chance card
                    const hasSecondChance = this.players[i].hand.some(c => c.value == "second chance");
                    if (hasSecondChance === true) {
                        // Remove the extra second chance from hand
                        const scIndex = this.players[i].hand.findIndex(c => c.value === "second chance");
                        if (scIndex !== -1) {
                        this.players[i].hand.splice(scIndex, 1);
                        }
                        this.discardPile.push(new Card("second chance", "action"));
                        this.discardPile.push(new_card);
                        console.log("Saved by your second chance card")
                    }
                    else {
                        // add to hand
                        this.players[i].addCard(new_card)
                        this.players[i].state = "OUT";
                        console.log("You are out for this round")
                    }
                    return;
                }
            }
            
            // Add to hand
            this.players[i].addCard(new_card)
            
            // â†’ apply effect if it's an action or bonus card
            if (new_card.type === 'action') {
                await applyCardEffect(this, this.players[i], new_card)
            }
            // Bonus cards are handled during score calculation
            
            // Check again if player has 7 numbered cards after drawing
            if (countNumberedCards(this.players[i].hand) >= 7) {
                console.log(`${this.players[i].name} now has 7 numbered cards! They stay.`);
                this.players[i].state = "WINNING";
                await this.roundEnd();
            }
        }
    }

    async StayOrContinue(i) {
        // asks players decision and updates their state
        let valid = false
        while (valid==false) {
            // show players hand
            console.log("Hand :")
            for (let k in this.players[i].hand) {
                const card = this.players[i].hand[k];
                const marker = card.value === "second chance" ? " [SECOND CHANCE]" : "";
                console.log(`  ${card.value} | ${card.type}${marker}`)
            }
            
            // Show numbered card count
            const numberedCount = countNumberedCards(this.players[i].hand);
            console.log(`Numbered cards: ${numberedCount}/7`);

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
            console.log(this.players[i].name, ":", this.players[i].score)
            // store hand in json file
            // free player's hand (including Second Chance cards that weren't used)
            this.players[i].state = "ACTIVE"
            
            // Move to next dealer
            this.players[i].dealer = false;
        }
        // save game in register
        this.register = await registerRound(this.register, this.players, this.roundindice)
        this.roundindice+=1
        //rewrite json file
        writejson(this.register, "scores.json")
        
        for (let i in this.players) {
            await this.discardHand(this.players[i].hand)
        }
        
        // Next dealer
        this.dealer_indice = (this.dealer_indice + 1) % this.players.length;
        this.players[this.dealer_indice].dealer = true;
        console.log(`Next dealer: ${this.players[this.dealer_indice].name}`);
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
                console.log(`\n${this.players[i].name} wins the game with ${this.players[i].score} points!`);
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
