const getCardsMarkup = (deck) => {
  return deck.map(
    ({ id, image }) => `
          <li class="card canvas__card" data-card-number=${id}>
            <div class="card__open">
              <img
                class="card__img"
                src=${image}
                alt=""
                draggable="false"
              />
            </div>
            <div class="card__closed">
              <img
                class="card__img"
                src="./assets/images/dali.jpg"
                alt=""
                draggable="false"
              />
            </div>
          </li>
  `
  );
};

export const renderGameField = (deck) => {
  document.querySelector(".canvas").innerHTML = getCardsMarkup(deck).join("");
};
