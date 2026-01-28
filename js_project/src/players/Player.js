export class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.state = "ACTIVE";  // can also be "STAYING" or "OUT"
    this.score = 0;
  }

  addCard(card){
    this.hand.push(card)
  }
  
  quitRound() {
    this.active = false;
  }
}