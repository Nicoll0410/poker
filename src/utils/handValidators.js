const isRoyalFlush = (hand) => {
  const values = ['10', 'J', 'Q', 'K', 'A'];
  const suits = hand.cards.map(card => card.suit);
  const handValues = hand.cards.map(card => card.value);

  return values.every(value => handValues.includes(value)) && new Set(suits).size === 1;
};

const isStraightFlush = (hand) => {
  return isStraight(hand) && isFlush(hand);
};

const isFlush = (hand) => {
  const suits = hand.cards.map(card => card.suit);
  return new Set(suits).size === 1;
};

const isStraight = (hand) => {
  const valueOrder = '23456789TJQKA';
  const handValues = hand.cards.map(card => card.value);
  handValues.sort((a, b) => valueOrder.indexOf(a) - valueOrder.indexOf(b));

  for (let i = 0; i < handValues.length - 1; i++) {
    if (valueOrder.indexOf(handValues[i]) + 1 !== valueOrder.indexOf(handValues[i + 1])) {
      return false;
    }
  }
  return true;
};

const isPair = (hand) => {
  const values = hand.cards.map(card => card.value);
  const valueCounts = values.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

  return Object.values(valueCounts).includes(2);
};

const highCard = (hand) => {
 const valueOrder = '23456789TJQKA';
  const values = hand.cards.map(card => valueOrder.indexOf(card.value)).sort((a, b) => b - a);
  return values;
};

module.exports = {
  isRoyalFlush,
  isStraightFlush,
  isFlush,
  isStraight,
  isPair,
  highCard
};
