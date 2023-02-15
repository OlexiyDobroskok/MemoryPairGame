import { renderGameField } from "./game-field.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";
import { renderScoresTop } from "./score.js";
import { renderPlayerPanel } from "./player.js";

const toggleGameInfo = (button) => {
  document.querySelector(".game__info").classList.toggle("game__info--open");
  button.ariaLabel =
    button.ariaLabel === "open game information"
      ? "close game information"
      : "open game information";
};

const closeGameInfo = () => {
  document.querySelector(".game__info").classList.remove("game__info--open");
};

const toggleGameScore = (button) => {
  const backdrop = document.querySelector(".backdrop");
  backdrop.classList.toggle("backdrop--hidden");
  backdrop.classList.toggle("score__backdrop");
  document.querySelector(".score").classList.toggle("score--open");
  button.ariaLabel =
    button.ariaLabel === "open score information"
      ? "close score information"
      : "open score information";
};

const closeScore = () => {
  const backdrop = document.querySelector(".backdrop");
  document.querySelector(".score").classList.remove("score--open");
  backdrop.classList.add("backdrop--hidden");
  backdrop.classList.remove("score__backdrop");
};

const handleBodyClick = ({ target }) => {
  const scoreBackdrop = target.closest(".score__backdrop");
  const toggleScoreBtn = target.closest(".score__toggle-btn");
  const toggleGameInfoBtn = target.closest(".info__toggle-btn");
  const closeScoreBtn = target.closest(".score__close-btn");
  const closeGameInfoBtn = target.closest(".info__close-btn");
  if (
    !scoreBackdrop &&
    !toggleScoreBtn &&
    !toggleGameInfoBtn &&
    !closeScoreBtn &&
    !closeGameInfoBtn
  )
    return;
  if (toggleScoreBtn) toggleGameScore(toggleScoreBtn);
  if (toggleGameInfoBtn) toggleGameInfo(toggleGameInfoBtn);
  if (closeGameInfoBtn) closeGameInfo();
  if (scoreBackdrop || closeScoreBtn) closeScore();
};

const pageBody = document.querySelector(".page__body");
pageBody.addEventListener("click", handleBodyClick);

const initial = async (deck) => {
  const gameDeck = makeGameDeck(deck);
  renderGameField(gameDeck);
  renderPlayerPanel();
  renderScoresTop();
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial(deck);
};

initial(personsMoneyHeist);
