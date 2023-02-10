import { renderGameField } from "./game-field.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";
import { getScore, renderScoresTop } from "./score.js";
import { renderPlayerPanel } from "./player.js";

export const initial = async (deck) => {
  const { sumScore } = getScore();
  const gameDeck = makeGameDeck(deck);
  renderPlayerPanel(sumScore);
  renderGameField(gameDeck);
  renderScoresTop();
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial(deck);
};

initial(personsMoneyHeist);
