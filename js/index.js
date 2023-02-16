import { renderGameField } from "./game-field.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";
import { renderScoresTop, setInitialScore } from "./score.js";
import { renderPlayerPanel } from "./player.js";

const initial = async (deck) => {
  const gameDeck = makeGameDeck(deck);
  renderGameField(gameDeck);
  renderPlayerPanel();
  renderScoresTop();
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial(deck);
};

initial(personsMoneyHeist);

const resetProgress = () => {
  setInitialScore();
  location.reload();
};

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
  const clearScoreBtn = target.closest(".score__clear-btn");
  const scoreDialog = document.querySelector(".dialog");
  const cancelDialogBtn = target.closest(".dialog__cancel-btn");
  const confirmClearScoreBtn = target.closest(".dialog__clear-btn");
  if (
    !scoreBackdrop &&
    !toggleScoreBtn &&
    !toggleGameInfoBtn &&
    !closeScoreBtn &&
    !closeGameInfoBtn &&
    !clearScoreBtn &&
    !cancelDialogBtn &&
    !confirmClearScoreBtn
  )
    return;
  if (toggleScoreBtn) toggleGameScore(toggleScoreBtn);
  if (toggleGameInfoBtn) toggleGameInfo(toggleGameInfoBtn);
  if (closeGameInfoBtn) closeGameInfo();
  if (scoreBackdrop || closeScoreBtn) closeScore();
  if (clearScoreBtn) scoreDialog.showModal();
  if (cancelDialogBtn) scoreDialog.close();
  if (confirmClearScoreBtn) resetProgress();
};

const pageBody = document.querySelector(".page__body");
pageBody.addEventListener("click", handleBodyClick);
