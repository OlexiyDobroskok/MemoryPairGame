import { renderGameField } from "./game-field.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";
import { renderScoresTop } from "./score.js";
import { renderPlayerPanel } from "./player.js";

const infoBtn = document.querySelector(".score__info-btn");
infoBtn.addEventListener("click", ({ target }) => {
  document.querySelector(".game__info").classList.toggle("game__info--open");
  infoBtn.ariaLabel =
    infoBtn.ariaLabel === "open game information"
      ? "close game information"
      : "open game information";
});

document
  .querySelector(".info__close-btn")
  .addEventListener("click", ({ target }) => {
    document.querySelector(".game__info").classList.remove("game__info--open");
  });

const initial = async (deck) => {
  const gameDeck = makeGameDeck(deck);
  renderGameField(gameDeck);
  renderPlayerPanel();
  renderScoresTop();
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial(deck);
};

initial(personsMoneyHeist);
