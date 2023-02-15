import { updateScore } from "./score.js";

const countPlayerScore = (attempts, time) => {
  const maxScore = 1000;
  const minScore = 15;
  return maxScore - attempts * time > minScore
    ? Math.trunc(maxScore - attempts * time)
    : minScore;
};

export const gameLogic = (deck) => {
  return new Promise((resolve) => {
    const maxPairs = deck.length / 2;
    let foundedPairs = 0;
    let selectedCard = "";
    let attempts = 0;
    let startTime = 0;
    const canvas = document.querySelector(".canvas");
    canvas.addEventListener("click", ({ target }) => {
      const card = target.closest(".card");
      if (!card) return;
      if (attempts === 0 && !selectedCard) startTime = Date.now();
      const cardNumber = card.dataset.cardNumber;
      card.classList.add("card--flipped", "card--disabled");
      if (selectedCard && selectedCard === cardNumber) {
        selectedCard = "";
        foundedPairs++;
        attempts++;
        for (const gameCard of canvas.children) {
          if (gameCard.classList.contains("card--flipped")) {
            gameCard.classList.add("card--disabled", "card--pair");
          }
        }
        if (foundedPairs === maxPairs) {
          const date = new Date();
          const scoreDate = date.toLocaleString();
          const gameTime = (Date.now() - startTime) / 1000;
          const score = countPlayerScore(attempts, gameTime);
          const scoreMessage = document.querySelector(".player__added-message");
          scoreMessage.innerText = `+ ${score}`;
          scoreMessage.classList.remove("player__added-message--hide");
          updateScore(score, scoreDate);
          setTimeout(() => {
            scoreMessage.classList.add("player__added-message--hide");
            resolve(true);
          }, 2000);
        }
      } else if (selectedCard && selectedCard !== cardNumber) {
        selectedCard = "";
        attempts++;
        for (const gameCard of canvas.children) {
          gameCard.classList.add("card--disabled");
        }
        setTimeout(() => {
          for (const gameCard of canvas.children) {
            if (!gameCard.classList.contains("card--pair")) {
              gameCard.classList.remove("card--disabled", "card--flipped");
            }
          }
        }, 1000);
      } else {
        selectedCard = cardNumber;
      }
    });
  });
};
