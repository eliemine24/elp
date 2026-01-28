let myCards = [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, "special"];

async function shuffle(cards) {
    let myShuffledCards = [];
    while (cards.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 0));

        let i = Math.floor(Math.random() * cards.length);
        let n = cards.splice(i, 1).pop();
        myShuffledCards.push(n);
    }
    return myShuffledCards;
}

const drawCard = function() {
    i = Math.floor(Math.random() * myCards.length);
    c = myCards[i];
    delete myCards[i];
    return c;
};


console.log(myCards);
let deck = await shuffle(myCards);
console.log(deck);