const renderCards = (deck) => {
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

export const renderCardsList = (deck) => {
  const canvas = document.querySelector(".canvas");
  canvas.innerHTML = renderCards(deck).join("");
};
