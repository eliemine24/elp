export function hasDuplicate(hand, card) {
  return hand.some(c => c.value === card.value);
}