import { Card, shuffle, makeDeck } from "./Cards.js"
import { Player } from "./Player.js"
import { writeFile } from "fs"

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

export async function registerRound(register, players) {
    // saves round info in a {}
    let manche = {}
    for (let i in players) {
        manche[players[i].name] = {}
        manche[players[i].name]["score"] = players[i].score
        manche[players[i].name]["hand"] = []
        for (let j in players[i].hand) {
            manche[players[i].name]["hand"].push(players[i].hand[j].value)
        }
    }
    register["manche"] = manche
    return register
}


export async function writejson(register, title="unnamed.json") {
    // takes a dict as argument and write it in a <title> json file
    
    const data = JSON.stringify(register, null, 2);
    
    writeFile(title, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log(`Data written to file ${title}`)
        }
    })
}


// === TESTS ===
/*
let lui = new Player("Gudule")
let elle = new Player("Françoise")
let iel = new Player("René")
let players = [elle, lui, iel]
let deck = await shuffle(await makeDeck()) // il faut atteeeendre


for (let i=0; i<7; i++) {
    lui.addCard(deck.pop())
}
for (let i=0; i<7; i++) {
    elle.addCard(deck.pop())
}
for (let i=0; i<7; i++) {
    iel.addCard(deck.pop())
}

console.log(lui)
console.log(elle)
console.log(iel)

elle.score  = await calculPlayerScore(elle)
lui.score  = await calculPlayerScore(lui)
iel.score  = 89098
let registre = {}

await registerRound(registre, players)
console.log(registre)
await writejson(registre, "title.json")
*/