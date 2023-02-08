import { personsMoneyHeist } from "./constants.js";

const shuffle = (deck) => deck.sort(() => Math.random() - 0.5);

const makeGameDeck = (deck) => {
  if (deck.length >= 6) {
    const initialDeck = shuffle(deck).slice(0, 6);
    const doubleDeck = [...initialDeck, ...initialDeck];
    return shuffle(doubleDeck);
  }
};

const renderCards = (deck) => {
  return deck.map(
    ({ image }) => `
          <li class="card canvas__card">
            <div class="card__open">
              <img
                class="card__img"
                src=${image}
                alt=""
                draggable="false"
              />
            </div>
            <div class="card__closed">
              <img
                class="card__img"
                src="./assets/images/dali.jpg"
                alt=""
                draggable="false"
              />
            </div>
          </li>
  `
  );
};

export const render = () => {
  const gameDeck = makeGameDeck(personsMoneyHeist);
  const canvas = document.querySelector(".canvas");
  canvas.innerHTML = renderCards(gameDeck).join("");
};
