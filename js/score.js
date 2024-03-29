import { getPlayerLvl } from "./player.js";

export const setInitialScore = () => {
  const initialScore = {
    sumScore: 0,
    isLvlUp: false,
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
};

export const getScore = () => {
  return localStorage.getItem("score")
    ? JSON.parse(localStorage.getItem("score"))
    : setInitialScore();
};

export const updateScore = (newScore, scoreDate) => {
  const { sumScore, topScoresList } = JSON.parse(localStorage.getItem("score"));
  const sumScoreUpdated = sumScore + newScore;
  const isLvlUp =
    getPlayerLvl(sumScoreUpdated).lvl > getPlayerLvl(sumScore).lvl;
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
      isLvlUp,
      topScoresList: topScoresListUpdated,
    })
  );
};

const getScoresTopMarkup = (scoresList) =>
  scoresList.map(
    ({ score, date }) => `
    <li class="score__item">${score} ${date}</li>
  `
  );

export const renderScoresTop = () => {
  const { topScoresList } = getScore();
  document.querySelector(".score__list").innerHTML =
    getScoresTopMarkup(topScoresList).join("");
};
