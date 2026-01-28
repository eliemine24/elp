import { applyCardEffect } from "../rules/actions";
import shuffle from Deck.js
import hasDuplicate from compareCards.js

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function playTurn(player, deck) {
  if (player.state !== "ACTIVE") return;

  const choice = askPlayerChoice();

  if (choice === 'leave') {
    player.state = "STAYING";
    return;
  }

  // Mélanger si il n'y a plus de cartes
  if (deck.cards.length <= 0) {
    let shuffledCards = await shuffle(deck.cards);
    deck.cards = shuffledCards;
  }

  // Piocher une carte
  const card = deck.pop()

  // Vérifier si le joueur est éliminé
  if (hasDuplicate(player.hand, card)) {
    player.state = "OUT";
    return;
  }

  // Appliquer les effets spéciaux s'il y en a
  if (card.type !== 'number') {
    applyCardEffect(player, card)
  }
}

function askPlayerChoice(){
  // demander son actoin au joueur (rester/quitter la manche)
  const choice = prompt("Choose action (stay/leave) :");
    
  if (choice=="stay"){
      return true;
      }
  elif (choice=="leave");{
    return false;
    } 
}

const choice = askPlayerChoice()
