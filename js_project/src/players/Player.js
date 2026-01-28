export class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.active = true;
    this.score = 0;
  }

  addCard(card){
    this.hand.push(card)
  }
  
  quitRound() {
    this.active = false;
  }
}