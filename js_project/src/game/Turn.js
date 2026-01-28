//import "../rules/actions.js";
import "../cards/Deck.js";
import readline from 'readline';

// ===== const for user's input =====
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Question = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};
// ===================================


export async function playTurn(player, deck) {
  if (player.state !== "ACTIVE") return;

  const choice = await askPlayerChoice();

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
    //applyCardEffect(player, card)
  }
}

async function askPlayerChoice(){
  // demander son actoin au joueur (rester/quitter la manche)
  
  const choice = await Question("Do you want to stay in game (Y/n)");

  if (choice=="Y") return true;
  if (choice=="n") return false;
  else return await askPlayerChoice();
}