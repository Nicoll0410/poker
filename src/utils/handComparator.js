const {
  isRoyalFlush,
  isStraightFlush,
  isFlush,
  isStraight,
  isPair,
  highCard
} = require('./handValidators');

const determineHandType = (hand) => {
  if (isRoyalFlush(hand)) return 'Royal Flush';
  if (isStraightFlush(hand)) return 'Straight Flush';
  if (isFlush(hand)) return 'Flush';
  if (isStraight(hand)) return 'Straight';
  if (isPair(hand)) return 'Pair';
  return 'High Card';
};

const compareHands = (hand1, hand2) => {
  const handRanks = ['High Card', 'Pair', 'Straight', 'Flush', 'Straight Flush', 'Royal Flush'];
  const hand1Type = determineHandType(hand1);
  const hand2Type = determineHandType(hand2);

  if (handRanks.indexOf(hand1Type) > handRanks.indexOf(hand2Type)) {
    return { winner: hand1, type: hand1Type };
  } else if (handRanks.indexOf(hand1Type) < handRanks.indexOf(hand2Type)) {
    return { winner: hand2, type: hand2Type };
  } else {
    if (hand1Type === 'High Card') {
      const highCards1 = highCard(hand1);
      const highCards2 = highCard(hand2);

      for (let i = 0; i < highCards1.length; i++) {
        if (highCards1[i] > highCards2[i]) return { winner: hand1, type: hand1Type };
        if (highCards1[i] < highCards2[i]) return { winner: hand2, type: hand2Type };
      }
    }
  }
};

module.exports = { compareHands, determineHandType };
