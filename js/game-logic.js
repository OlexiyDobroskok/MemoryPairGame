import { updateScore } from "./score.js";

const countPlayerScore = (attempts, time) => {
  const maxScore = 1000;
  const minScore = 15;
  return maxScore - attempts * time > minScore
    ? Math.trunc(maxScore - attempts * time)
    : minScore;
};

const setClassesForOpenCard = (card) => {
  card.classList.add("card--flipped", "card--disabled");
};

const setClassesForPair = () => {
  const canvas = document.querySelector(".canvas");
  for (const gameCard of canvas.children) {
    if (gameCard.classList.contains("card--flipped")) {
      gameCard.classList.add("card--disabled", "card--pair");
    }
  }
};

const setClassesForNotPair = () => {
  const canvas = document.querySelector(".canvas");
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
};

const getScoreDate = () => {
  const date = new Date();
  return date.toLocaleString();
};

const getGameTimeSec = (startTime) => (Date.now() - startTime) / 1000;

const showScoreMessage = (score) => {
  const scoreMessage = document.querySelector(".player__added-message");
  scoreMessage.innerText = `+ ${score}`;
  scoreMessage.classList.remove("player__added-message--hide");
  setTimeout(() => {
    scoreMessage.classList.add("player__added-message--hide");
  }, 2000);
};

const setPair = (game) => {
  game.clearSelectedCard();
  game.addPair();
  game.addAttempt();
  setClassesForPair();
};

const setNotPair = (game) => {
  game.clearSelectedCard();
  game.addAttempt();
  setClassesForNotPair();
};

const setFinishGame = (resolve, { startTime, attempts }) => {
  const scoreDate = getScoreDate();
  const gameTime = getGameTimeSec(startTime);
  const score = countPlayerScore(attempts, gameTime);
  showScoreMessage(score);
  updateScore(score, scoreDate);
  setTimeout(() => {
    resolve(true);
  }, 2000);
};

export const gameLogic = (deck) => {
  const game = {
    maxPairs: deck.length / 2,
    foundedPairs: 0,
    selectedCard: "",
    attempts: 0,
    startTime: 0,

    addPair() {
      this.foundedPairs++;
    },

    addAttempt() {
      this.attempts++;
    },

    setStartTime() {
      this.startTime = Date.now();
    },

    setSelectedCard(card) {
      this.selectedCard = card;
    },

    clearSelectedCard() {
      this.selectedCard = "";
    },
  };
  return new Promise((resolve) => {
    const canvas = document.querySelector(".canvas");
    canvas.addEventListener("click", ({ target }) => {
      const card = target.closest(".card");
      if (!card) return;
      const cardNumber = card.dataset.cardNumber;
      if (game.attempts === 0 && !game.selectedCard) game.setStartTime();
      setClassesForOpenCard(card);
      if (game.selectedCard && game.selectedCard === cardNumber) {
        setPair(game);
        if (game.foundedPairs === game.maxPairs) {
          setFinishGame(resolve, game);
        }
      } else if (game.selectedCard && game.selectedCard !== cardNumber) {
        setNotPair(game);
      } else {
        game.setSelectedCard(cardNumber);
      }
    });
  });
};
