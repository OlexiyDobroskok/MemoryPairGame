export const gameLogic = () => {
  let selectedCard = "";
  const canvas = document.querySelector(".canvas");
  canvas.addEventListener("click", ({ target }) => {
    const card = target.closest(".card");
    const cardNumber = card.dataset.cardNumber;
    if (!card) return;
    card.classList.add("card__flipped", "card__disabled");
    if (selectedCard && selectedCard === cardNumber) {
      selectedCard = "";
      for (const gameCard of canvas.children) {
        if (gameCard.classList.contains("card__flipped")) {
          gameCard.classList.add("card__disabled", "card__pair");
        }
      }
    } else if (selectedCard && selectedCard !== cardNumber) {
      selectedCard = "";
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
};
