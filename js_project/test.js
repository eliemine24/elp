let myCards = [0, 1, 2, 3, 4, "special"]

const drawCard = function() {
  const indice = Math.floor(Math.random() * myCards.length);
  console.log(indice);
  return myCards.splice(indice, 1);
};

console.log(drawCard());
console.log(myCards)