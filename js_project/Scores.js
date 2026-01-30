import { Card, shuffle, makeDeck } from "./Cards.js"
import { Player } from "./Player.js"

// === SCORE COUNTING METHODS ===

export async function calculPlayerScore(player) {
    // calcul le player's sscore from hand
    if (player.state == "OUT") {
        return 0
    }

    const hand = player.hand

    let bonus = 0
    let multiplier = 1
    let score = 0

    if (player.state == "WINNING") {
        score += 15
    }

    for (let i in hand){
        
        let card = hand[i]

        if (card.type=="number") {
            score += card.value
        }

        else if (card.type=="bonus") {
            if (card.value!="x2") {
                if (card.value=="+2") {bonus += 2}
                if (card.value=="+4") {bonus += 4}
                if (card.value=="+6") {bonus += 6}
                if (card.value=="+8") {bonus += 8}
                if (card.value=="+10") {bonus += 10}
            }
            else multiplier *= 2
        }
        // if "action" do nothing
    }
    return (score*multiplier + bonus)
}




// === TESTS ===
/*
let lui = new Player("Gudule")
let deck = await shuffle(await makeDeck()) // il faut atteeeendre


for (let i=0; i<7; i++) {
    lui.addCard(deck.pop())
}
lui.addCard(new Card("x2", "bonus"))
lui.addCard(new Card(4, "bonus"))
console.log(lui.hand)

const score = await calculPlayerScore(lui)

console.log(score)
*/
// works