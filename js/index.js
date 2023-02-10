import { renderGameField } from "./game-field.js";
import { gameLogic } from "./game-logic.js";
import { makeGameDeck } from "./deck.js";
import { personsMoneyHeist } from "./constants.js";
import { renderScoresTop } from "./score.js";
import { renderPlayerPanel } from "./player.js";

export const initial = async (deck) => {
  const gameDeck = makeGameDeck(deck);
  renderGameField(gameDeck);
  renderPlayerPanel();
  renderScoresTop();
  const isFinish = await gameLogic(gameDeck);
  isFinish && initial(deck);
};

initial(personsMoneyHeist);
