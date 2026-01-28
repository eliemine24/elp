import { applyCardEffect } from "../rules/actions"


export async function firstTurn(players, cards) {
  for (let i=0; i<players.length; i++){
    drewcard = cards.pop();
    console.log(drewcard);
    await applyCardEffect(players[i], card);
  }
  console.log("fisrt tour finished");
}
