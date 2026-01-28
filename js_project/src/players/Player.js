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