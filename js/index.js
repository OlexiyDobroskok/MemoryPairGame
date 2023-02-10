import { renderGameField } from "./game-field.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";
import { getScore } from "./score.js";
import { renderPlayerPanel } from "./player.js";

export const initial = async (deck) => {
  const { sum: score } = getScore();
  const gameDeck = makeGameDeck(deck);
  renderPlayerPanel(score);
  renderGameField(gameDeck);
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial();
};

initial(personsMoneyHeist);
