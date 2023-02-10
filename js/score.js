export const getScore = () => {
  if (localStorage.getItem("score")) {
    const { sumScore, topScoreList } = JSON.parse(
      localStorage.getItem("score")
    );
    return { sumScore, topScoreList };
  } else {
    const initialScore = { sumScore: 0, topScoreList: [0, 0, 0, 0, 0] };
    localStorage.setItem("score", JSON.stringify(initialScore));
    return initialScore;
  }
};

export const updateScore = (newScore) => {
  const { sumScore, topScoreList } = JSON.parse(localStorage.getItem("score"));
  const sumScoreUpdated = sumScore + newScore;
  const topScoreListUpdated = [...topScoreList, newScore]
    .sort((firstScore, secondScore) => secondScore - firstScore)
    .splice(0, 5);
  localStorage.setItem(
    "score",
    JSON.stringify({
      sumScore: sumScoreUpdated,
      topScoreList: topScoreListUpdated,
    })
  );
};
