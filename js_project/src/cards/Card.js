export class Card {
  constructor(value, type = 'number') {
    this.value = value; // 1–12 ou spécial
    this.type = type;   // number | special
  }
}