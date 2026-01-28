export function applyCardEffect(Player, card) {
  if (card=='a') {
    Player.score=0;
    Player.active=false;
  } elif (card=='b') {
    for i in range(3){
      carte=drawcard()
      if (Player.active=false){
        if (carte=='a' or carte=='b'){
          applyCardEffect(Player,card)
          const promptSync = require("prompt-sync");
          const prompt = promptSync();

          console.log("Choisis un joueur :");
          getValidTargets.forEach((p, i) => {
          console.log(`${i + 1}. ${p.name}`);
          });

          const choice = parseInt(prompt("Numéro du joueur : "), 10) - 1;

          const target = validTargets[choice];

          if (!target) {
            console.log("Choix invalide.");
            return;
          }

          console.log(`${currentPlayer.name} désigne ${target.name}`);
        }
      }
    }

  } else {
     if (Player.secondchance=True) {
      const promptSync = require("prompt-sync");
      const prompt = promptSync();

      console.log("Choisis un joueur :");
      getValidTargets.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      });

      const choice = parseInt(prompt("Numéro du joueur : "), 10) - 1;

      const target = validTargets[choice];

      if (!target) {
        console.log("Choix invalide.");
        return;
      }

      console.log(`${currentPlayer.name} désigne ${target.name}`);

    }
  }
  return [,]
}
function getValidTargets(players, currentPlayer) {
  return players.filter(p =>
    p !== currentPlayer &&
    p.active === true &&
    p.secondChance === false
  );
}
function getValidTargetssimple(players, currentPlayer) {
  return players.filter(p =>
    p !== currentPlayer &&
    p.active === true
  );
}