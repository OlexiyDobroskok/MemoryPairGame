export const getPlayerLvl = (score) => {
  const lvl1 = 1000;
  const lvl2 = 2000;
  const lvl3 = 4000;
  const lvl4 = 6000;
  const lvl5 = 20000;
  if (score < lvl1)
    return {
      lvl: 1,
      lvlPercent: (score * 100) / lvl1,
      img: "./assets/images/score-icon/arturo-icon.png",
    };
  if (score < lvl2)
    return {
      lvl: 2,
      lvlPercent: ((score - lvl1) * 100) / (lvl2 - lvl1),
      img: "./assets/images/score-icon/denver-icon.png",
    };
  if (score < lvl3)
    return {
      lvl: 3,
      lvlPercent: ((score - lvl2) * 100) / (lvl3 - lvl2),
      img: "./assets/images/score-icon/tokio-icon.png",
    };
  if (score < lvl4)
    return {
      lvl: 4,
      lvlPercent: ((score - lvl3) * 100) / (lvl4 - lvl3),
      img: "./assets/images/score-icon/alicia-icon.png",
    };
  if (score < lvl5)
    return {
      lvl: 5,
      lvlPercent: ((score - lvl4) * 100) / (lvl5 - lvl4),
      img: "./assets/images/score-icon/professor-icon.png",
    };
};

export const renderPlayerPanel = (score) => {
  const { lvl, lvlPercent, img } = getPlayerLvl(score);
  document.querySelector(".player__lvl").innerText = `level ${lvl}`;
  document.querySelector(".player__img").src = img;
  document.querySelector(
    ".player__bar"
  ).style.backgroundSize = `${lvlPercent}% 100%`;
};
