const express = require('express');
const Card = require('./models/Card');
const Hand = require('./models/Hand');
const { compareHands } = require('./utils/handComparator');

const app = express();
app.use(express.json());

function parseHand(handString) {
  if (typeof handString !== 'string') {
    throw new Error('Mano inválida, debe ser un string');
  }
  const cardStrings = handString.trim().split(' ');
  return cardStrings.map(cardStr => {
    const value = cardStr.slice(0, -1);
    const suit = cardStr.slice(-1);
    
    if (!['H', 'D', 'S', 'C'].includes(suit)) {
      throw new Error('Palos inválidos');
    }
    return new Card(value, suit);
  });
}

app.post('/poker/validation', (req, res) => {
  try {
    const hand1String = req.body.hand1;
    const hand2String = req.body.hand2;

    if (!hand1String || !hand2String) {
      return res.status(400).json({ error: 'Ambas manos son necesarias' });
    }

    const hand1 = new Hand(parseHand(hand1String));
    const hand2 = new Hand(parseHand(hand2String));

    const result = compareHands(hand1, hand2);

    const resultInStr = result.winner.cards.reduce((acc, curr) => acc+= curr.value + curr.suit + " ", "").trim()
    const winnerHand = resultInStr  === hand1String ? "hand1" : "hand2"

    res.json({
      // winnerHand: result.winner.cards.map(card => `${card.value}${card.suit}`),
      winnerHand,
      winnerHandType: result.type,
      compositionWinnerHand: result.winner.cards
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});