//import { applyCardEffect } from "../rules/actions.js"


export async function firstTurn(players, cards) {
  for (let i=0; i<players.length; i++){
    const drewcard = cards.pop;
    console.log(drewcard);
    //await applyCardEffect(players[i], card);
  }
  console.log("fisrt tour finished");
}
