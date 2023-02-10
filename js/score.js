export const getScore = () => {
  if (localStorage.getItem("score")) {
    const { sum, latest } = JSON.parse(localStorage.getItem("score"));
    return { sum, latest };
  } else {
    localStorage.setItem(
      "score",
      JSON.stringify({ sum: 0, latest: [0, 0, 0, 0, 0] })
    );
  }
};
