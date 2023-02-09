const shuffle = (deck) => deck.sort(() => Math.random() - 0.5);

export const makeGameDeck = (deck) => {
  if (deck.length >= 6) {
    const initialDeck = shuffle(deck).slice(0, 6);
    const doubleDeck = [...initialDeck, ...initialDeck];
    return shuffle(doubleDeck);
  }
};
