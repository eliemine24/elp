export function playTurn(player, deck, gameState) {
  if (!player.active) return;

  const choice = gameState.askPlayerChoice(player);

  if (choice === 'quit') {
    player.quitRound();
    return;
  }

  deck.reshuffleIfNeeded();
  const card = deck.draw();

  // comparaison + actions
}