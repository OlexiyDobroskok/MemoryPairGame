import { render, renderScore } from "./render.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";

export const initial = async () => {
  let score = 0;
  localStorage.getItem("score")
    ? (score = localStorage.getItem("score"))
    : localStorage.setItem("score", "0");
  renderScore(score);
  const gameDeck = makeGameDeck(personsMoneyHeist);
  render(gameDeck);
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial();
};

initial();
