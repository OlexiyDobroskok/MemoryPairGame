export const getScore = () => {
  if (localStorage.getItem("score")) {
    const { sumScore, topScoresList } = JSON.parse(
      localStorage.getItem("score")
    );
    return { sumScore, topScoresList };
  } else {
    const initialScore = {
      sumScore: 0,
      topScoresList: [
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
        { score: 0, date: "" },
      ],
    };
    localStorage.setItem("score", JSON.stringify(initialScore));
    return initialScore;
  }
};

export const updateScore = (newScore, scoreDate) => {
  const { sumScore, topScoresList } = JSON.parse(localStorage.getItem("score"));
  const sumScoreUpdated = sumScore + newScore;
  const topScoresListUpdated = [
    ...topScoresList,
    { score: newScore, date: scoreDate },
  ]
    .sort((firstScore, secondScore) => secondScore.score - firstScore.score)
    .splice(0, 10);
  localStorage.setItem(
    "score",
    JSON.stringify({
      sumScore: sumScoreUpdated,
      topScoresList: topScoresListUpdated,
    })
  );
};

const getScoresTopLayout = (scoresList) => {
  return scoresList.map(
    ({ score, date }) => `
    <li class="score__item">${score} ${date}</li>
  `
  );
};

export const renderScoresTop = () => {
  const { topScoresList } = getScore();
  document.querySelector(".score__list").innerHTML =
    getScoresTopLayout(topScoresList).join("");
};
