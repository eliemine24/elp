import { askUser } from "./AskUser.js"

export async function applyCardEffect(game, player, card) {
  
  if (card.value === "freeze") {
    let t = await chooseTarget(game)
    if (t === -1) {console.log("error")}
    return await applyFreeze(game, game.players[t]);
  }
  
  else if (card.value === "flip three") {
    let t = await chooseTarget(game)
    if (t === -1) {console.log("error")}
    return await applyFlipThree(game, game.players[t]);
  }
  
  else if (card.value === "second chance") {
    return await applySecondChance(game, player);
  }
  
  return { success: false, message: "Unknown action card" };
}


/**
 * FREEZE CARD
 */
async function applyFreeze(game, player) {
  console.log(`\nFREEZE! ${player.name} loses all points and is OUT for this round!`);
  
  // Player loses all points for this round and is eliminated
  player.state = "OUT";
  
  return { 
    success: true, 
    message: `${player.name} was frozen and is OUT`,
    playerOut: true 
  };
}


/**
 * FLIP THREE CARD
 */
async function applyFlipThree(game, player) {
  console.log(`\nFLIP THREE! ${player.name} must draw 3 cards!`);
  
  const cardsDrawn = [];
  let playerLost = false;
  
  // Draw 3 cards
  for (let i = 0; i < 3; i++) {
    // Check if player is still active and hasn't reached 7 numbered cards
    if (player.state === "OUT" || playerLost) {
      console.log(`${player.name} cannot continue drawing (already OUT)`);
      break;
    }
    
    // Check if player has 7 numbered cards (winning condition)
    if (countNumberedCards(player.hand) >= 7) {
      console.log(`${player.name} has 7 numbered cards! Round ends for them.`);
      player.state = "STAYING";
      break;
    }
    
    // Shuffle if empty deck
    if (game.deck.length <= 0) {
      game.deck = await shuffle(game.discardPile);
      game.discardPile = [];
    }
    
    // Draw a card
    const newCard = game.deck.pop();
    console.log(`  Card ${i + 1}/3: ${newCard.value} (${newCard.type})`);
    cardsDrawn.push(newCard);
    
    // Check for duplicate BEFORE adding to hand
    if (await game.hasDuplicate(player.hand, newCard)) {
      console.log(`Duplicate! ${player.name} drew a ${newCard.value} they already have!`);
      player.addCard(newCard);
      player.state = "OUT";
      playerLost = true;
      
      // Continue drawing the remaining cards, but player is OUT
      continue;
    }
    
    // Add card to hand
    player.addCard(newCard);
    
    // If it's an action card, we'll handle it AFTER all 3 cards are drawn
  }
  
  // After drawing all cards (or stopping), resolve any action cards that were drawn
  for (let card of cardsDrawn) {
    if (card.type === "action") {
      console.log(`\nResolving action card: ${card.value}`);
      
      if (player.state === "OUT") {
        // Player lost, so they choose another player to receive the action card effect
        const activePlayers = getActivePlayers(game.players, player);
        
        if (activePlayers.length > 0) {
          console.log(`${player.name} must choose an active player to give the ${card.value} to:`);
          const target = await choosePlayer(activePlayers, player);
          
          if (target) {
            console.log(`${player.name} designates ${target.name} for ${card.value}`);
            await applyCardEffect(game, target, card);
          }
        } else {
          console.log("No active players to designate. Card effect is discarded.");
        }
      } else {
        // Player is still active, apply the effect normally
        await applyCardEffect(game, player, card);
      }
    }
  }
  
  return { 
    success: true, 
    message: `${player.name} drew 3 cards`,
    cardsDrawn: cardsDrawn.length,
    playerOut: playerLost
  };
}


/**
 * SECOND CHANCE CARD
 */
async function applySecondChance(game, player) {
  console.log(`\nSECOND CHANCE! ${player.name} received a Second Chance card!`);
  
  // Check if player already has a Second Chance
  const hasSecondChance = player.hand.some(c => c.value === "second chance");
  
  if (hasSecondChance && player.hand.filter(c => c.value === "second chance").length > 1) {
    console.log(`${player.name} already has a Second Chance!`);
    
    // Remove the extra second chance from hand
    const scIndex = player.hand.findIndex(c => c.value === "second chance");
    if (scIndex !== -1) {
      player.hand.splice(scIndex, 1);
    }
    
    // Choose another active player to give it to
    const activePlayers = getActivePlayersWithoutSecondChance(game.players, player);
    
    if (activePlayers.length > 0) {
      console.log(`${player.name} must choose an active player to give the Second Chance to:`);
      const target = await choosePlayer(activePlayers, player);
      
      if (target) {
        console.log(`${player.name} gives the Second Chance to ${target.name}`);
        target.addCard({ value: "second chance", type: "action" });
        return { 
          success: true, 
          message: `Second Chance given to ${target.name}`,
          givenTo: target.name
        };
      }
    } else {
      console.log("No active players available. Second Chance is discarded.");
      return { 
        success: true, 
        message: "Second Chance discarded (no available players)"
      };
    }
  }
  
  // Player keeps the Second Chance and draws another card
  console.log(`${player.name} keeps the Second Chance and draws another card...`);
  
  // Shuffle if empty deck
  if (game.deck.length <= 0) {
    game.deck = await shuffle(game.discardPile);
    game.discardPile = [];
  }
  
  const newCard = game.deck.pop();
  console.log(`Drew: ${newCard.value} (${newCard.type})`);
  
  // Check if it's a duplicate
  const hasDuplicate = await game.hasDuplicate(player.hand, newCard);
  
  if (hasDuplicate) {
    console.log(`Duplicate card! Using Second Chance to discard both cards.`);
    
    // Remove the Second Chance from hand
    const scIndex = player.hand.findIndex(c => c.value === "second chance");
    if (scIndex !== -1) {
      const secondChance = player.hand.splice(scIndex, 1)[0];
      game.discardPile.push(secondChance);
    }
    
    // Discard the duplicate card without adding it to hand
    game.discardPile.push(newCard);
    
    return { 
      success: true, 
      message: "Second Chance used to avoid duplicate",
      secondChanceUsed: true
    };
  }
  
  // No duplicate, add the card normally
  player.addCard(newCard);
  
  // If it's an action card, apply its effect
  if (newCard.type === "action") {
    console.log(`The new card is an action card: ${newCard.value}`);
    await applyCardEffect(game, player, newCard);
  }
  
  return { 
    success: true, 
    message: `${player.name} kept Second Chance and drew ${newCard.value}`
  };
}
/**
 * Get all active players except the current player and those who are OUT or STAYING
 */
function getActivePlayers(players, currentPlayer) {
  return players.filter(p => 
    p !== currentPlayer && 
    p.state === "ACTIVE"
  );
}

/**
 * Get all active players who don't have a Second Chance card
 */
function getActivePlayersWithoutSecondChance(players, currentPlayer) {
  return players.filter(p => 
    p !== currentPlayer && 
    p.state === "ACTIVE" &&
    !p.hand.some(c => c.value === "second chance")
  );
}

/**
 * Count the number of numbered cards in a hand
 */
function countNumberedCards(hand) {
  return hand.filter(c => c.type === "number").length;
}

/**
 * Let the current player choose another player from a list
 */
async function choosePlayer(validPlayers, currentPlayer) {
  if (validPlayers.length === 0) {
    return null;
  }
  
  console.log("\nChoose a player:");
  validPlayers.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name}`);
  });
  
  let valid = false;
  let target = null;
  
  while (!valid) {
    const choice = await askUser("Player number: ");
    const index = parseInt(choice, 10) - 1;
    
    if (index >= 0 && index < validPlayers.length) {
      target = validPlayers[index];
      valid = true;
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }
  
  return target;
}

async function chooseTarget(game) {   
  let valid = false
  let target_indice = -1
    while (valid==false) {
      const target = await askUser("designate target among players : ") //!\\ askuSer question to use as a python input() function !!! (await indispensable)
      for (let i in game.players) {
        if (target == game.players[i].name) {
          valid = true
          target_indice = i 
          }
        }
      }
      return target_indice
}

export { 
  applyFreeze, 
  applyFlipThree, 
  applySecondChance,
  getActivePlayers,
  countNumberedCards
};
