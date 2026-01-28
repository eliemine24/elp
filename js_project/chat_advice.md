# Structure
---

# 🗂️ Structure de projet recommandée

```
js_project/
├─ package.json
├─ src/
│  ├─ index.js              ← point d’entrée (lance la partie)
│
│  ├─ game/
│  │  ├─ Game.js            ← logique globale de la partie
│  │  ├─ Round.js           ← logique d’une manche
│  │  └─ Turn.js            ← gestion d’un tour de joueur
│
│  ├─ cards/
│  │  ├─ Deck.js            ← jeu de cartes (pioche, mélange, défausse)
│  │  └─ Card.js            ← représentation d’une carte
│
│  ├─ players/
│  │  ├─ Player.js          ← joueur
│  │  └─ Hand.js            ← jeu (main) d’un joueur
│
│  ├─ rules/
│  │  ├─ compareCards.js    ← comparaison de cartes
│  │  └─ actions.js         ← actions spéciales Flip7
│
│  ├─ scoring/
│  │  ├─ roundScore.js      ← score d’une manche
│  │  └─ totalScore.js      ← score total (historique)
│
│  └─ utils/
│     ├─ fileIO.js          ← lecture / écriture fichiers
│     └─ shuffle.js         ← utilitaire mélange (si besoin)
│
└─ data/
   ├─ rounds.json           ← scores des manches
   └─ history.json          ← historique global
```

---

# 🃏 1️⃣ Modéliser les cartes

### `Card.js`

Responsabilité : **une carte unique**

```js
export class Card {
  constructor(value, type = 'number') {
    this.value = value; // 1–12 ou spécial
    this.type = type;   // number | special
  }
}
```

---

### `Deck.js`

Responsabilité : **jeu de cartes complet**

Fonctions à implémenter :

* `shuffle()`
* `draw()`
* `discard(card)`
* `reshuffleIfNeeded()`

```js
export class Deck {
  constructor(cards = []) {
    this.cards = cards;
    this.discardPile = [];
  }

  shuffle() {}
  draw() {}
  discard(cards) {}
  reshuffleIfNeeded() {}
}
```

---

# 👥 2️⃣ Modéliser les joueurs

### `Player.js`

Responsabilité : **état du joueur**

```js
export class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.active = true;
    this.score = 0;
  }

  quitRound() {
    this.active = false;
  }
}
```

---

### `Hand.js`

Responsabilité : **jeu d’un joueur**

> 👉 correspond à ta demande : *« écrire dans un fichier séparé »*

```js
export function addCard(player, card) {
  player.hand.push(card);
}
```

---

# 🔍 3️⃣ Règles du jeu

### `compareCards.js`

Responsabilité : **comparaison des cartes**

```js
export function hasDuplicate(hand, card) {
  return hand.some(c => c.value === card.value);
}
```

---

### `actions.js`

Responsabilité : **actions spéciales Flip7**

```js
export function applyCardEffect(player, card, gameState) {
  // à compléter selon règles Flip7
}
```

---

# 🔄 4️⃣ Gestion d’un tour

### `Turn.js`

Responsabilité : **1 joueur joue 1 tour**

```js
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
```

---

# 🔁 5️⃣ Gestion d’une manche

### `Round.js`

Responsabilité : **enchaînement des tours**

Fonctions :

* `firstTurn()`
* `playRound()`
* `isRoundOver()`

```js
export class Round {
  constructor(players, deck) {
    this.players = players;
    this.deck = deck;
  }

  firstTurn() {}
  play() {}
  isOver() {}
}
```

Conditions de fin :

* un joueur a **7 cartes**
* plus **aucun joueur actif**

---

# 🎯 6️⃣ Calcul des scores

### `roundScore.js`

Responsabilité : **score d’une manche**

```js
export function calculateRoundScore(players) {
  // lecture des mains
  // calcul score
  return scores;
}
```

---

### `totalScore.js`

Responsabilité : **score global**

```js
export function calculateTotalScore(history) {
  // somme des manches
}
```

---

# 💾 7️⃣ Lecture / écriture fichiers

### `fileIO.js`

Responsabilité : **persistences des données**

```js
import fs from 'fs';

export function writeJSON(path, data) {}
export function readJSON(path) {}
```

Utilisé pour :

* scores de manches
* historique total

---

# 🎮 8️⃣ Jeu principal

### `Game.js`

Responsabilité : **orchestrer toute la partie**

```js
export class Game {
  constructor(players) {
    this.players = players;
  }

  start() {}
  playRound() {}
  isGameOver() {}
}
```

Condition game over :

* score total ≥ **200**

---

### `index.js`

Point d’entrée :

```js
import { Game } from './game/Game.js';

const game = new Game(['Alice', 'Bob']);
game.start();
```

---

# 🧠 Ordre conseillé pour coder

1. `Card` → `Deck`
2. `Player` → `Hand`
3. `compareCards`
4. `Turn`
5. `Round`
6. Scores
7. Fichiers
8. `Game` + `index.js`