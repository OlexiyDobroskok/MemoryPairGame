const updateScore = (attempts, time) => {
  const maxScore = 1000;
  const minScore = 15;
  const playerScore =
    maxScore - attempts * time > minScore
      ? Math.trunc(maxScore - attempts * time)
      : minScore;
  const prevScore = Number(localStorage.getItem("score"));
  const actualScore = prevScore + playerScore;
  localStorage.setItem("score", actualScore.toString());
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
      card.classList.add("card__flipped", "card__disabled");
      if (selectedCard && selectedCard === cardNumber) {
        selectedCard = "";
        foundedPairs++;
        attempts++;
        for (const gameCard of canvas.children) {
          if (gameCard.classList.contains("card__flipped")) {
            gameCard.classList.add("card__disabled", "card__pair");
          }
        }
        if (foundedPairs === maxPairs) {
          const finishTime = Date.now();
          const gameTime = (finishTime - startTime) / 1000;
          updateScore(attempts, gameTime);
          setTimeout(() => {
            resolve(true);
          }, 3000);
        }
      } else if (selectedCard && selectedCard !== cardNumber) {
        selectedCard = "";
        attempts++;
        for (const gameCard of canvas.children) {
          gameCard.classList.add("card__disabled");
        }
        setTimeout(() => {
          for (const gameCard of canvas.children) {
            if (!gameCard.classList.contains("card__pair")) {
              gameCard.classList.remove("card__disabled", "card__flipped");
            }
          }
        }, 1000);
      } else {
        selectedCard = cardNumber;
      }
    });
  });
};
