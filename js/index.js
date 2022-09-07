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

const selectedCards = [];
let previousCard;
const maxPairs = 6;
let numberOfPairs = 0;
let sumFlippedCards = 0;

const wrap = document.querySelector(".wrap");
const playArea = document.createElement("ul");
playArea.classList.add("card__list");
wrap.append(playArea);
const pairsInfo = document.createElement("p");
pairsInfo.classList.add("text__info");
wrap.before(pairsInfo);

function showPairs() {
  pairsInfo.innerHTML = `Pairs found: ${numberOfPairs} / ${maxPairs}`;
}

function shuffle(deck) {
  return deck.sort(function () {
    return 0.5 - Math.random();
  });
}

function newGame() {
  showPairs();
  let gameDeck = shuffle(deckMoneyHeist);
  playArea.append(...makePlayArea(gameDeck));
}

function makePlayArea(deck) {
  return deck.map((card) => {
    const gameCard = document.createElement("li");
    gameCard.classList.add("card__item");
    const openCard = document.createElement("img");
    openCard.classList.add("opened__card");
    openCard.draggable = false;
    openCard.src = card.openCard;
    gameCard.append(openCard);
    const closeCard = document.createElement("img");
    closeCard.classList.add("closed__card");
    closeCard.draggable = false;
    closeCard.src = card.closeCard;
    gameCard.append(closeCard);
    gameCard.addEventListener("click", searchPair);
    return gameCard;
  });
}

function searchPair({ target }) {
  let chosenCard = target.closest("li");
  if (previousCard !== chosenCard && sumFlippedCards < 2) {
    chosenCard.classList.add("flipped");
    sumFlippedCards++;
    if (selectedCards.length < 2) {
      selectedCards.push(chosenCard.firstChild.src);
      if (selectedCards.length === 2 && selectedCards[0] === selectedCards[1]) {
        getPairCards();
      } else if (
        selectedCards.length === 2 &&
        selectedCards[0] !== selectedCards[1]
      ) {
        resetPairCards();
        chosenCard = "";
      }
    }
    previousCard = chosenCard;
  }

  resetGame();
}

function getPairCards() {
  numberOfPairs++;
  showPairs();
  selectedCards.length = 0;
  setTimeout(() => {
    for (let gameCard of playArea.children) {
      if (gameCard.classList.contains("flipped")) {
        gameCard.classList.remove("flipped");
        gameCard.classList.add("check");
        gameCard.removeEventListener("click", searchPair);
        sumFlippedCards = 0;
        while (gameCard.firstChild) {
          gameCard.removeChild(gameCard.firstChild);
        }
      }
    }
  }, 800);
}

function resetPairCards() {
  selectedCards.length = 0;
  setTimeout(() => {
    for (let gameCard of playArea.children) {
      if (gameCard.classList.contains("flipped")) {
        gameCard.classList.remove("flipped");
        sumFlippedCards = 0;
      }
    }
  }, 800);
}

function resetGame() {
  if (numberOfPairs === maxPairs) {
    setTimeout(() => {
      selectedCards.length = 0;
      previousCard = "";
      numberOfPairs = 0;
      sumFlippedCards = 0;
      while (playArea.firstChild) {
        playArea.removeChild(playArea.firstChild);
      }
      newGame();
    }, 3000);
  }
}

newGame();
