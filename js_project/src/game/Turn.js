const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


export function playTurn(player, deck) {
  if (!player.active) return;

  const choice = askPlayerChoice(player);

  if (choice === 'quit') {
    player.quitRound();
    return;
  }

  deck.reshuffleIfNeeded();
  const card = deck.draw();

  // comparaison + actions
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