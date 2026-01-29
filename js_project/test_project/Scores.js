import { Card, shuffle, makeDeck } from "./Cards.js"
import { Player } from "./Player.js"

// === SCORE COUNTING METHODS ===

export async function calculPlayerScore(player) {
    // calcul le player's sscore from hand
    if (player.state == "OUT") {
        return 0
    }

    const hand = player.hand
    console.log(hand)
    let score = 0
    let specialScore = 0
    let multiplier = 1

    for (let i in hand){
        
        let card = hand[i]
        console.log(card)
        if (card.type=="number") {
            score += card.value
        }

        else if (card.type=="bonus") {
            if (card.value!="x2") {
                specialScore += card.value
            }
            else multiplier *= 2
        }
        // if "action" do nothing
    }
    return (score*multiplier + specialScore)
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