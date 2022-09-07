const deckMoneyHeist = [
  {
    openCard: "./img/berlin.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/lissabon.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/professor.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/rio.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/stokholm.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/tokio.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/berlin.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/lissabon.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/professor.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/rio.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/stokholm.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    openCard: "./img/tokio.jpg",
    closeCard: "./img/dali.jpg",
  },
];

const wrap = document.querySelector(".wrap");
const playArea = document.createElement("ul");
playArea.classList.add("card__list");
wrap.append(playArea);

function shuffle(deck) {
  return deck.sort(function () {
    return 0.5 - Math.random();
  });
}

function newGame() {
  let gameDeck = shuffle(deckMoneyHeist);
  playArea.append(...makePlayArea(gameDeck));
}

function makePlayArea(deck) {
  return deck.map((card) => {
    const gameCard = document.createElement("li");
    gameCard.classList.add("card__item");
    const openCard = document.createElement("img");
    openCard.classList.add("card__img", "close__card");
    openCard.src = card.openCard;
    gameCard.append(openCard);
    const closeCard = document.createElement("img");
    closeCard.classList.add("card__img");
    closeCard.src = card.closeCard;
    gameCard.append(closeCard);
    gameCard.addEventListener("click", searchPair);
    return gameCard;
  });
}

const selectedCards = [];
let previousCard;
let numberOfPairs = 0;

function searchPair({ target }) {
  let chosenCard = target.closest("li");
  if (previousCard !== chosenCard) {
    for (let statusCard of chosenCard.children) {
      statusCard.classList.toggle("close__card");
    }
    chosenCard.classList.add("open__card");
    if (selectedCards.length < 2) {
      selectedCards.push(chosenCard.firstChild.src);
      if (selectedCards.length === 2 && selectedCards[0] === selectedCards[1]) {
        getPairCards();
      } else if (
        selectedCards.length === 2 &&
        selectedCards[0] !== selectedCards[1]
      ) {
        chosenCard = "";
        resetPairCards();
      }
    }
  }
  previousCard = chosenCard;
  resetGame();
}

function getPairCards() {
  numberOfPairs++;
  for (let gameCard of playArea.children) {
    if (gameCard.classList.contains("open__card")) {
      gameCard.classList.remove("open__card");
      gameCard.removeEventListener("click", searchPair);
      selectedCards.length = 0;
    }
  }
}

function resetPairCards() {
  selectedCards.length = 0;
  for (let gameCard of playArea.children) {
    if (gameCard.classList.contains("open__card")) {
      gameCard.classList.remove("open__card");
      setTimeout(() => {
        for (let statusCard of gameCard.children) {
          statusCard.classList.toggle("close__card");
        }
      }, 500);
    }
  }
}

function resetGame() {
  if (numberOfPairs === 6) {
    setTimeout(() => {
      selectedCards.length = 0;
      previousCard = "";
      numberOfPairs = 0;
      while (playArea.firstChild) {
        playArea.removeChild(playArea.firstChild);
      }
      newGame();
    }, 1000);
  }
}

newGame();
